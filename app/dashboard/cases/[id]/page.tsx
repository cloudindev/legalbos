"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { getCaseFileById, updateCaseFile, getCasePhases, addCaseAnnotation } from "../actions"
import { uploadDocumentAndProcess, getSignedDocumentUrl } from "../uploadActions"
import { ArrowLeft, Briefcase, CalendarDays, Clock, FileText, Scale, Users, MessageSquare, Paperclip, Send, Edit3, X, Check, FileIcon, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const ACTION_GROUPS = [
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

export default function CaseDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [caseFile, setCaseFile] = useState<any>(null)
    const [phases, setPhases] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Edit states
    const [isEditingDesc, setIsEditingDesc] = useState(false)
    const [descInput, setDescInput] = useState("")

    // Wall states
    const [newAnnotation, setNewAnnotation] = useState("")
    const [submittingAnnotation, setSubmittingAnnotation] = useState(false)
    const [actionType, setActionType] = useState("")
    const [attachedFile, setAttachedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [openingDoc, setOpeningDoc] = useState<string | null>(null)

    const handleOpenDocument = async (url: string) => {
        if (openingDoc === url) return;
        setOpeningDoc(url);
        try {
            const res = await getSignedDocumentUrl(url);
            if (res.success && res.url) {
                window.open(res.url, '_blank');
            } else {
                alert("No se pudo abrir el documento: " + res.error);
            }
        } catch (error) {
            console.error("Error opening document", error);
            alert("Error al abrir documento");
        } finally {
            setOpeningDoc(null);
        }
    }

    useEffect(() => {
        async function load() {
            if (params.id) {
                const [data, phs] = await Promise.all([
                    getCaseFileById(params.id as string),
                    getCasePhases()
                ])
                setCaseFile(data)
                setDescInput(data?.description || "")
                setPhases(phs)
            }
            setLoading(false)
        }
        load()
    }, [params.id])

    const handlePhaseChange = async (newPhaseId: string) => {
        if (!caseFile) return
        try {
            setCaseFile({ ...caseFile, phaseId: newPhaseId, phase: phases.find(p => p.id === newPhaseId) })
            await updateCaseFile(caseFile.id, { phaseId: newPhaseId })
        } catch (error) {
            console.error("Error updating phase", error)
        }
    }

    const handleSaveDesc = async () => {
        if (!caseFile) return
        try {
            await updateCaseFile(caseFile.id, { description: descInput })
            setCaseFile({ ...caseFile, description: descInput })
            setIsEditingDesc(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handlePostAnnotation = async (e: React.FormEvent) => {
        e.preventDefault()
        if ((!newAnnotation.trim() && !attachedFile) || submittingAnnotation) return

        setSubmittingAnnotation(true)

        try {
            if (attachedFile) {
                const formData = new FormData()
                formData.append('file', attachedFile)
                formData.append('caseFileId', caseFile.id)
                if (actionType) formData.append('type', actionType)
                if (newAnnotation.trim()) formData.append('annotationText', newAnnotation)
                // Usando un nuevo server action para esto
                const res = await uploadDocumentAndProcess(formData)
                if (!res.success) {
                    alert('Error subiendo documento: ' + res.error)
                }
            } else {
                const res = await addCaseAnnotation(caseFile.id, newAnnotation, actionType)
                if (!res.success) {
                    alert('Error guardando actuación: ' + res.error)
                }
            }

            setNewAnnotation("")
            setActionType("")
            setAttachedFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ""

            const updatedCase = await getCaseFileById(caseFile.id)
            setCaseFile(updatedCase)
        } catch (error) {
            console.error(error)
        } finally {
            setSubmittingAnnotation(false)
        }
    }

    const handleDeleteAnnotation = async (annotationId: string) => {
        if (!confirm("¿Estás seguro de que deseas eliminar esta actuación? Esta acción no se puede deshacer.")) return
        try {
            const { deleteCaseAnnotation } = await import("../actions")
            const res = await deleteCaseAnnotation(annotationId, caseFile.id)
            if (res.success) {
                const updatedCase = await getCaseFileById(caseFile.id)
                setCaseFile(updatedCase)
            } else {
                alert("Error eliminando actuación: " + res.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAttachedFile(e.target.files[0])
        }
    }

    if (loading) return null
    if (!caseFile) return <div className="p-8 text-center text-red-500 font-bold">Expediente no encontrado</div>

    const clientName = caseFile.client
        ? (caseFile.client?.type === 'COMPANY' ? caseFile.client?.companyName : `${caseFile.client?.firstName} ${caseFile.client?.lastName || ''}`)
        : "Sin Cliente"

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Context Breadcrumb */}
            <div className="flex items-center gap-2 pb-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 shrink-0" onClick={() => router.push('/dashboard/cases')}>
                    <ArrowLeft className="h-4 w-4 text-gray-500" />
                </Button>
                <span className="text-sm font-bold text-gray-400">Expedientes /</span>
                <span className="text-sm font-bold text-[#0B1528]">{caseFile.reference || "Sin ref."}</span>
            </div>

            {/* Header Dashboard */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-4 max-w-3xl flex-1">
                        <div className="flex flex-col gap-2 relative">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-extrabold text-[#0B1528] tracking-tight">{caseFile.title}</h1>
                                {caseFile.type && (
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                                        {caseFile.type.name}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <Scale className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-900 font-semibold">{clientName}</span>
                                    {caseFile.opposingParty && (
                                        <>
                                            <span className="text-gray-400 mx-1">vs</span>
                                            <span className="text-orange-700 font-semibold">{caseFile.opposingParty}</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <CalendarDays className="w-4 h-4" />
                                    Creado {new Date(caseFile.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        {/* Editable Description Section inside Header */}
                        <div className="mt-6 pt-6 border-t border-gray-100 relative group">
                            {isEditingDesc ? (
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Editando Hechos y Detalles</label>
                                    <textarea
                                        className="w-full min-h-[120px] p-4 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-0 focus:border-blue-500 resize-none font-medium"
                                        value={descInput}
                                        onChange={(e) => setDescInput(e.target.value)}
                                        placeholder="Escribe aquí los antecedentes, hechos, pretensiones o notas vitales del caso..."
                                        autoFocus
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => { setIsEditingDesc(false); setDescInput(caseFile.description || "") }}>
                                            <X className="w-4 h-4 mr-1" /> Cancelar
                                        </Button>
                                        <Button size="sm" onClick={handleSaveDesc} className="bg-[#0B1528] text-white">
                                            <Check className="w-4 h-4 mr-1" /> Guardar Cambios
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="p-4 bg-gray-50/50 hover:bg-blue-50/50 rounded-xl border border-transparent hover:border-blue-100 transition-colors cursor-text min-h-[100px]"
                                    onClick={() => setIsEditingDesc(true)}
                                >
                                    <div className="flex items-center justify-between mb-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <FileText className="w-3.5 h-3.5" /> Hechos / Pretensiones
                                        </h4>
                                        <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                                            <Edit3 className="w-3 h-3" /> Editar
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mt-1 font-medium">
                                        {caseFile.description || <span className="text-gray-400 italic font-normal">Pulsa aquí para añadir la descripción detallada del caso.</span>}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 min-w-[280px]">
                        {/* Dynamic Phase Selector */}
                        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" />
                                Fase Actual
                            </label>
                            <select
                                value={caseFile.phaseId || ""}
                                onChange={(e) => handlePhaseChange(e.target.value)}
                                className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B1528] focus:border-[#0B1528] cursor-pointer shadow-sm"
                            >
                                <option value="" disabled>Seleccionar Fase...</option>
                                {phases.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="actions" className="w-full">
                <TabsList className="w-full justify-start h-12 bg-transparent border-b border-gray-200 rounded-none px-0 mb-6 pb-0 space-x-6 overflow-x-auto">
                    <TabsTrigger value="actions" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0B1528] data-[state=active]:text-[#0B1528] rounded-none px-1 pb-3 pt-2 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Muro de Actuaciones
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0B1528] data-[state=active]:text-[#0B1528] rounded-none px-1 pb-3 pt-2 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Documentos ({caseFile.documents?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="economy" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0B1528] data-[state=active]:text-[#0B1528] rounded-none px-1 pb-3 pt-2 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Económico
                    </TabsTrigger>
                </TabsList>

                {/* Tab: Muro de Actuaciones (Wall) */}
                <TabsContent value="actions" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Feed Muro Central */}
                        <div className="lg:col-span-3 space-y-6">

                            {/* Input Actuación */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden focus-within:ring-2 focus-within:ring-[#0B1528]/20 transition-all">
                                <form onSubmit={handlePostAnnotation}>
                                    <div className="p-4 border-b border-gray-50 flex items-start gap-3">
                                        <div className="flex-1 space-y-3">
                                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                            {attachedFile && (
                                                <div className="flex items-center gap-2 p-2 bg-blue-50/50 rounded border border-blue-100 text-blue-700 text-sm font-semibold inline-flex w-fit max-w-full">
                                                    <FileIcon className="h-4 w-4 shrink-0" />
                                                    <span className="truncate">{attachedFile.name}</span>
                                                    <button type="button" onClick={() => setAttachedFile(null)} className="ml-2 text-blue-400 hover:text-blue-800"><X className="h-3 w-3" /></button>
                                                </div>
                                            )}
                                            <textarea
                                                value={newAnnotation}
                                                onChange={(e) => setNewAnnotation(e.target.value)}
                                                placeholder="Registra una nueva actuación, trámite, documento, etc..."
                                                className="w-full min-h-[90px] text-lg font-medium resize-none border-0 focus:ring-0 placeholder:text-gray-300 placeholder:font-normal text-gray-800"
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-gray-50/50 px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
                                        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                                            <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} className={`${attachedFile ? 'text-blue-600 bg-blue-50' : 'text-gray-400'} hover:text-blue-600 hover:bg-blue-50 rounded-full h-9 w-9 shrink-0`} title="Adjuntar documento (IA)">
                                                <Paperclip className="h-4 w-4" />
                                            </Button>
                                            <select
                                                value={actionType}
                                                onChange={(e) => setActionType(e.target.value)}
                                                className="h-9 px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B1528] focus:border-[#0B1528] cursor-pointer shadow-sm min-w-0 flex-1 truncate max-w-xs"
                                            >
                                                <option value="">Clasificación Opcional...</option>
                                                {ACTION_GROUPS.map((group, i) => (
                                                    <optgroup key={i} label={group.title}>
                                                        {group.items.map(item => <option key={item} value={item}>{item}</option>)}
                                                    </optgroup>
                                                ))}
                                            </select>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={(!newAnnotation.trim() && !attachedFile) || submittingAnnotation}
                                            className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold rounded-full px-6 shadow-sm shrink-0"
                                        >
                                            {submittingAnnotation ? "Enviando..." : (
                                                <><Send className="h-4 w-4 mr-2" /> Publicar Actuación</>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Timeline de Actuaciones */}
                            <div className="space-y-4">
                                {caseFile.annotations?.length > 0 ? (
                                    caseFile.annotations.map((note: any) => (
                                        <div key={note.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 p-6 flex gap-5 animate-in slide-in-from-bottom-2 duration-300">
                                            <div className="h-12 w-12 shrink-0 bg-blue-50 text-blue-700 rounded-full font-extrabold flex items-center justify-center shadow-inner border border-blue-100/50 text-lg">
                                                {note.author?.name?.slice(0, 2).toUpperCase() || <Users className="h-5 w-5" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-baseline justify-between mb-1.5 flex-wrap gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-extrabold text-[#0B1528] text-base">{note.author?.name || "Usuario Eliminado"}</span>
                                                        {note.type && (
                                                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold uppercase tracking-widest hidden sm:inline-block">
                                                                {note.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap bg-gray-50 px-2 py-1 rounded-md">
                                                            {new Date(note.createdAt).toLocaleString()}
                                                        </span>
                                                        {note.authorId === caseFile.currentUserId && (
                                                            <button
                                                                onClick={() => handleDeleteAnnotation(note.id)}
                                                                className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                                                                title="Eliminar actuación"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                {note.type && (
                                                    <div className="mb-2 sm:hidden inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold uppercase tracking-widest">
                                                        {note.type}
                                                    </div>
                                                )}
                                                <div className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed font-medium bg-gray-50 p-4 rounded-xl border border-gray-50">
                                                    {note.content.replace(/\*\*?Documento:.*?\*\*?\n*/g, '').replace('Resumen IA:', '✨ Resumen IA:')}
                                                </div>
                                                {note.documentUrl && (
                                                    <div
                                                        className={`mt-3 flex items-center gap-2 text-sm font-bold transition-colors w-fit ${openingDoc === note.documentUrl ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800 cursor-pointer'}`}
                                                        onClick={() => { if (openingDoc !== note.documentUrl) handleOpenDocument(note.documentUrl) }}
                                                    >
                                                        {openingDoc === note.documentUrl ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileIcon className="h-4 w-4" />}
                                                        {openingDoc === note.documentUrl ? "Abriendo..." : "Consultar documento"}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center flex flex-col items-center">
                                        <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                                            <MessageSquare className="h-8 w-8 text-gray-300" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Aún no hay actuaciones</h3>
                                        <p className="text-gray-500 mt-2 text-sm max-w-sm">
                                            El muro está vacío. Cuando tú o alguien del equipo registre un trámite o nota, aparecerá aquí como historial.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Widget Lateral Derecha */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Intervinientes Widget */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 sticky top-6">
                                <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2 uppercase tracking-wide">
                                    <Users className="w-4 h-4 text-[#0B1528]" />
                                    Intervinientes
                                </h3>

                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                        <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">Defensa</span>
                                        <div className="mt-1.5 text-sm font-bold text-gray-900">{clientName}</div>
                                        {caseFile.assignedUsers?.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-blue-100 flex gap-2 overflow-hidden items-center flex-wrap">
                                                {caseFile.assignedUsers.map((u: any) => (
                                                    <div key={u.id} className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-900 shadow-sm" title={u.name}>
                                                        {u.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100/50">
                                        <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest">Parte Contraria</span>
                                        <div className="mt-1.5 text-sm font-bold text-gray-900">{caseFile.opposingParty || "No identificada"}</div>
                                        {caseFile.opposingLawyer && (
                                            <div className="mt-3 pt-3 border-t border-orange-100/50 text-xs text-gray-600 space-y-1">
                                                <span className="font-extrabold text-gray-700 block text-[10px] uppercase">Letrado</span>
                                                <div className="font-medium">
                                                    {caseFile.opposingLawyer.firstName} {caseFile.opposingLawyer.lastName} <br />
                                                    <span className="text-gray-400">({caseFile.opposingLawyer.companyName})</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-20 text-center flex flex-col items-center">
                        <FileText className="h-16 w-16 text-gray-200 mb-6" />
                        <h3 className="text-xl font-bold text-gray-900">Gestor Documental</h3>
                        <p className="text-gray-500 mt-2 text-sm max-w-sm">
                            Este módulo está en construcción. Aquí podrás organizar las demandas, sentencias y pruebas.
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="economy" className="mt-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-20 text-center flex flex-col items-center">
                        <Briefcase className="h-16 w-16 text-gray-200 mb-6" />
                        <h3 className="text-xl font-bold text-gray-900">Módulo Económico</h3>
                        <p className="text-gray-500 mt-2 text-sm max-w-sm">
                            Próximamente podrás emitir minutas, registrar provisiones de fondos y suplidos directamente en este expediente.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

// Memoria: Componente de detalle de expediente reconstruido. 
// - Se integró la sección de `description` de la DB directamente en el Card de cabecera haciéndolo inlineeditable.
// - Se eliminó la pestaña "Resumen General" pasando a Tabs estilo Shadcn y priorizando el "Muro de Actuaciones".
// - El Action Form aprovecha `lucide-react` para adjuntos simulados y manda los mensajes a la tabla Annotation linkeado al caseFile.
