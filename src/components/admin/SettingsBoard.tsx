"use client";

import { useState } from "react";
import { Save, Globe, Bell, Percent, CheckCircle2 } from "lucide-react";

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border border-[#1f3d29] bg-[#112d1a] p-5 ${className}`}>
      {children}
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-green-500" : "bg-white/20"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

export default function SettingsBoard() {
  const [platformFee, setPlatformFee] = useState("3.5");
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [currency, setCurrency] = useState("RWF");
  const [language, setLanguage] = useState("English");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputCls = "w-full rounded-lg border border-[#1f3d29] bg-[#0d2818] px-3 py-2.5 text-[13.5px] text-white outline-none focus:border-green-500 transition";

  return (
    <div className="flex-1 min-w-0 p-4 sm:p-8 text-white text-sm">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Platform Settings</h1>
          <p className="text-green-100/50 text-[13.5px] mt-1">
            Configure platform-wide fees, notifications, and defaults
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-green-500 text-black font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-green-400 transition"
        >
          <Save size={14} /> Save Changes
        </button>
      </div>

      {saved && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-400">
          <CheckCircle2 size={16} /> Settings saved successfully.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Fees */}
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Percent size={15} />
            </div>
            <p className="text-[15px] font-bold">Marketplace Fees</p>
          </div>
          <label className="block text-[12.5px] text-green-100/50 mb-1.5">
            Platform commission (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={platformFee}
            onChange={(e) => setPlatformFee(e.target.value)}
            className={`${inputCls} max-w-[160px]`}
          />
          <p className="text-[11.5px] text-green-100/40 mt-2">
            Applied to every completed transaction across all cooperatives.
          </p>
        </Card>

        {/* Notifications */}
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
              <Bell size={15} />
            </div>
            <p className="text-[15px] font-bold">Notifications</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] text-white">SMS alerts for new signups</p>
                <p className="text-[11.5px] text-green-100/40 mt-0.5">Notify admin via SMS on new cooperative registration</p>
              </div>
              <Toggle on={smsAlerts} onToggle={() => setSmsAlerts((v) => !v)} />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-[#1f3d29] pt-4">
              <div>
                <p className="text-[13px] text-white">Auto-approve verified buyers</p>
                <p className="text-[11.5px] text-green-100/40 mt-0.5">Skip manual review for KYC-verified buyers</p>
              </div>
              <Toggle on={autoApprove} onToggle={() => setAutoApprove((v) => !v)} />
            </div>
          </div>
        </Card>

        {/* Regional defaults */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
              <Globe size={15} />
            </div>
            <p className="text-[15px] font-bold">Regional Defaults</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12.5px] text-green-100/50 mb-1.5">Default currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputCls}>
                <option value="RWF">RWF — Rwandan Franc</option>
                <option value="USD">USD — US Dollar</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] text-green-100/50 mb-1.5">Default language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className={inputCls}>
                <option>English</option>
                <option>Kinyarwanda</option>
                <option>Français</option>
              </select>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
