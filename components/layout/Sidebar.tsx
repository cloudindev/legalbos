"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Briefcase,
    Users,
    Calendar,
    Receipt,
    FileText,
    LayoutDashboard,
    PlusCircle,
    Settings
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Active Cases", href: "/dashboard/cases", icon: Briefcase },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Court Schedule", href: "/dashboard/calendar", icon: Calendar },
    { name: "Billing & Invoices", href: "/dashboard/billing", icon: Receipt },
    { name: "Documents", href: "/dashboard/documents", icon: FileText },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white">
            {/* Brand Logo */}
            <div className="flex h-20 shrink-0 items-center px-6 border-b border-transparent">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
                        <Briefcase className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold leading-tight text-gray-900 tracking-tight">Lexington</span>
                        <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">Law Firm CRM</span>
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
                                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium",
                                    "group flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        isActive ? "text-emerald-700" : "text-gray-400 group-hover:text-gray-500",
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
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm font-medium">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Case File
                </Button>

                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6c28f] text-white font-bold">
                        MS
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-semibold text-gray-900 truncate">Marcus Sterling</span>
                        <span className="text-[11px] text-gray-500 truncate">Senior Partner</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
