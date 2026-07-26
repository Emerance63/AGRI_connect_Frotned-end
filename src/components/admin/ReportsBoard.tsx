"use client";

import { useState } from "react";
import { Download, FileBarChart2, TrendingUp, Calendar, Plus } from "lucide-react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#1f3d29] bg-[#112d1a] p-5 ${className}`}>
      {children}
    </div>
  );
}

const initialReports = [
  { name: "Monthly GMV Summary", period: "July 2026", format: "PDF", size: "1.2 MB" },
  { name: "Cooperative Growth Report", period: "Q2 2026", format: "XLSX", size: "860 KB" },
  { name: "Dispute Resolution Log", period: "July 2026", format: "CSV", size: "210 KB" },
  { name: "District Performance Breakdown", period: "YTD 2026", format: "PDF", size: "2.4 MB" },
];

export default function ReportsBoard() {
  const [reports, setReports] = useState(initialReports);
  const [generated, setGenerated] = useState(47);
  const [feedback, setFeedback] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPeriod, setNewPeriod] = useState("");
  const [newFormat, setNewFormat] = useState("PDF");

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim() || !newPeriod.trim()) return;
    setReports((prev) => [
      { name: newName.trim(), period: newPeriod.trim(), format: newFormat, size: "—" },
      ...prev,
    ]);
    setGenerated((n) => n + 1);
    setFeedback(`"${newName.trim()}" report generated.`);
    setNewName(""); setNewPeriod(""); setNewFormat("PDF");
    setShowForm(false);
  }

  function handleDownload(name: string) {
    setFeedback(`Downloading "${name}"…`);
    setTimeout(() => setFeedback(""), 3000);
  }

  return (
    <div className="flex-1 min-w-0 p-4 sm:p-8 text-white text-sm">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-green-100/50 text-[13.5px] mt-1">
            Generate and download platform-wide performance reports
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 bg-green-500 text-black font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-green-400 transition"
        >
          <Plus size={14} /> New Report
        </button>
      </div>

      {feedback && (
        <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-400">
          {feedback}
        </div>
      )}

      {/* New report form */}
      {showForm && (
        <Card className="mb-5">
          <p className="text-[14px] font-bold mb-4 text-white">Create New Report</p>
          <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Report name"
              className="rounded-lg border border-[#1f3d29] bg-[#0d2818] px-3 py-2 text-sm text-white placeholder:text-green-100/40 outline-none focus:border-green-500"
            />
            <input
              required
              value={newPeriod}
              onChange={(e) => setNewPeriod(e.target.value)}
              placeholder="Period (e.g. July 2026)"
              className="rounded-lg border border-[#1f3d29] bg-[#0d2818] px-3 py-2 text-sm text-white placeholder:text-green-100/40 outline-none focus:border-green-500"
            />
            <select
              value={newFormat}
              onChange={(e) => setNewFormat(e.target.value)}
              className="rounded-lg border border-[#1f3d29] bg-[#0d2818] px-3 py-2 text-sm text-white outline-none focus:border-green-500"
            >
              <option>PDF</option>
              <option>XLSX</option>
              <option>CSV</option>
            </select>
            <div className="sm:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)}
                className="rounded-lg border border-[#1f3d29] px-4 py-2 text-xs font-medium text-green-100/70 hover:bg-white/5 transition">
                Cancel
              </button>
              <button type="submit"
                className="rounded-lg bg-green-500 px-4 py-2 text-xs font-bold text-black hover:bg-green-400 transition">
                Generate
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">GMV (YTD)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">182.4M RWF</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Reports Generated</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
              <FileBarChart2 size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{generated}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Next Scheduled</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
              <Calendar size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">1 Aug</div>
        </Card>
      </div>

      {/* Reports list */}
      <Card>
        <p className="text-[15.5px] font-bold mb-4">Available Reports
          <span className="ml-2 text-green-100/50 text-sm font-normal">({reports.length})</span>
        </p>

        {/* Desktop table headers */}
        <div className="hidden sm:grid grid-cols-[2fr_1fr_0.6fr_0.6fr_auto] gap-2 text-[11px] uppercase tracking-wide text-green-100/50 pb-2.5 border-b border-[#1f3d29]">
          <span>Name</span><span>Period</span><span>Format</span><span>Size</span><span />
        </div>

        {reports.map((r) => (
          <div
            key={r.name}
            className="flex flex-col gap-2 py-4 border-b border-[#1f3d29] last:border-b-0 sm:grid sm:grid-cols-[2fr_1fr_0.6fr_0.6fr_auto] sm:items-center"
          >
            <span className="font-semibold text-[13.5px]">{r.name}</span>
            <span className="text-green-100/60 text-xs sm:text-[13px]">{r.period}</span>
            <span className="text-green-100/60 text-xs sm:text-[13px]">
              <span className="sm:hidden text-green-100/40">Format: </span>{r.format}
            </span>
            <span className="text-green-100/60 text-xs sm:text-[13px]">
              <span className="sm:hidden text-green-100/40">Size: </span>{r.size}
            </span>
            <button
              onClick={() => handleDownload(r.name)}
              className="flex w-fit items-center gap-1.5 rounded-lg border border-[#1f3d29] px-3.5 py-1.5 text-xs text-green-100/70 transition hover:bg-white/10 hover:text-white"
            >
              <Download size={13} /> Download
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
}
