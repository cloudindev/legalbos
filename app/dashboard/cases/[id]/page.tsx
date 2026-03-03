"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getCaseFileById, updateCaseFile, getCasePhases } from "../actions"
import { ArrowLeft, Briefcase, CalendarDays, Clock, FileText, Scale, Users, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CaseDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [caseFile, setCaseFile] = useState<any>(null)
    const [phases, setPhases] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            if (params.id) {
                const [data, phs] = await Promise.all([
                    getCaseFileById(params.id as string),
                    getCasePhases()
                ])
                setCaseFile(data)
                setPhases(phs)
            }
            setLoading(false)
        }
        load()
    }, [params.id])

    const handlePhaseChange = async (newPhaseId: string) => {
        if (!caseFile) return
        try {
            // Optimistic update
            setCaseFile({ ...caseFile, phaseId: newPhaseId, phase: phases.find(p => p.id === newPhaseId) })
            await updateCaseFile(caseFile.id, { phaseId: newPhaseId })
        } catch (error) {
            console.error("Error updating phase", error)
        }
    }

    if (loading) return <div className="p-8 text-center">Cargando expediente...</div>
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
                <span className="text-sm font-bold text-indigo-700">{caseFile.reference || "Sin ref."}</span>
            </div>

            {/* Header Dashboard */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-extrabold text-[#0B1528] tracking-tight">{caseFile.title}</h1>
                            {caseFile.type && (
                                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                                    {caseFile.type.name}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-gray-600 font-medium">
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

                        {caseFile.description && (
                            <p className="text-sm text-gray-500 mt-4 leading-relaxed line-clamp-2">
                                {caseFile.description}
                            </p>
                        )}
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
                                className="w-full h-10 px-3 py-2 bg-white border border-indigo-200 rounded-lg text-sm font-bold text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer shadow-sm"
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

            {/* Quick Stats or Tabs */}
            <div className="flex border-b border-gray-200 gap-8 overflow-x-auto">
                <button className="border-b-2 border-indigo-700 text-indigo-700 font-bold py-4 px-1 text-sm whitespace-nowrap">Resumen General</button>
                <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium py-4 px-1 text-sm whitespace-nowrap">Documentos (0)</button>
                <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium py-4 px-1 text-sm whitespace-nowrap">Actuaciones</button>
                <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium py-4 px-1 text-sm whitespace-nowrap">Económico</button>
            </div>

            {/* Resumen View Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-600" />
                                Detalle Completo
                            </h3>
                            <Button variant="outline" size="sm">Editar Info</Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase">Hechos / Pretensiones</h4>
                                <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{caseFile.description || "No nay hechos relatados."}</p>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for timeline */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-indigo-600" />
                            Últimas Actuaciones
                        </h3>
                        <div className="text-sm text-gray-500 italic py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            Aún no hay hitos registrados en este expediente.
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Intervinientes Widget */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Users className="w-5 h-5 text-indigo-600" />
                            Intervinientes
                        </h3>

                        <div className="space-y-4">
                            <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                                <span className="text-xs font-bold text-indigo-600 uppercase">Defensa (Nosotros)</span>
                                <div className="mt-2 text-sm font-semibold text-gray-900">{clientName}</div>
                                {caseFile.assignedUsers?.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-indigo-100/50 flex -space-x-1.5 overflow-hidden">
                                        {caseFile.assignedUsers.map((u: any) => (
                                            <div key={u.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-indigo-50 bg-indigo-200 flex items-center justify-center text-[9px] font-bold text-indigo-900" title={u.name}>
                                                {u.name.substring(0, 2).toUpperCase()}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-3 bg-orange-50/50 rounded-lg border border-orange-100/50">
                                <span className="text-xs font-bold text-orange-600 uppercase">Parte Contraria</span>
                                <div className="mt-2 text-sm font-semibold text-gray-900">{caseFile.opposingParty || "No identificada"}</div>
                                {caseFile.opposingLawyer && (
                                    <div className="mt-2 pt-2 border-t border-orange-100/50 text-xs text-gray-600">
                                        <span className="font-semibold block mb-0.5">Letrado C.</span>
                                        {caseFile.opposingLawyer.firstName} {caseFile.opposingLawyer.lastName} ({caseFile.opposingLawyer.companyName})
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
