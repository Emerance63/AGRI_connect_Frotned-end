"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ShellWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex-1 pt-16">{children}</div>
      <Footer />
    </>
  );
}
