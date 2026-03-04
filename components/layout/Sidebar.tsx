"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    Briefcase,
    Users,
    Calendar,
    Receipt,
    FileText,
    LayoutDashboard,
    PlusCircle,
    Settings,
    Contact,
    LogOut
} from "lucide-react"
import { signOut } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
    { name: "Resumen", href: "/dashboard", icon: LayoutDashboard },
    { name: "Expedientes", href: "/dashboard/cases", icon: Briefcase },
    { name: "Clientes", href: "/dashboard/clients", icon: Users },
    { name: "Calendario", href: "/dashboard/calendar", icon: Calendar },
    { name: "Documentos", href: "/dashboard/documents", icon: FileText },
    { name: "Contactos", href: "/dashboard/directory", icon: Contact },
]

export function Sidebar({ user }: { user?: any }) {
    const pathname = usePathname()
    const router = useRouter()

    // Cálculo de nombre iniciales y rol
    const getInitials = (name?: string) => {
        if (!name) return "US"
        return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    }

    const displayName = user?.name || "Usuario"
    const displayRole = user?.role === "SUPER_ADMIN" ? "Admin cuenta" : "Socio / Abogado"
    const initials = getInitials(user?.name)

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white">
            {/* Brand Logo */}
            <div className="flex h-20 shrink-0 items-center px-6 border-b border-transparent">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1528] text-white">
                        <Briefcase className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold leading-tight text-[#0B1528] tracking-tight">Legalbos</span>
                        <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">Gestión Legal</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-1 flex-col overflow-y-auto pt-6 pb-4">
                <nav className="flex-1 space-y-1.5 px-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/dashboard')
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    isActive
                                        ? "bg-blue-50 text-[#0B1528] font-bold border-r-4 border-[#0B1528]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium",
                                    "group flex items-center rounded-r-none rounded-l-lg px-3 py-2.5 text-sm transition-colors"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        isActive ? "text-[#0B1528]" : "text-gray-400 group-hover:text-gray-500",
                                        "mr-3 h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Bottom Actions & User Profile */}
            <div className="flex flex-col gap-4 border-t border-gray-100 p-4">
                <Button onClick={() => router.push('/dashboard/cases/new')} className="w-full bg-[#0B1528] hover:bg-slate-800 text-white rounded-lg shadow-sm font-bold">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo expediente
                </Button>

                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6c28f] text-white font-bold">
                        {initials}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-semibold text-gray-900 truncate">{displayName}</span>
                        <span className="text-[11px] text-gray-500 truncate">{displayRole}</span>
                    </div>
                    <div className="flex items-center">
                        <Link href="/dashboard/settings">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#0B1528] transition-colors" title="Ajustes">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-600 transition-colors"
                            title="Cerrar sesión"
                            onClick={() => signOut({ callbackUrl: '/login' })}
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
