"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db/prisma"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import Anthropic from "@anthropic-ai/sdk"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

function getSupabase() {
    if (!supabaseUrl || !supabaseKey) return null
    return createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false }
    })
}

const ACTION_GROUPS = [
    { title: "Actuaciones de apertura y alta", items: ["Apertura del expediente", "Alta de cliente", "Alta de parte contraria", "Asignación de abogado responsable", "Alta de procurador", "Clasificación del tipo de asunto", "Carga de documentación inicial", "Firma de hoja de encargo"] },
    { title: "Actuaciones de análisis jurídico", items: ["Revisión de documentación", "Estudio de viabilidad", "Análisis de riesgos", "Consulta normativa", "Búsqueda de jurisprudencia", "Elaboración de estrategia", "Reunión interna de valoración"] },
    { title: "Actuaciones de comunicación con el cliente", items: ["Llamada con cliente", "Reunión presencial", "Videollamada", "Envío de email informativo", "Solicitud de documentación al cliente", "Envío de propuesta de actuación", "Confirmación de instrucciones del cliente", "Comunicación de novedades del expediente"] },
    { title: "Actuaciones documentales", items: ["Subida de documentos", "Descarga de resoluciones", "Escaneo de pruebas", "Clasificación documental", "Redacción de escritos", "Revisión de contratos", "Preparación de anexos", "Generación de informes jurídicos", "Emisión de minuta u hoja de encargo", "Preparación de poderes o autorizaciones"] },
    { title: "Actuaciones extrajudiciales", items: ["Requerimiento amistoso", "Envío de burofax", "Reclamación extrajudicial", "Negociación con la parte contraria", "Mediación", "Acto de conciliación", "Propuesta de acuerdo", "Revisión o firma de acuerdo transaccional"] },
    { title: "Actuaciones judiciales o procesales", items: ["Presentación de demanda", "Presentación de denuncia o querella", "Contestación a demanda", "Presentación de escritos de trámite", "Subsanación de defectos", "Presentación de pruebas", "Impugnación de pruebas", "Personación en procedimiento", "Solicitud de medidas cautelares", "Contestación a requerimientos del juzgado", "Preparación de interrogatorios", "Preparación de testigos", "Preparación de periciales"] },
    { title: "Actuaciones de seguimiento procesal", items: ["Recepción de notificación", "Control de plazo", "Señalamiento de vista", "Suspensión de juicio", "Cambio de fecha", "Recepción de diligencia", "Recepción de decreto", "Recepción de auto", "Recepción de sentencia", "Registro de vencimientos", "Recordatorio de actuación pendiente"] },
    { title: "Actuaciones en juicio o comparecencia", items: ["Asistencia a audiencia previa", "Asistencia a juicio", "Comparecencia judicial", "Declaración de parte", "Intervención de testigos", "Ratificación de perito", "Conclusiones", "Registro del resultado de la vista"] },
    { title: "Actuaciones de recursos", items: ["Análisis de sentencia", "Reunión con cliente para valorar recurso", "Preparación de recurso", "Presentación de apelación", "Oposición a recurso", "Seguimiento del recurso", "Resolución del recurso"] },
    { title: "Actuaciones de ejecución", items: ["Solicitud de ejecución", "Requerimiento de pago", "Averiguación patrimonial", "Embargo", "Oposición a ejecución", "Liquidación de intereses", "Seguimiento del cumplimiento", "Archivo por satisfacción o insolvencia"] },
    { title: "Actuaciones económicas y administrativas", items: ["Emisión de presupuesto", "Aprobación de presupuesto", "Emisión de factura", "Registro de provisión de fondos", "Control de pagos", "Reclamación de impago", "Liquidación final", "Cierre económico del expediente"] },
    { title: "Actuaciones de cierre", items: ["Cierre jurídico del asunto", "Archivo del expediente", "Entrega de documentación al cliente", "Valoración final", "Registro de resultado", "Cierre administrativo", "Cierre definitivo"] }
]

const ALL_ACTIONS = ACTION_GROUPS.flatMap(g => g.items)

