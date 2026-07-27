"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/Adminsidebar";
import { Menu, X, Shield, LogOut, Eye, EyeOff } from "lucide-react";
import { getToken, saveToken, apiLogin } from "@/lib/apiClient";

// ── Full-screen admin login page ──────────────────────────────────────────────
function AdminLoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPaste, setShowPaste] = useState(false);
  const [tokenInput, setTokenInput] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiLogin(email, password);
      saveToken(data.accessToken);
      onSuccess();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("401") || msg.includes("403")) {
        setError("Invalid credentials or account does not have SYSTEM_ADMIN role.");
      } else {
        setError("Unable to connect. Check your internet connection or paste a JWT token manually.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handlePasteToken(e: React.FormEvent) {
    e.preventDefault();
    const t = tokenInput.trim().replace(/^Bearer\s+/i, "");
    if (t) {
      saveToken(t);
      onSuccess();
    }
  }

  return (
    <div className="min-h-screen bg-[#081F14] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20 text-green-400 mb-4 shadow-lg shadow-green-900/30">
            <Shield size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-green-100/50 mt-1">Sign in as SYSTEM_ADMIN to continue</p>
        </div>

        <div className="rounded-2xl border border-[#1f3d29] bg-[#112d1a] p-6 shadow-2xl">

          {!showPaste ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-green-100/60 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="admin@agriconnect.rw"
                  className="w-full rounded-lg border border-[#1f3d29] bg-[#0d2818] px-4 py-3 text-sm text-white placeholder:text-green-100/30 outline-none focus:border-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-green-100/60 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-[#1f3d29] bg-[#0d2818] px-4 py-3 pr-10 text-sm text-white placeholder:text-green-100/30 outline-none focus:border-green-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-green-100/40 hover:text-green-100/70"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-500 disabled:opacity-50 transition"
              >
                {loading ? "Signing in…" : "Sign in to Admin Panel"}
              </button>

              <div className="flex items-center gap-3 pt-1">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-green-100/30">or</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                onClick={() => setShowPaste(true)}
                className="w-full rounded-lg border border-[#1f3d29] py-2.5 text-xs font-medium text-green-100/50 hover:bg-white/5 transition"
              >
                Paste JWT token manually
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasteToken} className="space-y-4">
              <button
                type="button"
                onClick={() => setShowPaste(false)}
                className="flex items-center gap-1.5 text-xs text-green-100/50 hover:text-white transition mb-1"
              >
                ← Back to login
              </button>
              <p className="text-xs text-green-100/50">
                Get your token from{" "}
                <a
                  href="https://agriconnectbackend-production-c9b1.up.railway.app/swagger-ui/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 underline"
                >
                  Swagger UI
                </a>{" "}
                → POST /api/auth/login → copy the <code className="bg-white/10 px-1 rounded">accessToken</code>.
              </p>
              <textarea
                required
                rows={5}
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full rounded-lg border border-[#1f3d29] bg-[#0d2818] px-3 py-2.5 text-xs text-white placeholder:text-green-100/20 outline-none focus:border-green-500 font-mono resize-none"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-500 transition"
              >
                Use this token
              </button>
            </form>
          )}
        </div>

        <Link
          href="/"
          className="mt-5 flex items-center justify-center gap-1.5 text-xs text-green-100/40 hover:text-green-100/70 transition"
        >
          <LogOut size={12} /> Back to site
        </Link>
      </div>
    </div>
  );
}

// ── Admin layout ──────────────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthenticated(Boolean(getToken()));
  }, []);

  function handleSignOut() {
    localStorage.removeItem("agriconnect_jwt");
    setAuthenticated(false);
  }

  // Loading state
  if (authenticated === null) {
    return <div className="min-h-screen bg-[#081F14]" />;
  }

  // Not authenticated — show full-screen login
  if (!authenticated) {
    return <AdminLoginPage onSuccess={() => setAuthenticated(true)} />;
  }

  // Authenticated — show admin dashboard
  return (
    <div className="min-h-screen bg-[#081F14] flex flex-col">

      {/* Mobile top bar */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-[#1f3d29] bg-[#0d2818] px-4 lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-black">AC</div>
          <span className="text-sm font-bold text-white">Admin Panel</span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1f3d29] text-green-100/70 hover:bg-white/5"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>
      </header>

      {/* Desktop top bar */}
      <div className="hidden lg:flex h-11 shrink-0 items-center justify-end gap-3 border-b border-[#1f3d29] bg-[#0d2818] px-6">
        <span className="flex items-center gap-1.5 text-xs text-green-400">
          <Shield size={12} /> Admin token active
        </span>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-xs text-green-100/40 hover:text-red-400 transition"
        >
          <LogOut size={12} /> Sign out
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex-col bg-[#0d2818] transition-transform duration-300 lg:relative lg:translate-x-0 lg:flex ${sidebarOpen ? "flex translate-x-0" : "-translate-x-full"}`}>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-green-100/50 hover:bg-white/5 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
          <AdminSidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
