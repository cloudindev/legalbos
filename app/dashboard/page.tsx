import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Calendar as CalendarIcon,
    Download,
    FolderIcon,
    Gavel,
    Clock,
    Banknote,
    FileText,
    CalendarCheck,
    CheckCircle2,
    Users
} from "lucide-react"

export default function DashboardHome() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full overflow-y-auto w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Panel del Despacho</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Monitorizando el rendimiento del despacho y la carga de expedientes.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 font-medium">
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        Últimos 30 Días
                    </Button>
                    <Button className="bg-[#0B1528] hover:bg-slate-800 text-white font-medium shadow-sm">
                        <Download className="mr-2 h-4 w-4" />
                        Generar Informe
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1 */}
                <Card className="shadow-sm border-gray-100/50 relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex bg-blue-50 h-10 w-10 items-center justify-center rounded-lg">
                                <FolderIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                +12%
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">EXPEDIENTES ACTIVOS</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">124</h3>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2 */}
                <Card className="shadow-sm border-gray-100/50 relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex bg-orange-50 h-10 w-10 items-center justify-center rounded-lg">
                                <Gavel className="h-5 w-5 text-orange-500" />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                ESTA SEMANA
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">VISTAS PRÓXIMAS</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">08</h3>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3 */}
                <Card className="shadow-sm border-gray-100/50 relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex bg-indigo-50 h-10 w-10 items-center justify-center rounded-lg">
                                <Clock className="h-5 w-5 text-indigo-500" />
                            </div>
                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-600/10">
                                -3.2%
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">HORAS FACTURABLES</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">1,450.5</h3>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 4 */}
                <Card className="shadow-sm border-gray-100/50 relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex bg-purple-50 h-10 w-10 items-center justify-center rounded-lg">
                                <Banknote className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                +8.4%
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">INGRESOS MENSUALES</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">284.300€</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Blocks Layer 1 */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Chart Card */}
                <Card className="shadow-sm border-gray-100/50 lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-transparent">
                        <div>
                            <CardTitle className="text-lg font-bold text-gray-900">Distribución de Expedientes</CardTitle>
                            <CardDescription className="text-sm font-medium text-gray-400 mt-1">
                                Volumen de expedientes por área de práctica
                            </CardDescription>
                        </div>
                        <div className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50">
                            Año Fiscal Actual
                            <span className="ml-2 text-gray-400">v</span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-64 flex items-end justify-between items-stretch gap-4">
                            {/* Fake UI Bar Chart aligned with design */}
                            {[{ lbl: "MERCANTIL", h: "60%" }, { lbl: "LITIGIOS", h: "85%" }, { lbl: "FAMILIA", h: "25%" }, { lbl: "INMOBILIARIO", h: "70%" }, { lbl: "IP/TIC", h: "50%" }, { lbl: "OTROS", h: "35%" }].map(item => (
                                <div key={item.lbl} className="flex flex-col justify-end w-full group relative">
                                    <div className="w-full bg-gray-50 rounded-t-lg h-full relative overflow-hidden flex flex-col justify-end">
                                        <div className="w-full bg-[#0B1528]/20 rounded-t-sm transition-all group-hover:bg-[#0B1528]/30" style={{ height: item.h }}></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center mt-3">{item.lbl}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule Card */}
                <Card className="shadow-sm border-gray-100/50 flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2 text-[#0B1528]" />
                            Próximos Eventos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-6">
                        <div className="relative pl-4 border-l-2 border-[#0B1528]">
                            <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#0B1528] ring-4 ring-white" />
                            <p className="text-xs font-bold text-[#0B1528] uppercase tracking-wider">MAÑANA, 09:30 H</p>
                            <p className="font-semibold text-gray-900 mt-1">Audiencia Previa</p>
                            <p className="text-sm text-gray-500 mt-0.5">Juzgado 1ª Instancia - Juez Abrams</p>
                        </div>
                        <div className="relative pl-4 border-l-2 border-orange-400">
                            <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-orange-400 ring-4 ring-white" />
                            <p className="text-xs font-bold text-orange-500 uppercase tracking-wider">24 OCT, 11:00 H</p>
                            <p className="font-semibold text-gray-900 mt-1">Declaración: Dr. Juan Pérez</p>
                            <p className="text-sm text-gray-500 mt-0.5">Despacho - Sala Conferencias B</p>
                        </div>
                        <div className="relative pl-4 border-l-2 border-gray-200">
                            <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-gray-300 ring-4 ring-white" />
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">26 OCT, 14:00 H</p>
                            <p className="font-semibold text-gray-900 mt-1">Firma Acuerdo Final</p>
                            <p className="text-sm text-gray-500 mt-0.5">Videollamada - Zoom 4</p>
                        </div>
                    </CardContent>
                    <div className="p-4 border-t border-gray-50">
                        <Button variant="secondary" className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold shadow-none border border-gray-100">
                            ABRIR CALENDARIO COMPLETO
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Main Blocks Layer 2 */}
            <div className="grid gap-6 lg:grid-cols-3 pb-8">
                <Card className="shadow-sm border-gray-100/50 lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-bold text-gray-900">Actividad Reciente en Expedientes</CardTitle>
                        <span className="text-sm font-bold text-[#0B1528] uppercase tracking-wider cursor-pointer hover:underline">VER HISTORIAL</span>
                    </CardHeader>
                    <div className="divide-y divide-gray-100">
                        <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/80 bg-opacity-50">
                                    <FileText className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Contrato Modificado</p>
                                    <p className="text-sm text-gray-500 mt-0.5">Exp #14892 - Díaz v. Global Corp</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-gray-400">Hace 14 min</p>
                                <span className="mt-1 inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                                    SARA J.
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/80 bg-opacity-50">
                                    <CalendarCheck className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Fecha de Juicio Confirmada</p>
                                    <p className="text-sm text-gray-500 mt-0.5">Exp #15221 - Herencia Gómez</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-gray-400">Hace 2 h</p>
                                <span className="mt-1 inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                    SISTEMA
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/80 bg-opacity-50">
                                    <CheckCircle2 className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Acuerdo Finalizado</p>
                                    <p className="text-sm text-gray-500 mt-0.5">Exp #13442 - Desahucio Inquilino</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-gray-400">Hace 5 h</p>
                                <span className="mt-1 inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                                    ROBERTO L.
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="shadow-sm border-gray-100/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                            <Users className="h-5 w-5 mr-2 text-[#0B1528]" />
                            Altas de Clientes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4 border-b border-gray-50 pb-4">
                            <div className="h-10 w-10 bg-orange-100 overflow-hidden rounded-full flex shrink-0 items-center justify-center">
                                <span className="font-bold text-orange-700">EV</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">Evergreen Logistics SL</p>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">PROVISIÓN PENDIENTE</p>
                            </div>
                            <div className="text-xs font-medium text-gray-400">HACE 2D</div>
                        </div>
                        <div className="flex items-center space-x-4 border-b border-gray-50 pb-4">
                            <div className="h-10 w-10 bg-blue-100 overflow-hidden rounded-full flex shrink-0 items-center justify-center">
                                <span className="font-bold text-blue-700">IT</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">Dra. Isabel Torres</p>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">CLIENTE ACTIVO</p>
                            </div>
                            <div className="text-xs font-medium text-gray-400">HACE 3D</div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 bg-purple-100 overflow-hidden rounded-full flex shrink-0 items-center justify-center">
                                <span className="font-bold text-purple-700">AI</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">Apex Inmobiliaria</p>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">EN REVISIÓN</p>
                            </div>
                            <div className="text-xs font-medium text-gray-400">HACE 5D</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
// Memoria: Componente traducido al español (España) y aplicando el estilo de la plataforma #0B1528 para el dashboard.
