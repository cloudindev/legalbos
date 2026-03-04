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
            aiEnabled: true,
            fiscalType: true,
            fiscalName: true,
            taxId: true,
            address: true,
            city: true,
            postalCode: true,
            country: true
        }
    })
}

export async function updateTenantSettings(data: {
    claudeApiKey: string | null;
    aiEnabled: boolean;
    fiscalType: string;
    fiscalName: string | null;
    taxId: string | null;
    address: string | null;
    city: string | null;
    postalCode: string | null;
    country: string | null;
}) {
    const session = await auth()
    if (!session?.user?.tenantId) throw new Error("No autorizado")

    await prisma.tenant.update({
        where: { id: session.user.tenantId },
        data: {
            claudeApiKey: data.claudeApiKey || null,
            aiEnabled: data.aiEnabled,
            fiscalType: data.fiscalType,
            fiscalName: data.fiscalName || null,
            taxId: data.taxId || null,
            address: data.address || null,
            city: data.city || null,
            postalCode: data.postalCode || null,
            country: data.country || null,
        }
    })

    revalidatePath("/dashboard/settings")
    return { success: true }
}
