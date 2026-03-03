"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { getCaseFileById, updateCaseFile, getCasePhases, addCaseAnnotation } from "../actions"
import { ArrowLeft, Briefcase, CalendarDays, Clock, FileText, Scale, Users, MessageSquare, Paperclip, Send, Edit3, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
        if (!newAnnotation.trim() || submittingAnnotation) return

        setSubmittingAnnotation(true)
        const res = await addCaseAnnotation(caseFile.id, newAnnotation)
        if (res.success) {
            setNewAnnotation("")
            // Reload to get the new annotation
            const data = await getCaseFileById(caseFile.id)
            setCaseFile(data)
        }
        setSubmittingAnnotation(false)
    }

    if (loading) return null
    if (!caseFile) return <div className="p-8 text-center text-red-500 font-bold">Expediente no encontrado</div>

    const clientName = caseFile.client
        ? (caseFile.client.type === 'COMPANY' ? caseFile.client.companyName : `${caseFile.client.firstName} ${caseFile.client.lastName || ''}`)
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
                                    <div className="p-4 border-b border-gray-50">
                                        <textarea
                                            value={newAnnotation}
                                            onChange={(e) => setNewAnnotation(e.target.value)}
                                            placeholder="Registra una nueva actuación, trámite, correo enviado..."
                                            className="w-full min-h-[90px] text-lg font-medium resize-none border-0 focus:ring-0 placeholder:text-gray-300 placeholder:font-normal text-gray-800"
                                        />
                                    </div>
                                    <div className="bg-gray-50/50 px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full h-9 w-9">
                                                <Paperclip className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={!newAnnotation.trim() || submittingAnnotation}
                                            className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold rounded-full px-6 shadow-sm"
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
                                                {note.author.name?.slice(0, 2).toUpperCase() || <Users className="h-5 w-5" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-baseline justify-between mb-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-extrabold text-[#0B1528] text-base">{note.author.name}</span>
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap bg-gray-50 px-2 py-1 rounded-md">
                                                        {new Date(note.createdAt).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed mt-3 font-medium">
                                                    {note.content}
                                                </p>
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
