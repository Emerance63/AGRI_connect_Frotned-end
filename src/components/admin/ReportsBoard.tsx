"use client";

import type { ReactNode } from "react";
import { Download, FileBarChart2, TrendingUp, Calendar } from "lucide-react";

function Card({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={`rounded-3xl bg-zinc-900/60 p-5 shadow-sm ${className ?? ""}`}>
            {children}
        </div>
    );
}

const reports = [
    { name: "Monthly GMV Summary", period: "July 2026", format: "PDF", size: "1.2 MB" },
    { name: "Cooperative Growth Report", period: "Q2 2026", format: "XLSX", size: "860 KB" },
    { name: "Dispute Resolution Log", period: "July 2026", format: "CSV", size: "210 KB" },
    { name: "District Performance Breakdown", period: "YTD 2026", format: "PDF", size: "2.4 MB" },
];

export default function ReportsBoard() {
    return (
        <div className="flex-1 min-w-0 p-8 text-zinc-100 text-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                <div>
                    <h1 className="text-2xl font-bold m-0 font-display">Reports</h1>
                    <p className="text-zinc-400 text-[13.5px] m-0 mt-1">
                        Generate and download platform-wide performance reports
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-green-500 text-black font-bold text-xs px-4 py-2 rounded-lg">
                    <FileBarChart2 size={14} /> New Report
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <Card>
                    <div className="flex items-start justify-between">
                        <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">GMV (YTD)</span>
                        <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-500 flex items-center justify-center">
                            <TrendingUp size={16} />
                        </div>
                    </div>
                    <div className="text-[26px] font-bold mt-2.5">182.4M RWF</div>
                </Card>
                <Card>
                    <div className="flex items-start justify-between">
                        <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Reports generated</span>
                        <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-500 flex items-center justify-center">
                            <FileBarChart2 size={16} />
                        </div>
                    </div>
                    <div className="text-[26px] font-bold mt-2.5">47</div>
                </Card>
                <Card>
                    <div className="flex items-start justify-between">
                        <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Next scheduled</span>
                        <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-500 flex items-center justify-center">
                            <Calendar size={16} />
                        </div>
                    </div>
                    <div className="text-[26px] font-bold mt-2.5">1 Aug</div>
                </Card>
            </div>

            <Card>
                <p className="text-[15.5px] font-bold m-0 mb-4">Available Reports</p>

                <div className="grid grid-cols-[2fr_1fr_0.8fr_0.8fr_auto] gap-2 text-[11px] uppercase tracking-wide text-zinc-500 pb-2.5 border-b border-zinc-800">
                    <span>Name</span>
                    <span>Period</span>
                    <span>Format</span>
                    <span>Size</span>
                    <span></span>
                </div>

                {reports.map((r) => (
                    <div
                        key={r.name}
                        className="grid grid-cols-[2fr_1fr_0.8fr_0.8fr_auto] gap-2 items-center py-3.5 border-b border-zinc-800 last:border-b-0 text-[13.5px]"
                    >
                        <span className="font-semibold">{r.name}</span>
                        <span className="text-zinc-400">{r.period}</span>
                        <span className="text-zinc-400">{r.format}</span>
                        <span className="text-zinc-400">{r.size}</span>
                        <button className="flex items-center gap-1.5 border border-zinc-700 text-zinc-300 text-xs px-3.5 py-1.5 rounded-md whitespace-nowrap hover:bg-zinc-800 justify-self-end">
                            <Download size={13} /> Download
                        </button>
                    </div>
                ))}
            </Card>
        </div>
    );
}