"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Briefcase, Users, FileText, Scale, UserCircle2 } from "lucide-react"
import { getCaseTypes, getFirmUsers, createCaseFile } from "../actions"
import { getDirectoryContacts } from "../../directory/actions"
import { getClients } from "../../clients/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

import { TypeSelect } from "./type-select"
import { ClientSelect } from "./client-select"
import { LawyerSelect } from "./lawyer-select"
import { UsersMultiSelect } from "./users-select"

// Client Form Modal (simulated inline for simplicity right now, ideally a Dialog)
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { createClient } from "../../clients/actions"

export default function NewCasePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    // Data lists
    const [clients, setClients] = useState<any[]>([])
    const [types, setTypes] = useState<any[]>([])
    const [directoryContacts, setDirectoryContacts] = useState<any[]>([])
    const [firmUsers, setFirmUsers] = useState<any[]>([])

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        reference: "",
        description: "",
        clientId: "",
        typeId: "",
        opposingParty: "",
        opposingLawyerId: null as string | null,
    })
    const [assignedUserIds, setAssignedUserIds] = useState<string[]>([])

    // Quick Create Client Modal
    const [isClientModalOpen, setIsClientModalOpen] = useState(false)
    const [newClientName, setNewClientName] = useState("")

    useEffect(() => {
        async function loadData() {
            try {
                const [clientsData, typesData, dirData, usersData] = await Promise.all([
                    getClients() || [],
                    getCaseTypes() || [],
                    getDirectoryContacts() || [],
                    getFirmUsers() || []
                ])
                setClients(clientsData)
                setTypes(typesData)
                setDirectoryContacts(dirData)

                // Exclude super admins from available asignees usually, or format it
                setFirmUsers(usersData)
                setLoading(false)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }
        loadData()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleCreateClientQuick = async () => {
        if (!newClientName) return
        try {
            // Simplified create, assuming default INDIVIDUAL
            const parts = newClientName.split(' ')
            const firstName = parts[0]
            const lastName = parts.slice(1).join(' ')

            const response = await createClient({
                type: "INDIVIDUAL",
                firstName,
                lastName: lastName || undefined
            })

            if (!response.success) {
                alert("Error creando cliente: " + response.error)
                return
            }

            if (response.data) {
                setClients(prev => [...prev, response.data])
                setFormData(prev => ({ ...prev, clientId: response.data.id }))
            }
            setIsClientModalOpen(false)
        } catch (error) {
            console.error(error)
            alert("Error de conexión al crear cliente rápido")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.clientId) {
            alert("Debes seleccionar un cliente titular del expediente.")
            return
        }

        setSubmitting(true)
        try {
            const response = await createCaseFile({
                ...formData,
                assignedUserIds
            })
            if (!response.success) {
                alert("Error creando expediente: " + response.error)
                setSubmitting(false)
                return
            }
            if (response.data?.id) {
                router.push(`/dashboard/cases/${response.data.id}`)
            } else {
                setSubmitting(false)
            }
        } catch (error) {
            console.error(error)
            alert("Error de conexión al abrir expediente")
            setSubmitting(false)
        }
    }

    if (loading) return null

    return (
        <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 shrink-0" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Button>
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Apertura de Expediente</h2>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">
                        Define los detalles, partes intervinientes y asigna el equipo del caso.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* 1. Datos Principales */}
                <Card className="border-none shadow-sm shadow-gray-100/50 p-2 border-gray-100">
                    <CardContent className="p-6 space-y-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Briefcase className="w-5 h-5 text-indigo-700" />
                            </div>
                            <h3 className="text-xl font-extrabold text-indigo-950">Datos del Asunto</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-sm font-bold text-gray-700 ml-1">Título / Descripción corta *</Label>
                                <Input name="title" value={formData.title} onChange={handleChange} required className="h-11 bg-gray-50/50 text-lg font-medium" placeholder="Ej: Divorcio Contencioso familia García" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-gray-700 ml-1">Referencia Interna (Nº Auto, Año)</Label>
                                <Input name="reference" value={formData.reference} onChange={handleChange} className="h-11 bg-gray-50/50" placeholder="Ej: 2026/0014" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-gray-700 ml-1">Jurisdicción / Tipo</Label>
                                <TypeSelect
                                    types={types}
                                    selectedId={formData.typeId}
                                    onChange={(id) => setFormData(p => ({ ...p, typeId: id }))}
                                    onTypeAdded={(t) => setTypes(prev => [...prev, t])}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-sm font-bold text-gray-700 ml-1">Detalles Adicionales</Label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full rounded-md border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-700"
                                    placeholder="Hechos, pretensiones preliminares..."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Partes Intervinientes */}
                <Card className="border-none shadow-sm shadow-gray-100/50 p-2 border-gray-100">
                    <CardContent className="p-6 space-y-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Scale className="w-5 h-5 text-indigo-700" />
                            </div>
                            <h3 className="text-xl font-extrabold text-indigo-950">Partes Intervinientes</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Nuestro Cliente */}
                            <div className="space-y-2 p-5 rounded-xl border border-indigo-100 bg-indigo-50/30">
                                <Label className="text-sm font-bold text-indigo-900 flex items-center gap-2"><UserCircle2 className="w-4 h-4" /> Nuestro Cliente *</Label>
                                <p className="text-xs text-gray-500 mb-2">Selecciona el cliente del despacho a quien defendemos.</p>
                                <ClientSelect
                                    clients={clients}
                                    selectedId={formData.clientId}
                                    onChange={(id) => setFormData(p => ({ ...p, clientId: id }))}
                                    onOpenCreateModal={(name) => {
                                        setNewClientName(name)
                                        setIsClientModalOpen(true)
                                    }}
                                />
                            </div>

                            {/* Parte Contraria */}
                            <div className="space-y-2 p-5 rounded-xl border border-orange-100 bg-orange-50/30">
                                <Label className="text-sm font-bold text-orange-900 flex items-center gap-2"><UserCircle2 className="w-4 h-4" /> Parte Contraria</Label>
                                <p className="text-xs text-gray-500 mb-2">Nombre de la persona o entidad opuesta.</p>
                                <Input name="opposingParty" value={formData.opposingParty} onChange={handleChange} className="h-11 bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500" placeholder="Ej: Banco Santander S.A." />

                                <div className="pt-4">
                                    <Label className="text-xs font-bold text-gray-700 mb-1 block">Abogado/Procurador Contrario</Label>
                                    <LawyerSelect
                                        contacts={directoryContacts}
                                        selectedId={formData.opposingLawyerId}
                                        onChange={(id) => setFormData(p => ({ ...p, opposingLawyerId: id }))}
                                    />
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* 3. Equipo */}
                <Card className="border-none shadow-sm shadow-gray-100/50 p-2 border-gray-100">
                    <CardContent className="p-6 space-y-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Users className="w-5 h-5 text-indigo-700" />
                            </div>
                            <h3 className="text-xl font-extrabold text-indigo-950">Equipo Asignado</h3>
                        </div>

                        <div className="max-w-xl space-y-2">
                            <Label className="text-sm font-bold text-gray-700 ml-1">Profesionales del Despacho</Label>
                            <UsersMultiSelect
                                users={firmUsers}
                                selectedIds={assignedUserIds}
                                onChange={setAssignedUserIds}
                            />
                            <p className="text-xs text-gray-500">Estos usuarios recibirán notificaciones y tendrán el expediente en su panel principal.</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-end gap-4 pt-4">
                    <Button type="button" variant="ghost" className="font-bold text-gray-500 hover:text-red-600 h-14 px-8" onClick={() => router.back()}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={submitting} className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold h-14 px-10 shadow-lg text-lg">
                        <Save className="w-5 h-5 mr-3" />
                        {submitting ? "Creando..." : "Abrir Expediente"}
                    </Button>
                </div>
            </form>

            <Dialog open={isClientModalOpen} onOpenChange={setIsClientModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Cliente Rápido</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Nombre / Razón Social</Label>
                            <Input value={newClientName} onChange={(e) => setNewClientName(e.target.value)} />
                        </div>
                        <p className="text-xs text-gray-500">Se creará un cliente básico. Podrás completar su DNI y datos bancarios más tarde desde su ficha.</p>
                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={() => setIsClientModalOpen(false)}>Cancelar</Button>
                            <Button onClick={handleCreateClientQuick} className="bg-[#0B1528] text-white">Vincular y Guardar</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}
