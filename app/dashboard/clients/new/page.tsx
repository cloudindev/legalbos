"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building2, UserCircle2, Save, FileText, MapPin } from "lucide-react"
import { createClient } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ProvinceSelect } from "./province-select"

export default function NewClientPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [clientType, setClientType] = useState<"INDIVIDUAL" | "COMPANY">("INDIVIDUAL")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName1: "",
        lastName2: "",
        companyName: "",
        tradeName: "",
        nifCif: "",
        email: "",
        phone: "",
        mobile: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        country: "España"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleProvinceChange = (val: string) => {
        setFormData(prev => ({ ...prev, province: val }))
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
                ...(clientType === "INDIVIDUAL" ? {
                    firstName: formData.firstName,
                    lastName1: formData.lastName1,
                    lastName2: formData.lastName2,
                } : {
                    companyName: formData.companyName,
                    tradeName: formData.tradeName
                })
            }

            const newClient = await createClient(dataToSubmit)
            router.push(`/dashboard/clients/${newClient.id}`)
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
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Añadir Nuevo Cliente</h2>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">
                        Selecciona el tipo fiscal y completa los datos del expediente.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Type Selection - Horizontal with icons on right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        onClick={() => setClientType("INDIVIDUAL")}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-between px-6 relative overflow-hidden h-16 ${clientType === "INDIVIDUAL" ? 'border-[#0B1528] bg-blue-50/30' : 'border-gray-200 hover:border-blue-200 bg-white'}`}
                    >
                        {clientType === "INDIVIDUAL" && <div className="absolute top-0 inset-x-0 h-1 bg-[#0B1528]" />}
                        <span className={`font-bold text-lg ${clientType === "INDIVIDUAL" ? 'text-[#0B1528]' : 'text-gray-500'}`}>Persona Física</span>
                        <UserCircle2 className={`w-7 h-7 ${clientType === "INDIVIDUAL" ? 'text-[#0B1528]' : 'text-gray-400'}`} />
                    </div>

                    <div
                        onClick={() => setClientType("COMPANY")}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-between px-6 relative overflow-hidden h-16 ${clientType === "COMPANY" ? 'border-[#0B1528] bg-blue-50/30' : 'border-gray-200 hover:border-blue-200 bg-white'}`}
                    >
                        {clientType === "COMPANY" && <div className="absolute top-0 inset-x-0 h-1 bg-[#0B1528]" />}
                        <span className={`font-bold text-lg ${clientType === "COMPANY" ? 'text-[#0B1528]' : 'text-gray-500'}`}>Empresa / Entidad</span>
                        <Building2 className={`w-7 h-7 ${clientType === "COMPANY" ? 'text-[#0B1528]' : 'text-gray-400'}`} />
                    </div>
                </div>

                <Card className="border-none shadow-sm shadow-gray-100/50 p-2 border-gray-100">
                    <CardContent className="p-6 space-y-10">
                        {/* Section: Identidad */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <FileText className="w-5 h-5 text-[#0B1528]" />
                                </div>
                                <h3 className="text-xl font-extrabold text-[#0B1528]">Identificación Fiscal</h3>
                            </div>

                            {clientType === "INDIVIDUAL" ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700 ml-1">Nombre *</Label>
                                        <Input name="firstName" value={formData.firstName} onChange={handleChange} required className="h-11 bg-gray-50/50 focus:bg-white transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700 ml-1">Primer Apellido *</Label>
                                        <Input name="lastName1" value={formData.lastName1} onChange={handleChange} required className="h-11 bg-gray-50/50 focus:bg-white transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700 ml-1">Segundo Apellido</Label>
                                        <Input name="lastName2" value={formData.lastName2} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700 ml-1">Razón Social *</Label>
                                        <Input name="companyName" value={formData.companyName} onChange={handleChange} required className="h-11 bg-gray-50/50 focus:bg-white transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700 ml-1">Nombre Comercial</Label>
                                        <Input name="tradeName" value={formData.tradeName} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" placeholder="Nombre de marca..." />
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">{clientType === "INDIVIDUAL" ? "DNI / NIE" : "CIF"} *</Label>
                                    <Input name="nifCif" value={formData.nifCif} onChange={handleChange} required className="h-11 bg-gray-50/50 uppercase tracking-widest focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">Email Principal</Label>
                                    <Input type="email" name="email" value={formData.email} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" placeholder="correo@ejemplo.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">Teléfono Móvil</Label>
                                    <Input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" placeholder="+34 ..." />
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 w-full" />

                        {/* Section: Dirección */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <MapPin className="w-5 h-5 text-[#0B1528]" />
                                </div>
                                <h3 className="text-xl font-extrabold text-[#0B1528]">Localización</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 ml-1">Dirección Postal</Label>
                                    <Input name="address" value={formData.address} onChange={handleChange} className="h-11 bg-gray-50/50 focus:bg-white transition-colors" placeholder="Calle, Número, Piso, Puerta..." />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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

                    </CardContent>
                </Card>

                <div className="flex items-center justify-end gap-4 pt-6">
                    <Button type="button" variant="ghost" className="font-bold text-gray-500 hover:text-red-600 h-14 px-8" onClick={() => router.back()}>
                        Descartar
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold h-14 px-10 shadow-lg text-lg">
                        <Save className="w-5 h-5 mr-3" />
                        {loading ? "Registrando..." : "Dar de alta cliente"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
