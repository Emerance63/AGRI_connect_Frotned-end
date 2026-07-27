"use client";

import { useEffect, useState } from "react";
import { Search, Users, ShoppingBag, UserCheck, RefreshCw, MapPin } from "lucide-react";
import {
  apiGetAllCooperatives,
  apiApproveCooperative,
  apiRejectCooperative,
  type CooperativeResponse,
} from "@/lib/apiClient";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-[#1f3d29] bg-[#112d1a] p-4">{children}</div>;
}

const statusStyles: Record<string, string> = {
  APPROVED: "bg-green-500/20 text-green-400",
  PENDING:  "bg-amber-500/20 text-amber-400",
  REJECTED: "bg-red-500/20 text-red-400",
};

export default function UsersBuyersBoard() {
  const [cooperatives, setCooperatives] = useState<CooperativeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [acting, setActing] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await apiGetAllCooperatives();
      setCooperatives(data);
    } catch (e) {
      setError("Unable to load data. Ensure you are signed in as SYSTEM_ADMIN.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = cooperatives.filter((c) =>
    `${c.name} ${c.district} ${c.province} ${c.registrationNumber}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const approved = cooperatives.filter((c) => c.status === "APPROVED").length;
  const pending  = cooperatives.filter((c) => c.status === "PENDING").length;
  const total    = cooperatives.length;

  async function handleApprove(coop: CooperativeResponse) {
    setActing(coop.cooperativeId);
    try {
      await apiApproveCooperative(coop.cooperativeId);
      setFeedback(`✓ ${coop.name} approved. They can now log in.`);
      await load();
    } catch (e) {
      setFeedback(`Failed to approve ${coop.name}. Check admin permissions.`);
      console.error(e);
    } finally {
      setActing(null);
    }
  }

  async function handleReject(coop: CooperativeResponse) {
    setActing(coop.cooperativeId);
    try {
      await apiRejectCooperative(coop.cooperativeId);
      setFeedback(`✗ ${coop.name} rejected.`);
      await load();
    } catch (e) {
      setFeedback(`Failed to reject ${coop.name}.`);
      console.error(e);
    } finally {
      setActing(null);
    }
  }

  return (
    <div className="flex-1 min-w-0 p-4 sm:p-8 text-white text-sm">

      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Cooperatives</h1>
          <p className="text-green-100/50 text-[13.5px] mt-1">
            All registered cooperatives — manage access and approval
          </p>
        </div>
        <button onClick={load}
          className="flex items-center gap-2 rounded-lg border border-[#1f3d29] px-4 py-2 text-xs font-semibold text-green-100/70 hover:bg-white/5 transition">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {feedback && (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-400">
          <span>{feedback}</span>
          <button onClick={() => setFeedback("")} className="ml-4 text-green-400/60 hover:text-green-400">✕</button>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Total</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center"><Users size={16} /></div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{total}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Approved</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center"><ShoppingBag size={16} /></div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{approved}</div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <span className="text-[11.5px] uppercase tracking-wide text-green-100/50">Pending</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center"><UserCheck size={16} /></div>
          </div>
          <div className="text-[26px] font-bold mt-2.5">{pending}</div>
        </Card>
      </div>

      <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg border border-[#1f3d29] bg-[#112d1a] max-w-sm">
        <Search size={15} className="text-green-100/50 shrink-0" />
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, district, or reg. number"
          className="bg-transparent outline-none text-[13px] text-white placeholder:text-green-100/40 w-full" />
      </div>

      <div className="space-y-3">
        {loading && (
          <Card>
            <div className="flex items-center justify-center py-10 gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
              <span className="text-green-100/50 text-sm">Loading from API…</span>
            </div>
          </Card>
        )}

        {!loading && cooperatives.length === 0 && (
          <Card>
            <p className="py-4 text-center text-green-100/50 text-sm">No cooperatives found.</p>
          </Card>
        )}

        {!loading && filtered.map((coop) => (
          <div key={coop.cooperativeId}
            className="rounded-2xl border border-[#1f3d29] bg-[#112d1a] p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-[14px]">{coop.name}</span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${statusStyles[coop.status] ?? "bg-white/10 text-green-100/50"}`}>
                  {coop.status}
                </span>
              </div>
              <div className="text-[12px] text-green-100/50">{coop.registrationNumber}</div>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11.5px] text-green-100/50">
                <span className="flex items-center gap-1"><MapPin size={11} /> {coop.district}, {coop.province}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {coop.status === "PENDING" && (
                <>
                  <button onClick={() => handleApprove(coop)} disabled={acting === coop.cooperativeId}
                    className="rounded-lg bg-green-500 text-black font-bold text-xs px-4 py-2 hover:bg-green-400 disabled:opacity-50 transition">
                    {acting === coop.cooperativeId ? "…" : "✓ Approve"}
                  </button>
                  <button onClick={() => handleReject(coop)} disabled={acting === coop.cooperativeId}
                    className="rounded-lg bg-red-600 text-white font-bold text-xs px-4 py-2 hover:bg-red-500 disabled:opacity-50 transition">
                    {acting === coop.cooperativeId ? "…" : "✗ Reject"}
                  </button>
                </>
              )}
              {coop.status === "APPROVED" && (
                <button onClick={() => handleReject(coop)} disabled={acting === coop.cooperativeId}
                  className="rounded-lg border border-red-600 text-red-400 text-xs px-4 py-2 hover:bg-red-600 hover:text-white disabled:opacity-50 transition">
                  Revoke
                </button>
              )}
              {coop.status === "REJECTED" && (
                <button onClick={() => handleApprove(coop)} disabled={acting === coop.cooperativeId}
                  className="rounded-lg border border-green-500 text-green-400 text-xs px-4 py-2 hover:bg-green-500 hover:text-black disabled:opacity-50 transition">
                  Re-approve
                </button>
              )}
            </div>
          </div>
        ))}

        {!loading && filtered.length === 0 && query && (
          <Card><p className="py-4 text-center text-green-100/50 text-sm">No matches for &quot;{query}&quot;.</p></Card>
        )}
      </div>
    </div>
  );
}
