import { ReactNode } from "react"
import Link from "next/link"
import { Building2, Users, CreditCard, Mail, MessageCircle, UserCircle2 } from "lucide-react"

const sidebarNavItems = [
    {
        title: "Mis datos de usuario",
        href: "/dashboard/settings/profile",
        icon: UserCircle2,
    },
    {
        title: "Datos fiscales",
        href: "/dashboard/settings",
        icon: Building2,
    },
    {
        title: "Usuarios",
        href: "/dashboard/settings/users",
        icon: Users,
    },
    {
        title: "Suscripción",
        href: "/dashboard/settings/subscription",
        icon: CreditCard,
    },
    {
        title: "Email",
        href: "/dashboard/settings/email",
        icon: Mail,
    },
    {
        title: "Whatsapp",
        href: "/dashboard/settings/whatsapp",
        icon: MessageCircle,
    },
]

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
                <aside className="w-full md:w-64 shrink-0">
                    <h2 className="text-2xl font-bold tracking-tight mb-6">Configuración</h2>
                    <nav className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-1">
                        {sidebarNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 text-gray-600 transition-colors"
                            >
                                <item.icon
                                    className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-3xl">{children}</div>
            </div>
        </div>
    )
}
