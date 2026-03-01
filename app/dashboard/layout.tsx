import { ReactNode } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
// Memoria: Layout principal del ERP, integra la Sidebar izquierda estática y Topbar dinámica
