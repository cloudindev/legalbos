"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Download,
    Plus,
    Filter,
    MoreVertical,
    Activity
} from "lucide-react"

export default function CasesPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full overflow-y-auto w-full bg-slate-50">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Case Expedients</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Track ongoing legal procedures, deadlines, and litigation phases in real-time.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 font-medium">
                        <Download className="mr-2 h-4 w-4 text-gray-500" />
                        Export Data
                    </Button>
                    <Button className="bg-[#1c4ed8] hover:bg-blue-700 text-white font-medium shadow-sm">
                        <Plus className="mr-2 h-4 w-4" />
                        New Expedient
                    </Button>
                </div>
            </div>

            {/* Tabs and Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                    <Button variant="default" className="bg-[#1c4ed8] hover:bg-blue-700 text-white rounded-full px-6 shadow-none">
                        All Matters (124)
                    </Button>
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-6">
                        Discovery (22)
                    </Button>
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-6">
                        Trial (8)
                    </Button>
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-6">
                        Mediation (15)
                    </Button>
                </div>
                <Button variant="outline" className="bg-white text-gray-700 font-medium rounded-full shadow-none px-4">
                    <Filter className="mr-2 h-4 w-4 text-gray-400" />
                    Filter By Status
                </Button>
            </div>

            {/* Main Table */}
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-white">
                            <tr>
                                <th className="px-6 py-4">EXPEDIENT ID</th>
                                <th className="px-6 py-4">MATTER & CLIENT</th>
                                <th className="px-6 py-4">FILING DATE</th>
                                <th className="px-6 py-4">OPPOSING COUNSEL</th>
                                <th className="px-6 py-4">CURRENT PHASE</th>
                                <th className="px-6 py-4">STATUS</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {/* Row 1 */}
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 whitespace-nowrap font-bold text-gray-900">
                                    #EXP-2023-442
                                </td>
                                <td className="px-6 py-5">
                                    <p className="font-bold text-[#1c4ed8] cursor-pointer hover:underline">Miller vs. TechCorp Inc.</p>
                                    <p className="text-xs text-gray-500 mt-1">Robert Miller • Corp Liability</p>
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">
                                    Oct 12, 2023
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">Sterling & Assoc.</td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                        <span className="font-medium text-gray-700">Discovery</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>

                            {/* Row 2 */}
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 whitespace-nowrap font-bold text-gray-900">
                                    #EXP-2023-118
                                </td>
                                <td className="px-6 py-5">
                                    <p className="font-bold text-[#1c4ed8] cursor-pointer hover:underline">Global Logistics Arbitration</p>
                                    <p className="text-xs text-gray-500 mt-1">Global Logistics Ltd. • Contract</p>
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">
                                    Aug 05, 2023
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">In-House Counsel</td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                                        <span className="font-medium text-gray-700">Mediation</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Pending</span>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>

                            {/* Row 3 */}
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 whitespace-nowrap font-bold text-gray-900">
                                    #EXP-2024-009
                                </td>
                                <td className="px-6 py-5">
                                    <p className="font-bold text-[#1c4ed8] cursor-pointer hover:underline">Property Lien Dispute</p>
                                    <p className="text-xs text-gray-500 mt-1">Sarah Jenkins • Real Estate</p>
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">
                                    Jan 14, 2024
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">O'Connell Law</td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                                        <span className="font-medium text-gray-700">Filing Phase</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>

                            {/* Row 4 */}
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 whitespace-nowrap font-bold text-gray-900">
                                    #EXP-2023-899
                                </td>
                                <td className="px-6 py-5">
                                    <p className="font-bold text-[#1c4ed8] cursor-pointer hover:underline">State vs. Davidson</p>
                                    <p className="text-xs text-gray-500 mt-1">Mark Davidson • Criminal</p>
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">
                                    Nov 22, 2023
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">District Attorney</td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                                        <span className="font-medium text-gray-700">Trial</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">Urgent</span>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>

                            {/* Row 5 */}
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 whitespace-nowrap font-bold text-gray-900">
                                    #EXP-2023-652
                                </td>
                                <td className="px-6 py-5">
                                    <p className="font-bold text-[#1c4ed8] cursor-pointer hover:underline">Smith Div. Settlement</p>
                                    <p className="text-xs text-gray-500 mt-1">Linda Smith • Family Law</p>
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">
                                    Sep 01, 2023
                                </td>
                                <td className="px-6 py-5 text-gray-600 font-medium whitespace-nowrap">Wagner Partners</td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                                        <span className="font-medium text-gray-700">Closing</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">Reviewing</span>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Pagination Header-like Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
                    <span className="text-sm text-gray-500">
                        Showing <span className="font-bold text-gray-900">1 - 5</span> of <span className="font-bold text-gray-900">124</span> results
                    </span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 text-gray-400 bg-white shadow-none rounded-full" disabled>
                            &lt;
                        </Button>
                        <Button variant="default" size="sm" className="h-8 w-8 bg-[#1c4ed8] text-white p-0 shadow-none rounded-full">
                            1
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 text-gray-600 p-0 rounded-full hover:bg-gray-100">
                            2
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 text-gray-600 p-0 rounded-full hover:bg-gray-100">
                            3
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 text-gray-600 bg-white shadow-none rounded-full">
                            &gt;
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid gap-6 md:grid-cols-3 pb-8">
                {/* Quick Stats */}
                <Card className="shadow-sm border-gray-200/60 col-span-1 border-t-4 border-t-emerald-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold flex justify-between items-center">
                            Quick Stats
                            <Activity className="h-5 w-5 text-gray-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-4">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-medium text-gray-600">Expedients per lawyer</span>
                                <span className="text-xl font-bold text-gray-900">12.4 avg</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[65%] rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-medium text-gray-600">Resolution rate</span>
                                <span className="text-xl font-bold text-gray-900">88%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[88%] rounded-full"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card className="shadow-sm border-gray-200/60 col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-100">
                        <CardTitle className="text-lg font-bold">Upcoming Deadlines</CardTitle>
                        <span className="text-sm font-bold text-[#1c4ed8] cursor-pointer hover:underline">View Full Calendar</span>
                    </CardHeader>
                    <CardContent className="pt-6 grid sm:grid-cols-2 gap-4">

                        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                            <div className="flex flex-col items-center justify-center bg-white border border-rose-100 h-14 w-14 rounded-xl shadow-sm">
                                <span className="text-[10px] font-bold text-rose-500 uppercase">JAN</span>
                                <span className="text-lg font-black text-rose-600 leading-none">28</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Discovery Response Due</p>
                                <p className="text-xs text-gray-500 mt-1">Miller vs. TechCorp Inc.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                            <div className="flex flex-col items-center justify-center bg-white border border-blue-100 h-14 w-14 rounded-xl shadow-sm">
                                <span className="text-[10px] font-bold text-blue-500 uppercase">FEB</span>
                                <span className="text-lg font-black text-blue-600 leading-none">02</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Initial Consultation</p>
                                <p className="text-xs text-gray-500 mt-1">Property Lien Dispute</p>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
