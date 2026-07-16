"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";

export default function CooperativeLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-[#081F14]">

      {/* ── Mobile overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-16 z-40 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </aside>

      {/* ── Main ── */}
      <div className="flex flex-1 flex-col">
        {/* Mobile top bar with hamburger */}
        <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#0d2818] lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 dark:text-green-100/70 dark:hover:bg-white/10"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-800 dark:text-white">Menu</span>
        </div>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
