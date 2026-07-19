import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AgriConnect Rwanda — our mission, vision, and how we connect farmers and cooperatives to buyers across Rwanda.",
};

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const MISSION_VISION = [
  {
    label: "Our Mission",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    text: "To empower Rwandan farmer cooperatives by connecting them with markets, technology, transparency, and sustainable value chains.",
  },
  {
    label: "Our Vision",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    text: "A thriving digital agricultural ecosystem where every Rwandan farmer and every buyer can trade fairly, simply, and with confidence.",
  },
];

const HOW_WE_CONNECT = [
  {
    step: "01",
    title: "Cooperatives Register",
    description: "Farmer cooperatives create a verified profile and list their agricultural products on the platform.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Products Are Discovered",
    description: "Buyers browse fresh produce, compare prices, and find cooperatives that match their needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Direct Matching",
    description: "We eliminate middlemen so farmers earn more and buyers get fresher produce at better prices.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Partnerships Grow",
    description: "Long-term relationships between cooperatives and buyers power sustainable agricultural trade.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 11h1a3 3 0 0 1 0 6h-1" /><path d="M9 12H4a3 3 0 0 0 0 6h1" /><line x1="12" x2="12" y1="7" y2="7" /><path d="M12 3a4 4 0 0 1 4 4v10a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4Z" />
      </svg>
    ),
  },
];

const WHY_CHOOSE = [
  {
    title: "Verified Cooperatives",
    description: "Every cooperative is government registered and quality-audited before listing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Transparent Marketplace",
    description: "No hidden fees. Prices, terms, and cooperative details are always visible to buyers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" />
      </svg>
    ),
  },
  {
    title: "Better Market Access",
    description: "Small cooperatives reach national and international buyers they could never reach alone.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
  },
  {
    title: "Sustainable Agriculture",
    description: "We promote eco-friendly farming practices that protect Rwanda's land for future generations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
];

const STATS = [
  { value: "500+", label: "Cooperatives Connected" },
  { value: "1,000+", label: "Agricultural Products" },
  { value: "50+", label: "Business Buyers" },
  { value: "30+", label: "Districts Reached" },
];

const COMMUNITY = [
  {
    role: "Farmers",
    description: "Empowering farmers to grow better and earn more",
    image: "/images/products/famers.jpeg",
  },
  {
    role: "Cooperatives",
    description: "Helping cooperatives reach national markets",
    image: "/images/products/ct-farm.jpg",
  },
  {
    role: "Buyers",
    description: "Bridging buyers with quality Rwandan produce",
    image: "/images/products/Buyers.jpg",
  },
];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface dark:bg-brand-950">

      {/* ── WHO WE ARE ── */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="relative h-72 sm:h-96 lg:h-[460px] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            <Image
              src="/images/products/who.jpeg"
              alt="Rwandan farmer working in the field"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Text */}
          <div>
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-widest text-brand-500">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-tight">
              Who We Are
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink-muted">
              AgriConnect Rwanda is a digital agricultural society / marketplace platform designed to
              connect farmers with buyers. We help bridge the gap between cooperatives and markets. Our
              platform enables cooperatives and enterprises to showcase their products and reach
              all local cooperatives and enterprises that produce and have been all over cooperatives.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-ink">Empowering Cooperatives</h3>
                  <p className="text-sm text-ink-muted mt-0.5">We support farmer groups to formalise and access new market opportunities.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-ink">Building Team</h3>
                  <p className="text-sm text-ink-muted mt-0.5">Helping farmers and buyers build lasting partnerships and trust in the ecosystem.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-surface-alt border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-brand-500">
              Our Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Mission &amp; Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MISSION_VISION.map(({ label, icon, text }) => (
              <div
                key={label}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-surface-card p-8 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/10">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-ink">{label}</h3>
                <p className="text-ink-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE CONNECT ── */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-brand-500">
              Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              How We Connect Agriculture
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_WE_CONNECT.map(({ step, title, description, icon }) => (
              <div
                key={step}
                className="relative flex flex-col gap-4 rounded-2xl border border-border bg-surface-card p-6 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                  {icon}
                </div>
                <span className="absolute top-5 right-5 text-3xl font-black text-brand-500/10 select-none">
                  {step}
                </span>
                <h3 className="text-base font-bold text-ink">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-surface-alt border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-brand-500">
              Our Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Why Choose AgriConnect?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map(({ title, description, icon }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-card p-6 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                  {icon}
                </div>
                <h3 className="text-base font-bold text-ink">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-brand-500">
              Our Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Growing Together Across Rwanda
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface-card p-8 text-center hover:border-brand-500/40 transition-all duration-300"
              >
                <span className="text-4xl sm:text-5xl font-black text-brand-500">{value}</span>
                <span className="mt-3 text-sm font-medium text-ink-muted uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET THE COMMUNITY ── */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-surface-alt border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-brand-500">
              Community
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Meet The Community
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {COMMUNITY.map(({ role, description, image }) => (
              <div
                key={role}
                className="group relative overflow-hidden rounded-2xl h-64 sm:h-72 border border-border"
              >
                <Image
                  src={image}
                  alt={role}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-bold text-white">{role}</h3>
                  <p className="text-sm text-gray-300 mt-1">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/products/ct-farm.jpg"
                alt="Farm background"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-green-900/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 sm:py-24">
              <span className="inline-block mb-4 text-xs font-bold uppercase tracking-widest text-brand-300">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-2xl">
                Join the Future of Agriculture
              </h2>
              <p className="mt-5 max-w-xl text-base sm:text-lg text-green-100 leading-relaxed">
                Whether you are a cooperative looking for new markets or a buyer who wants trusted suppliers,
                AgriConnect helps you build meaningful agricultural connections.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:bg-brand-400 hover:shadow-xl"
                >
                  Join AgriConnect
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
