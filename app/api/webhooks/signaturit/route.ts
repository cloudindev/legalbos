import { NextResponse } from "next/server"
import prisma from "@/lib/db/prisma"

export const dynamic = 'force-dynamic'

// Endpoint para recibir notificaciones desde el proveedor de firma (ej: Signaturit / DocuSign)
export async function POST(request: Request) {
    try {
        const signatureSecret = request.headers.get("x-signature-secret")

        // 1. Validar el webhook payload integrity (ejemplo estático)
        if (signatureSecret !== process.env.SIGNATURIT_WEBHOOK_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const payload = await request.json()
        const { documentId, status, tenantId } = payload // Estructura de ejemplo

        if (!documentId || !tenantId) {
            return NextResponse.json({ error: "Bad Request" }, { status: 400 })
        }

        // 2. Actualizar estado del documento (podría lanzar un AuditLog)
        // Usamos el tenantId como chequeo cruzado de seguridad.
        const updatedDoc = await prisma.document.update({
            where: { id: documentId, tenantId: tenantId },
            data: {
                // En una implementación real se cambiaría un status type
                // Aquí simulamos que se completó
            }
        })

        // 3. Registrar AuditLog
        await prisma.auditLog.create({
            data: {
                action: "SIGNATURE_COMPLETED",
                entity: "DOCUMENT",
                entityId: documentId,
                details: { provider: "SIGNATURIT", rawStatus: status },
                tenantId: tenantId
            }
        })

        return NextResponse.json({ success: true, doc: updatedDoc.id })

    } catch (error) {
        console.error("Webhook processing error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

// Memoria técnica: Implementación mock de webhook para provider externo
// Requerimiento MVP: Demostrar cómo se integrará firma digital de forma segura.
