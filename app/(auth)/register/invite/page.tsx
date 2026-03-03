"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Scale, Plus, Trash2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InvitePage() {
    const router = useRouter()
    const [emails, setEmails] = useState<string[]>([""])
    const [loading, setLoading] = useState(false)

    const handleAddEmail = () => {
        setEmails([...emails, ""])
    }

    const handleRemoveEmail = (index: number) => {
        const newEmails = [...emails]
        newEmails.splice(index, 1)
        if (newEmails.length === 0) newEmails.push("")
        setEmails(newEmails)
    }

    const handleChangeEmail = (index: number, value: string) => {
        const newEmails = [...emails]
        newEmails[index] = value
        setEmails(newEmails)
    }

    const validEmailsCount = emails.filter(e => e.trim().includes("@")).length
    const totalUsers = validEmailsCount + 1 // +1 for the admin
    const requiresPaidPlan = totalUsers > 1

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            if (requiresPaidPlan) {
                router.push("/register/payment")
            } else {
                router.push("/dashboard")
            }
        }, 1000)
    }

    const handleSkip = () => {
        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center py-12 px-6">
            <div className="w-full max-w-4xl">
                <div className="flex items-center gap-3 justify-center mb-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1528] text-white">
                        <Scale className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[#0B1528]">Legalbos</span>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900">Invita a tu equipo</h1>
                    <p className="mt-2 text-gray-500 font-medium text-lg">
                        Legalbos es mejor en compañía. Invita a otros abogados de tu despacho para colaborar en los expedientes.
                    </p>
                </div>

                <form onSubmit={handleContinue}>
                    <Card className="border-none shadow-sm mb-10 overflow-hidden">
                        <div className="bg-white p-6 sm:p-10">
                            <Label className="text-sm font-bold text-gray-700 mb-4 block">Correos electrónicos de tu equipo</Label>

                            <div className="space-y-4">
                                {emails.map((email, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <Input
                                            type="email"
                                            placeholder="abogado@despacho.com"
                                            value={email}
                                            onChange={(e) => handleChangeEmail(index, e.target.value)}
                                            className="h-12 border-gray-200"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveEmail(index)}
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="mt-4 border-dashed border-2 font-bold text-[#0B1528] h-12 w-full max-w-xs"
                                onClick={handleAddEmail}
                            >
                                <Plus className="mr-2 h-4 w-4" /> Añadir otro correo
                            </Button>
                        </div>

                        {requiresPaidPlan && (
                            <div className="bg-blue-50/50 p-6 sm:p-10 border-t border-gray-100">
                                <h3 className="font-bold text-[#0B1528] mb-6 text-lg">Selecciona tu plan recomendado</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className={`p-6 border-2 rounded-xl bg-white ${totalUsers <= 5 ? "border-[#0B1528] shadow-md relative" : "border-gray-200 opacity-60"}`}>
                                        {totalUsers <= 5 && (
                                            <div className="absolute top-0 right-4 -translate-y-1/2 bg-[#0B1528] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                                                Plan Ideal
                                            </div>
                                        )}
                                        <span className="text-xs font-bold text-[#1c4ed8] uppercase tracking-wider mb-2 block">2 - 5 Abogados</span>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-4xl font-extrabold text-[#0B1528]">49,90€</span>
                                            <span className="text-gray-500 font-medium text-sm">/mes</span>
                                        </div>
                                        <ul className="space-y-3 text-sm font-medium text-gray-600">
                                            <li className="flex gap-2 items-center"><CheckCircle2 className="h-4 w-4 text-[#1c4ed8] shrink-0" /> Colaboración en tiempo real</li>
                                            <li className="flex gap-2 items-center"><CheckCircle2 className="h-4 w-4 text-[#1c4ed8] shrink-0" /> 100GB en la nube</li>
                                        </ul>
                                    </div>

                                    <div className={`p-6 border-2 rounded-xl bg-white ${totalUsers > 5 ? "border-[#0B1528] shadow-md relative" : "border-gray-200 opacity-60"}`}>
                                        {totalUsers > 5 && (
                                            <div className="absolute top-0 right-4 -translate-y-1/2 bg-[#0B1528] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                                                Plan Ideal
                                            </div>
                                        )}
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">6+ Abogados</span>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-4xl font-extrabold text-[#0B1528]">95€</span>
                                            <span className="text-gray-500 font-medium text-sm">/mes</span>
                                        </div>
                                        <ul className="space-y-3 text-sm font-medium text-gray-600">
                                            <li className="flex gap-2 items-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Licencias ilimitadas</li>
                                            <li className="flex gap-2 items-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Espacio ilimitado</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-8 h-12 bg-[#0B1528] hover:bg-slate-800 text-white font-bold rounded-lg shadow-sm text-base"
                        >
                            {loading ? "Procesando..." : requiresPaidPlan ? "Continuar a pago" : "Siguiente"}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleSkip}
                            className="w-full sm:w-auto px-8 h-12 font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-base"
                        >
                            Saltar y comenzar prueba gratis
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
