"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Camera,
  ChevronDown,
  CircleHelp,
  FileText,
  Heart,
  List,
  LogOut,
  MessageCircle,
  Ticket,
  UserRound
} from "lucide-react";
import { clearAuthSession, useAuthStore } from "@/store/auth-store";
import type { UserProfile } from "@/types/auth";

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

type AccountMenuItem = {
  href?: string;
  label: string;
  icon: typeof UserRound;
  dividerBefore?: boolean;
  onClick?: () => void;
};

function getDisplayName(user: UserProfile): string {
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return fullName || user.username || user.email;
}

function getInitials(user: UserProfile): string {
  const displayName = getDisplayName(user);
  const parts = displayName.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  return displayName.slice(0, 2).toUpperCase();
}

function UserAvatar({ user }: { user: UserProfile }) {
  if (user.avatar_url) {
    return (
      <img
        src={user.avatar_url}
        alt={getDisplayName(user)}
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }

  return (
    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffe0a3] text-[0.72rem] font-extrabold text-[#21405b]">
      {getInitials(user)}
    </span>
  );
}

export default function CustomerHeader({
  navLinks = customerNavLinks,
  homeHref = "/",
  loginHref = "/sign-in",
  showTopBorder = true
}: CustomerHeaderProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const menuItems = useMemo<AccountMenuItem[]>(() => {
    if (!user) {
      return [];
    }

    const helpItems: AccountMenuItem[] = [
      {
        href: "/shooting-process",
        label: "Quy trình chụp hình",
        icon: FileText,
        dividerBefore: true
      },
      { href: "/faq", label: "Câu hỏi thường gặp", icon: CircleHelp },
      {
        label: "Đăng xuất",
        icon: LogOut,
        dividerBefore: true,
        onClick: () => {
          clearAuthSession();
          setIsMenuOpen(false);
          router.push(homeHref);
        }
      }
    ];

    if (user.role === "PHOTOGRAPHER") {
      return [
        { href: "/photographer/profile", label: "Trang cá nhân", icon: UserRound },
        { href: "/photographer/requests", label: "Đề nghị chụp của tôi", icon: List },
        ...helpItems
      ];
    }

    return [
      { href: "/customer/profile", label: "Trang cá nhân", icon: UserRound },
      { href: "/customer/shootings", label: "Buổi chụp của tôi", icon: List },
      { href: "/customer/favorites", label: "Nhiếp ảnh gia yêu thích", icon: Heart },
      { href: "/bookings", label: "Đặt lịch", icon: Camera },
      { href: "/customer/vouchers", label: "Voucher của tôi", icon: Ticket },
      ...helpItems
    ];
  }, [homeHref, router, user]);

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

            {isHydrated && isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Thông báo"
                  aria-disabled="true"
                  disabled
                  title="Coming soon"
                  className="hidden h-9 w-9 cursor-not-allowed items-center justify-center rounded-full text-[#111827] opacity-45 pointer-events-none md:flex"
                >
                  <Bell className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  aria-label="Tin nhắn"
                  aria-disabled="true"
                  disabled
                  title="Coming soon"
                  className="hidden h-9 w-9 cursor-not-allowed items-center justify-center rounded-full text-[#111827] opacity-45 pointer-events-none md:flex"
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={2} />
                </button>

                <div ref={menuRef} className="relative">
                  <button
                    type="button"
                    aria-label="Tài khoản"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((current) => !current)}
                    className="flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-transparent transition hover:ring-[#ffd09d]"
                  >
                    <UserAvatar user={user} />
                  </button>

                  {isMenuOpen ? (
                    <div className="absolute right-0 top-full z-50 mt-4 w-72 overflow-hidden rounded-[0.7rem] border border-[#ece7df] bg-white py-2 shadow-[0_16px_42px_rgba(31,41,55,0.14)]">
                      <div className="px-5 py-3 text-[0.95rem] font-extrabold text-[#2d3442]">
                        {getDisplayName(user)}
                      </div>

                      <div className="pb-1">
                        {menuItems.map((item) => {
                          const Icon = item.icon;
                          const content = (
                            <>
                              {item.dividerBefore ? (
                                <span className="absolute left-4 right-4 top-0 border-t border-[#ece7df]" />
                              ) : null}
                              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.9} />
                              <span className="truncate">{item.label}</span>
                            </>
                          );
                          const className =
                            "relative flex w-full items-center gap-3 px-5 py-2.5 text-left text-[0.98rem] font-medium text-[#4a4f5d] transition hover:bg-[#fff6ee] hover:text-[#f47c20]";

                          if (item.href) {
                            return (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={className}
                              >
                                {content}
                              </Link>
                            );
                          }

                          return (
                            <button
                              key={item.label}
                              type="button"
                              onClick={item.onClick}
                              className={className}
                            >
                              {content}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <Link
                href={loginHref}
                className="rounded-2xl bg-[#f47c20] px-5 py-2.5 text-[0.95rem] font-extrabold text-white shadow-[0_14px_30px_rgba(244,124,32,0.22)] transition hover:bg-[#dd6a12]"
              >
                Đăng nhập/Đăng ký
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
