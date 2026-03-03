"use server"

import prisma from "@/lib/db/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getTenantSettings() {
    const session = await auth()
    if (!session?.user?.tenantId) return null

    return prisma.tenant.findFirst({
        where: { id: session.user.tenantId },
        select: {
            id: true,
            name: true,
            claudeApiKey: true,
            aiEnabled: true
        }
    })
}

export async function updateAiSettings(data: { claudeApiKey: string | null; aiEnabled: boolean }) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    await prisma.tenant.update({
        where: { id: session.user.tenantId },
        data: {
            claudeApiKey: data.claudeApiKey || null,
            aiEnabled: data.aiEnabled
        }
    })

    revalidatePath("/dashboard/settings")
    return { success: true }
}
