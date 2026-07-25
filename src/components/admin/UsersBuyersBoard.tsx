"use client";

import { useEffect, useState } from "react";
import { Search, Users, ShoppingBag, UserCheck, MoreVertical, ShieldBan, ShieldCheck } from "lucide-react";
import { getQueue, suspendEntry, approveEntry, type PendingEntry, type ApprovalStatus } from "@/lib/adminData";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">{children}</div>;
}

const statusStyles: Record<ApprovalStatus, string> = {
  Approved: "bg-green-500/15 text-green-500",
  Pending: "bg-orange-500/15 text-orange-500",
  Rejected: "bg-red-500/15 text-red-500",
  Suspended: "bg-zinc-500/15 text-zinc-400",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function UsersBuyersBoard() {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<PendingEntry[]>([]);
  const [feedback, setFeedback] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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

  function handleSuspend(email: string) {
    suspendEntry(email);
    setFeedback(`Account suspended.`);
    setOpenMenu(null);
    load();
  }

  function handleApprove(email: string) {
    approveEntry(email);
    setFeedback(`Account approved.`);
    setOpenMenu(null);
    load();
  }

  return (
    <div className="flex-1 min-w-0 p-8 text-zinc-100 text-sm">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold m-0">Users &amp; Buyers</h1>
          <p className="text-zinc-400 text-[13.5px] m-0 mt-1">
            Manage cooperatives, farmers, and buyer accounts
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
            <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Cooperatives</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-500 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{cooperatives.length}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Buyers</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-500 flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{buyers.length}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-zinc-500">Pending Verification</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-500 flex items-center justify-center">
              <UserCheck size={16} />
            </div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{pending.length}</div>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950 max-w-sm">
          <Search size={15} className="text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or district"
            className="bg-transparent outline-none text-[13px] text-zinc-200 placeholder:text-zinc-600 w-full"
          />
        </div>

        {entries.length === 0 ? (
          <p className="py-8 text-center text-zinc-500 text-sm">
            No registrations yet. Accounts appear here when cooperatives register.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr_auto] gap-2 text-[11px] uppercase tracking-wide text-zinc-500 pb-2.5 border-b border-zinc-800">
              <span>Name</span>
              <span>Type</span>
              <span>District</span>
              <span>Status</span>
              <span>Registered</span>
              <span />
            </div>

            {filtered.map((e) => (
              <div
                key={e.id}
                className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr_auto] gap-2 items-center py-3.5 border-b border-zinc-800 last:border-b-0 text-[13.5px] relative"
              >
                <div>
                  <div className="font-semibold">{e.name}</div>
                  <div className="text-[11.5px] text-zinc-500">{e.email}</div>
                </div>
                <span className="text-zinc-400">{e.type}</span>
                <span className="text-zinc-400">{e.district}</span>
                <span>
                  <span className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-md ${statusStyles[e.status]}`}>
                    {e.status}
                  </span>
                </span>
                <span className="text-zinc-400 text-[12px]">{timeAgo(e.submittedAt)}</span>

                {/* Actions menu */}
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === e.id ? null : e.id)}
                    className="text-zinc-500 hover:text-white"
                  >
                    <MoreVertical size={16} />
                  </button>
                  {openMenu === e.id && (
                    <div className="absolute right-0 top-6 z-20 w-36 rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl overflow-hidden">
                      {e.status !== "Approved" && (
                        <button
                          onClick={() => handleApprove(e.email)}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-green-400 hover:bg-zinc-800"
                        >
                          <ShieldCheck size={13} /> Approve
                        </button>
                      )}
                      {e.status !== "Suspended" && (
                        <button
                          onClick={() => handleSuspend(e.email)}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:bg-zinc-800"
                        >
                          <ShieldBan size={13} /> Suspend
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filtered.length === 0 && query && (
              <div className="py-8 text-center text-zinc-500 text-sm">
                No matches for &quot;{query}&quot;.
              </div>
            )}
          </>
        )}
      </Card>

    </div>
  );
}
