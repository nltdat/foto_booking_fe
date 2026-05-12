"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Loader2,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  Tag,
  UsersRound,
  WalletCards
} from "lucide-react";
import { manrope } from "../../fonts";
import CustomerFooter from "../../components/footer";
import CustomerHeader from "../../components/header";
import { getShootings } from "@/services/shooting.service";
import type { Booking } from "@/types/shooting";

const PAGE_SIZE = 10;

const categoryOptions = ["Cá nhân", "Cặp đôi", "Gia đình", "Nhóm", "HSSV", "Sự kiện"];
const settingOptions = ["Ngoài trời", "Studio", "Cần tư vấn"];
const locationOptions = [
  "Tất cả địa điểm",
  "Hà Nội",
  "Đà Nẵng",
  "TP.Hồ Chí Minh",
  "An Giang",
  "Bắc Ninh",
  "Cần Thơ",
  "Đắk Lắk",
  "Đồng Nai",
  "Hải Phòng",
  "Khánh Hòa",
  "Lâm Đồng",
  "Nghệ An",
  "Quảng Ninh",
  "Thanh Hóa",
  "Thừa Thiên-Huế"
];

function Chip({ children, active = false }: { children: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={`h-9 rounded-full border px-3 text-[0.86rem] font-bold transition ${
        active
          ? "border-[#f47c20] bg-[#fff0dd] text-[#c66416]"
          : "border-[#e9dfd1] bg-white text-[#4e5664] hover:border-[#f4b36f]"
      }`}
    >
      {children}
    </button>
  );
}

