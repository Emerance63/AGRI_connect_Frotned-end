"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1f14] px-4 text-center">
      <div className="max-w-md rounded-2xl border border-[#1f3d29] bg-[#0f2417] p-8">
        <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
        <p className="mt-2 text-sm text-emerald-100/60">
          Please refresh the page or try again.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-500"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
