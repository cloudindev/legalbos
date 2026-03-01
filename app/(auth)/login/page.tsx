"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next-navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Scale } from "lucide-react"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("counsel@firm.com")
    const [password, setPassword] = useState("password123")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (res?.error) {
                setError("Credenciales incorrectas")
            } else {
                window.location.href = "/dashboard"
            }
        } catch (err) {
            setError("Error en el servidor")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full">
            {/* Left side - Dark Theme Hero */}
            <div className="hidden lg:flex flex-col w-1/2 bg-[#0B1528] relative overflow-hidden px-14 py-16">
                {/* Soft gradient overlay to simulate the bookshelf darkness */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/80 to-[#0B1528] z-10 pointer-events-none" />
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />

                <div className="relative z-20">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm">
                            <Scale className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Legal CRM</span>
                    </div>
                </div>

                <div className="relative z-20 mt-auto pb-32 max-w-lg">
                    <h1 className="text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
                        Empowering <br /> Justice with <br /> Modern <br /> Management
                    </h1>
                    <p className="mt-8 text-lg text-blue-100/70 leading-relaxed font-medium">
                        Streamline your legal practice with our all-in-one suite for case management, client intake, and automated scheduling.
                    </p>
                </div>

                <div className="relative z-20 mt-auto flex items-center gap-4">
                    <div className="flex -space-x-3">
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0B1528]" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0B1528]" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0B1528]" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </div>
                    <p className="text-sm font-medium text-blue-100/60">Trusted by 5,000+ law firms worldwide</p>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1c4ed8] text-white">
                            <Scale className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">Legal CRM</span>
                    </div>

                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-sm text-gray-500 font-medium">
                            Enter your credentials to access your dashboard
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6 mt-10">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-bold text-gray-700">Email or Username</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-400 font-medium">@</span>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="e.g. counsel@firm.com"
                                    className="pl-9 h-12 rounded-lg border-gray-200 shadow-sm focus-visible:ring-[#1c4ed8]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-bold text-gray-700">Password</Label>
                                <a href="#" className="text-xs font-bold text-[#1c4ed8] hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <svg className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="pl-10 h-12 rounded-lg border-gray-200 shadow-sm pr-10 focus-visible:ring-[#1c4ed8]"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
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

                        <div className="flex items-center py-2">
                            <Checkbox id="remember" className="border-gray-300 rounded text-[#1c4ed8]" />
                            <label htmlFor="remember" className="ml-2 block text-sm font-medium text-gray-600">
                                Remember this device
                            </label>
                        </div>

                        {error && <p className="text-sm font-semibold text-rose-500">{error}</p>}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-[#1c4ed8] hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm text-base"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 font-bold text-gray-400 tracking-wider">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" type="button" className="h-12 bg-white rounded-lg border-gray-200 font-bold text-gray-700 shadow-sm hover:bg-gray-50">
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Google
                            </Button>
                            <Button variant="outline" type="button" className="h-12 bg-white rounded-lg border-gray-200 font-bold text-gray-700 shadow-sm hover:bg-gray-50">
                                <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="#f25022" d="M0 0h10v10H0z" /><path fill="#7fba00" d="M11 0h10v10H11z" /><path fill="#00a4ef" d="M0 11h10v10H0z" /><path fill="#ffb900" d="M11 11h10v10H11z" /></svg>
                                Microsoft
                            </Button>
                        </div>

                        <p className="text-center text-sm font-medium text-gray-500 pt-6">
                            Don't have an account yet? <a href="#" className="font-bold text-[#1c4ed8] hover:underline">Start a free trial</a>
                        </p>
                    </form>

                    <div className="mt-auto pt-20 text-center text-xs font-medium text-gray-400 space-x-4">
                        <a href="#" className="hover:text-gray-600">Terms of Service</a>
                        <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-600">Cookie Settings</a>
                        <p className="mt-4">© 2024 Legal CRM Solutions Inc. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
