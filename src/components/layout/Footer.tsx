"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("RWF");
  const { t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="border-t border-white/10 bg-[#081f14]">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Section 1: AgriConnect Info */}
          <div className="space-y-6">
            {/* Logo and Description */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/20">
                <span className="font-display text-lg font-black tracking-tight text-white">AC</span>
              </div>
              <div>
                <span className="block text-sm font-bold leading-tight text-white">
                  AgriConnect Rwanda
                </span>
                <span className="block text-[11px] font-medium leading-tight text-gray-400">
                  Connecting Farmers to Markets
                </span>
              </div>
            </div>
            <p className="text-sm text-brand-300">
              {t.footer.description}
            </p>

            {/* Email Subscription */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                {t.footer.stayUpdated}
              </h4>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg border border-brand-800 bg-brand-900/50 px-3 py-2 text-sm text-brand-400 placeholder:text-brand-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-orange-500"
                >
                  {t.footer.subscribe}
                </button>
              </form>
            </div>

            {/* Certified By */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                {t.footer.certifiedBy}
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-brand-900/50 border border-brand-800 px-3 py-1 text-xs font-medium text-brand-300">NAEB</span>
                <span className="rounded-full bg-brand-900/50 border border-brand-800 px-3 py-1 text-xs font-medium text-brand-300">RAB</span>
                <span className="rounded-full bg-brand-900/50 border border-brand-800 px-3 py-1 text-xs font-medium text-brand-300">Fair Trade</span>
                <span className="rounded-full bg-brand-900/50 border border-brand-800 px-3 py-1 text-xs font-medium text-brand-300">ISO 22000</span>
              </div>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="text-sm text-brand-300 hover:text-brand-500 transition-colors">
                  {t.footer.coopDashboard}
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-brand-300 hover:text-brand-500 transition-colors">
                  {t.footer.coopLogin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Legal/Quality */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t.footer.legalQuality}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-brand-400 hover:text-brand-500 transition-colors">
                  {t.footer.qualityStandards}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-brand-300 hover:text-brand-500 transition-colors">
                  {t.footer.termsOfService}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-brand-300 hover:text-brand-500 transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact & Social */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold tex-white mb-2">{t.footer.contact}</h3>
              <a href="mailto:info@agriconnect.rw" className="text-sm text-brand-300 hover:text-brand-500 transition-colors">
                info@agriconnect.rw
              </a>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-400 mb-3">
                {t.footer.followUs}
              </h4>
              <div className="flex gap-3">
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-brand-600 hover:text-white transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900/50 border border-brand-800 text-brand-300 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-.976 0-1.28.606-1.28 1.229v2.254h3.47l-.557 3.47h-2.913v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-brand-600 hover:text-white transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-brand-600 hover:text-white transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-brand-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-brand-400">
              {t.footer.rights}
            </p>
            <p className="text-sm text-brand-400">
              {t.footer.madeWith}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-brand-400">{t.footer.currency}</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-lg border border-brand-800 bg-brand-900/50 px-3 py-1.5 text-sm text-brand-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="RWF">RWF</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
