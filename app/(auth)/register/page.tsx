"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { registerFirmAction } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Scale, Building2, UserCircle2 } from "lucide-react"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    // Form states
    const [firmName, setFirmName] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const res = await registerFirmAction(firmName, name, email, password)

        if (res.error) {
            setError(res.error)
            setLoading(false)
            return
        }

        // Auto Login
        const loginRes = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (!loginRes?.error) {
            router.push("/register/invite")
        } else {
            setError("Cuenta creada, pero hubo un error al iniciar sesión. Intenta acceder desde Login.")
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full">
            {/* Left side - Dark Theme Hero */}
            <div className="hidden lg:flex flex-col w-1/2 bg-[#0B1528] relative overflow-hidden px-14 py-16">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/80 to-[#0B1528] z-10 pointer-events-none" />
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />

                <div className="relative z-20">
                    <Link href="/" className="flex items-center gap-3 w-fit">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
                            <Scale className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white hover:text-gray-200">Legalbos</span>
                    </Link>
                </div>

                <div className="relative z-20 mt-auto pb-32 max-w-lg">
                    <h1 className="text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
                        Transforma tu<br /> Despacho en la<br /> Era Digital
                    </h1>
                    <p className="mt-8 text-lg text-blue-100/70 leading-relaxed font-medium">
                        Centraliza expedientes, automatiza minutas y fideliza a tus clientes. Todo desde una única plataforma multitenant.
                    </p>
                </div>

                <div className="relative z-20 mt-auto flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="grid grid-cols-2 gap-2 text-sm font-bold text-emerald-400">
                            <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-400"></div>Datos seguros</div>
                            <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-400"></div>Cloud ISO 27001</div>
                            <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-400"></div>LexNet Sync</div>
                            <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-400"></div>Acceso 24/7</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Register Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-8 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-md space-y-8 my-auto">
                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1528] text-white">
                                <Scale className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900">Legalbos</span>
                        </Link>
                    </div>

                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Crea tu Despacho</h2>
                        <p className="mt-2 text-sm text-gray-500 font-medium">
                            Comienza tu prueba gratuita de 14 días. Sin tarjeta.
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5 mt-8">
                        {/* Firm Details */}
                        <div className="space-y-2">
                            <Label htmlFor="firm" className="text-sm font-bold text-gray-700">Nombre del Despacho legal</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                                <Input
                                    id="firm"
                                    type="text"
                                    placeholder="Ej: Lexington Law Firm"
                                    className="pl-10 h-12 rounded-lg border-gray-200 shadow-sm focus-visible:ring-[#0B1528]"
                                    value={firmName}
                                    onChange={(e) => setFirmName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Admin Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-bold text-gray-700">Tu nombre completo</Label>
                            <div className="relative">
                                <UserCircle2 className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Marcus Sterling"
                                    className="pl-10 h-12 rounded-lg border-gray-200 shadow-sm focus-visible:ring-[#0B1528]"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-bold text-gray-700">Email Corporativo</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-3.5 text-gray-400 font-bold text-sm">@</span>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="counsel@firm.com"
                                    className="pl-9 h-12 rounded-lg border-gray-200 shadow-sm focus-visible:ring-[#0B1528]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-bold text-gray-700">Contraseña Administrador</Label>
                            <div className="relative">
                                <svg className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mínimo 8 caracteres"
                                    className="pl-10 h-12 rounded-lg border-gray-200 shadow-sm pr-10 focus-visible:ring-[#0B1528]"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-[#0B1528] hover:bg-slate-800 text-white font-bold rounded-lg shadow-sm text-base mt-4"
                        >
                            {loading ? "Creando Despacho..." : "Crear Despacho"}
                        </Button>

                        {error && <p className="text-sm font-semibold text-rose-500 text-center">{error}</p>}

                        <p className="text-center text-sm font-medium text-gray-500 pt-4 pb-2">
                            ¿Ya tienes una cuenta? <Link href="/login" className="font-bold text-[#0B1528] hover:underline">Inicia sesión</Link>
                        </p>
                    </form>

                    <div className="text-center text-xs font-medium text-gray-400 space-y-4 pt-10">
                        <p>
                            Al registrarte, aceptas nuestros <a href="#" className="hover:text-gray-600 underline">Términos de Servicio</a> y la <a href="#" className="hover:text-gray-600 underline">Política de Privacidad</a>.
                        </p>
                        <p>© 2024 Legalbos Software S.L.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Memoria: Reutilizado el componente Split View (dark theme) integrando campos requeridos para nuevo Tenant. Uso de lucide-react para UX.
