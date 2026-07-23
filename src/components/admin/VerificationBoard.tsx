"use client";

import type { ReactNode } from "react";
import { ShieldCheck, FileText, MapPin, Clock, Eye } from "lucide-react";

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`rounded-3xl border border-zinc-800 bg-zinc-950/75 p-6 ${className}`}>{children}</div>;
}

const queue = [
    { name: "Rulindo Coffee Coop", type: "Cooperative", place: "Rulindo", time: "2h ago", docs: 4, stage: "RCA pending" },
    { name: "Bugesera Dairy Union", type: "Cooperative", place: "Bugesera", time: "5h ago", docs: 3, stage: "Docs review" },
    { name: "Kigali Fresh Ltd", type: "Buyer", place: "Kigali", time: "1d ago", docs: 2, stage: "KYC pending" },
    { name: "Nyaruguru Grain Coop", type: "Cooperative", place: "Nyaruguru", time: "2d ago", docs: 4, stage: "RCA pending" },
];

const stageStyles: Record<string, string> = {
    "RCA pending": "bg-orange-500/15 text-orange-500",
    "Docs review": "bg-blue-500/15 text-blue-400",
    "KYC pending": "bg-orange-500/15 text-orange-500",
};

export default function VerificationBoard() {
    return (
        <div className="flex-1 min-w-0 p-8 text-zinc-100 text-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                <div>
                    <h1 className="text-2xl font-bold m-0 font-display">Verification (RCA)</h1>
                    <p className="text-zinc-400 text-[13.5px] m-0 mt-1">
                        Review cooperative and buyer identity documents before approval
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <Card>
                    <div className="flex items-start justify-between">
                        <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Awaiting Review</span>
                        <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-500 flex items-center justify-center">
                            <ShieldCheck size={16} />
                        </div>
                    </div>
                    <div className="text-[26px] font-bold mt-2.5">{queue.length}</div>
                </Card>
                <Card>
                    <div className="flex items-start justify-between">
                        <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Approved this month</span>
                        <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-500 flex items-center justify-center">
                            <ShieldCheck size={16} />
                        </div>
                    </div>
                    <div className="text-[26px] font-bold mt-2.5">31</div>
                </Card>
                <Card>
                    <div className="flex items-start justify-between">
                        <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Avg. review time</span>
                        <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-500 flex items-center justify-center">
                            <Clock size={16} />
                        </div>
                    </div>
                    <div className="text-[26px] font-bold mt-2.5">6h</div>
                </Card>
            </div>

            <Card>
                <p className="text-[15.5px] font-bold m-0 mb-4">Verification Queue</p>

                {queue.map((q) => (
                    <div
                        key={q.name}
                        className="flex items-center justify-between py-3.5 border-b border-zinc-800 last:border-b-0 gap-3"
                    >
                        <div className="min-w-0">
                            <div className="font-semibold text-[13.5px] mb-1 truncate">{q.name}</div>
                            <div className="flex items-center gap-2 text-[11.5px] text-zinc-500 flex-wrap">
                                <span className="bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded">
                                    {q.type}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={11} /> {q.place}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={11} /> {q.time}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FileText size={11} /> {q.docs} documents
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap ${stageStyles[q.stage]}`}>
                                {q.stage}
                            </span>
                            <button className="flex items-center gap-1.5 border border-zinc-700 text-zinc-300 text-xs px-3.5 py-1.5 rounded-md whitespace-nowrap hover:bg-zinc-800">
                                <Eye size={13} /> Review
                            </button>
                            <button className="bg-green-500 text-black font-bold text-xs px-3.5 py-1.5 rounded-md whitespace-nowrap">
                                Approve
                            </button>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
}