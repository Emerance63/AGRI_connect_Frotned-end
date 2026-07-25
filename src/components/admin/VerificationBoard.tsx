"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, FileText, MapPin, Clock, Eye, X } from "lucide-react";
import {
  getByStatus,
  approveEntry,
  rejectEntry,
  type PendingEntry,
} from "@/lib/adminData";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-zinc-800 bg-zinc-950/75 p-6 ${className}`}>
      {children}
    </div>
  );
}

const stageStyles: Record<string, string> = {
  Pending: "bg-orange-500/15 text-orange-500",
  Approved: "bg-green-500/15 text-green-500",
  Rejected: "bg-red-500/15 text-red-400",
  Suspended: "bg-zinc-500/15 text-zinc-400",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function VerificationBoard() {
  const [queue, setQueue] = useState<PendingEntry[]>([]);
  const [reviewing, setReviewing] = useState<PendingEntry | null>(null);
  const [feedback, setFeedback] = useState("");

  function load() {
    // Show all pending entries (not yet approved/rejected)
    setQueue(getByStatus("Pending"));
  }

  useEffect(() => {
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  function handleApprove(email: string) {
    approveEntry(email);
    setFeedback(`✓ Approved successfully.`);
    load();
    setReviewing(null);
  }

  function handleReject(email: string) {
    rejectEntry(email);
    setFeedback(`✗ Entry rejected.`);
    load();
    setReviewing(null);
  }

  // Seed demo data on first load if queue is empty — so the board isn't blank
  useEffect(() => {
    const { submitForApproval, getByStatus: gbs } = require("@/lib/adminData");
    if (gbs("Pending").length === 0) {
      const demos = [
        { name: "Rulindo Coffee Coop", email: "rulindo@coop.rw", type: "Cooperative" as const, district: "Rulindo" },
        { name: "Bugesera Dairy Union", email: "bugesera@coop.rw", type: "Cooperative" as const, district: "Bugesera" },
        { name: "Kigali Fresh Ltd", email: "kigalifresh@buyer.rw", type: "Buyer" as const, district: "Kigali" },
        { name: "Nyaruguru Grain Coop", email: "nyaruguru@coop.rw", type: "Cooperative" as const, district: "Nyaruguru" },
      ];
      demos.forEach(submitForApproval);
      load();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approvedCount = getByStatus("Approved").length;

  return (
    <div className="flex-1 min-w-0 p-8 text-zinc-100 text-sm">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold m-0">Verification (RCA)</h1>
          <p className="text-zinc-400 text-[13.5px] m-0 mt-1">
            Review cooperative and buyer identity documents before approval
          </p>
        </div>
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
            <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Awaiting Review</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-500 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{queue.length}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Approved total</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-500 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{approvedCount}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Avg. review time</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-500 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">~6h</div>
        </Card>
      </div>

      {/* Queue */}
      <Card>
        <p className="text-[15.5px] font-bold m-0 mb-4">Verification Queue</p>

        {queue.length === 0 && (
          <p className="text-zinc-500 text-sm py-4 text-center">
            No pending entries. All registrations have been reviewed.
          </p>
        )}

        {queue.map((q) => (
          <div
            key={q.id}
            className="flex items-center justify-between py-3.5 border-b border-zinc-800 last:border-b-0 gap-3"
          >
            <div className="min-w-0">
              <div className="font-semibold text-[13.5px] mb-1 truncate">{q.name}</div>
              <div className="flex items-center gap-2 text-[11.5px] text-zinc-500 flex-wrap">
                <span className="bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded">{q.type}</span>
                <span className="flex items-center gap-1"><MapPin size={11} /> {q.district}</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {timeAgo(q.submittedAt)}</span>
                <span className="flex items-center gap-1"><FileText size={11} /> {q.docs} documents</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap ${stageStyles[q.status]}`}>
                {q.status}
              </span>
              <button
                onClick={() => setReviewing(q)}
                className="flex items-center gap-1.5 border border-zinc-700 text-zinc-300 text-xs px-3.5 py-1.5 rounded-md whitespace-nowrap hover:bg-zinc-800"
              >
                <Eye size={13} /> Review
              </button>
              <button
                onClick={() => handleApprove(q.email)}
                className="bg-green-500 text-black font-bold text-xs px-3.5 py-1.5 rounded-md whitespace-nowrap hover:bg-green-400"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(q.email)}
                className="bg-red-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-md whitespace-nowrap hover:bg-red-500"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </Card>

      {/* Review modal */}
      {reviewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Review: {reviewing.name}</h2>
              <button onClick={() => setReviewing(null)} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2 text-sm text-zinc-300 mb-6">
              <p><span className="text-zinc-500">Type:</span> {reviewing.type}</p>
              <p><span className="text-zinc-500">Email:</span> {reviewing.email}</p>
              <p><span className="text-zinc-500">District:</span> {reviewing.district}</p>
              <p><span className="text-zinc-500">Submitted:</span> {timeAgo(reviewing.submittedAt)}</p>
              <p><span className="text-zinc-500">Status:</span>{" "}
                <span className={`font-semibold ${stageStyles[reviewing.status]}`}>{reviewing.status}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleReject(reviewing.email)}
                className="flex-1 rounded-lg border border-red-600 py-2 text-sm font-semibold text-red-400 hover:bg-red-600 hover:text-white transition"
              >
                Reject
              </button>
              <button
                onClick={() => handleApprove(reviewing.email)}
                className="flex-1 rounded-lg bg-green-500 py-2 text-sm font-bold text-black hover:bg-green-400 transition"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
