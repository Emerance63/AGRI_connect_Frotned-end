export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1f14] px-4 text-center">
      <div className="max-w-md rounded-2xl border border-[#1f3d29] bg-[#0f2417] p-8">
        <h2 className="text-xl font-semibold text-white">Page not found</h2>
        <p className="mt-2 text-sm text-emerald-100/60">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
