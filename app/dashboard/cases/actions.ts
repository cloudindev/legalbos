"use server"

import prisma from "@/lib/db/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

// --- PHASES ---
export async function getCasePhases() {
    const session = await auth()
    if (!session?.user?.tenantId) return []

    return prisma.casePhase.findMany({
        where: { tenantId: session.user.tenantId },
        orderBy: { order: 'asc' }
    })
}

export async function createCasePhase(name: string) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    // Get max order
    const lastPhase = await prisma.casePhase.findFirst({
        where: { tenantId: session.user.tenantId },
        orderBy: { order: 'desc' }
    })
    const newOrder = lastPhase ? lastPhase.order + 1 : 0

    const phase = await prisma.casePhase.create({
        data: {
            name,
            order: newOrder,
            tenantId: session.user.tenantId
        }
    })

    revalidatePath("/dashboard/cases")
    return phase
}

// --- TYPES ---
export async function getCaseTypes() {
    const session = await auth()
    if (!session?.user?.tenantId) return []

    return prisma.caseType.findMany({
        where: { tenantId: session.user.tenantId },
        orderBy: { name: 'asc' }
    })
}

export async function createCaseType(name: string) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    const type = await prisma.caseType.create({
        data: {
            name,
            tenantId: session.user.tenantId
        }
    })

    revalidatePath("/dashboard/cases")
    return type
}

// --- CASE FILES ---
export async function getCaseFiles() {
    const session = await auth()
    if (!session?.user?.tenantId) return []

    return prisma.caseFile.findMany({
        where: { tenantId: session.user.tenantId },
        include: {
            client: true,
            phase: true,
            type: true,
            opposingLawyer: true,
            assignedUsers: {
                select: { id: true, name: true, email: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    })
}

export async function getCaseFileById(id: string) {
    const session = await auth()
    if (!session?.user?.tenantId) return null

    return prisma.caseFile.findFirst({
        where: { id, tenantId: session.user.tenantId },
        include: {
            client: true,
            phase: true,
            type: true,
            opposingLawyer: true,
            assignedUsers: {
                select: { id: true, name: true, email: true }
            },
            documents: true
        }
    })
}

export async function createCaseFile(data: any) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    // Destructure assignedUsers (array of user IDs)
    const { assignedUserIds, ...restData } = data

    const caseFile = await prisma.caseFile.create({
        data: {
            ...restData,
            tenantId: session.user.tenantId,
            ...(assignedUserIds?.length > 0 && {
                assignedUsers: {
                    connect: assignedUserIds.map((id: string) => ({ id }))
                }
            })
        }
    })

    revalidatePath("/dashboard/cases")
    return caseFile
}

export async function updateCaseFile(id: string, data: any) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    // Verify ownership
    const existing = await prisma.caseFile.findFirst({
        where: { id, tenantId: session.user.tenantId },
        include: { assignedUsers: true }
    })
    if (!existing) throw new Error("Acceso denegado o expediente no encontrado")

    const { assignedUserIds, ...restData } = data

    // Disconnect old, connect new users if provided
    let userOps = {}
    if (assignedUserIds) {
        userOps = {
            assignedUsers: {
                set: [], // clears existing
                connect: assignedUserIds.map((userId: string) => ({ id: userId }))
            }
        }
    }

    const updated = await prisma.caseFile.update({
        where: { id },
        data: {
            ...restData,
            ...userOps
        }
    })

    revalidatePath("/dashboard/cases")
    revalidatePath(`/dashboard/cases/${id}`)
    return updated
}

export async function deleteCaseFile(id: string) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    // Verify ownership
    const existing = await prisma.caseFile.findFirst({
        where: { id, tenantId: session.user.tenantId }
    })
    if (!existing) throw new Error("Acceso denegado o expediente no encontrado")

    await prisma.caseFile.delete({
        where: { id }
    })

    revalidatePath("/dashboard/cases")
    return true
}

// --- UTILS : Get users for assignment ---
export async function getFirmUsers() {
    const session = await auth()
    if (!session?.user?.tenantId) return []

    return prisma.user.findMany({
        where: { tenantId: session.user.tenantId },
        select: { id: true, name: true, role: true, email: true },
        orderBy: { name: 'asc' }
    })
}
