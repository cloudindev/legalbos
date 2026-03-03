"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
    ArrowLeft,
    Building2,
    UserCircle2,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Landmark,
    Contact as ContactIcon,
    MessageSquare,
    PlusCircle,
    Plus,
    FileText,
    Download,
    Upload,
    MoreHorizontal,
    Check
} from "lucide-react"
import { getClientById, addContact, addBankAccount, addAnnotation, addClientDocument } from "../actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ClientDetailsPage() {
    const params = useParams()
    const router = useRouter()

    const [client, setClient] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [newAnnotation, setNewAnnotation] = useState("")

    // Modals State
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)
    const [isIBANModalOpen, setIsIBANModalOpen] = useState(false)
    const [isSEPAModalOpen, setIsSEPAModalOpen] = useState(false)

    // Form States
    const [contactForm, setContactForm] = useState({ firstName: "", lastName: "", email: "", phone: "", jobTitle: "" })
    const [ibanForm, setIbanForm] = useState({ iban: "", bankName: "", swift: "", isDefault: true })
    const [sepaForm, setSepaForm] = useState({ name: "Mandato SEPA Firmado", file: null as any })

    useEffect(() => {
        if (params.id) {
            fetchClient()
        }
    }, [params.id])

    const fetchClient = async () => {
        setLoading(true)
        const data = await getClientById(params.id as string)
        if (data) setClient(data)
        setLoading(false)
    }

    if (loading) {
        return null
    }

    if (!client) {
        return <div className="p-8 text-center text-red-500 font-bold">Cliente no encontrado.</div>
    }

    const isCompany = client.type === "COMPANY"
    const displayName = isCompany ? client.companyName : `${client.firstName} ${client.lastName1} ${client.lastName2 ?? ""}`.trim()
    const initials = isCompany
        ? client.companyName?.slice(0, 2).toUpperCase()
        : `${client.firstName?.charAt(0)}${client.lastName1?.charAt(0)}`.toUpperCase()

    const handleAnnotationSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newAnnotation.trim()) return

        await addAnnotation(client.id, newAnnotation)
        setNewAnnotation("")
        fetchClient()
    }

    const handleAddContact = async () => {
        await addContact(client.id, contactForm)
        setIsContactModalOpen(false)
        setContactForm({ firstName: "", lastName: "", email: "", phone: "", jobTitle: "" })
        fetchClient()
    }

    const handleAddIBAN = async () => {
        await addBankAccount(client.id, ibanForm)
        setIsIBANModalOpen(false)
        setIbanForm({ iban: "", bankName: "", swift: "", isDefault: true })
        fetchClient()
    }

    const handleAddSEPA = async () => {
        // Simulación de subir documento
        await addClientDocument(client.id, {
            name: sepaForm.name,
            url: "#", // Simulado
            size: 1024,
            mimetype: "application/pdf"
        })
        setIsSEPAModalOpen(false)
        fetchClient()
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100 shrink-0" onClick={() => router.push("/dashboard/clients")}>
                        <ArrowLeft className="h-5 w-5 text-gray-500" />
                    </Button>
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 shrink-0 flex items-center justify-center rounded-xl bg-[#0B1528] text-white font-extrabold text-xl shadow-sm">
                            {initials || <UserCircle2 className="h-7 w-7" />}
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
                                {client.tradeName || displayName}
                                {isCompany ? (
                                    <Building2 className="h-4 w-4 text-emerald-600 ml-1" />
                                ) : (
                                    <UserCircle2 className="h-4 w-4 text-emerald-600 ml-1" />
                                )}
                            </h2>
                            <p className="text-sm font-bold text-gray-500 mt-0.5 uppercase tracking-widest flex items-center gap-2">
                                {isCompany ? `CIF: ${client.nifCif || "Pendiente"}` : `NIF: ${client.nifCif || "Pendiente"}`}
                                <span className="h-1 w-1 rounded-full bg-gray-300 inline-block"></span>
                                Alta: {new Date(client.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-gray-200 text-gray-700 font-bold hover:bg-gray-50">
                        Editar Cliente
                    </Button>
                    <Button className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold shadow-sm" onClick={() => router.push("/dashboard/cases/new")}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir Expediente
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-gray-900">{client.caseFiles?.length || 0}</span>
                    <span className="text-xs font-bold text-gray-500 tracking-wider uppercase mt-1">Expedientes</span>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-emerald-600">0.00€</span>
                    <span className="text-xs font-bold text-gray-500 tracking-wider uppercase mt-1">Facturado Anual</span>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-gray-900">{client.contacts?.length || 0}</span>
                    <span className="text-xs font-bold text-gray-500 tracking-wider uppercase mt-1">Contactos</span>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-gray-900">{client.bankAccounts?.length || 0}</span>
                    <span className="text-xs font-bold text-gray-500 tracking-wider uppercase mt-1">Facturación</span>
                </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="info" className="w-full">
                <TabsList className="w-full justify-start h-12 bg-transparent border-b border-gray-200 rounded-none px-0 mb-6 pb-0 space-x-6 overflow-x-auto">
                    <TabsTrigger value="info" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0B1528] data-[state=active]:text-[#0B1528] rounded-none px-1 pb-3 pt-2 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Datos Generales
                    </TabsTrigger>
                    <TabsTrigger value="contacts" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0B1528] data-[state=active]:text-[#0B1528] rounded-none px-1 pb-3 pt-2 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Contactos
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0B1528] data-[state=active]:text-[#0B1528] rounded-none px-1 pb-3 pt-2 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Datos de Facturación
                    </TabsTrigger>
                    <TabsTrigger value="cases" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0B1528] data-[state=active]:text-[#0B1528] rounded-none px-1 pb-3 pt-2 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Expedientes
                    </TabsTrigger>
                    <TabsTrigger value="annotations" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0B1528] data-[state=active]:text-[#0B1528] rounded-none px-1 pb-3 pt-2 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Muro de Anotaciones
                    </TabsTrigger>
                </TabsList>

                {/* Tab: Info General */}
                <TabsContent value="info" className="mt-0">
                    <Card className="border-gray-100 shadow-sm overflow-hidden bg-white">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                                <div className="p-8 space-y-6">
                                    <h3 className="text-lg font-bold text-[#0B1528] border-b border-gray-100 pb-2 mb-4">Información de Contacto</h3>

                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 shrink-0 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Principal</p>
                                            <p className="font-medium text-gray-900 mt-0.5">{client.email || "No especificado"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 shrink-0 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Teléfono / Móvil</p>
                                            <p className="font-medium text-gray-900 mt-0.5">{client.mobile || client.phone || "No especificado"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 space-y-6">
                                    <h3 className="text-lg font-bold text-[#0B1528] border-b border-gray-100 pb-2 mb-4">Ubicación Fiscal</h3>

                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 shrink-0 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dirección</p>
                                            <div className="font-medium text-gray-900 mt-0.5 space-y-1">
                                                <p>{client.address || "Dirección no especificada"}</p>
                                                <p>{client.city || ""}{client.province ? `, ${client.province}` : ""}</p>
                                                <p>{client.postalCode ? `${client.postalCode}` : ""}</p>
                                                <p>{client.country || "España"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Contactos */}
                <TabsContent value="contacts" className="mt-0">
                    <Card className="border-gray-100 shadow-sm bg-white">
                        <div className="p-6 flex items-center justify-between border-b border-gray-100">
                            <h3 className="text-xl font-bold text-[#0B1528]">Agenda de Contactos</h3>
                            <Button variant="outline" size="sm" className="font-bold bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100" onClick={() => setIsContactModalOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" /> Añadir Contacto
                            </Button>
                        </div>
                        <CardContent className="p-0">
                            {client.contacts && client.contacts.length > 0 ? (
                                <ul className="divide-y divide-gray-100">
                                    {client.contacts.map((contact: any) => (
                                        <li key={contact.id} className="p-6 hover:bg-gray-50 flex items-center justify-between transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-full bg-[#0B1528]/5 text-[#0B1528] flex items-center justify-center font-extrabold text-sm">
                                                    {contact.firstName.charAt(0)}{contact.lastName?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-lg">{contact.firstName} {contact.lastName}</p>
                                                    <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mt-0.5">{contact.jobTitle || "Representante"}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="hidden sm:flex flex-col items-end">
                                                    <span className="text-sm font-medium text-gray-600">{contact.email}</span>
                                                    <span className="text-sm text-gray-400 font-mono">{contact.phone}</span>
                                                </div>
                                                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-gray-600">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-20 text-center text-gray-400 font-medium flex flex-col items-center">
                                    <ContactIcon className="h-16 w-16 text-gray-100 mb-4" />
                                    <p className="text-lg">No hay contactos vinculados.</p>
                                    <p className="text-sm text-gray-300 mt-2">Registra personas de contacto para este cliente empresa.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Facturación */}
                <TabsContent value="billing" className="mt-0">
                    <Card className="border-gray-100 shadow-sm bg-white">
                        <div className="p-6 flex items-center justify-between border-b border-gray-100">
                            <h3 className="text-xl font-bold text-[#0B1528]">Cuentas y Mandatos</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="bg-[#0B1528] text-white font-bold">
                                        <Plus className="mr-2 h-4 w-4" /> Añadir Facturación
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem onClick={() => setIsIBANModalOpen(true)}>
                                        <Landmark className="mr-2 h-4 w-4" /> Añadir Cuenta IBAN
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setIsSEPAModalOpen(true)}>
                                        <FileText className="mr-2 h-4 w-4" /> Adjuntar Mandato SEPA
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                                <div className="p-6 space-y-4">
                                    <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">Cuentas Bancarias</h4>
                                    {client.bankAccounts && client.bankAccounts.length > 0 ? (
                                        <ul className="space-y-4">
                                            {client.bankAccounts.map((b: any) => (
                                                <li key={b.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center justify-between group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 shrink-0 bg-white text-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                                                            <Landmark className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 font-mono tracking-wider">{b.iban}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{b.bankName || "Entidad Bancaria"} {b.isDefault && "• PRINCIPAL"}</p>
                                                        </div>
                                                    </div>
                                                    {b.isDefault && <Check className="h-4 w-4 text-emerald-500" />}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="py-10 text-center text-gray-300 text-sm">Sin cuentas registradas.</div>
                                    )}
                                </div>
                                <div className="p-6 space-y-4">
                                    <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">Mandatos SEPA</h4>
                                    {client.documents?.filter((d: any) => d.name.toLowerCase().includes("sepa")).length > 0 ? (
                                        <ul className="space-y-4">
                                            {client.documents.filter((d: any) => d.name.toLowerCase().includes("sepa")).map((d: any) => (
                                                <li key={d.id} className="p-4 rounded-xl border border-blue-100 bg-blue-50/20 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 shrink-0 bg-white text-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                                                            <FileText className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900">{d.name}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Firmado el {new Date(d.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="text-blue-500">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="py-10 text-center text-gray-300 text-sm">Sin mandatos firmados.</div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Anotaciones Muro */}
                <TabsContent value="annotations" className="mt-0">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Feed */}
                        <div className="flex-1 space-y-6">
                            <Card className="border-gray-100 shadow-sm border-2 bg-white rounded-2xl overflow-hidden">
                                <CardContent className="p-4">
                                    <form onSubmit={handleAnnotationSubmit} className="flex flex-col gap-3">
                                        <textarea
                                            value={newAnnotation}
                                            onChange={(e) => setNewAnnotation(e.target.value)}
                                            placeholder="Escribe una anotación o nota rápida sobre el cliente..."
                                            className="w-full min-h-[120px] border-0 focus:ring-0 p-2 text-gray-800 resize-none font-medium placeholder:font-normal placeholder:text-gray-400"
                                        />
                                        <div className="flex justify-between items-center bg-gray-50/50 p-4 -m-4 mt-0 rounded-b-xl border-t border-gray-100">
                                            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                                                Visible solo para el despacho
                                            </div>
                                            <Button type="submit" size="sm" className="bg-[#0B1528] text-white font-bold px-8 h-10 shadow-md">Publicar Nota</Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>

                            <div className="space-y-4">
                                {client.annotations?.map((note: any) => (
                                    <Card key={note.id} className="border-none shadow-sm shadow-gray-200/30 bg-white rounded-xl">
                                        <CardContent className="p-6 flex gap-4">
                                            <div className="h-10 w-10 shrink-0 bg-slate-100 text-slate-800 rounded-full font-bold flex items-center justify-center shadow-inner">
                                                {note.author.name?.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-extrabold text-[#0B1528] text-sm">{note.author.name}</span>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                                                        {new Date(note.createdAt).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed bg-gray-50/80 p-4 rounded-lg">
                                                    {note.content}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Tab: Expedientes */}
                <TabsContent value="cases" className="mt-0">
                    <Card className="border-gray-100 shadow-sm bg-white">
                        <div className="p-6 flex items-center justify-between border-b border-gray-100">
                            <h3 className="text-xl font-bold text-[#0B1528]">Expedientes Vinculados</h3>
                            <Button variant="outline" size="sm" className="font-bold bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100" onClick={() => router.push("/dashboard/cases/new")}>
                                <Plus className="mr-2 h-4 w-4" /> Nuevo Expediente
                            </Button>
                        </div>
                        <CardContent className="p-0">
                            {client.caseFiles && client.caseFiles.length > 0 ? (
                                <ul className="divide-y divide-gray-100">
                                    {client.caseFiles.map((c: any) => (
                                        <li key={c.id} className="p-6 hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between transition-colors cursor-pointer group" onClick={() => router.push(`/dashboard/cases/${c.id}`)}>
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                                                    <Briefcase className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{c.title || "Sin título"}</p>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                                                        Ref: {c.reference || "N/A"} • Creado el {new Date(c.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-4 sm:mt-0 flex items-center gap-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${c.status === "OPEN" ? "bg-emerald-100 text-emerald-700" :
                                                    c.status === "CLOSED" ? "bg-gray-100 text-gray-700" :
                                                        "bg-amber-100 text-amber-700"
                                                    }`}>
                                                    {c.status === "OPEN" ? "Activo" : c.status === "CLOSED" ? "Cerrado" : c.status}
                                                </span>
                                                <Button variant="ghost" size="icon" className="text-gray-300 group-hover:text-[#0B1528] transition-colors">
                                                    <ArrowLeft className="h-5 w-5 rotate-180" />
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-20 text-center text-gray-400 font-medium flex flex-col items-center">
                                    <Briefcase className="h-20 w-20 text-gray-100 mb-6" />
                                    <p className="text-xl">Expedientes del Cliente</p>
                                    <p className="text-sm text-gray-300 mt-2">Aquí aparecerá el historial de casos activos y cerrados.</p>
                                    <Button className="mt-6 bg-[#0B1528]" onClick={() => router.push("/dashboard/cases/new")}>Nuevo Expediente</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Modals */}

            {/* Modal: Añadir Contacto */}
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Añadir Contacto</DialogTitle>
                        <DialogDescription>
                            Registra a una persona responsable o de contacto para este cliente.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nombre *</Label>
                                <Input value={contactForm.firstName} onChange={e => setContactForm({ ...contactForm, firstName: e.target.value })} placeholder="Ej: Juan" />
                            </div>
                            <div className="space-y-2">
                                <Label>Apellidos</Label>
                                <Input value={contactForm.lastName} onChange={e => setContactForm({ ...contactForm, lastName: e.target.value })} placeholder="Ej: Pérez" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Cargo / Puesto</Label>
                            <Input value={contactForm.jobTitle} onChange={e => setContactForm({ ...contactForm, jobTitle: e.target.value })} placeholder="Ej: Gerente" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} placeholder="juan@empresa.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>Teléfono</Label>
                                <Input value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} placeholder="600000000" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsContactModalOpen(false)}>Cancelar</Button>
                        <Button className="bg-[#0B1528]" onClick={handleAddContact}>Guardar Contacto</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal: Añadir IBAN */}
            <Dialog open={isIBANModalOpen} onOpenChange={setIsIBANModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Datos Bancarios</DialogTitle>
                        <DialogDescription>Introduce la cuenta bancaria para cobros y facturación.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Código IBAN *</Label>
                            <Input value={ibanForm.iban} onChange={e => setIbanForm({ ...ibanForm, iban: e.target.value })} placeholder="ES00 0000 ..." />
                        </div>
                        <div className="space-y-2">
                            <Label>Entidad / Banco</Label>
                            <Input value={ibanForm.bankName} onChange={e => setIbanForm({ ...ibanForm, bankName: e.target.value })} placeholder="Ej: BBVA, Santander..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsIBANModalOpen(false)}>Cancelar</Button>
                        <Button className="bg-[#0B1528]" onClick={handleAddIBAN}>Vincular Cuenta</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal: Adjuntar SEPA */}
            <Dialog open={isSEPAModalOpen} onOpenChange={setIsSEPAModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Mandato SEPA</DialogTitle>
                        <DialogDescription>Adjunta el documento SEPA firmado por el cliente.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-8">
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
                            <Upload className="h-10 w-10 text-gray-300 group-hover:text-blue-500 mb-4 transition-colors" />
                            <p className="font-bold text-gray-500">Haz click para seleccionar archivo</p>
                            <p className="text-xs text-gray-400 mt-1">PDF, JPG o PNG (máx. 5MB)</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Nombre del documento</Label>
                            <Input value={sepaForm.name} onChange={e => setSepaForm({ ...sepaForm, name: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSEPAModalOpen(false)}>Cancelar</Button>
                        <Button className="bg-[#0B1528]" onClick={handleAddSEPA}>Subir Mandato</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}
