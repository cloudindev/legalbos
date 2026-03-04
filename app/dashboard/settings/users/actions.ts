"use server"

import prisma from "@/lib/db/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function getTenantUsers() {
    const session = await auth()
    if (!session?.user?.tenantId) return []

    return prisma.user.findMany({
        where: { tenantId: session.user.tenantId },
        select: {
            id: true,
            email: true,
            name: true,
            firstName: true,
            lastName1: true,
            lastName2: true,
            role: true,
            createdAt: true
        },
        orderBy: { createdAt: 'desc' }
    })
}

export async function addTenantUser(data: {
    firstName: string;
    lastName1: string;
    lastName2?: string;
    email: string;
    passwordRaw: string;
}) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
    })

    if (existingUser) {
        throw new Error("El email ya está en uso")
    }

    const hashedPassword = await bcrypt.hash(data.passwordRaw, 10)

    await prisma.user.create({
        data: {
            firstName: data.firstName,
            lastName1: data.lastName1,
            lastName2: data.lastName2,
            name: `${data.firstName} ${data.lastName1} ${data.lastName2 || ''}`.trim(),
            email: data.email,
            passwordHash: hashedPassword,
            tenantId: session.user.tenantId,
            role: "LAWYER"
        }
    })

    revalidatePath("/dashboard/settings/users")
    return { success: true }
}
