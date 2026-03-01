"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Filter,
    CheckCircle2,
    Lightbulb,
    Clock,
    MoreVertical
} from "lucide-react"

export default function CalendarPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full overflow-y-auto w-full bg-slate-50">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Legal Agenda</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Week of October 1st-7th, 2023
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                        <button className="px-4 py-1.5 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Day</button>
                        <button className="px-4 py-1.5 text-sm font-bold text-[#1c4ed8] bg-blue-50 rounded-md">Week</button>
                        <button className="px-4 py-1.5 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Month</button>
                    </div>
                    <Button variant="outline" className="bg-white text-gray-700 font-medium shadow-sm">
                        <Filter className="mr-2 h-4 w-4 text-gray-500" />
                        Filter
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-8">
                {/* Calendar Grid (Left Column - 3 col span) */}
                <div className="lg:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">

                    {/* Calendar Headers */}
                    <div className="grid grid-cols-7 border-b border-gray-100 bg-white text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <div className="py-4 border-r border-gray-100 flex flex-col gap-1 items-center">
                            SUN <span className="text-xl font-bold text-gray-900">01</span>
                        </div>
                        <div className="py-4 border-r border-gray-100 flex flex-col gap-1 items-center">
                            MON <span className="text-xl font-bold text-gray-900">02</span>
                        </div>
                        <div className="py-3 border-r border-gray-100 flex flex-col gap-1 items-center border-b-2 border-b-[#1c4ed8]">
                            <span className="text-[#1c4ed8]">TUE</span> <span className="text-xl font-bold text-[#1c4ed8]">03</span>
                        </div>
                        <div className="py-4 border-r border-gray-100 flex flex-col gap-1 items-center">
                            WED <span className="text-xl font-bold text-gray-900">04</span>
                        </div>
                        <div className="py-4 border-r border-gray-100 flex flex-col gap-1 items-center">
                            THU <span className="text-xl font-bold text-gray-900">05</span>
                        </div>
                        <div className="py-4 border-r border-gray-100 flex flex-col gap-1 items-center">
                            FRI <span className="text-xl font-bold text-gray-900">06</span>
                        </div>
                        <div className="py-4 flex flex-col gap-1 items-center">
                            SAT <span className="text-xl font-bold text-gray-400">07</span>
                        </div>
                    </div>

                    {/* Calendar Body */}
                    <div className="grid grid-cols-7 h-[600px] relative divide-x divide-gray-100 bg-white">
                        {/* Background Grid Lines Optional, here we keep it clean */}
                        <div></div> {/* SUN */}
                        <div></div> {/* MON */}
                        <div className="relative p-2 space-y-3 bg-blue-50/10"> {/* TUE */}

                            {/* Event 1 (Yellow) */}
                            <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-400 hover:shadow-md transition-shadow cursor-pointer relative group">
                                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">09:00 AM</p>
                                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">Filing Deadline</p>
                                <p className="text-xs text-amber-700/70 mt-1 font-medium">Case #2201-B: Smith v. Global Corp</p>
                            </div>

                            {/* Event 2 (Red) */}
                            <div className="bg-rose-50 rounded-lg p-3 border-l-4 border-rose-500 hover:shadow-md transition-shadow cursor-pointer relative group mt-4">
                                <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> 10:30 AM
                                </p>
                                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">Court Hearing</p>
                                <p className="text-xs text-rose-700/70 mt-1 font-medium">District Court 4A - Miller Case</p>
                            </div>

                            {/* Event 3 (Green) */}
                            <div className="bg-emerald-50 rounded-lg p-3 border-l-4 border-emerald-500 hover:shadow-md transition-shadow cursor-pointer relative group mt-16">
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">01:00 PM</p>
                                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">Lunch with Partner</p>
                                <p className="text-xs text-emerald-700/70 mt-1 font-medium">Strategy Meeting</p>
                            </div>

                            {/* Event 4 (Blue) */}
                            <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-600 hover:shadow-md transition-shadow cursor-pointer relative group mt-4">
                                <p className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">02:00 PM</p>
                                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">Initial Consultation</p>
                                <p className="text-xs text-blue-700/70 mt-1 font-medium">Client: Robert Downey</p>
                            </div>

                        </div>
                        <div className="relative p-2"> {/* WED */}
                            <div className="absolute top-[80px] w-[calc(100%-16px)] bg-blue-50 rounded-lg p-3 border-l-4 border-[#1c4ed8] hover:shadow-md transition-shadow cursor-pointer left-2">
                                <p className="text-[10px] font-bold text-[#1c4ed8] uppercase tracking-widest">11:00 AM</p>
                                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">Deposition</p>
                                <p className="text-xs text-[#1c4ed8]/70 mt-1 font-medium">Conference Room C</p>
                            </div>
                        </div>
                        <div className="relative p-2"> {/* THU */}
                            <div className="absolute top-[16px] w-[calc(100%-16px)] bg-rose-50 rounded-lg p-3 border-l-4 border-rose-500 hover:shadow-md transition-shadow cursor-pointer left-2">
                                <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">09:00 AM</p>
                                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">Pre-trial Review</p>
                                <p className="text-xs text-rose-700/70 mt-1 font-medium">Judge Chambers: Anderson</p>
                            </div>
                        </div>
                        <div className="relative p-2"> {/* FRI */}
                            <div className="absolute top-[280px] w-[calc(100%-16px)] bg-amber-50 rounded-lg p-3 border-l-4 border-amber-400 hover:shadow-md transition-shadow cursor-pointer left-2">
                                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">05:00 PM</p>
                                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">End-of-Week Filing</p>
                                <p className="text-xs text-amber-700/70 mt-1 font-medium">E-Portal Deadlines</p>
                            </div>
                        </div>
                        <div></div> {/* SAT */}
                    </div>
                </div>

                {/* Right Sidebar (1 col span) */}
                <div className="space-y-6">

                    {/* Quick Tasks */}
                    <Card className="shadow-sm border-gray-100/50">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-bold text-gray-900">Quick Tasks</CardTitle>
                            <span className="text-xs font-bold text-[#1c4ed8] cursor-pointer hover:underline">View All</span>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            <div className="flex gap-3 border border-gray-100 rounded-xl p-3 bg-white hover:bg-gray-50/50 cursor-pointer">
                                <div className="pt-0.5">
                                    <div className="h-4 w-4 rounded border border-gray-300"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Review Johnson Contract</p>
                                    <p className="text-xs text-gray-400 mt-1 font-medium">Due today at 5:00 PM</p>
                                </div>
                            </div>

                            <div className="flex gap-3 border border-gray-100 rounded-xl p-3 bg-white hover:bg-gray-50/50 cursor-pointer">
                                <div className="pt-0.5">
                                    <div className="h-4 w-4 rounded border border-gray-300"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Call Witness: Dr. Sarah</p>
                                    <p className="text-xs text-gray-400 mt-1 font-medium">Case #4412-X</p>
                                </div>
                            </div>

                            <div className="flex gap-3 border border-gray-100 rounded-xl p-3 bg-white hover:bg-gray-50/50 cursor-pointer">
                                <div className="pt-0.5">
                                    <div className="h-4 w-4 rounded border border-gray-300"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Submit Appellate Brief</p>
                                    <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-1">Priority: Urgent</p>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                    {/* Efficiency Tip */}
                    <Card className="shadow-lg border-0 bg-[#1c4ed8] text-white relative overflow-hidden">
                        {/* Background Decorative Circle */}
                        <div className="absolute -right-8 -bottom-8 bg-white/10 w-32 h-32 rounded-full blur-xl pointer-events-none"></div>
                        <CardContent className="p-6 relative z-10 space-y-4">
                            <div className="flex items-center gap-2 text-blue-200">
                                <Lightbulb className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">EFFICIENCY TIP</span>
                            </div>
                            <h3 className="text-lg font-bold leading-snug pe-4">
                                You have 3 hearings scheduled for tomorrow. Prepare your dossiers tonight.
                            </h3>
                            <Button variant="secondary" className="bg-white text-[#1c4ed8] hover:bg-blue-50 font-bold border-0 h-9 px-6 mt-2">
                                Prepare Now
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <div className="px-2 pt-4">
                        <h3 className="text-base font-bold text-gray-900 mb-6">Recent Activity</h3>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">

                            <div className="relative flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-[#1c4ed8] z-10 ring-4 ring-slate-50 relative ml-1"></div>
                                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                    <span className="font-bold text-gray-900">Alex Wong</span> uploaded 4 new documents to <span className="italic text-[#1c4ed8]">Smith Case.</span>
                                </p>
                            </div>

                            <div className="relative flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 z-10 ring-4 ring-slate-50 relative ml-1"></div>
                                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                    <span className="font-bold text-gray-900">System:</span> New court date set for <span className="italic text-[#1c4ed8]">Doe v. State.</span>
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