export async function uploadDocumentAndProcess(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) return { success: false, error: "No autorizado" }

    const file = formData.get('file') as File
    const caseFileId = formData.get('caseFileId') as string
    const typeOverride = formData.get('type') as string | null

    if (!file || !caseFileId) {
        return { success: false, error: "Faltan datos" }
    }

    try {
        // Tenant info y settings IA
        const tenant = await prisma.tenant.findUnique({
            where: { id: session.user.tenantId }
        }) as any

        if (!tenant) return { success: false, error: "Tenant no encontrado" }

        // Upload a Supabase (Bucket: tenantId o único global. Usaremos uno global llamado 'documents' con path tenantId/...)
        // Si queremos un bucket por tenant: `const bucket = tenant.id`
        // Como Supabase tiene límites en la creación dinámica de buckets (max 100), es mejor un único bucket.
        // Pero el usuario pidió: "cada tenant tendrá un bucket". Crearemos o usaremos el bucket "tenant-id".

        const supabase = getSupabase()
        if (!supabase) {
            return { success: false, error: "Servicio de almacenamiento (Supabase) no configurado en el servidor." }
        }

        // Check if bucket exists, if not create
        const bucketName = `tenant-${tenant.id}`
        const { data: buckets } = await supabase.storage.listBuckets()
        if (!buckets?.find(b => b.name === bucketName)) {
            await supabase.storage.createBucket(bucketName, { public: false })
        }

        const fileBuffer = await file.arrayBuffer()
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')
        const filePath = `cases/${caseFileId}/${Date.now()}-${safeName}`

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(filePath, fileBuffer, { contentType: file.type })

        if (uploadError) {
            console.error("Supabase error:", uploadError)
            return { success: false, error: "Error subiendo archivo a Supabase" }
        }

        const { data: signedData } = await supabase.storage.from(bucketName).createSignedUrl(filePath, 3600)
        const signedUrl = signedData?.signedUrl || ""

        let finalContent = `Archivo introducido: ${file.name}`
        let finalType = typeOverride || "Subida de documentos"

        // IA Procesamiento 
        if (tenant.aiEnabled && tenant.claudeApiKey && file.type === "application/pdf") {
            try {
                const anthropic = new Anthropic({ apiKey: tenant.claudeApiKey })
                // Extract text from PDF using pdf-parse
                const pdfParseData = await require('pdf-parse')(Buffer.from(fileBuffer))
                const pdfText = pdfParseData.text || ""

                // Limit text to roughly 40,000 characters to prevent huge token costs while still capturing the essence of the document
                const truncatedText = pdfText.substring(0, 40000)

                const prompt = `Analiza el siguiente documento legal y realiza dos cosas:
1. Clasifícalo ÚNICAMENTE en una de las siguientes categorías exactas: ${ALL_ACTIONS.map(a => `"${a}"`).join(", ")}.
2. Haz un resumen del contenido en un párrafo de 5 a 9 líneas como máximo.
Responde en este formato exacto:
CATEGORIA: [La categoría]
RESUMEN: [El resumen]

--- CONTENIDO DEL DOCUMENTO ---
${truncatedText}
--- FIN DEL DOCUMENTO ---`

                const msg = await anthropic.messages.create({
                    model: "claude-3-5-sonnet-20240620",
                    max_tokens: 500,
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                })

                const textOutput = msg.content[0].type === 'text' ? msg.content[0].text : ''
                const catMatch = textOutput.match(/CATEGORIA:\s*(.+)/i)
                const sumMatch = textOutput.match(/RESUMEN:\s*([\s\S]+)/i)

                if (catMatch && catMatch[1]) {
                    const foundType = catMatch[1].trim()
                    if (ALL_ACTIONS.includes(foundType)) {
                        finalType = foundType
                    }
                }

                if (sumMatch && sumMatch[1]) {
                    finalContent = `**Documento: ${file.name}**\n\nResumen IA:\n${sumMatch[1].trim()}`
                }

            } catch (e: any) {
                console.error("Claude AI Error:", e)
                finalContent = `Archivo adjunto: ${file.name} (Error IA: ${e.message})`
            }
        }

        // Save annotation and document record
        const doc = await prisma.document.create({
            data: {
                name: file.name,
                url: filePath,
                size: file.size,
                mimetype: file.type,
                tenantId: tenant.id,
                caseFileId: caseFileId
            }
        })

        const annData: any = {
            content: finalContent,
            type: finalType,
            caseFileId,
            authorId: session.user.id,
            documentUrl: filePath
        }

        await prisma.annotation.create({
            data: annData
        })

        revalidatePath(`/dashboard/cases/${caseFileId}`)
        return { success: true }
    } catch (globalE: any) {
        console.error("Critical Upload Error:", globalE)
        return { success: false, error: "Server Exception: " + globalE.message }
    }
}
