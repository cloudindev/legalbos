"use server"

import prisma from "@/lib/db/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getContactCategories() {
    const session = await auth()
    if (!session?.user?.tenantId) return []

    return prisma.contactCategory.findMany({
        where: { tenantId: session.user.tenantId },
        orderBy: { name: 'asc' }
    })
}

export async function createContactCategory(name: string) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    const category = await prisma.contactCategory.create({
        data: {
            name,
            tenantId: session.user.tenantId
        }
    })

    revalidatePath("/dashboard/directory")
    return category
}

export async function getDirectoryContacts() {
    const session = await auth()
    if (!session?.user?.tenantId) return []

    return prisma.directoryContact.findMany({
        where: { tenantId: session.user.tenantId },
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    })
}

export async function getDirectoryContactById(id: string) {
    const session = await auth()
    if (!session?.user?.tenantId) return null

    return prisma.directoryContact.findFirst({
        where: { id, tenantId: session.user.tenantId },
        include: { category: true }
    })
}

export async function createDirectoryContact(data: any) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    const contact = await prisma.directoryContact.create({
        data: {
            ...data,
            tenantId: session.user.tenantId
        }
    })

    revalidatePath("/dashboard/directory")
    return contact
}

export async function updateDirectoryContact(id: string, data: any) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    // Verify ownership
    const existing = await prisma.directoryContact.findFirst({
        where: { id, tenantId: session.user.tenantId }
    })
    if (!existing) throw new Error("Acceso denegado o contacto no encontrado")

    const contact = await prisma.directoryContact.update({
        where: { id },
        data
    })

    revalidatePath("/dashboard/directory")
    revalidatePath(`/dashboard/directory/${id}`)
    return contact
}

export async function deleteDirectoryContact(id: string) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    // Verify ownership
    const existing = await prisma.directoryContact.findFirst({
        where: { id, tenantId: session.user.tenantId }
    })
    if (!existing) throw new Error("Acceso denegado o contacto no encontrado")

    await prisma.directoryContact.delete({
        where: { id }
    })

    revalidatePath("/dashboard/directory")
    return true
}
