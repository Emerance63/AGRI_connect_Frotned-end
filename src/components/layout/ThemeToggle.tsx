"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-10 h-[22px] rounded-full bg-surface-alt animate-pulse" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center gap-2"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Moon icon */}
      <svg
        className={`w-4 h-4 transition-colors duration-200 ${
          isDark ? "text-brand-400" : "text-ink-muted"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>

      {/* Toggle track */}
      <div
        className={`w-10 h-[22px] rounded-full relative transition-colors duration-300 ${
          isDark ? "bg-brand-500" : "bg-ink-muted/30"
        }`}
      >
        <div
          className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
            isDark ? "left-[22px]" : "left-[3px]"
          }`}
        />
      </div>
    </button>
  );
}
