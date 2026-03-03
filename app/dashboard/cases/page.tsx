"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PlusCircle, Search, LayoutList, Columns, Briefcase, Filter, CalendarDays } from "lucide-react"
import { getCaseFiles, getCasePhases } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CasesPage() {
    const router = useRouter()
    const [cases, setCases] = useState<any[]>([])
    const [phases, setPhases] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function load() {
            const [dataCases, dataPhases] = await Promise.all([
                getCaseFiles(),
                getCasePhases()
            ])
            setCases(dataCases)
            setPhases(dataPhases)
            setLoading(false)
        }
        load()
    }, [])

    const filteredCases = cases.filter(c => {
        const term = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const t = c.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const ref = (c.reference || "").toLowerCase()
        const clientName = `${c.client?.firstName} ${c.client?.lastName || ''}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const compName = (c.client?.companyName || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        return t.includes(term) || ref.includes(term) || clientName.includes(term) || compName.includes(term)
    })

    return (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-8 w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Expedientes</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Gestiona los casos, monitoriza las fases y coordina a tu equipo legal.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1 mr-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 px-3 rounded-md ${viewMode === 'kanban' ? 'bg-white shadow-sm font-bold text-indigo-700' : 'text-gray-500 hover:text-gray-900'}`}
                            onClick={() => setViewMode("kanban")}
                        >
                            <Columns className="w-4 h-4 mr-1.5" />
                            Kanban
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 px-3 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm font-bold text-indigo-700' : 'text-gray-500 hover:text-gray-900'}`}
                            onClick={() => setViewMode("list")}
                        >
                            <LayoutList className="w-4 h-4 mr-1.5" />
                            Lista
                        </Button>
                    </div>

                    <Link href="/dashboard/cases/new">
                        <Button className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold shadow-sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Abrir Expediente
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative flex-1 w-full sm:max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Buscar por título, referencia o cliente..."
                        className="pl-9 bg-gray-50 border-gray-200 h-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="h-10 text-gray-600 border-gray-200">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros Avanzados
                </Button>
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-gray-500 font-medium"></div>
                </div>
            ) : viewMode === "list" ? (
                // LIST VIEW
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Expediente</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente Titular</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fase & Tipo</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Equipo</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredCases.map((c) => (
                                <tr key={c.id} onClick={() => router.push(`/dashboard/cases/${c.id}`)} className="hover:bg-gray-50 cursor-pointer transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{c.title}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{c.reference || "Sin Ref."}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {c.client ? (c.client.type === 'COMPANY' ? c.client.companyName : `${c.client.firstName} ${c.client.lastName || ''}`) : "Sin Cliente"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-1 block w-max">
                                            {c.phase ? c.phase.name : "Sin Fase"}
                                        </span>
                                        <div className="text-xs text-gray-500">{c.type ? c.type.name : "Sin Jurisdicción"}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex -space-x-2 overflow-hidden">
                                            {c.assignedUsers && c.assignedUsers.map((u: any) => (
                                                <div key={u.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-800" title={u.name}>
                                                    {u.name.substring(0, 2).toUpperCase()}
                                                </div>
                                            ))}
                                            {(!c.assignedUsers || c.assignedUsers.length === 0) && (
                                                <span className="text-xs text-gray-400 italic">No asignado</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredCases.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        No se encontraron expedientes con los filtros actuales.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                // KANBAN VIEW
                <div className="flex-1 overflow-x-auto pb-4 pt-2">
                    <div className="flex gap-6 min-w-max h-full">
                        {phases.map((phase) => {
                            const columnCases = filteredCases.filter(c => c.phaseId === phase.id)
                            return (
                                <div key={phase.id} className="w-80 flex flex-col h-full max-h-[calc(100vh-250px)]">
                                    <div className="flex items-center justify-between mb-3 px-1">
                                        <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">{phase.name}</h3>
                                        <span className="bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full text-xs font-bold">{columnCases.length}</span>
                                    </div>

                                    <div className="flex-1 bg-gray-50/50 border border-gray-100 rounded-xl p-3 overflow-y-auto space-y-3 shadow-inner">
                                        {columnCases.map(c => (
                                            <div
                                                key={c.id}
                                                onClick={() => router.push(`/dashboard/cases/${c.id}`)}
                                                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                                                        {c.reference || "SIN REF"}
                                                    </span>
                                                    {c.type && <span className="text-[10px] text-gray-400 font-medium">{c.type.name}</span>}
                                                </div>
                                                <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-indigo-700 transition-colors">{c.title}</h4>

                                                <div className="mt-3 flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                                        <Briefcase className="w-3 h-3" />
                                                    </div>
                                                    <span className="text-xs text-gray-600 font-medium truncate">
                                                        {c.client ? (c.client.type === 'COMPANY' ? c.client.companyName : `${c.client.firstName} ${c.client.lastName || ''}`) : "Sin Cliente"}
                                                    </span>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center text-gray-400 text-xs gap-1">
                                                        <CalendarDays className="w-3.5 h-3.5" />
                                                        {new Date(c.createdAt).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex -space-x-1.5 overflow-hidden">
                                                        {c.assignedUsers && c.assignedUsers.slice(0, 3).map((u: any) => (
                                                            <div key={u.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-800" title={u.name}>
                                                                {u.name.substring(0, 2).toUpperCase()}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {columnCases.length === 0 && (
                                            <div className="h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400 font-medium">
                                                Arrastra expedientes aquí
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                        {/* Columna para los no categorizados o sin fase */}
                        <div className="w-80 flex flex-col h-full max-h-[calc(100vh-250px)]">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Sin Fase Asignada</h3>
                                <span className="bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full text-xs font-bold">
                                    {filteredCases.filter(c => !c.phaseId).length}
                                </span>
                            </div>
                            <div className="flex-1 bg-gray-50/50 border border-gray-100 rounded-xl p-3 overflow-y-auto space-y-3 shadow-inner">
                                {filteredCases.filter(c => !c.phaseId).map(c => (
                                    <div
                                        key={c.id}
                                        onClick={() => router.push(`/dashboard/cases/${c.id}`)}
                                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                                                {c.reference || "SIN REF"}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-indigo-700 transition-colors">{c.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
