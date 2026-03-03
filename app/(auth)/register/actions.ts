"use server"

import prisma from "@/lib/db/prisma"
import bcrypt from "bcryptjs"

export async function registerFirmAction(firmName: string, name: string, email: string, password: string) {
    if (!firmName || !name || !email || !password) {
        return { error: "Todos los campos son obligatorios" }
    }

    // Comprobar si existe el usuario
    const existing = await prisma.user.findUnique({
        where: { email }
    })

    if (existing) {
        return { error: "El correo electrónico ya está registrado" }
    }

    const passwordHash = await bcrypt.hash(password, 10)

    try {
        await prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: {
                    name: firmName,
                }
            })

            await tx.user.create({
                data: {
                    email,
                    name,
                    passwordHash,
                    role: 'SUPER_ADMIN',
                    tenantId: tenant.id
                }
            })
        })

        return { success: true }
    } catch (e: any) {
        console.error(e)
        return { error: "Error al crear la cuenta en la Base de Datos." }
    }
}
