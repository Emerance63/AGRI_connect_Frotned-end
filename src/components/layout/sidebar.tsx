"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

type SidebarProps = {
  onClose?: () => void;
};

/* Icons defined outside the component to avoid re-creation on every render */
const icons = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  inventory: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 8v13H3V8" />
      <path d="M1 3h22v5H1z" />
      <path d="M10 12h4" />
    </svg>
  ),
  products: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 7 12 3 4 7v10l8 4 8-4V7z" />
      <path d="M4 7l8 4 8-4" />
      <path d="M12 11v10" />
    </svg>
  ),
  orders: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  buyers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  reports: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  ),
};

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { name: t.dashboard.sidebarDashboard, href: "/dashboard", icon: icons.dashboard },
    { name: t.dashboard.sidebarInventory, href: "/inventory", icon: icons.inventory },
    { name: t.dashboard.sidebarProducts, href: "/cooperative/products", icon: icons.products },
    { name: t.dashboard.sidebarOrders, href: "/orders", icon: icons.orders },
    { name: t.dashboard.sidebarBuyers, href: "/buyers", icon: icons.buyers },
    { name: t.dashboard.sidebarReports, href: "/reports", icon: icons.reports },
  ];

  return (
    <aside className="flex h-full w-64 flex-col bg-[#0d2818] text-white">
      {/* Nav items */}
      <nav className="flex-1 space-y-1 px-3 pt-4">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                  ? "bg-green-600 text-white"
                  : "text-green-100/70 hover:bg-white/5 hover:text-white"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / cooperative info */}
      <div className="flex items-center gap-3 border-t border-white/10 px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-semibold">
          GC
        </div>
        <div className="text-sm">
          <p className="font-medium">Green Valley Coop</p>
          <p className="text-xs text-green-100/60">{t.dashboard.sidebarCooperative}</p>
        </div>
      </div>
    </aside>
  );
}