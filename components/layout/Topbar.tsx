import { auth } from "@/auth"
import { Input } from "@/components/ui/input"
import { Bell, HelpCircle, Search } from "lucide-react"
import Link from "next/link"

export default async function Topbar() {
    const session = await auth()

    return (
        <header className="flex h-20 shrink-0 items-center justify-between border-b bg-white px-8">
            {/* Search Bar */}
            <div className="w-full max-w-xl">
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                        type="search"
                        placeholder="Buscar expedientes, documentos o clientes..."
                        className="block w-full rounded-lg border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-[#0B1528] focus:ring-[#0B1528] sm:text-sm shadow-none"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6 ml-4">
                <div className="flex items-center gap-4">
                    <div className="relative text-gray-400">
                        <Bell className="h-5 w-5" />
                    </div>
                </div>

                <div className="h-6 w-px bg-gray-200" />

                <Link href="/dashboard/settings" className="text-sm font-semibold text-gray-700 hover:text-[#0B1528] transition-colors">
                    Ajustes del Despacho
                </Link>
            </div>
        </header>
    )
}
