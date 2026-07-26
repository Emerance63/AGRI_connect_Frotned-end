"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Users,
    ShieldCheck,
    BarChart3,
    Settings,
    Shield,
    LogOut,
} from "lucide-react";

const navItems = [
    { icon: LayoutGrid, label: "Platform Overview", href: "/admin" },
    { icon: Users, label: "Users & Buyers", href: "/admin/users" },
    { icon: ShieldCheck, label: "Verification (RCA)", href: "/admin/verification" },
    { icon: BarChart3, label: "Reports", href: "/admin/reports" },
    { icon: Settings, label: "Platform Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-56 shrink-0 border-r border-[#1f3d29] bg-[#0d2818] p-3.5 flex flex-col font-sans">
            {/* Brand */}
            <div className="flex items-center gap-2.5 px-1.5 pb-4">
                <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-500 flex items-center justify-center">
                    <Shield size={16} />
                </div>
                <div>
                    <div className="font-display font-semibold text-[14px] text-white">AgriConnect</div>
                    <div className="text-[11px] text-green-100/50">Platform Admin</div>
                </div>
            </div>

            {/* Switch to Home */}
            <Link
                href="/"
                className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-lg border border-[#1f3d29] text-green-100/70 text-[13px] font-medium hover:bg-white/5 hover:border-white/10 hover:text-white transition-colors"
            >
                <LogOut size={15} />
                Switch to Home
            </Link>

            {/* Nav items */}
            <nav className="flex flex-col gap-0.5">
                {navItems.map(({ icon: Icon, label, href }) => {
                    // Exact match for /admin, prefix match for nested routes
                    const isActive =
                        href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

                    return (
                        <Link
                            key={label}
                            href={href}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] transition-colors ${
                                isActive
                                    ? "bg-green-600 text-white font-semibold"
                                    : "text-green-100/50 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <Icon size={16} />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Admin profile footer */}
            <div className="mt-auto pt-3.5 border-t border-[#1f3d29]">
                <div className="flex items-center gap-2.5 p-1.5">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs">
                        AD
                    </div>
                    <div>
                        <div className="text-[13px] font-semibold text-white">Platform Admin</div>
                        <div className="text-[11px] text-green-100/50">admin@agriconnect.rw</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
