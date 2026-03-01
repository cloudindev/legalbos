"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Users,
    Briefcase,
    ClipboardList,
    UserPlus,
    Download,
    Plus,
    ChevronDown,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight
} from "lucide-react"

export default function ClientsPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full overflow-y-auto w-full bg-slate-50">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Client Directory</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage relationships and legal case progression across your practice.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 font-medium">
                        <Download className="mr-2 h-4 w-4 text-gray-500" />
                        Export CSV
                    </Button>
                    <Button className="bg-[#1c4ed8] hover:bg-blue-700 text-white font-medium shadow-sm">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Client
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-sm border-gray-100/50 relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">TOTAL CLIENTS</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">1,284</h3>
                            </div>
                            <div className="flex bg-blue-50 h-10 w-10 items-center justify-center rounded-lg">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-semibold text-emerald-600">+3.2% vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-100/50 relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">ACTIVE CASES</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">456</h3>
                            </div>
                            <div className="flex bg-indigo-50 h-10 w-10 items-center justify-center rounded-lg">
                                <Briefcase className="h-5 w-5 text-indigo-500" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1.5">
                            <span className="h-0.5 w-3 bg-gray-300 rounded-full" />
                            <span className="text-xs font-medium text-gray-500">Steady workflow</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-100/50 relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">PENDING INTAKE</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">28</h3>
                            </div>
                            <div className="flex bg-orange-50 h-10 w-10 items-center justify-center rounded-lg">
                                <ClipboardList className="h-5 w-5 text-orange-500" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1.5">
                            <span className="text-xs font-bold text-orange-500">! Needs review</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-100/50 relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">NEW THIS MONTH</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">15</h3>
                            </div>
                            <div className="flex bg-blue-50 h-10 w-10 items-center justify-center rounded-lg">
                                <UserPlus className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-semibold text-emerald-600">Ahead of target</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="default" className="bg-[#1c4ed8] hover:bg-blue-700 text-white shadow-none">
                        All Clients
                    </Button>
                    <Button variant="outline" className="bg-white border-gray-200 text-gray-600 shadow-none font-medium">
                        Corporate <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                    </Button>
                    <Button variant="outline" className="bg-white border-gray-200 text-gray-600 shadow-none font-medium">
                        Family Law <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                    </Button>
                    <Button variant="outline" className="bg-white border-gray-200 text-gray-600 shadow-none font-medium">
                        Litigation <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                    </Button>
                </div>
                <div className="relative w-full sm:max-w-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Filter className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Quick filter..."
                        className="bg-white border-gray-200 pl-10 h-10 rounded-lg shadow-sm w-full"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-white">
                            <tr>
                                <th className="px-6 py-4">CLIENT NAME</th>
                                <th className="px-6 py-4">CONTACT INFORMATION</th>
                                <th className="px-6 py-4">STATUS</th>
                                <th className="px-6 py-4">ASSIGNED LAWYER</th>
                                <th className="px-6 py-4">LAST ACTIVITY</th>
                                <th className="px-6 py-4 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-blue-100 text-blue-700 font-bold rounded-lg flex items-center justify-center">JD</div>
                                        <span className="font-semibold text-gray-900">John Doe</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">john.doe@email.com</td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">Sarah Jenkins</td>
                                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">Oct 24, 2023</td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <span className="font-bold text-[#1c4ed8] cursor-pointer hover:underline text-sm">View Profile</span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-gray-100 text-gray-600 font-bold rounded-lg flex items-center justify-center">AC</div>
                                        <span className="font-semibold text-gray-900">Acme Corp</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">contact@acme.com</td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">Pending</span>
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">Michael Ross</td>
                                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">Oct 23, 2023</td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <span className="font-bold text-[#1c4ed8] cursor-pointer hover:underline text-sm">View Profile</span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-gray-100 text-gray-600 font-bold rounded-lg flex items-center justify-center">JS</div>
                                        <span className="font-semibold text-gray-900">Jane Smith</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">jane.smith@email.com</td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Closed</span>
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">Sarah Jenkins</td>
                                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">Oct 20, 2023</td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <span className="font-bold text-[#1c4ed8] cursor-pointer hover:underline text-sm">View Profile</span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-indigo-100 text-indigo-700 font-bold rounded-lg flex items-center justify-center">GT</div>
                                        <span className="font-semibold text-gray-900">Global Tech</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">legal@globaltech.com</td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">Harvey Specter</td>
                                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">Oct 18, 2023</td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <span className="font-bold text-[#1c4ed8] cursor-pointer hover:underline text-sm">View Profile</span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-rose-100 text-rose-700 font-bold rounded-lg flex items-center justify-center">RB</div>
                                        <span className="font-semibold text-gray-900">Robert Brown</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">robert.b@email.com</td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">On Hold</span>
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">Michael Ross</td>
                                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">Oct 15, 2023</td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <span className="font-bold text-[#1c4ed8] cursor-pointer hover:underline text-sm">View Profile</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Pagination Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
                    <span className="text-sm text-gray-500">
                        Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">10</span> of <span className="font-bold text-gray-900">1,284</span> clients
                    </span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 text-gray-400 bg-white shadow-none" disabled>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="default" size="sm" className="h-8 w-8 bg-[#1c4ed8] text-white p-0 shadow-none">
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 border-gray-200 text-gray-600 p-0 shadow-none">
                            2
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 border-gray-200 text-gray-600 p-0 shadow-none">
                            3
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 text-gray-600 bg-white shadow-none">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
