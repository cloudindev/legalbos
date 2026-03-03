"use server"

import prisma from "@/lib/db/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getClients() {
    const session = await auth()
    if (!session?.user?.tenantId) return []

    return prisma.client.findMany({
        where: { tenantId: session.user.tenantId },
        orderBy: { createdAt: 'desc' }
    })
}

export async function getClientById(id: string) {
    const session = await auth()
    if (!session?.user?.tenantId) return null

    return prisma.client.findFirst({
        where: { id, tenantId: session.user.tenantId },
        include: {
            contacts: true,
            bankAccounts: true,
            annotations: {
                include: { author: true },
                orderBy: { createdAt: 'desc' }
            },
            caseFiles: true,
            documents: true
        }
    })
}

export async function createClient(data: any) {
    const session = await auth()
    if (!session?.user?.tenantId) return { success: false, error: "No autorizado" }

    try {
        const client = await prisma.client.create({
            data: {
                ...data,
                tenantId: session.user.tenantId
            }
        })
        revalidatePath("/dashboard/clients")
        return { success: true, data: JSON.parse(JSON.stringify(client)) }
    } catch (e: any) {
        console.error("Error creating client:", e)
        return { success: false, error: "Error en base de datos: " + e.message }
    }
}

export async function addContact(clientId: string, data: any) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    const client = await prisma.client.findFirst({
        where: { id: clientId, tenantId: session.user.tenantId }
    })
    if (!client) throw new Error("Acceso denegado o cliente no encontrado")

    const contact = await prisma.contact.create({
        data: {
            ...data,
            clientId
        }
    })

    revalidatePath(`/dashboard/clients/${clientId}`)
    return contact
}

export async function addBankAccount(clientId: string, data: any) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    const client = await prisma.client.findFirst({
        where: { id: clientId, tenantId: session.user.tenantId }
    })
    if (!client) throw new Error("Acceso denegado o cliente no encontrado")

    const bank = await prisma.bankAccount.create({
        data: {
            ...data,
            clientId
        }
    })

    revalidatePath(`/dashboard/clients/${clientId}`)
    return bank
}

export async function addAnnotation(clientId: string, content: string) {
    const session = await auth()
    if (!session?.user?.tenantId || !session?.user?.id) throw new Error("No autorizado")

    const client = await prisma.client.findFirst({
        where: { id: clientId, tenantId: session.user.tenantId }
    })
    if (!client) throw new Error("Acceso denegado o cliente no encontrado")

    const annotation = await prisma.annotation.create({
        data: {
            content,
            clientId,
            authorId: session.user.id
        }
    })

    revalidatePath(`/dashboard/clients/${clientId}`)
    return annotation
}

export async function addClientDocument(clientId: string, data: { name: string, url: string, size?: number, mimetype?: string }) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    const client = await prisma.client.findFirst({
        where: { id: clientId, tenantId: session.user.tenantId }
    })
    if (!client) throw new Error("Acceso denegado o cliente no encontrado")

    const doc = await prisma.document.create({
        data: {
            ...data,
            clientId,
            tenantId: session.user.tenantId
        }
    })

    revalidatePath(`/dashboard/clients/${clientId}`)
    return doc
}
