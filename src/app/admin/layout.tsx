"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/Adminsidebar";
import { Menu, X, KeyRound, Shield } from "lucide-react";
import { getToken, saveToken, apiLogin } from "@/lib/apiClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  // Login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Manual token paste
  const [tokenInput, setTokenInput] = useState("");
  const [showPaste, setShowPaste] = useState(false);

  useEffect(() => {
    setHasToken(Boolean(getToken()));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const data = await apiLogin(email, password);
      saveToken(data.accessToken);
      setHasToken(true);
      setShowModal(false);
      window.location.reload();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("401") || msg.includes("403")) {
        setLoginError("Invalid credentials or account does not have SYSTEM_ADMIN role.");
      } else {
        setLoginError("Unable to connect to server. Try pasting a token manually.");
      }
    } finally {
      setLoginLoading(false);
    }
  }

  function handlePasteToken(e: React.FormEvent) {
    e.preventDefault();
    const t = tokenInput.trim().replace(/^Bearer\s+/i, "");
    if (t) {
      saveToken(t);
      setHasToken(true);
      setShowModal(false);
      window.location.reload();
    }
  }

  function handleSignOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("agriconnect_jwt");
      setHasToken(false);
      window.location.reload();
    }
  }

  return (
    <div className="min-h-screen bg-[#081F14] flex flex-col">

      {/* ── Mobile top bar ── */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-[#1f3d29] bg-[#0d2818] px-4 lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-black">AC</div>
          <span className="text-sm font-bold text-white">Admin Panel</span>
        </div>
        <button onClick={() => setSidebarOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1f3d29] text-green-100/70 hover:bg-white/5"
          aria-label="Open sidebar">
          <Menu size={18} />
        </button>
      </header>

      {/* ── Warning banner when no token ── */}
      {!hasToken && (
        <div className="flex items-center justify-between gap-3 border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-400">
          <span>⚠ No admin token — API calls will fail. Sign in as SYSTEM_ADMIN to load live data.</span>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-amber-400 transition whitespace-nowrap"
          >
            <KeyRound size={12} /> Sign in as Admin
          </button>
        </div>
      )}

      {/* ── Token confirmed banner ── */}
      {hasToken && (
        <div className="flex items-center justify-between gap-3 border-b border-green-500/20 bg-green-500/5 px-4 py-2 text-xs text-green-400">
          <span className="flex items-center gap-1.5"><Shield size={12} /> Admin token active — API calls enabled.</span>
          <button onClick={handleSignOut} className="text-green-100/40 hover:text-red-400 transition text-xs">
            Sign out
          </button>
        </div>
      )}

      {/* ── Admin auth modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#1f3d29] bg-[#112d1a] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
                  <Shield size={16} />
                </div>
                <h2 className="text-base font-bold text-white">Admin Sign In</h2>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="text-green-100/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {!showPaste ? (
              <>
                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-green-100/60 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setLoginError(""); }}
                      placeholder="admin@agriconnect.rw"
                      className="w-full rounded-lg border border-[#1f3d29] bg-[#0d2818] px-3 py-2.5 text-sm text-white placeholder:text-green-100/30 outline-none focus:border-green-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-green-100/60 mb-1.5">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-[#1f3d29] bg-[#0d2818] px-3 py-2.5 text-sm text-white placeholder:text-green-100/30 outline-none focus:border-green-500 transition"
                    />
                  </div>

                  {loginError && (
                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                      {loginError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-bold text-white hover:bg-green-500 disabled:opacity-50 transition"
                  >
                    {loginLoading ? "Signing in…" : "Sign in as SYSTEM_ADMIN"}
                  </button>
                </form>

                <div className="mt-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-green-100/30">or</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <button
                  type="button"
                  onClick={() => setShowPaste(true)}
                  className="mt-3 w-full rounded-lg border border-[#1f3d29] py-2 text-xs font-medium text-green-100/50 hover:bg-white/5 transition"
                >
                  Paste JWT token manually
                </button>
              </>
            ) : (
              <form onSubmit={handlePasteToken} className="space-y-3">
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
                  rows={4}
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full rounded-lg border border-[#1f3d29] bg-[#0d2818] px-3 py-2.5 text-xs text-white placeholder:text-green-100/20 outline-none focus:border-green-500 font-mono resize-none"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPaste(false)}
                    className="flex-1 rounded-lg border border-[#1f3d29] py-2 text-xs font-medium text-green-100/60 hover:bg-white/5"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-green-600 py-2 text-xs font-bold text-white hover:bg-green-500"
                  >
                    Use Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex-col bg-[#0d2818] transition-transform duration-300 lg:relative lg:translate-x-0 lg:flex ${sidebarOpen ? "flex translate-x-0" : "-translate-x-full"}`}>
          <button onClick={() => setSidebarOpen(false)}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-green-100/50 hover:bg-white/5 lg:hidden"
            aria-label="Close sidebar">
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
