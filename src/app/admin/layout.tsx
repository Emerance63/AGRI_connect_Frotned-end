"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/Adminsidebar";
import { Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1f3d29] text-green-100/70 hover:bg-white/5"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>
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
        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
