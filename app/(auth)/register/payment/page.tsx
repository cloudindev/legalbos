"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Scale, CreditCard, Lock, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            router.push("/dashboard")
        }, 1500)
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center py-12 px-6">
            <div className="w-full max-w-5xl">
                <div className="flex items-center gap-3 justify-center mb-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1528] text-white">
                        <Scale className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[#0B1528]">Legalbos</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start mt-8">
                    {/* Resumen del Plan */}
                    <div className="space-y-6">
                        <div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Paso 3 de 3</span>
                            <h1 className="text-3xl font-extrabold text-gray-900">Finaliza tu suscripción</h1>
                            <p className="mt-2 text-gray-500 font-medium text-lg">
                                Estás activando el Plan de Despacho (Equipos). Sin compromisos, cancela cuando quieras.
                            </p>
                        </div>

                        <Card className="border-2 border-[#0B1528]/10 shadow-sm bg-white p-6 rounded-2xl">
                            <h3 className="font-bold text-[#0B1528] mb-6 text-xl">Resumen de la suscripción</h3>

                            <div className="space-y-4 text-sm font-medium">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Plan de Equipos (2 - 5 Abogados)</span>
                                    <span className="text-gray-900">49,90€</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Descuento Promocional (Early Bird)</span>
                                    <span className="text-emerald-500">-10,00€</span>
                                </div>
                                <div className="h-px bg-gray-100 w-full my-4"></div>
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span className="text-gray-900">Total al mes</span>
                                    <span className="text-[#0B1528]">39,90€</span>
                                </div>
                            </div>

                            <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-lg flex gap-3">
                                <ShieldCheck className="w-6 h-6 shrink-0 text-blue-600" />
                                <div className="text-sm">
                                    <p className="font-bold mb-1">Pagos seguros con cifrado de grado bancario.</p>
                                    <p className="opacity-80">Nos asociamos con Stripe para garantizar la seguridad de tus transacciones. Legalbos nunca almacena los datos de tu tarjeta.</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Payment Form */}
                    <Card className="border-none shadow-xl bg-white p-8 sm:p-10 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-[#0B1528]" />

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Detalles de pago</h3>
                            <p className="text-sm text-gray-500 font-medium">Todos los cobros se realizan en EUR.</p>
                        </div>

                        <form onSubmit={handlePayment} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-gray-700">Nombre en la tarjeta</Label>
                                <Input
                                    className="h-12 border-gray-200"
                                    placeholder="Ej. Marcus Sterling"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-gray-700">Número de tarjeta</Label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <Input
                                        className="h-12 border-gray-200 pl-10 tracking-widest font-mono"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        required
                                    />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="absolute right-3 top-3.5 h-5 opacity-50" alt="Card" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700">Expira</Label>
                                    <Input
                                        className="h-12 border-gray-200"
                                        placeholder="MM/AA"
                                        maxLength={5}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700">CVC</Label>
                                    <div className="relative">
                                        <Lock className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            className="h-12 border-gray-200 pr-10"
                                            placeholder="123"
                                            maxLength={4}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-[#0B1528] hover:bg-slate-800 text-white font-bold rounded-lg shadow-sm text-lg mt-4 flex items-center justify-center gap-2 group"
                            >
                                {loading ? "Procesando pago seguro..." : "Suscribirse y comenzar"}
                                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </Button>

                            <p className="text-center text-xs text-gray-400 font-medium">Esta es una simulación. No se realizará ningún cargo real.</p>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}
