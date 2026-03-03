"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getDirectoryContactById } from "../actions"
import { ArrowLeft, Building2, UserCircle2, Mail, Phone, MapPin, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DirectoryContactDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [contact, setContact] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            if (params.id) {
                const data = await getDirectoryContactById(params.id as string)
                setContact(data)
            }
            setLoading(false)
        }
        load()
    }, [params.id])

    if (loading) {
        return <div className="p-8 text-center text-gray-500 font-medium">Cargando detalles...</div>
    }

    if (!contact) {
        return (
            <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900">Contacto no encontrado</h3>
                <Button variant="link" onClick={() => router.push('/dashboard/directory')}>Volver a la agenda</Button>
            </div>
        )
    }

    const isCompany = contact.type === "COMPANY"
    const displayName = isCompany ? contact.companyName : `${contact.firstName} ${contact.lastName ?? ""}`.trim()
    const initials = isCompany
        ? contact.companyName?.slice(0, 2).toUpperCase()
        : `${contact.firstName?.charAt(0)}${contact.lastName?.charAt(0) || ''}`.toUpperCase()

    return (
        <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Header */}
            <div className="flex items-center gap-4 pb-6">
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 shrink-0" onClick={() => router.push('/dashboard/directory')}>
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                    <div className="h-24 w-24 shrink-0 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 text-3xl font-extrabold shadow-sm">
                        {initials || <UserCircle2 className="h-12 w-12" />}
                    </div>

                    <div className="flex-1 space-y-4 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold text-[#0B1528] tracking-tight">{displayName}</h1>

                                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 font-medium">
                                    <span className="flex items-center gap-1.5">
                                        {isCompany ? <Building2 className="w-4 h-4" /> : <UserCircle2 className="w-4 h-4" />}
                                        {isCompany ? 'Entidad' : 'Persona Física'}
                                    </span>
                                    <span>•</span>
                                    <span>ID: {contact.nifCif || "Sin identificar"}</span>
                                    {contact.category && (
                                        <>
                                            <span>•</span>
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                                                <Tag className="mr-1 h-3 w-3" />
                                                {contact.category.name}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <Button className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold w-full sm:w-auto">
                                Editar Contacto
                            </Button>
                        </div>

                        <div className="h-px bg-gray-100 my-6 w-full" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4 p-5 rounded-xl bg-gray-50/50 border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Contacto Directo</h3>

                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email Principal</p>
                                        <p className="text-base font-semibold text-[#0B1528] mt-0.5">{contact.email || "—"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Teléfono</p>
                                        <p className="text-base font-semibold text-[#0B1528] mt-0.5">
                                            {contact.phone || contact.mobile || "—"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 p-5 rounded-xl bg-gray-50/50 border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Localización</h3>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Dirección Completa</p>
                                        <p className="text-sm font-medium text-[#0B1528] mt-1 leading-relaxed">
                                            {contact.address ? (
                                                <>
                                                    {contact.address}<br />
                                                    {contact.city} {contact.province && `(${contact.province})`}<br />
                                                    {contact.postalCode} {contact.country}
                                                </>
                                            ) : "No hay dirección registrada."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {contact.notes && (
                            <div className="mt-8 p-6 rounded-xl bg-amber-50/50 border border-amber-100">
                                <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-3">Anotaciones Privadas</h3>
                                <p className="text-sm text-amber-800 whitespace-pre-wrap">{contact.notes}</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}
