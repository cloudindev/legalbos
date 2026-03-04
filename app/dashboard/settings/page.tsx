"use client"

import { useEffect, useState } from "react"
import { getTenantSettings, updateTenantSettings } from "./actions"
import { Settings, Save, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
    const [settings, setSettings] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Form Fiscal
    const [fiscalType, setFiscalType] = useState("COMPANY")
    const [fiscalName, setFiscalName] = useState("")
    const [taxId, setTaxId] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")

    useEffect(() => {
        async function load() {
            const data = await getTenantSettings()
            if (data) {
                setSettings(data)
                setFiscalType(data.fiscalType || "COMPANY")
                setFiscalName(data.fiscalName || "")
                setTaxId(data.taxId || "")
                setAddress(data.address || "")
                setCity(data.city || "")
                setPostalCode(data.postalCode || "")
                setCountry(data.country || "")
            }
            setLoading(false)
        }
        load()
    }, [])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        await updateTenantSettings({
            ...settings,
            fiscalType,
            fiscalName,
            taxId,
            address,
            city,
            postalCode,
            country
        })
        setSaving(false)
        alert("Ajustes guardados correctamente")
    }

    if (loading) return null

    return (
        <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="flex items-center gap-3 mb-8">
                <Settings className="h-8 w-8 text-[#0B1528]" />
                <h1 className="text-3xl font-extrabold text-[#0B1528] tracking-tight">Ajustes del Despacho</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSave} className="space-y-10">

                    {/* Sección Datos Fiscales */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                            <Building2 className="h-6 w-6 text-indigo-600" />
                            <h2 className="text-xl font-bold text-gray-900">Datos Fiscales y Facturación</h2>
                        </div>

                        <p className="text-sm text-gray-500 font-medium">
                            Completa los datos fiscales de tu despacho. Esta información se utilizará para la generación de facturas y notificaciones oficiales.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Entidad</label>
                                <select
                                    value={fiscalType}
                                    onChange={e => setFiscalType(e.target.value)}
                                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0B1528] focus:border-[#0B1528] transition-all font-bold text-gray-900"
                                >
                                    <option value="COMPANY">Empresa / Sociedad</option>
                                    <option value="INDIVIDUAL">Persona Física / Autónomo</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        {fiscalType === "COMPANY" ? "Razón Social" : "Nombre Completo"}
                                    </label>
                                    <Input value={fiscalName} onChange={e => setFiscalName(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        {fiscalType === "COMPANY" ? "CIF" : "NIF/NIE"}
                                    </label>
                                    <Input value={taxId} onChange={e => setTaxId(e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Dirección Fiscal completa</label>
                                <Input value={address} onChange={e => setAddress(e.target.value)} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Ciudad</label>
                                    <Input value={city} onChange={e => setCity(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Código Postal</label>
                                    <Input value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">País</label>
                                    <Input value={country} onChange={e => setCountry(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            disabled={saving}
                            className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold h-11 px-8 rounded-full shadow-sm"
                        >
                            {saving ? "Guardando..." : <><Save className="w-4 h-4 mr-2" /> Guardar Ajustes</>}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}
