"use client";

import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "Về Potonow" },
  { href: "/photographers", label: "Nhiếp ảnh gia" },
  { href: "/bookings", label: "Đặt lịch" },
  { href: "/blogs", label: "Blogs" }
] as const;

export default function CustomerFooter() {
  return (
    <footer className="border-t border-[#eadfce] bg-[#fff8f1]">
      <div className="mx-auto grid w-full max-w-[75rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-[1.6rem] font-extrabold tracking-[-0.04em] text-[#283142]">
            potonow
          </p>
          <p className="mt-3 max-w-xl text-[0.96rem] leading-7 text-[#6d6257]">
            Nền tảng giúp bạn tìm photographer phù hợp, theo dõi booking rõ
            ràng và đặt lịch chụp hình thuận tiện hơn.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-[0.95rem] text-[#4b433b] lg:items-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#f47c20]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-[#eadfce]">
        <div className="mx-auto flex w-full max-w-[75rem] flex-col gap-2 px-4 py-4 text-[0.88rem] text-[#7a6d61] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Potonow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
