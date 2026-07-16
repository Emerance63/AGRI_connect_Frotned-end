"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/dashboard", label: "Cooperative Dashboard" },
  { href: "/login", label: "Cooperative Login" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Track scroll for background blur ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close mobile menu on route change ── */
  useEffect(() => setMobileOpen(false), [pathname]);

  /* ── Lock body scroll when menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5 border-b border-border dark:bg-brand-900/95 dark:shadow-black/10 dark:border-brand-700/30"
          : "bg-white/70 backdrop-blur-sm dark:bg-brand-900/70"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* ── Logo ── */}
        <Link href="/" className="group flex items-center gap-3">
          {/* Icon mark */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/20 transition-shadow group-hover:shadow-brand-500/40">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5.8-6.4 3-10" />
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
            </svg>
          </div>
          {/* Text */}
          <div className="hidden sm:block">
            <span className="block text-base font-bold leading-tight text-black dark:text-white">
              AgriConnect Rwanda
            </span>
            <span className="block text-[11px] font-medium leading-tight text-gray-600 dark:text-brand-300/70">
              Connecting Farmers to Markets
            </span>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <div className="hidden lg:flex items-center gap-1">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                        : "text-gray-700 hover:text-black hover:bg-black/5 dark:text-brand-200 dark:hover:text-white dark:hover:bg-white/[.06]"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── RW badge + theme toggle ── */}
          <div className="ml-5 flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-md bg-black/5 border border-black/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-black dark:bg-white/[.07] dark:border-white/[.08] dark:text-brand-200">
              <span className="text-[10px]">🇷🇼</span> RW
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-black transition-colors hover:bg-black/5 dark:text-brand-200 dark:hover:bg-white/[.06] dark:hover:text-white lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <div className="relative h-5 w-5">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300",
                mobileOpen ? "top-[9px] rotate-45" : "top-[3px]"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[9px] block h-0.5 w-5 bg-current transition-all duration-300",
                mobileOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300",
                mobileOpen ? "top-[9px] -rotate-45" : "top-[15px]"
              )}
            />
          </div>
        </button>
      </div>

      {/* ── Mobile overlay ── */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile menu panel ── */}
      <div
        className={cn(
          "absolute inset-x-0 top-16 border-b border-border bg-white shadow-2xl shadow-black/10 transition-all duration-300 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto dark:border-brand-700/30 dark:bg-brand-900 dark:shadow-black/30",
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map(({ href, label }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-500 text-white"
                      : "text-gray-700 hover:bg-black/5 hover:text-black dark:text-brand-200 dark:hover:bg-white/[.06] dark:hover:text-white"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}

          {/* Mobile theme toggle */}
          <li className="mt-2 flex items-center justify-between border-t border-border px-4 pt-4 dark:border-brand-700/30">
            <span className="text-sm text-black dark:text-brand-300">Appearance</span>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
