import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
// @ts-ignore: allow importing global css without type declarations
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import ShellWrapper from "@/components/layout/ShellWrapper";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CooperativeDataProvider } from "@/lib/cooperative-data";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AgriConnect Rwanda — Connecting Farmers to Markets",
    template: "%s — AgriConnect Rwanda",
  },
  description:
    "Rwanda's most trusted agricultural cooperative platform. Buy fresh produce directly from verified farmer cooperatives across the country.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            <CooperativeDataProvider>
              <ShellWrapper>{children}</ShellWrapper>
            </CooperativeDataProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
