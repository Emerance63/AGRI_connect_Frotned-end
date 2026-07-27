"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/Adminsidebar";
import { Menu, X } from "lucide-react";
import { apiGetPendingCooperatives } from "@/lib/apiClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    apiGetPendingCooperatives()
      .then((data) => setPendingCount(data.length))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#081F14] flex flex-col">

      {/* ── Mobile top bar ── */}
      <header className="flex h-13 shrink-0 items-center justify-between border-b border-[#1f3d29] bg-[#0d2818] px-4 lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-black">
            AC
          </div>
          <span className="text-sm font-bold text-white">Admin Panel</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Pending notification bell */}
          {pendingCount > 0 && (
            <Link
              href="/admin/verification"
              title={`${pendingCount} cooperative${pendingCount > 1 ? "s" : ""} pending approval`}
              className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-black">
                {pendingCount}
              </span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1f3d29] text-green-100/70 hover:bg-white/5"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ── */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 flex-col bg-[#0d2818] transition-transform duration-300 lg:relative lg:translate-x-0 lg:flex ${
            sidebarOpen ? "flex translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button — mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-green-100/50 hover:bg-white/5 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>

          <AdminSidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* ── Main content ── */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

          {/* Desktop top bar with notification bell */}
          <div className="hidden lg:flex h-12 shrink-0 items-center justify-end gap-3 border-b border-[#1f3d29] bg-[#0d2818] px-6">
            {pendingCount > 0 && (
              <Link
                href="/admin/verification"
                title={`${pendingCount} cooperative${pendingCount > 1 ? "s" : ""} pending approval`}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-black">
                  {pendingCount}
                </span>
              </Link>
            )}
            <Link
              href="/"
              className="text-[11px] font-medium text-green-100/50 hover:text-white transition"
            >
              ← Back to site
            </Link>
          </div>

          <main className="flex-1 min-w-0 overflow-y-auto">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}
