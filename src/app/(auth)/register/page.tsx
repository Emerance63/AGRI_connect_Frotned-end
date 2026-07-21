"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

/* ── Static data ── */
const provinces = [
  "Northern Province",
  "Southern Province",
  "Eastern Province",
  "Western Province",
  "Kigali City",
];

const districts = [
  "Bugesera","Burera","Gakenke","Gasabo","Gatsibo","Gicumbi","Gisagara",
  "Huye","Kamonyi","Karongi","Kayonza","Kicukiro","Kirehe","Muhanga",
  "Musanze","Ngoma","Ngororero","Nyabihu","Nyagatare","Nyamagabe",
  "Nyamasheke","Nyanza","Nyarugenge","Nyaruguru","Rubavu","Ruhando",
  "Rulindo","Rusizi","Rutsiro","Rwamagana",
];

/* ── Shared styles ── */
const inputClass =
  "w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition dark:bg-[#0d1f14] dark:border-[#1f3d29] dark:text-white dark:placeholder:text-emerald-100/30";
const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-white mb-1.5";

export default function RegisterCooperativePage() {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2>(1);

  const [form, setForm] = useState({
    // Step 1 – President
    fullName: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Step 2 – Cooperative
    cooperativeName: "",
    registrationNumber: "",
    province: "",
    district: "",
    sector: "",
    contactInfo: "",
    description: "",
    agreed: false,
  });

  /* ── Validation for Step 1 ── */
  const step1Valid =
    form.fullName.trim() !== "" &&
    form.nationalId.trim() !== "" &&
    form.phoneNumber.trim() !== "" &&
    form.email.trim() !== "" &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
    console.log("Registration submitted:", form);
    // TODO: wire up to API
  };

  /* ─────────────────────────────────────────
     STEP INDICATOR
  ───────────────────────────────────────── */
  const StepIndicator = () => (
    <div className="mb-6">
      {/* Progress bar */}
      <div className="relative mb-4 h-1.5 w-full rounded-full bg-gray-200 dark:bg-[#1f3d29]">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-500"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      {/* Step labels */}
      <div className="flex items-start justify-between">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-1.5 w-1/2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
              step === 1
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-110"
                : "bg-emerald-500 text-white"
            }`}
          >
            {step === 2 ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              "1"
            )}
          </div>
          <div className="text-center">
            <p className={`text-xs font-semibold ${step === 1 ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
              Step 1
            </p>
            <p className={`text-[11px] ${step === 1 ? "text-gray-700 dark:text-white" : "text-gray-400 dark:text-emerald-100/40"}`}>
              President Information
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-1.5 w-1/2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
              step === 2
                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-110"
                : "bg-gray-200 text-gray-400 dark:bg-[#1f3d29] dark:text-emerald-100/30"
            }`}
          >
            2
          </div>
          <div className="text-center">
            <p className={`text-xs font-semibold ${step === 2 ? "text-amber-600 dark:text-amber-400" : "text-gray-400"}`}>
              Step 2
            </p>
            <p className={`text-[11px] ${step === 2 ? "text-gray-700 dark:text-white" : "text-gray-400 dark:text-emerald-100/40"}`}>
              Cooperative Information
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─────────────────────────────────────────
     STEP 1 — President / User Information
  ───────────────────────────────────────── */
  const Step1 = () => (
    <div className="space-y-4 animate-[fadeInUp_0.4s_ease-out_both]">
      <div>
        <h2 className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 uppercase tracking-wider mb-4">
          <div className="w-1 h-5 bg-emerald-500 rounded-full" />
          {t.register.userInfo}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className={labelClass}>{t.register.fullName} <span className="text-red-500">*</span></label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder={t.register.fullNamePlaceholder}
            className={inputClass}
            required
          />
        </div>

        {/* National ID */}
        <div>
          <label className={labelClass}>{t.register.nationalId} <span className="text-red-500">*</span></label>
          <input
            name="nationalId"
            value={form.nationalId}
            onChange={handleChange}
            placeholder={t.register.nationalIdPlaceholder}
            className={inputClass}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>{t.register.phoneNumber} <span className="text-red-500">*</span></label>
          <input
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder={t.register.phoneNumberPlaceholder}
            className={inputClass}
            required
          />
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label className={labelClass}>{t.register.email} <span className="text-red-500">*</span></label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t.register.emailPlaceholder}
            className={inputClass}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className={labelClass}>{t.register.password} <span className="text-red-500">*</span></label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder={t.register.passwordPlaceholder}
            className={inputClass}
            required
          />
          {form.password.length > 0 && form.password.length < 8 && (
            <p className="text-[11px] text-red-400 mt-1">At least 8 characters required</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className={labelClass}>{t.register.confirmPassword} <span className="text-red-500">*</span></label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder={t.register.confirmPasswordPlaceholder}
            className={inputClass}
            required
          />
          {form.confirmPassword.length > 0 && form.password !== form.confirmPassword && (
            <p className="text-[11px] text-red-400 mt-1">Passwords do not match</p>
          )}
        </div>
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={() => setStep(2)}
        disabled={!step1Valid}
        className="w-full mt-2 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg py-3 transition-all duration-200 shadow-lg shadow-emerald-600/20"
      >
        Continue to Cooperative Info
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  /* ─────────────────────────────────────────
     STEP 2 — Cooperative Information
  ───────────────────────────────────────── */
  const Step2 = () => (
    <form onSubmit={handleSubmit} className="space-y-4 animate-[fadeInUp_0.4s_ease-out_both]">
      <div>
        <h2 className="text-base font-bold text-amber-500 dark:text-amber-400 flex items-center gap-2 uppercase tracking-wider mb-4">
          <div className="w-1 h-5 bg-amber-500 rounded-full" />
          {t.register.coopInfo}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Cooperative Name */}
        <div className="sm:col-span-2">
          <label className={labelClass}>{t.register.coopName} <span className="text-red-500">*</span></label>
          <input
            name="cooperativeName"
            value={form.cooperativeName}
            onChange={handleChange}
            placeholder={t.register.coopNamePlaceholder}
            className={inputClass}
            required
          />
        </div>

        {/* Registration Number */}
        <div className="sm:col-span-2">
          <label className={labelClass}>{t.register.regNumber} <span className="text-red-500">*</span></label>
          <input
            name="registrationNumber"
            value={form.registrationNumber}
            onChange={handleChange}
            placeholder={t.register.regNumberPlaceholder}
            className={inputClass}
            required
          />
          <p className="text-[11px] text-gray-400 dark:text-emerald-100/40 mt-1">{t.register.regNumberHint}</p>
        </div>

        {/* Province */}
        <div>
          <label className={labelClass}>{t.register.province} <span className="text-red-500">*</span></label>
          <select
            name="province"
            value={form.province}
            onChange={handleChange}
            className={inputClass + " appearance-none"}
            required
          >
            <option value="">{t.register.provincePlaceholder}</option>
            {provinces.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className={labelClass}>{t.register.district} <span className="text-red-500">*</span></label>
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            className={inputClass + " appearance-none"}
            required
          >
            <option value="">{t.register.districtPlaceholder}</option>
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Sector */}
        <div>
          <label className={labelClass}>{t.register.sector}</label>
          <input
            name="sector"
            value={form.sector}
            onChange={handleChange}
            placeholder={t.register.sectorPlaceholder}
            className={inputClass}
          />
        </div>

        {/* Contact Info */}
        <div>
          <label className={labelClass}>{t.register.contactInfo}</label>
          <input
            name="contactInfo"
            value={form.contactInfo}
            onChange={handleChange}
            placeholder={t.register.contactInfoPlaceholder}
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className={labelClass}>{t.register.desc}</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder={t.register.descPlaceholder}
            className={inputClass}
            rows={3}
          />
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2 text-xs text-gray-500 dark:text-emerald-100/60 pt-1 cursor-pointer">
        <input
          type="checkbox"
          name="agreed"
          checked={form.agreed}
          onChange={handleChange}
          className="mt-0.5 w-3.5 h-3.5 accent-emerald-500 shrink-0"
        />
        <span>
          {t.register.agreeTextPart1}{" "}
          <Link href="/terms" className="text-amber-500 hover:underline">{t.register.agreeTextTerms}</Link>{" "}
          {t.register.agreeTextPart2}
        </span>
      </label>

      {/* Action buttons */}
      <div className="flex gap-3 pt-1">
        {/* Back */}
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-[#1f3d29] bg-white dark:bg-[#0d1f14] px-5 py-3 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={!form.agreed}
          className="flex-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg py-3 transition-all duration-200 shadow-lg shadow-amber-600/20"
        >
          {t.register.submitBtn}
        </button>
      </div>

      {/* Divider + login link */}
      <div className="flex items-center gap-3 pt-1">
        <div className="flex-1 h-px bg-gray-200 dark:bg-[#1f3d29]" />
        <span className="text-[11px] text-gray-400 dark:text-emerald-100/40">{t.register.or}</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-[#1f3d29]" />
      </div>
      <p className="text-center text-sm text-gray-500 dark:text-emerald-100/60">
        {t.register.alreadyRegistered}{" "}
        <Link href="/login" className="text-emerald-600 dark:text-white font-semibold hover:underline">
          {t.register.loginLink}
        </Link>
      </p>
    </form>
  );

  /* ─────────────────────────────────────────
     PAGE SHELL
  ───────────────────────────────────────── */
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed px-4 py-8 sm:px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(6, 23, 13, 0.88), rgba(6, 23, 13, 0.92)), url('/images/products/reg.jpg')",
      }}
    >
      {/* Card */}
      <div className="w-full max-w-xl bg-white dark:bg-[#0f2417]/95 border border-gray-200 dark:border-[#1f3d29] rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500" />

        {/* Badge */}
        <span className="inline-block text-[11px] tracking-wide font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-full px-3 py-1 mb-3">
          {t.register.badge}
        </span>

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {t.register.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-emerald-100/60 mb-5">
          {t.register.description}
        </p>

        {/* Step indicator */}
        <StepIndicator />

        {/* Step content */}
        {step === 1 ? <Step1 /> : <Step2 />}
      </div>
    </div>
  );
}
