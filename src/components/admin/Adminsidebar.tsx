"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, Users, ShieldCheck, BarChart3, Settings, Shield, LogOut,
} from "lucide-react";

const navItems = [
  { icon: LayoutGrid, label: "Platform Overview", href: "/admin" },
  { icon: Users,      label: "Cooperatives",         href: "/admin/users" },
  { icon: ShieldCheck,label: "Verification (RCA)", href: "/admin/verification" },
  { icon: BarChart3,  label: "Reports",            href: "/admin/reports" },
  { icon: Settings,   label: "Platform Settings",  href: "/admin/settings" },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 shrink-0 flex-col border-r border-[#1f3d29] bg-[#0d2818] p-3.5 font-sans">

      {/* Brand */}
      <div className="flex items-center gap-2.5 px-1.5 pb-4 pt-1">
        <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-400 flex items-center justify-center">
          <Shield size={16} />
        </div>
        <div>
          <div className="font-semibold text-[14px] text-white">AgriConnect</div>
          <div className="text-[11px] text-green-100/50">Platform Admin</div>
        </div>
      </div>

      {/* Switch to Home */}
      <Link
        href="/"
        onClick={onClose}
        className="mb-4 flex items-center gap-2 rounded-lg border border-[#1f3d29] px-3 py-2.5 text-[13px] font-medium text-green-100/70 transition-colors hover:border-white/10 hover:bg-white/5 hover:text-white"
      >
        <LogOut size={15} />
        Switch to Home
      </Link>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] transition-colors ${
                isActive
                  ? "bg-green-600 font-semibold text-white"
                  : "text-green-100/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              <span className="truncate">{label}</span>
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Admin profile footer */}
      <div className="mt-auto border-t border-[#1f3d29] pt-3.5">
        <div className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-white/5 transition-colors">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
            AD
          </div>
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold text-white">Platform Admin</div>
            <div className="truncate text-[11px] text-green-100/50">admin@agriconnect.rw</div>
          </div>
        </div>
      </div>
    </div>
  );
}
