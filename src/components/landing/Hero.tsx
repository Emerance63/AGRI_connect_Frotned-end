"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Lush green agricultural field in Rwanda"
          fill
          className="object-cover"
          priority
          quality={90}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-24 lg:px-8">
        {/* Badge */}
        <div className="mb-8 animate-[fadeInUp_0.6s_ease-out_both]">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/15 px-5 py-2.5 text-sm font-medium text-accent-400 backdrop-blur-sm">
            <span className="text-base"></span>
            {t.hero.badge}
          </span>
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[5.25rem] animate-[fadeInUp_0.8s_ease-out_0.15s_both]">
          <span className="text-white">{t.hero.headline1}</span>
          <br />
          <span className="text-brand-500">{t.hero.headline2}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
          {t.hero.description}
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-[fadeInUp_0.8s_ease-out_0.45s_both]">
          <Link
            href="/products"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-500/30 active:scale-[0.98]"
          >
            {t.hero.exploreProducts}
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border-2 border-brand-500/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-brand-500 hover:bg-brand-500/10 active:scale-[0.98]"
          >
            {t.hero.joinCooperative}
          </Link>
        </div>
      </div>
    </section>
  );
}
