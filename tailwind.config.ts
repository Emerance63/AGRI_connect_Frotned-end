import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand greens — derived from the AgriConnect logo/hero/buttons
        brand: {
          50:  "#EAF7EE",
          100: "#CBEBD5",
          200: "#98D7AE",
          300: "#63C186",
          400: "#3AAE68",
          500: "#22C55E", // hero headline / primary buttons
          600: "#16A34A", // "Explore Products" button
          700: "#127A3B",
          800: "#0F2E1D", // dark header/hero overlay
          900: "#081F14", // footer / darkest surface
        },
        // Amber accent — CTA buttons, ratings, "Premium" badges
        accent: {
          400: "#FBBF48",
          500: "#F59E0B", // "Register Your Cooperative" button
          600: "#D97F06",
        },
        // Neutral surfaces — swap via CSS vars so light/dark just work
        surface: {
          DEFAULT: "var(--surface)",
          alt: "var(--surface-alt)",
          card: "var(--surface-card)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
        },
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
