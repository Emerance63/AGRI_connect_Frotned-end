"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [coopName, setCoopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="min-h-screen bg-[#06170d] px-4 py-6 sm:px-6 lg:flex lg:items-center lg:justify-center lg:px-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-sm border border-emerald-500/50 bg-[#071b0f] shadow-2xl shadow-black/30 lg:grid lg:min-h-[600px] lg:grid-cols-2">
        <section
          className="relative min-h-[400px] overflow-hidden bg-cover bg-center sm:min-h-[480px] lg:min-h-full"
          style={{ backgroundImage: "url('/images/products/regg.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/65 via-emerald-900/70 to-emerald-950/90" />
          <div className="relative flex h-full flex-col justify-end p-7 text-white sm:p-10 lg:p-12">
            <h1 className="text-3xl font-bold leading-none sm:text-4xl">
              AgriConnect
              <span className="block text-emerald-400">Rwanda</span>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-emerald-50/90">
              Rwanda&apos;s most trusted platform connecting farmer cooperatives to markets.
            </p>
            <div className="mt-8">
              <h2 className="text-sm font-semibold">Why join AgriConnect?</h2>
              <ul className="mt-4 space-y-2.5 text-xs text-emerald-50/90 sm:text-sm">
                {["Reach thousands of buyers nationwide", "Real-time order and inventory management", "Secure mobile money payments (MTN, Airtel)", "Government-backed quality certification", "Full Kinyarwanda & English support"].map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="flex items-center bg-[#071b0f] px-6 py-12 sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <h2 className="text-2xl font-bold text-white">Cooperative Login</h2>
            <p className="mt-1 text-sm text-emerald-100/55">Access your cooperative dashboard</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-emerald-50">Cooperative Name</label>
                <input value={coopName} onChange={(event) => setCoopName(event.target.value)} placeholder="e.g. Musanze Farmers Cooperative" className="w-full rounded-lg border border-emerald-900/70 bg-[#0d2a19] px-4 py-3 text-sm text-white outline-none placeholder:text-emerald-100/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-emerald-50">Email Address</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@coop.rw" className="w-full rounded-lg border border-emerald-900/70 bg-[#0d2a19] px-4 py-3 text-sm text-white outline-none placeholder:text-emerald-100/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label className="text-xs font-medium text-emerald-50">Password</label>
                  <Link href="/forgot-password" className="text-xs text-emerald-400 transition hover:text-emerald-300 hover:underline">Forgot password?</Link>
                </div>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-lg border border-emerald-900/70 bg-[#0d2a19] px-4 py-3 text-sm text-white outline-none placeholder:text-emerald-100/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
              <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#071b0f]">Sign In</button>
            </form>
            <p className="mt-6 text-center text-xs text-emerald-100/55">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-emerald-400 hover:underline">Register your cooperative</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