function FilterPanel() {
  return (
    <aside className="rounded-[1.15rem] border border-[#eadfce] bg-white p-4 shadow-[0_16px_42px_rgba(89,61,44,0.07)] lg:sticky lg:top-28">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[1.15rem] font-extrabold text-[#222631]">Bộ lọc</h2>
        <button type="button" className="text-[0.9rem] font-bold text-[#f47c20]">
          Bỏ lọc
        </button>
      </div>

      <div className="space-y-6">
        <section>
          <p className="mb-3 text-[0.92rem] font-extrabold text-[#353b48]">Thể loại</p>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option, index) => (
              <Chip key={option} active={index === 0}>
                {option}
              </Chip>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-3 text-[0.92rem] font-extrabold text-[#353b48]">Bối cảnh</p>
          <div className="flex flex-wrap gap-2">
            {settingOptions.map((option, index) => (
              <Chip key={option} active={index === 0}>
                {option}
              </Chip>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-3 text-[0.92rem] font-extrabold text-[#353b48]">
            Địa điểm
          </p>
          <div className="max-h-40 overflow-auto pr-1">
            <div className="flex flex-wrap gap-2">
              {locationOptions.map((option, index) => (
                <Chip key={option} active={index === 0}>
                  {option}
                </Chip>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3">
          <p className="text-[0.92rem] font-extrabold text-[#353b48]">Ngày chụp</p>
          <div className="grid grid-cols-2 gap-3">
            <label className="relative">
              <span className="mb-1 block text-[0.78rem] font-bold text-[#7a6d61]">Từ</span>
              <input type="date" className="h-11 w-full rounded-[0.8rem] border border-[#e5d8c7] bg-[#fffaf4] px-3 text-[0.86rem] outline-none" />
            </label>
            <label className="relative">
              <span className="mb-1 block text-[0.78rem] font-bold text-[#7a6d61]">Đến</span>
              <input type="date" className="h-11 w-full rounded-[0.8rem] border border-[#e5d8c7] bg-[#fffaf4] px-3 text-[0.86rem] outline-none" />
            </label>
          </div>
        </section>

        <section className="grid gap-3">
          <p className="text-[0.92rem] font-extrabold text-[#353b48]">Chi phí</p>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Từ" className="h-11 min-w-0 rounded-[0.8rem] border border-[#e5d8c7] bg-[#fffaf4] px-3 text-[0.9rem] outline-none" />
            <input placeholder="Đến" className="h-11 min-w-0 rounded-[0.8rem] border border-[#e5d8c7] bg-[#fffaf4] px-3 text-[0.9rem] outline-none" />
          </div>
        </section>

        <section>
          <p className="mb-3 text-[0.92rem] font-extrabold text-[#353b48]">
            Dịch vụ đi kèm
          </p>
          <div className="grid gap-2">
            {["Mặc định", "Yêu cầu dịch vụ đi kèm", "Không yêu cầu dịch vụ đi kèm"].map((option, index) => (
              <button
                key={option}
                type="button"
                className={`rounded-[0.8rem] border px-3 py-2 text-left text-[0.9rem] font-bold ${
                  index === 0
                    ? "border-[#f47c20] bg-[#fff0dd] text-[#c66416]"
                    : "border-[#e5d8c7] bg-white text-[#4e5664]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          className="h-11 w-full rounded-[0.9rem] bg-[#f47c20] text-[0.95rem] font-extrabold text-white shadow-[0_14px_30px_rgba(244,124,32,0.2)] transition hover:bg-[#dd6a12]"
        >
          Lọc
        </button>
      </div>
    </aside>
  );
}

function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "Chưa cập nhật";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

function formatShortDate(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit"
  }).format(date);
}

function formatMoney(value: string | number | null): string | null {
  if (value === null || value === "") {
    return null;
  }

  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) {
    return String(value);
  }

  return `${new Intl.NumberFormat("vi-VN").format(numberValue)} VND`;
}

function formatBudget(min: string | number | null, max: string | number | null): string {
  const formattedMin = formatMoney(min);
  const formattedMax = formatMoney(max);

  if (formattedMin && formattedMax) {
    return formattedMin === formattedMax ? formattedMin : `${formattedMin} - ${formattedMax}`;
  }

  return formattedMin ?? formattedMax ?? "Chưa cập nhật";
}

function categoryLabel(category: Booking["category"]): string {
  const labels: Record<Booking["category"], string> = {
    PERSONAL: "Cá nhân",
    COUPLE: "Cặp đôi",
    EVENT: "Sự kiện",
    WEDDING: "Cưới",
    FAMILY: "Gia đình"
  };

  return labels[category];
}

function environmentLabel(environment: Booking["environment"]): string {
  const labels: Record<Booking["environment"], string> = {
    INDOOR: "Trong nhà",
    OUTDOOR: "Ngoài trời",
    STUDIO: "Studio"
  };

  return labels[environment];
}

function locationLabel(location: Booking["location"]): string {
  return `Địa điểm #${location}`;
}

function statusLabel(status: Booking["status"]): string {
  const labels: Record<Booking["status"], string> = {
    OPEN: "Đang tìm NAG",
    MATCHED: "Đã ghép NAG",
    COMPLETED: "Đã hoàn thành",
    CANCELLED: "Đã hủy"
  };

  return labels[status];
}

function ShootingCard({ shooting }: { shooting: Booking }) {
  const postedAt = formatShortDate(shooting.created_at);
  const budget = formatBudget(shooting.budget_min, shooting.budget_max);

  return (
    <article className="border-b border-[#eadfce] bg-white px-4 py-12 transition hover:bg-[#fffaf4] sm:px-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="max-w-full truncate text-[1.05rem] font-extrabold text-[#222631] sm:text-[1.16rem]">
                {shooting.title}
              </h3>
              <span className="text-[#a59a8c]">·</span>
              <span className="truncate text-[0.92rem] font-bold text-[#5d6472]">
                Khách hàng #{shooting.customer}
              </span>
              {postedAt ? (
                <>
                  <span className="text-[#a59a8c]">·</span>
                  <span className="text-[0.86rem] font-semibold text-[#7a6d61]">{postedAt}</span>
                </>
              ) : null}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#fff0dd] px-2.5 py-1 text-[0.78rem] font-extrabold text-[#bd6218]">
                {statusLabel(shooting.status)}
              </span>
              <span className="inline-flex items-center gap-1 text-[0.9rem] font-bold text-[#3a4150]">
                <UsersRound className="h-4 w-4 text-[#f47c20]" />
                {categoryLabel(shooting.category)}
              </span>
              <span className="text-[0.9rem] font-bold text-[#3a4150]">· {environmentLabel(shooting.environment)}</span>
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-2 md:min-w-[16rem]">
            <div className="rounded-[0.75rem] bg-[#f8f1e8] px-3 py-2">
              <p className="text-[0.72rem] font-bold uppercase text-[#8b7a68]">Ngày chụp</p>
              <p className="mt-1 text-[0.82rem] font-extrabold text-[#3a4150]">{formatDate(shooting.shoot_date)}</p>
            </div>
            <div className="rounded-[0.75rem] bg-[#f8f1e8] px-3 py-2">
              <p className="text-[0.72rem] font-bold uppercase text-[#8b7a68]">Hạn tìm NAG</p>
              <p className="mt-1 text-[0.82rem] font-extrabold text-[#3a4150]">{formatDate(shooting.deadline_date)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_auto] lg:items-end">
          <div className="min-w-0 space-y-2">
            <p className="flex min-w-0 items-center gap-2 text-[0.93rem] font-bold text-[#3a4150]">
              <MapPin className="h-4 w-4 shrink-0 text-[#f47c20]" />
              <span className="truncate">{locationLabel(shooting.location)}</span>
            </p>
            {shooting.requires_makeup ? (
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#ffe9d3] px-3 py-1 text-[0.78rem] font-extrabold text-[#9d5415]">
                  <Tag className="h-3.5 w-3.5" />
                  Yêu cầu make-up
                </span>
              </div>
            ) : null}
          </div>

          <p className="inline-flex items-center gap-2 text-[1rem] font-extrabold text-[#f47c20]">
            <WalletCards className="h-4 w-4" />
            {budget}
          </p>

          <Link
            href={`/shootings/${shooting.id}`}
            className="inline-flex h-10 items-center justify-center rounded-[0.8rem] border border-[#eadfce] px-4 text-[0.9rem] font-extrabold text-[#303746] transition hover:border-[#f47c20] hover:text-[#f47c20]"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}

function pageItems(currentPage: number, totalPages: number): Array<number | "..."> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "..."> = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) pages.push("...");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < totalPages - 1) pages.push("...");
  pages.push(totalPages);
  return pages;
}

export default function CustomerShootingsPage() {
  const [shootings, setShootings] = useState<Booking[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const shouldShowPagination = !isLoading && !errorMessage && totalCount > PAGE_SIZE;

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    setErrorMessage(null);

    getShootings({ page: currentPage, page_size: PAGE_SIZE })
      .then((data) => {
        if (isActive) {
          const nextTotalPages = Math.max(1, Math.ceil(data.count / PAGE_SIZE));
          if (currentPage > nextTotalPages) {
            setCurrentPage(nextTotalPages);
            return;
          }

          setShootings(data.results);
          setTotalCount(data.count);
        }
      })
      .catch(() => {
        if (isActive) {
          setErrorMessage("Không thể tải danh sách buổi chụp.");
          setShootings([]);
          setTotalCount(0);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [currentPage]);

  function goToPage(page: number) {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }

  return (
    <main className={`${manrope.className} min-h-screen bg-[#fcf8f2] text-[#23180f]`}>
      <CustomerHeader />

      <section className="mx-auto w-full max-w-[75rem] px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f5c891] bg-white px-3 py-1 text-[0.78rem] font-bold uppercase text-[#b85f16]">
              <Sparkles className="h-4 w-4" />
              Potonow shootings
            </p>
            <h1 className="text-[2.1rem] font-extrabold leading-tight text-[#222631] sm:text-[2.7rem]">
              Danh sách buổi chụp
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex h-11 items-center gap-2 rounded-[0.85rem] border border-[#e5d8c7] bg-white px-4 text-[0.92rem] font-extrabold text-[#222631] shadow-[0_12px_30px_rgba(89,61,44,0.06)] lg:hidden"
            >
              <Filter className="h-5 w-5 text-[#f47c20]" />
              Bộ lọc
            </button>

            <label className="relative h-11 rounded-[0.85rem] border border-[#e5d8c7] bg-white shadow-[0_12px_30px_rgba(89,61,44,0.06)]">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#f47c20]" />
              <select className="h-full appearance-none rounded-[0.85rem] bg-transparent pl-10 pr-10 text-[0.92rem] font-extrabold text-[#222631] outline-none">
                <option>Sắp xếp</option>
                <option>Mới nhất</option>
                <option>Ngân sách cao nhất</option>
                <option>Nhiều đề nghị nhất</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a6d61]" />
            </label>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <div className={isFilterOpen ? "block" : "hidden lg:block"}>
            <FilterPanel />
          </div>

          <div className="overflow-hidden rounded-[1.15rem] border border-[#eadfce] bg-white shadow-[0_16px_42px_rgba(89,61,44,0.07)]">
            <div className="flex flex-col gap-3 border-b border-[#eadfce] bg-[#fffaf4] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex items-center gap-2 text-[0.95rem] font-extrabold text-[#303746]">
                <CalendarDays className="h-5 w-5 text-[#f47c20]" />
                {totalCount} buổi chụp đang mở
              </div>
              <div className="flex items-center gap-2 text-[0.88rem] font-bold text-[#7a6d61]">
                <Clock className="h-4 w-4" />
                Cập nhật theo danh sách Potonow
              </div>
            </div>

            {errorMessage ? (
              <div className="grid min-h-[20rem] place-items-center px-6 text-center">
                <div>
                  <AlertCircle className="mx-auto h-9 w-9 text-[#f47c20]" />
                  <p className="mt-3 text-[1rem] font-extrabold text-[#303746]">
                    {errorMessage}
                  </p>
                </div>
              </div>
            ) : isLoading ? (
              <div className="grid min-h-[20rem] place-items-center px-6 text-center">
                <div>
                  <Loader2 className="mx-auto h-9 w-9 animate-spin text-[#f47c20]" />
                  <p className="mt-3 text-[0.95rem] font-bold text-[#7a6d61]">
                    Đang tải dữ liệu từ database...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {shootings.length > 0 ? (
                  <div>
                    {shootings.map((shooting) => (
                      <ShootingCard key={shooting.id} shooting={shooting} />
                    ))}
                  </div>
                ) : (
                  <div className="grid min-h-[20rem] place-items-center px-6 text-center">
                    <div>
                      <AlertCircle className="mx-auto h-9 w-9 text-[#f47c20]" />
                      <p className="mt-3 text-[1rem] font-extrabold text-[#303746]">
                        Không có buổi chụp nào đang mở.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {shouldShowPagination ? (
              <div className="flex flex-wrap items-center justify-center gap-2 bg-[#fffaf4] px-4 py-5">
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#e5d8c7] bg-white text-[#7a6d61] transition disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {pageItems(currentPage, totalPages).map((page, index) =>
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-[#7a6d61]">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      className={`h-9 min-w-9 rounded-full px-3 text-[0.9rem] font-extrabold ${
                        page === currentPage
                          ? "bg-[#f47c20] text-white"
                          : "border border-[#e5d8c7] bg-white text-[#4e5664]"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#e5d8c7] bg-white text-[#7a6d61] transition disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <CustomerFooter />
    </main>
  );
}
