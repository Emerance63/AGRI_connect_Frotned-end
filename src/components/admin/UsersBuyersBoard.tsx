"use client";

import { useEffect, useState } from "react";
import { Search, Users, ShoppingBag, UserCheck } from "lucide-react";
import {
  getQueue,
  suspendEntry,
  approveEntry,
  rejectEntry,
  type PendingEntry,
  type ApprovalStatus,
} from "@/lib/adminData";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-[#1f3d29] bg-[#112d1a] p-4">{children}</div>;
}

const statusStyles: Record<ApprovalStatus, string> = {
  Approved: "bg-green-500/20 text-green-400",
  Pending: "bg-amber-500/20 text-amber-400",
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

export default function UsersBuyersBoard() {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<PendingEntry[]>([]);
  const [feedback, setFeedback] = useState("");

  function load() {
    setEntries(getQueue());
  }

  useEffect(() => {
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const filtered = entries.filter((e) =>
    `${e.name} ${e.email} ${e.district}`.toLowerCase().includes(query.toLowerCase())
  );

  const cooperatives = entries.filter((e) => e.type === "Cooperative");
  const buyers = entries.filter((e) => e.type === "Buyer");
  const pending = entries.filter((e) => e.status === "Pending");

  function handleApprove(email: string) {
    approveEntry(email);
    setFeedback(`✓ Account approved. User can now log in.`);
    load();
  }

  function handleReject(email: string) {
    rejectEntry(email);
    setFeedback(`✗ Account rejected.`);
    load();
  }

  function handleSuspend(email: string) {
    suspendEntry(email);
    setFeedback(`Account suspended.`);
    load();
  }

  return (
    <div className="flex-1 min-w-0 p-8 text-white text-sm">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold m-0">Users &amp; Buyers</h1>
          <p className="text-green-100/50 text-[13.5px] m-0 mt-1">
            Manage cooperatives, farmers, and buyer accounts
          </p>
        </div>
      </div>

      {feedback && (
        <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-400 flex items-center justify-between">
          <span>{feedback}</span>
          <button onClick={() => setFeedback("")} className="text-green-400/60 hover:text-green-400 ml-4">✕</button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Cooperatives</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{cooperatives.length}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Buyers</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{buyers.length}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Pending Verification</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <UserCheck size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{pending.length}</div>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg border border-[#1f3d29] bg-[#112d1a] max-w-sm">
        <Search size={15} className="text-green-100/50 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or district"
          className="bg-transparent outline-none text-[13px] text-white placeholder:text-green-100/40 w-full"
        />
      </div>

      {/* Cards list */}
      <div className="space-y-3">
        {entries.length === 0 && (
          <Card>
            <p className="py-4 text-center text-green-100/50 text-sm">
              No registrations yet. Accounts appear here when cooperatives register.
            </p>
          </Card>
        )}

        {filtered.map((e) => (
          <div
            key={e.id}
            className="rounded-2xl border border-[#1f3d29] bg-[#112d1a] p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Info */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-[14px]">{e.name}</span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${statusStyles[e.status]}`}>
                  {e.status}
                </span>
              </div>
              <div className="text-[12px] text-green-100/50 mt-0.5">{e.email}</div>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11.5px] text-green-100/50">
                <span className="bg-white/10 border border-white/10 px-2 py-0.5 rounded">{e.type}</span>
                <span>📍 {e.district}</span>
                <span>🕐 {timeAgo(e.submittedAt)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 shrink-0">
              {e.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleApprove(e.email)}
                    className="rounded-lg bg-green-500 text-black font-bold text-xs px-4 py-2 hover:bg-green-400 transition"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReject(e.email)}
                    className="rounded-lg bg-red-600 text-white font-bold text-xs px-4 py-2 hover:bg-red-500 transition"
                  >
                    ✗ Reject
                  </button>
                </>
              )}
              {e.status === "Approved" && (
                <button
                  onClick={() => handleSuspend(e.email)}
                  className="rounded-lg border border-red-600 text-red-400 text-xs px-4 py-2 hover:bg-red-600 hover:text-white transition"
                >
                  Suspend
                </button>
              )}
              {(e.status === "Rejected" || e.status === "Suspended") && (
                <button
                  onClick={() => handleApprove(e.email)}
                  className="rounded-lg border border-green-500 text-green-400 text-xs px-4 py-2 hover:bg-green-500 hover:text-black transition"
                >
                  Re-approve
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && query && (
          <Card>
            <p className="py-4 text-center text-green-100/50 text-sm">No matches for &quot;{query}&quot;.</p>
          </Card>
        )}
      </div>

    </div>
  );
}
