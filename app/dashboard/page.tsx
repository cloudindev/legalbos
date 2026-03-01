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
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Practice Dashboard</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Monitoring firm performance and case load for Oct 23, 2023.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 font-medium">
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        Last 30 Days
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Report
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1 */}
                <Card className="shadow-sm border-gray-100/50 relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex bg-emerald-50 h-10 w-10 items-center justify-center rounded-lg">
                                <FolderIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                +12%
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">ACTIVE CASES</p>
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
                                THIS WEEK
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">UPCOMING HEARINGS</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">08</h3>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3 */}
                <Card className="shadow-sm border-gray-100/50 relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex bg-blue-50 h-10 w-10 items-center justify-center rounded-lg">
                                <Clock className="h-5 w-5 text-blue-500" />
                            </div>
                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-600/10">
                                -3.2%
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">BILLABLE HOURS</p>
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
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">MONTHLY REVENUE</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">$284,300</h3>
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
                            <CardTitle className="text-lg font-bold text-gray-900">Case Load Distribution</CardTitle>
                            <CardDescription className="text-sm font-medium text-gray-400 mt-1">
                                Caseload volume by legal practice area
                            </CardDescription>
                        </div>
                        <div className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50">
                            Current Fiscal Year
                            <span className="ml-2 text-gray-400">v</span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-64 flex items-end justify-between items-stretch gap-4">
                            {/* Fake UI Bar Chart aligned with design */}
                            {[{ lbl: "CORPORATE", h: "60%" }, { lbl: "LITIGATION", h: "85%" }, { lbl: "FAMILY", h: "25%" }, { lbl: "PROPERTY", h: "70%" }, { lbl: "IP/TECH", h: "50%" }, { lbl: "OTHER", h: "35%" }].map(item => (
                                <div key={item.lbl} className="flex flex-col justify-end w-full group relative">
                                    <div className="w-full bg-gray-50 rounded-t-lg h-full relative overflow-hidden flex flex-col justify-end">
                                        <div className="w-full bg-teal-600/20 rounded-t-sm transition-all group-hover:bg-teal-600/30" style={{ height: item.h }}></div>
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
                            <CalendarIcon className="h-5 w-5 mr-2 text-emerald-600" />
                            Upcoming Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-6">
                        <div className="relative pl-4 border-l-2 border-emerald-500">
                            <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-white" />
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">TOMORROW, 09:30 AM</p>
                            <p className="font-semibold text-gray-900 mt-1">Pre-trial Hearing</p>
                            <p className="text-sm text-gray-500 mt-0.5">Superior Court - Judge Abrams</p>
                        </div>
                        <div className="relative pl-4 border-l-2 border-orange-400">
                            <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-orange-400 ring-4 ring-white" />
                            <p className="text-xs font-bold text-orange-500 uppercase tracking-wider">OCT 24, 11:00 AM</p>
                            <p className="font-semibold text-gray-900 mt-1">Deposition: Dr. John Doe</p>
                            <p className="text-sm text-gray-500 mt-0.5">Main Office - Conference Room B</p>
                        </div>
                        <div className="relative pl-4 border-l-2 border-gray-200">
                            <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-gray-300 ring-4 ring-white" />
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">OCT 26, 02:00 PM</p>
                            <p className="font-semibold text-gray-900 mt-1">Final Settlement Signing</p>
                            <p className="text-sm text-gray-500 mt-0.5">Virtual Call - Zoom 4</p>
                        </div>
                    </CardContent>
                    <div className="p-4 border-t border-gray-50">
                        <Button variant="secondary" className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold shadow-none border border-gray-100">
                            OPEN FIRM CALENDAR
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Main Blocks Layer 2 */}
            <div className="grid gap-6 lg:grid-cols-3 pb-8">
                <Card className="shadow-sm border-gray-100/50 lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-bold text-gray-900">Recent File Activity</CardTitle>
                        <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider cursor-pointer hover:underline">VIEW HISTORY</span>
                    </CardHeader>
                    <div className="divide-y divide-gray-100">
                        <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/80 bg-opacity-50">
                                    <FileText className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Contract Amended</p>
                                    <p className="text-sm text-gray-500 mt-0.5">Case #14892 - Smith v. Global Corp</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-gray-400">14m ago</p>
                                <span className="mt-1 inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                                    SARAH J.
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/80 bg-opacity-50">
                                    <CalendarCheck className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Trial Date Confirmed</p>
                                    <p className="text-sm text-gray-500 mt-0.5">Case #15221 - Estate of Miller</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-gray-400">2h ago</p>
                                <span className="mt-1 inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                    SYSTEM
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/80 bg-opacity-50">
                                    <CheckCircle2 className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Settlement Finalized</p>
                                    <p className="text-sm text-gray-500 mt-0.5">Case #13442 - Tenant Dispute</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-gray-400">5h ago</p>
                                <span className="mt-1 inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                                    ROBERT L.
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="shadow-sm border-gray-100/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                            <Users className="h-5 w-5 mr-2 text-emerald-600" />
                            New Client Onboarding
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4 border-b border-gray-50 pb-4">
                            <div className="h-10 w-10 bg-orange-100 overflow-hidden rounded-full flex shrink-0 items-center justify-center">
                                <span className="font-bold text-orange-700">EL</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">Evergreen Logistics LLC</p>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">RETAINER PENDING</p>
                            </div>
                            <div className="text-xs font-medium text-gray-400">2D AGO</div>
                        </div>
                        <div className="flex items-center space-x-4 border-b border-gray-50 pb-4">
                            <div className="h-10 w-10 bg-blue-100 overflow-hidden rounded-full flex shrink-0 items-center justify-center">
                                <span className="font-bold text-blue-700">DT</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">Dr. Elizabeth Thorne</p>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">ACTIVE CLIENT</p>
                            </div>
                            <div className="text-xs font-medium text-gray-400">3D AGO</div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 bg-purple-100 overflow-hidden rounded-full flex shrink-0 items-center justify-center">
                                <span className="font-bold text-purple-700">AR</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">Apex Real Estate Group</p>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">REVIEW STAGE</p>
                            </div>
                            <div className="text-xs font-medium text-gray-400">5D AGO</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
