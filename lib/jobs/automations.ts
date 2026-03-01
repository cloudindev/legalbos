import { Queue, Worker, Job } from "bullmq"
import prisma from "@/lib/db/prisma"

const connection = {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
}

// 1. Instanciamos la cola de integraciones o tareas repetitivas
export const automationsQueue = new Queue("automations", { connection })

// 2. Definimos el Worker que procesará las tareas asíncronas
const worker = new Worker("automations", async (job: Job) => {
    const { type, payload } = job.data

    console.log(`[BullMQ Worker] Ejecutando Job ${job.id} de tipo ${type}`)

    switch (type) {
        case "SEND_WHATSAPP_REMINDER":
            // Ejemplo: Llamada a Meta / Twilio API
            // await twilioClient.messages.create(...)
            break;

        case "SYNC_LEXNET_NOTIFICATIONS":
            // Ejemplo: Llamada a un microservicio en Python para leer certificados o scraping
            // const notifications = await microService.getPending()
            break;

        case "AUTO_GENERATE_DOCUMENT":
            // Generar template merge
            await prisma.auditLog.create({
                data: {
                    action: "AUTO_DOC_GENERATED",
                    entity: "CASEFILE",
                    entityId: payload.caseFileId,
                    tenantId: payload.tenantId,
                }
            })
            break;

        default:
            console.warn(`[BullMQ Worker] Job type desconocido: ${type}`)
    }
}, { connection })

// Event listeners para telemetría
worker.on("completed", (job) => {
    console.log(`[BullMQ] Tarea completada con éxito: ${job.id}`)
})

worker.on("failed", (job, err) => {
    console.error(`[BullMQ] Falló la tarea ${job?.id} con error: ${err.message}`)
})

// Memoria técnica:
// Aquí se define el core de las automatizaciones de Legalbos.
// Desacopla tareas largas (ej. Generación de PDFs complejos o sincronización de correos IMAP) de las requests HTTP.
