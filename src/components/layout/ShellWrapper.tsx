"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const COOP_PATHS = ["/dashboard", "/inventory", "/products", "/orders", "/buyers", "/reports"];

export default function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCoop = COOP_PATHS.some((p) => pathname.startsWith(p));

  return (
    <>
      <Navbar />
      <div className="flex-1 pt-16">{children}</div>
      <Footer />
    </>
  );
}
