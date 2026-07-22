"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSendOtp = () => {
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Enter a valid cooperative email address first.");
      return;
    }

    // Connect this action to the password-reset OTP endpoint when the API is available.
    setOtpSent(true);
    setMessage(`A 6-digit verification code has been sent to ${email}.`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Your new passwords do not match.");
      return;
    }

    if (verificationCode.length !== 6) {
      setMessage("Enter the 6-digit verification code.");
      return;
    }
    const result = resetPassword(email, newPassword);
    if (!result.ok) {
      setMessage(result.message ?? "Unable to reset your password.");
      return;
    }
    setMessage("Password reset successfully. Redirecting to login...");
    window.setTimeout(() => router.replace("/login"), 900);
  };

  const inputClass = "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-emerald-900/70 dark:bg-[#0d2a19] dark:text-white dark:placeholder:text-emerald-100/30";
  const labelClass = "mb-1.5 block text-xs font-medium text-gray-700 dark:text-emerald-50";

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#06170d] px-4 py-8"
      style={{ backgroundImage: "url('/images/products/forgot p.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-white/80 dark:bg-emerald-950/80" />
      <section className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-emerald-400/30 bg-white dark:bg-[#071b0f]/95 p-6 shadow-2xl shadow-black/10 dark:shadow-black/40 sm:p-8">
        <div className="mb-6">
          <Link href="/" className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-300">← Home</Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reset your password</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-emerald-100/65">
          Enter your email to receive an OTP, then set your new password below.
        </p>

        <div className="mt-5 flex items-center gap-3 text-xs text-gray-500 dark:text-emerald-100/70">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white">1</span>
          <span>Get verification code</span>
          <span className="h-px flex-1 bg-gray-300 dark:bg-emerald-800/80" />
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-400 dark:border-emerald-700 text-gray-500 dark:text-emerald-100/70">2</span>
          <span>Reset password</span>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label className={labelClass}>Cooperative email address</label>
            <input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setMessage(""); }} placeholder="admin@coop.rw" required readOnly={otpSent} className={`${inputClass} read-only:cursor-not-allowed read-only:opacity-70`} />
          </div>
          {otpSent ? (
            <button type="button" onClick={() => { setOtpSent(false); setVerificationCode(""); setMessage(""); }} className="w-full rounded-lg border border-emerald-500/60 px-4 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-300 transition hover:bg-emerald-500/10">
              Change email address
            </button>
          ) : (
            <button type="button" onClick={handleSendOtp} className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-[#071b0f]">
              Get verification code
            </button>
          )}
          {message && <p role="status" className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs leading-5 text-emerald-800 dark:text-emerald-100">{message}</p>}
          <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label className={labelClass}>Verification code</label>
              {otpSent && <button type="button" onClick={handleSendOtp} className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline">Resend OTP</button>}
            </div>
            <input value={verificationCode} onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" placeholder="Enter the 6-digit code" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>New password</label>
            <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="At least 8 characters" minLength={8} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Confirm new password</label>
            <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Re-enter your new password" minLength={8} required className={inputClass} />
          </div>
          <button type="submit" disabled={!otpSent} className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:from-emerald-500 hover:to-emerald-400 disabled:cursor-not-allowed disabled:opacity-50">
            Reset Password
          </button>
        </form>

        <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 dark:border-emerald-900/60 dark:bg-emerald-950/40 p-3 text-xs leading-5 text-gray-500 dark:text-emerald-100/70">
          Use at least 8 characters and keep your verification code private.
        </div>
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-emerald-100/60">
          Remembered your password? <Link href="/login" className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline">Back to login</Link>
        </p>
      </section>
    </main>
  );
}
