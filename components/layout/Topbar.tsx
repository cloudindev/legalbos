import { auth } from "@/auth"
import { Input } from "@/components/ui/input"
import { Bell, HelpCircle, Search } from "lucide-react"

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
                        placeholder="Search cases, files, or clients..."
                        className="block w-full rounded-lg border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm shadow-none"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6 ml-4">
                <div className="flex items-center gap-4">
                    <button type="button" className="relative text-gray-400 hover:text-gray-500 transition-colors">
                        <span className="absolute -right-0.5 -top-0.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        <Bell className="h-5 w-5" />
                    </button>

                    <button type="button" className="text-gray-400 hover:text-gray-500 transition-colors">
                        <HelpCircle className="h-5 w-5" />
                    </button>
                </div>

                <div className="h-6 w-px bg-gray-200" />

                <button type="button" className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                    Firm Settings
                </button>
            </div>
        </header>
    )
}
