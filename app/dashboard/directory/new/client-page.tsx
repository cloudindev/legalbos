"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building2, UserCircle2, Save, FileText, MapPin, Tag } from "lucide-react"
import { createDirectoryContact } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ProvinceSelect } from "../../clients/new/province-select" // Reusing province select
import { CategorySelect } from "./category-select"

export default function NewDirectoryContactClientPage({ initialCategories }: { initialCategories: any[] }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>(initialCategories)
    const [clientType, setClientType] = useState<"INDIVIDUAL" | "COMPANY">("INDIVIDUAL")

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        nifCif: "",
        email: "",
        phone: "",
        mobile: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        country: "España",
        notes: "",
        categoryId: ""
    })



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleProvinceChange = (val: string) => {
        setFormData(prev => ({ ...prev, province: val }))
    }

    const handleCategoryAdded = (newCategory: any) => {
        setCategories(prev => [...prev, newCategory].sort((a, b) => a.name.localeCompare(b.name)))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const dataToSubmit = {
                type: clientType,
                nifCif: formData.nifCif,
                email: formData.email,
                phone: formData.phone,
                mobile: formData.mobile,
                address: formData.address,
                city: formData.city,
                province: formData.province,
                postalCode: formData.postalCode,
                country: formData.country,
                notes: formData.notes,
                categoryId: formData.categoryId || undefined,
                ...(clientType === "INDIVIDUAL" ? {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                } : {
                    companyName: formData.companyName,
                })
            }

            const newContact = await createDirectoryContact(dataToSubmit)
            // Redirect back to directory or to the detail page (when created)
            router.push(`/dashboard/directory`)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 shrink-0" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Button>
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Añadir Contacto a la Agenda</h2>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">
                        Registra profesionales, proveedores o entidades colaboradoras.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        onClick={() => setClientType("INDIVIDUAL")}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-between px-6 relative overflow-hidden h-16 ${clientType === "INDIVIDUAL" ? 'border-indigo-700 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-200 bg-white'}`}
                    >
                        {clientType === "INDIVIDUAL" && <div className="absolute top-0 inset-x-0 h-1 bg-indigo-700" />}
                        <span className={`font-bold text-lg ${clientType === "INDIVIDUAL" ? 'text-indigo-900' : 'text-gray-500'}`}>Persona Física</span>
                        <UserCircle2 className={`w-7 h-7 ${clientType === "INDIVIDUAL" ? 'text-indigo-700' : 'text-gray-400'}`} />
                    </div>

                    <div
                        onClick={() => setClientType("COMPANY")}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-between px-6 relative overflow-hidden h-16 ${clientType === "COMPANY" ? 'border-indigo-700 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-200 bg-white'}`}
                    >
                        {clientType === "COMPANY" && <div className="absolute top-0 inset-x-0 h-1 bg-indigo-700" />}
                        <span className={`font-bold text-lg ${clientType === "COMPANY" ? 'text-indigo-900' : 'text-gray-500'}`}>Empresa / Entidad</span>
                        <Building2 className={`w-7 h-7 ${clientType === "COMPANY" ? 'text-indigo-700' : 'text-gray-400'}`} />
                    </div>
                </div>

                <Card className="border-none shadow-sm shadow-gray-100/50 p-2 border-gray-100">
                    <CardContent className="p-6 space-y-10">

                        {/* Categoría */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-indigo-50 rounded-lg">
                                    <Tag className="w-5 h-5 text-indigo-700" />
                                </div>
                                <h3 className="text-xl font-extrabold text-indigo-950">Clasificación</h3>
                            </div>
                            <div className="max-w-md space-y-2">
                                <Label className="text-sm font-bold text-gray-700 ml-1">Categoría del Contacto</Label>
                                <CategorySelect
                                    categories={categories}
                                    selectedId={formData.categoryId}
                                    onChange={(id) => setFormData(prev => ({ ...prev, categoryId: id }))}
                                    onCategoryAdded={handleCategoryAdded}
                                />
                                <p className="text-xs text-gray-400 mt-1">Busca una categoría (ej: Procurador, Notario, IT) o escribe una nueva para crearla.</p>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 w-full" />

                        {/* Identidad */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-indigo-50 rounded-lg">
                                    <FileText className="w-5 h-5 text-indigo-700" />
                                </div>
                                <h3 className="text-xl font-extrabold text-indigo-950">Identidad</h3>
                            </div>

                            {clientType === "INDIVIDUAL" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700 ml-1">Nombre *</Label>
                                        <Input name="firstName" value={formData.firstName} onChange={handleChange} required className="h-11 bg-gray-50/50 focus:bg-white transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700 ml-1">Apellidos</Label>
                                        <Input name="lastName" value={formData.lastName} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700 ml-1">Razón Social o Entidad *</Label>
                                        <Input name="companyName" value={formData.companyName} onChange={handleChange} required className="h-11 bg-gray-50/50 focus:bg-white transition-colors" />
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">{clientType === "INDIVIDUAL" ? "DNI / NIF" : "CIF"}</Label>
                                    <Input name="nifCif" value={formData.nifCif} onChange={handleChange} className="h-11 bg-gray-50/50 uppercase tracking-widest focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">Email</Label>
                                    <Input type="email" name="email" value={formData.email} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" placeholder="correo@ejemplo.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">Teléfono Móvil</Label>
                                    <Input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" placeholder="+34 ..." />
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 w-full" />

                        {/* Localización */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-indigo-50 rounded-lg">
                                    <MapPin className="w-5 h-5 text-indigo-700" />
                                </div>
                                <h3 className="text-xl font-extrabold text-indigo-950">Localización</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">Dirección Postal</Label>
                                    <Input name="address" value={formData.address} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" placeholder="Calle, Número, Piso, Puerta..." />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                                <div className="space-y-2 md:col-span-1 lg:col-span-1">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">Ciudad / Localidad</Label>
                                    <Input name="city" value={formData.city} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-2 lg:col-span-1">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">Provincia</Label>
                                    <ProvinceSelect value={formData.province} onChange={handleProvinceChange} />
                                </div>
                                <div className="space-y-2 lg:col-span-1">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">Código Postal</Label>
                                    <Input name="postalCode" value={formData.postalCode} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-2 lg:col-span-1">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">País</Label>
                                    <Input name="country" value={formData.country} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="pt-6">
                            <Label className="text-sm font-bold text-gray-700 ml-1">Anotaciones Privadas</Label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={4}
                                className="mt-2 w-full rounded-md border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-700"
                                placeholder="Cualquier información adicional sobre el contacto..."
                            />
                        </div>

                    </CardContent>
                </Card>

                <div className="flex items-center justify-end gap-4 pt-6">
                    <Button type="button" variant="ghost" className="font-bold text-gray-500 hover:text-red-600 h-14 px-8" onClick={() => router.back()}>
                        Descartar
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold h-14 px-10 shadow-lg text-lg">
                        <Save className="w-5 h-5 mr-3" />
                        {loading ? "Guardando..." : "Crear Contacto"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
