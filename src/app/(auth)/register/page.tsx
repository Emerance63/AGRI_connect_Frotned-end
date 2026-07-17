"use client";

import { useState } from "react";
import Link from "next/link";

const provinces = [
  "Northern Province",
  "Southern Province",
  "Eastern Province",
  "Western Province",
  "Kigali City",
];

const districts = [
  "Bugesera",
  "Burera",
  "Gakenke",
  "Gasabo",
  "Gatsibo",
  "Gicumbi",
  "Gisagara",
  "Huye",
  "Kamonyi",
  "Karongi",
  "Kayonza",
  "Kicukiro",
  "Kirehe",
  "Muhanga",
  "Musanze",
  "Ngoma",
  "Ngororero",
  "Nyabihu",
  "Nyagatare",
  "Nyamagabe",
  "Nyamasheke",
  "Nyanza",
  "Nyarugenge",
  "Nyaruguru",
  "Rubavu",
  "Ruhando",
  "Rulindo",
  "Rusizi",
  "Rutsiro",
  "Rwamagana",
];

export default function RegisterCooperativePage() {
  const [form, setForm] = useState({
    fullName: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    cooperativeName: "",
    registrationNumber: "",
    province: "",
    district: "",
    sector: "",
    contactInfo: "",
    description: "",
    agreed: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreed) return;
    console.log(form);
  };

  const inputClass = "w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:bg-[#0d1f14] dark:border-[#1f3d29] dark:text-white dark:placeholder:text-emerald-100/30";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-white mb-1.5";

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-[#0d1f14] flex flex-col items-center bg-cover bg-center bg-fixed px-4 py-5 sm:px-6"
      style={{ backgroundImage: "linear-gradient(rgba(6, 23, 13, 0.88), rgba(6, 23, 13, 0.92)), url('/images/products/reg.jpg')" }}
    >
      {/* Card */}
      <div className="w-full max-w-5xl bg-white dark:bg-[#0f2417]/95 border border-gray-200 dark:border-[#1f3d29] rounded-xl shadow-xl p-4 sm:p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500" />

        <span className="inline-block text-[11px] tracking-wide font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-full px-3 py-1 mb-4">
          COOPERATIVE ACCOUNT
        </span>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Register your cooperative
        </h1>
        <p className="text-sm text-gray-500 dark:text-emerald-100/60 mb-4">
          Join AgriConnect to list produce, reach buyers across Rwanda, and
          manage orders from one dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          {/* TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4">
            {/* LEFT COLUMN - USER INFORMATION */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <div className="w-1 h-5 bg-emerald-500 rounded-full" />
                User Information
              </h3>

              {/* Full Name */}
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Jean Bosco"
                  className={inputClass}
                />
              </div>

              {/* National ID */}
              <div>
                <label className={labelClass}>National ID</label>
                <input
                  name="nationalId"
                  value={form.nationalId}
                  onChange={handleChange}
                  placeholder="e.g. 1234567890123456"
                  className={inputClass}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="+250 788 000 000"
                  className={inputClass}
                />
              </div>

              {/* Email Address */}
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="cooperative@example.rw"
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label className={labelClass}>Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={inputClass}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className={labelClass}>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={inputClass}
                />
              </div>
            </div>

            {/* RIGHT COLUMN - COOPERATIVE INFORMATION */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-amber-500 dark:text-amber-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <div className="w-1 h-5 bg-amber-500 rounded-full" />
                Cooperative Details
              </h3>

              {/* Cooperative Name */}
              <div>
                <label className={labelClass}>Cooperative Name</label>
                <input
                  name="cooperativeName"
                  value={form.cooperativeName}
                  onChange={handleChange}
                  placeholder="e.g. Musanze Growers Cooperative"
                  className={inputClass}
                />
              </div>

              {/* Registration Number */}
              <div>
                <label className={labelClass}>Registration Number</label>
                <input
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  placeholder="e.g. RCA/COOP/2024/..."
                  className={inputClass}
                />
                <p className="text-[11px] text-gray-400 dark:text-emerald-100/40 mt-1">
                  As issued by RCA on your cooperative certificate
                </p>
              </div>

              {/* Province */}
              <div>
                <label className={labelClass}>Province</label>
                <select
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  className={inputClass + " appearance-none"}
                >
                  <option value="">Select province</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className={labelClass}>District</label>
                <select
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  className={inputClass + " appearance-none"}
                >
                  <option value="">Select district</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sector */}
              <div>
                <label className={labelClass}>Sector</label>
                <input
                  name="sector"
                  value={form.sector}
                  onChange={handleChange}
                  placeholder="Sector"
                  className={inputClass}
                />
              </div>

              {/* Contact Info */}
              <div>
                <label className={labelClass}>Contact Info</label>
                <input
                  name="contactInfo"
                  value={form.contactInfo}
                  onChange={handleChange}
                  placeholder="Contact person / additional phone"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="mb-6">
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description of the cooperative"
              className={inputClass}
              rows={2}
            />
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 text-xs text-gray-500 dark:text-emerald-100/60 pt-1">
            <input
              type="checkbox"
              name="agreed"
              checked={form.agreed}
              onChange={handleChange}
              className="mt-0.5 w-3.5 h-3.5 accent-emerald-500"
            />
            <span>
              I agree to AgriConnect&apos;s{" "}
              <Link href="/terms" className="text-amber-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and confirm this cooperative is registered in Rwanda.
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={!form.agreed}
            className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg py-3 mt-4 transition"
          >
            Create Cooperative Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-gray-200 dark:bg-[#1f3d29]" />
            <span className="text-[11px] text-gray-400 dark:text-emerald-100/40">OR</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-[#1f3d29]" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 dark:text-emerald-100/60">
            Already registered?{" "}
            <Link
              href="/login"
              className="text-emerald-600 dark:text-white font-semibold hover:underline"
            >
              Log in to your cooperative
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
