"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type HeaderLink = {
  href: string;
  label: string;
  items?: HeaderLink[];
};

export const customerNavLinks: HeaderLink[] = [
  { href: "/about", label: "Về Potonow" },
  { href: "/photographers", label: "Nhiếp Ảnh Gia" },
  { href: "/shootings", label: "Danh Sách Buổi Chụp" },
  { href: "/bookings", label: "Đặt Lịch" },
  {
    href: "/events/summer-in-frame",
    label: "Sự Kiện",
    items: [
      { href: "/events/summer-in-frame", label: "Summer In Frame" },
      { href: "/events/tet-oi-tet-a", label: "Tết ơi Tết à" },
      { href: "/events/focus-in-hanoi", label: "Hanoi In Focus" }
    ]
  },
  { href: "/blogs", label: "Blogs" }
];

type CustomerHeaderProps = {
  navLinks?: HeaderLink[];
  homeHref?: string;
  loginHref?: string;
  showTopBorder?: boolean;
};

export default function CustomerHeader({
  navLinks = customerNavLinks,
  homeHref = "/",
  loginHref = "/auth/login",
  showTopBorder = true
}: CustomerHeaderProps) {
  return (
    <>
      {showTopBorder ? <div className="border-t-4 border-[#5d3e37]" /> : null}

      <header className="sticky top-0 z-40 border-b border-[#eadfce] bg-[rgba(255,250,244,0.92)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-[75rem] items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
          <Link href={homeHref} className="flex items-center gap-2.5">
            <Image
              src="/customer-home/potonow.png"
              alt="Potonow"
              width={30}
              height={30}
            />
            <span className="text-[1.8rem] font-extrabold tracking-[-0.05em] text-[#283142]">
              potonow
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-[1rem] font-medium text-[#2d3442] xl:flex">
            {navLinks.map((link) => (
              link.items?.length ? (
                <div key={`${link.href}-${link.label}`} className="group relative">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 transition hover:text-[#f47c20]"
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4 transition duration-150 group-hover:rotate-180" />
                  </Link>

                  <div className="pointer-events-none absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-4 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="overflow-hidden rounded-[1.2rem] border border-[#eadfce] bg-white shadow-[0_18px_50px_rgba(35,24,15,0.12)]">
                      {link.items.map((item) => (
                        <Link
                          key={`${item.href}-${item.label}`}
                          href={item.href}
                          className="block px-5 py-3 text-[#2d3442] transition hover:bg-[#fcf4ea] hover:text-[#f47c20]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className="transition hover:text-[#f47c20]"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button className="hidden items-center gap-2 text-[1rem] font-medium text-[#1f2430] md:flex">
              VI
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#da251d] text-[10px] font-bold text-[#ffde00]">
                ★
              </span>
            </button>

            <Link
              href={loginHref}
              className="rounded-2xl bg-[#f47c20] px-5 py-2.5 text-[0.95rem] font-extrabold text-white shadow-[0_14px_30px_rgba(244,124,32,0.22)] transition hover:bg-[#dd6a12]"
            >
              Đăng nhập/Đăng ký
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
