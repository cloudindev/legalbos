"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getDirectoryContacts, getContactCategories } from "./actions"
import { PlusCircle, Search, MoreVertical, Building2, UserCircle2, Tag } from "lucide-react"
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

export default function DirectoryPage() {
    const router = useRouter()
    const [contacts, setContacts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL")

    useEffect(() => {
        async function load() {
            const [contactsData, categoriesData] = await Promise.all([
                getDirectoryContacts(),
                getContactCategories()
            ])
            setContacts(contactsData)
            setCategories(categoriesData)
            setLoading(false)
        }
        load()
    }, [])

    const normalizeSearch = (str: string | null | undefined) => {
        if (!str) return ""
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }

    const filteredContacts = contacts.filter(contact => {
        const isCompany = contact.type === "COMPANY"
        const displayName = isCompany ? contact.companyName : `${contact.firstName} ${contact.lastName ?? ""}`.trim()

        const searchNorm = normalizeSearch(searchTerm)

        const matchesSearch = (
            normalizeSearch(displayName).includes(searchNorm) ||
            normalizeSearch(contact.nifCif).includes(searchNorm) ||
            normalizeSearch(contact.email).includes(searchNorm) ||
            normalizeSearch(contact.category?.name).includes(searchNorm)
        )

        const matchesCategory = selectedCategory === "ALL" || contact.categoryId === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Agenda de Contactos</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Directorio de profesionales, proveedores y entidades relacionadas con el despacho.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/directory/new">
                        <Button className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold shadow-sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Añadir Contacto
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative flex-1 w-full sm:max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Buscar por nombre, documento o email..."
                        className="pl-9 bg-gray-50 border-gray-200 h-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="w-full sm:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full sm:w-auto h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#0B1528] focus:outline-none focus:ring-1 focus:ring-[#0B1528] font-medium"
                    >
                        <option value="ALL">Todas las categorías</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contacto / Empresa</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Datos Principales</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                                        Cargando agenda de contactos...
                                    </td>
                                </tr>
                            ) : contacts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                                        No hay contactos en el directorio aún.
                                    </td>
                                </tr>
                            ) : filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                                        No hay contactos que coincidan con la búsqueda.
                                    </td>
                                </tr>
                            ) : (
                                filteredContacts.map((contact) => {
                                    const isCompany = contact.type === "COMPANY"
                                    const displayName = isCompany ? contact.companyName : `${contact.firstName} ${contact.lastName ?? ""}`.trim()
                                    const displayEmail = contact.email || "Sin email"
                                    const displayPhone = contact.phone || contact.mobile || "Sin teléfono"
                                    const initials = isCompany
                                        ? contact.companyName?.slice(0, 2).toUpperCase()
                                        : `${contact.firstName?.charAt(0)}${contact.lastName?.charAt(0) || ''}`.toUpperCase()

                                    return (
                                        <tr
                                            key={contact.id}
                                            onClick={() => router.push(`/dashboard/directory/${contact.id}`)}
                                            className="hover:bg-gray-50 group cursor-pointer transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-bold">
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
                                                        <div className="text-xs text-gray-500 mt-0.5">{contact.nifCif || "Sin identificador"}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap relative z-10">
                                                {contact.category ? (
                                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                        <Tag className="mr-1 h-3 w-3" />
                                                        {contact.category.name}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10">
                                                        Sin categoría
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap relative z-10">
                                                <div className="text-sm text-gray-900 font-medium">{displayEmail}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{displayPhone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-indigo-700">
                                                            <MoreVertical className="h-5 w-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56">
                                                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/directory/${contact.id}`)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Ver Ficha
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/directory/${contact.id}`)}>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-red-600 focus:text-red-700 cursor-pointer"
                                                            onClick={async (e) => {
                                                                e.stopPropagation()
                                                                if (confirm('¿Eliminar contacto de la agenda?')) {
                                                                    try {
                                                                        const { deleteDirectoryContact } = await import('./actions')
                                                                        await deleteDirectoryContact(contact.id)
                                                                        setContacts(prev => prev.filter(c => c.id !== contact.id))
                                                                    } catch (err) {
                                                                        console.error(err)
                                                                        alert("Error al eliminar")
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Eliminar Contacto
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

// Memoria: Vista del directorio de contactos, similar a clientes pero filtrando por categoría de agenda. 
