"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getClients } from "./actions"
import { PlusCircle, Search, MoreVertical, Building2, UserCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Plus, Pencil, Trash2 } from "lucide-react"

export default function ClientsPage() {
    const router = useRouter()
    const [clients, setClients] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function load() {
            const data = await getClients()
            setClients(data)
            setLoading(false)
        }
        load()
    }, [])

    const normalizeSearch = (str: string | null | undefined) => {
        if (!str) return ""
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }

    const filteredClients = clients.filter(client => {
        const isCompany = client.type === "COMPANY"
        const displayName = isCompany ? client.companyName : `${client.firstName} ${client.lastName1} ${client.lastName2 ?? ""}`.trim()

        const searchNorm = normalizeSearch(searchTerm)

        return (
            normalizeSearch(displayName).includes(searchNorm) ||
            normalizeSearch(client.nifCif).includes(searchNorm) ||
            normalizeSearch(client.email).includes(searchNorm) ||
            normalizeSearch(client.tradeName).includes(searchNorm)
        )
    })

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Directorio de Clientes</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Gestiona los clientes de tu despacho, historiales y cuentas relacionadas.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/clients/new">
                        <Button className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold shadow-sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Añadir Cliente
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Buscar por nombre, NIF o empresa..."
                        className="pl-9 bg-gray-50 border-gray-200 h-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="font-bold border-gray-200">
                    Filtrar por tipo
                </Button>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Documento</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contacto</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                                        Cargando directorio de clientes...
                                    </td>
                                </tr>
                            ) : clients.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                                        No hay clientes que coincidan con la búsqueda.
                                    </td>
                                </tr>
                            ) : (
                                filteredClients.map((client) => {
                                    const isCompany = client.type === "COMPANY"
                                    const displayName = isCompany ? client.companyName : `${client.firstName} ${client.lastName1} ${client.lastName2 ?? ""}`.trim()
                                    const displayEmail = client.email || "Sin email"
                                    const displayPhone = client.phone || client.mobile || "Sin teléfono"
                                    const initials = isCompany
                                        ? client.companyName?.slice(0, 2).toUpperCase()
                                        : `${client.firstName?.charAt(0)}${client.lastName1?.charAt(0)}`.toUpperCase()

                                    return (
                                        <tr
                                            key={client.id}
                                            onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                                            className="hover:bg-gray-50 group cursor-pointer transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-blue-50 text-[#0B1528] font-bold">
                                                        {initials || <UserCircle2 className="h-5 w-5" />}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                                            {displayName}
                                                            {isCompany ? (
                                                                <Building2 className="h-3.5 w-3.5 text-gray-400" />
                                                            ) : (
                                                                <UserCircle2 className="h-3.5 w-3.5 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-0.5">Alta: {new Date(client.createdAt).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap relative z-10">
                                                <div className="text-sm text-gray-900 font-medium">{client.nifCif || "—"}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap relative z-10">
                                                <div className="text-sm text-gray-900 font-medium">{displayEmail}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{displayPhone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#0B1528]">
                                                            <MoreVertical className="h-5 w-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56">
                                                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/clients/${client.id}`)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Ver Ficha Completa
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Añadir Expediente
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Editar Datos
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600 focus:text-red-700">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Eliminar Cliente
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

// Memoria: Vista del listado de clientes optimizada para interactividad. La fila es clickable usando position relative en el enlace para no romper la tabla.
