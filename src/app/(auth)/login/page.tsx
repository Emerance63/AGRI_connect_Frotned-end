"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  const [coopName, setCoopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = signIn(email, password);
    if (!result.ok) {
      setError(result.message ?? "Unable to sign in.");
      return;
    }
    router.replace("/dashboard");
  };

  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-[#06170d] sm:px-6 lg:flex lg:items-center lg:justify-center lg:px-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-sm border border-emerald-500/50 bg-white shadow-2xl shadow-black/30 dark:bg-[#071b0f] lg:grid lg:min-h-[600px] lg:grid-cols-2">
        <section
          className="relative min-h-[400px] overflow-hidden bg-cover bg-center sm:min-h-[480px] lg:min-h-full"
          style={{ backgroundImage: "url('/images/products/regg.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/65 via-emerald-900/70 to-emerald-950/90" />
          <div className="relative flex h-full flex-col justify-end p-7 text-white sm:p-10 lg:p-12">
            <Link href="/" className="absolute left-7 top-7 rounded-lg border border-white/40 bg-emerald-950/50 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-900 sm:left-10 sm:top-10 lg:left-12 lg:top-12">
              ← Back to home
            </Link>
            <h1 className="text-3xl font-bold leading-none sm:text-4xl">
              {t.login.title}
              <span className="block text-emerald-400">{t.login.subtitle}</span>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-emerald-50/90">
              {t.login.description}
            </p>
            <div className="mt-8">
              <h2 className="text-sm font-semibold">{t.login.whyJoin}</h2>
              <ul className="mt-4 space-y-2.5 text-xs text-emerald-50/90 sm:text-sm">
                {t.login.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="flex items-center bg-white px-6 py-12 dark:bg-[#071b0f] sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.login.formTitle}</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-emerald-100/55">{t.login.formSubtitle}</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-emerald-50">{t.login.coopName}</label>
                <input value={coopName} onChange={(event) => setCoopName(event.target.value)} placeholder={t.login.coopNamePlaceholder} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-emerald-900/70 dark:bg-[#0d2a19] dark:text-white dark:placeholder:text-emerald-100/30" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-emerald-50">{t.login.email}</label>
                <input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder={t.login.emailPlaceholder} required className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-emerald-900/70 dark:bg-[#0d2a19] dark:text-white dark:placeholder:text-emerald-100/30" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label className="text-xs font-medium text-gray-700 dark:text-emerald-50">{t.login.password}</label>
                  <Link href="/forgot-password" className="text-xs text-emerald-600 transition hover:text-emerald-500 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300">{t.login.forgotPassword}</Link>
                </div>
                <input type="password" value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} placeholder={t.login.passwordPlaceholder} required className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-emerald-900/70 dark:bg-[#0d2a19] dark:text-white dark:placeholder:text-emerald-100/30" />
              </div>
              {error && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-700 dark:text-red-200">{error}</p>}
              <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-[#071b0f]">{t.login.signIn}</button>
            </form>
            <p className="mt-6 text-center text-xs text-gray-500 dark:text-emerald-100/55">
              {t.login.noAccount}{" "}
              <Link href="/register" className="text-emerald-600 hover:underline dark:text-emerald-400">{t.login.register}</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
