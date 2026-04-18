"use client";

import { Manrope } from "next/font/google";
import CustomerHeader from "../../../components/header";

const sans = Manrope({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"]
});

export default function CustomerBlogsPage() {
  return (
    <main className={`${sans.className} min-h-screen bg-[#fcf8f2] text-[#23180f]`}>
      <CustomerHeader />

      <section className="mx-auto flex w-full max-w-[75rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full rounded-[2rem] border border-[#eadfce] bg-white/70 p-8 shadow-[0_20px_60px_rgba(89,61,44,0.08)]">
          <p>TET OI LA TET</p>
        </div>
      </section>
    </main>
  );
}
