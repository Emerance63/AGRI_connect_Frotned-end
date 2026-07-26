"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, FileText, MapPin, Clock, Eye, X, RefreshCw } from "lucide-react";
import {
  getQueue,
  getByStatus,
  approveEntry,
  rejectEntry,
  submitForApproval,
  type PendingEntry,
  type ApprovalStatus,
} from "@/lib/adminData";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#1f3d29] bg-[#112d1a] p-6 ${className}`}>
      {children}
    </div>
  );
}

const stageStyles: Record<ApprovalStatus, string> = {
  Pending: "bg-amber-500/20 text-amber-400",
  Approved: "bg-green-500/20 text-green-400",
  Rejected: "bg-red-500/20 text-red-400",
  Suspended: "bg-white/10 text-green-100/50",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const DEMO_ENTRIES = [
  { name: "Rulindo Coffee Coop", email: "rulindo@coop.rw", type: "Cooperative" as const, district: "Rulindo" },
  { name: "Bugesera Dairy Union", email: "bugesera@coop.rw", type: "Cooperative" as const, district: "Bugesera" },
  { name: "Kigali Fresh Ltd", email: "kigalifresh@buyer.rw", type: "Buyer" as const, district: "Kigali" },
  { name: "Nyaruguru Grain Coop", email: "nyaruguru@coop.rw", type: "Cooperative" as const, district: "Nyaruguru" },
];

export default function VerificationBoard() {
  const [allEntries, setAllEntries] = useState<PendingEntry[]>([]);
  const [filterStatus, setFilterStatus] = useState<"All" | ApprovalStatus>("All");
  const [reviewing, setReviewing] = useState<PendingEntry | null>(null);
  const [feedback, setFeedback] = useState("");

  function load() {
    setAllEntries(getQueue());
  }

  useEffect(() => {
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  // Seed demo data if the queue is completely empty
  useEffect(() => {
    if (getQueue().length === 0) {
      DEMO_ENTRIES.forEach(submitForApproval);
      load();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleApprove(email: string) {
    approveEntry(email);
    setFeedback(`✓ ${email} approved. They can now log in.`);
    load();
    setReviewing(null);
  }

  function handleReject(email: string) {
    rejectEntry(email);
    setFeedback(`✗ ${email} rejected.`);
    load();
    setReviewing(null);
  }

  function handleReseed() {
    DEMO_ENTRIES.forEach(submitForApproval);
    load();
    setFeedback("Demo entries added to queue.");
  }

  const displayed = filterStatus === "All"
    ? allEntries
    : allEntries.filter((e) => e.status === filterStatus);

  const pendingCount = allEntries.filter((e) => e.status === "Pending").length;
  const approvedCount = allEntries.filter((e) => e.status === "Approved").length;
  const rejectedCount = allEntries.filter((e) => e.status === "Rejected").length;

  return (
    <div className="flex-1 min-w-0 p-8 text-white text-sm">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold m-0">Verification (RCA)</h1>
          <p className="text-green-100/50 text-[13.5px] m-0 mt-1">
            Review cooperative and buyer registrations before granting access
          </p>
        </div>
        <button
          onClick={handleReseed}
          className="flex items-center gap-2 rounded-lg border border-[#1f3d29] px-4 py-2 text-xs font-semibold text-green-100/70 hover:bg-white/5"
        >
          <RefreshCw size={13} /> Add demo entries
        </button>
      </div>

      {feedback && (
        <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-400">
          {feedback}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Pending Review</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5 text-amber-400">{pendingCount}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Approved</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5 text-green-400">{approvedCount}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Rejected</span>
            <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5 text-red-400">{rejectedCount}</div>
        </Card>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(["All", "Pending", "Approved", "Rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
              filterStatus === s
                ? "bg-green-600 text-white"
                : "border border-[#1f3d29] text-green-100/50 hover:bg-white/5"
            }`}
          >
            {s} {s !== "All" && `(${allEntries.filter((e) => e.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Queue table */}
      <Card>
        <p className="text-[15.5px] font-bold m-0 mb-4">
          {filterStatus === "All" ? "All Registrations" : `${filterStatus} Registrations`}
          <span className="ml-2 text-green-100/50 text-sm font-normal">({displayed.length})</span>
        </p>

        {displayed.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-green-100/50 text-sm">
              {allEntries.length === 0
                ? 'No registrations yet. Click "Add demo entries" to populate the queue.'
                : `No ${filterStatus.toLowerCase()} entries.`}
            </p>
          </div>
        )}

        {displayed.map((q) => (
          <div
            key={q.id}
            className="flex flex-col gap-3 py-4 border-b border-[#1f3d29] last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="font-semibold text-[13.5px] mb-1">{q.name}</div>
              <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-green-100/50">
                <span className="bg-white/10 border border-white/10 px-2 py-0.5 rounded">{q.type}</span>
                <span className="flex items-center gap-1"><MapPin size={11} /> {q.district}</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {timeAgo(q.submittedAt)}</span>
                <span className="flex items-center gap-1"><FileText size={11} /> {q.docs} docs</span>
                <span className="text-[11px] text-green-100/40">{q.email}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap ${stageStyles[q.status]}`}>
                {q.status}
              </span>
              <button
                onClick={() => setReviewing(q)}
                className="flex items-center gap-1.5 border border-[#1f3d29] text-green-100/70 text-xs px-3 py-1.5 rounded-md hover:bg-white/5"
              >
                <Eye size={12} /> Details
              </button>
              {q.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleApprove(q.email)}
                    className="bg-green-500 text-black font-bold text-xs px-3.5 py-1.5 rounded-md hover:bg-green-400 transition"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReject(q.email)}
                    className="bg-red-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-md hover:bg-red-500 transition"
                  >
                    ✗ Reject
                  </button>
                </>
              )}
              {q.status === "Approved" && (
                <button
                  onClick={() => handleReject(q.email)}
                  className="border border-red-600 text-red-400 text-xs px-3.5 py-1.5 rounded-md hover:bg-red-600 hover:text-white transition"
                >
                  Revoke
                </button>
              )}
              {q.status === "Rejected" && (
                <button
                  onClick={() => handleApprove(q.email)}
                  className="border border-green-500 text-green-400 text-xs px-3.5 py-1.5 rounded-md hover:bg-green-500 hover:text-black transition"
                >
                  Re-approve
                </button>
              )}
            </div>
          </div>
        ))}
      </Card>

      {/* Detail modal */}
      {reviewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#1f3d29] bg-[#112d1a] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">{reviewing.name}</h2>
              <button onClick={() => setReviewing(null)} className="text-green-100/50 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-sm text-green-100/70 mb-6">
              <div className="flex justify-between">
                <span className="text-green-100/50">Type</span>
                <span>{reviewing.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-100/50">Email</span>
                <span className="text-green-400">{reviewing.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-100/50">District</span>
                <span>{reviewing.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-100/50">Submitted</span>
                <span>{timeAgo(reviewing.submittedAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-100/50">Status</span>
                <span className={`font-semibold ${stageStyles[reviewing.status]}`}>{reviewing.status}</span>
              </div>
            </div>

            {reviewing.status === "Pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleReject(reviewing.email)}
                  className="flex-1 rounded-lg border border-red-600 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-600 hover:text-white transition"
                >
                  ✗ Reject
                </button>
                <button
                  onClick={() => handleApprove(reviewing.email)}
                  className="flex-1 rounded-lg bg-green-500 py-2.5 text-sm font-bold text-black hover:bg-green-400 transition"
                >
                  ✓ Approve
                </button>
              </div>
            )}
            {reviewing.status === "Approved" && (
              <button
                onClick={() => handleReject(reviewing.email)}
                className="w-full rounded-lg border border-red-600 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-600 hover:text-white transition"
              >
                Revoke Access
              </button>
            )}
            {reviewing.status === "Rejected" && (
              <button
                onClick={() => handleApprove(reviewing.email)}
                className="w-full rounded-lg bg-green-500 py-2.5 text-sm font-bold text-black hover:bg-green-400 transition"
              >
                Re-approve
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
