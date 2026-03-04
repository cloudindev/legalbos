"use server"

import prisma from "@/lib/db/prisma"
import { auth } from "@/auth"

export async function getUserProfile() {
    const session = await auth()
    if (!session?.user?.id) return null

    return prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            email: true,
            name: true,
            firstName: true,
            lastName1: true,
            lastName2: true
        }
    })
}

export async function updateUserProfile(data: {
    firstName: string;
    lastName1: string;
    lastName2?: string;
    email: string;
}) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("No autorizado")

    const name = `${data.firstName} ${data.lastName1} ${data.lastName2 || ''}`.trim()

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            firstName: data.firstName,
            lastName1: data.lastName1,
            lastName2: data.lastName2,
            name,
            email: data.email
        }
    })

    return { success: true }
}
