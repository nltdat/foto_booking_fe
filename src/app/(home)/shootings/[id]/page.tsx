"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Sparkles,
  Tag,
  UserRound,
  WalletCards
} from "lucide-react";
import { manrope } from "../../../fonts";
import CustomerFooter from "../../../components/footer";
import CustomerHeader from "../../../components/header";
import { getShooting } from "@/services/shooting.service";
import type { Booking } from "@/types/shooting";

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

function formatDateTime(value: string | null | undefined): string {
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
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
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

function DetailRow({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[0.8rem] border border-[#eadfce] bg-[#fffaf4] px-4 py-3">
      <p className="text-[0.78rem] font-bold uppercase text-[#8b7a68]">{label}</p>
      <p className="mt-1 text-[0.96rem] font-extrabold text-[#303746]">{value}</p>
    </div>
  );
}

export default function ShootingDetailPage() {
  const params = useParams<{ id: string }>();
  const [shooting, setShooting] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    setErrorMessage(null);

    getShooting(params.id)
      .then((data) => {
        if (isActive) {
          setShooting(data);
        }
      })
      .catch(() => {
        if (isActive) {
          setErrorMessage("Không thể tải chi tiết buổi chụp.");
          setShooting(null);
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
  }, [params.id]);

  const budget = shooting ? formatBudget(shooting.budget_min, shooting.budget_max) : "";

  return (
    <main className={`${manrope.className} min-h-screen bg-[#fcf8f2] text-[#23180f]`}>
      <CustomerHeader />

      <section className="mx-auto w-full max-w-[72rem] px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/shootings"
          className="mb-6 inline-flex h-10 items-center gap-2 rounded-[0.8rem] border border-[#eadfce] bg-white px-4 text-[0.9rem] font-extrabold text-[#303746] transition hover:border-[#f47c20] hover:text-[#f47c20]"
        >
          <ArrowLeft className="h-4 w-4" />
          Danh sách buổi chụp
        </Link>

        {errorMessage ? (
          <div className="grid min-h-[26rem] place-items-center rounded-[1.15rem] border border-[#eadfce] bg-white px-6 text-center shadow-[0_16px_42px_rgba(89,61,44,0.07)]">
            <div>
              <AlertCircle className="mx-auto h-10 w-10 text-[#f47c20]" />
              <h1 className="mt-4 text-[1.35rem] font-extrabold text-[#303746]">
                {errorMessage}
              </h1>
              <p className="mt-2 text-[0.95rem] font-bold text-[#7a6d61]">
                Vui lòng đăng nhập hoặc thử lại sau.
              </p>
            </div>
          </div>
        ) : isLoading || !shooting ? (
          <div className="grid min-h-[26rem] place-items-center rounded-[1.15rem] border border-[#eadfce] bg-white px-6 text-center shadow-[0_16px_42px_rgba(89,61,44,0.07)]">
            <div>
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#f47c20]" />
              <p className="mt-3 text-[0.95rem] font-bold text-[#7a6d61]">
                Đang tải chi tiết buổi chụp...
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[1.15rem] border border-[#eadfce] bg-white shadow-[0_16px_42px_rgba(89,61,44,0.07)]">
            <div className="border-b border-[#eadfce] bg-[#fffaf4] px-5 py-6 sm:px-7">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f5c891] bg-white px-3 py-1 text-[0.78rem] font-bold uppercase text-[#b85f16]">
                <Sparkles className="h-4 w-4" />
                Chi tiết buổi chụp
              </p>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <h1 className="text-[2rem] font-extrabold leading-tight text-[#222631] sm:text-[2.6rem]">
                    {shooting.title}
                  </h1>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[#fff0dd] px-2.5 py-1 text-[0.8rem] font-extrabold text-[#bd6218]">
                      {statusLabel(shooting.status)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[0.92rem] font-bold text-[#3a4150]">
                      <Camera className="h-4 w-4 text-[#f47c20]" />
                      {categoryLabel(shooting.category)}
                    </span>
                    <span className="text-[0.92rem] font-bold text-[#3a4150]">
                      · {environmentLabel(shooting.environment)}
                    </span>
                  </div>
                </div>

                <div className="rounded-[0.95rem] border border-[#f5c891] bg-white px-4 py-3 lg:min-w-[18rem]">
                  <p className="text-[0.78rem] font-bold uppercase text-[#8b7a68]">Ngân sách</p>
                  <p className="mt-1 inline-flex items-center gap-2 text-[1.05rem] font-extrabold text-[#f47c20]">
                    <WalletCards className="h-5 w-5" />
                    {budget}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <section>
                <h2 className="text-[1.15rem] font-extrabold text-[#222631]">
                  Thông tin buổi chụp
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <DetailRow label="Ngày chụp" value={formatDate(shooting.shoot_date)} />
                  <DetailRow label="Hạn tìm NAG" value={formatDateTime(shooting.deadline_date)} />
                  <DetailRow label="Địa điểm" value={locationLabel(shooting.location)} />
                  <DetailRow label="Bối cảnh" value={environmentLabel(shooting.environment)} />
                  <DetailRow label="Khách hàng" value={`#${shooting.customer}`} />
                  <DetailRow label="Nhiếp ảnh gia" value={shooting.photographer ? `#${shooting.photographer}` : "Chưa ghép"} />
                </div>

                <div className="mt-5 rounded-[0.9rem] border border-[#eadfce] bg-white p-4">
                  <p className="flex items-center gap-2 text-[0.96rem] font-extrabold text-[#303746]">
                    <Tag className="h-4 w-4 text-[#f47c20]" />
                    Dịch vụ đi kèm
                  </p>
                  <p className="mt-2 text-[0.94rem] font-bold text-[#5d6472]">
                    {shooting.requires_makeup ? "Có yêu cầu make-up" : "Không yêu cầu make-up"}
                  </p>
                </div>
              </section>

              <aside className="space-y-3">
                <div className="rounded-[0.95rem] border border-[#eadfce] bg-[#fffaf4] p-4">
                  <p className="flex items-center gap-2 text-[0.9rem] font-extrabold text-[#303746]">
                    <CalendarDays className="h-4 w-4 text-[#f47c20]" />
                    Lịch chụp
                  </p>
                  <p className="mt-2 text-[1.05rem] font-extrabold text-[#222631]">
                    {formatDate(shooting.shoot_date)}
                  </p>
                </div>
                <div className="rounded-[0.95rem] border border-[#eadfce] bg-[#fffaf4] p-4">
                  <p className="flex items-center gap-2 text-[0.9rem] font-extrabold text-[#303746]">
                    <MapPin className="h-4 w-4 text-[#f47c20]" />
                    Khu vực
                  </p>
                  <p className="mt-2 text-[1.05rem] font-extrabold text-[#222631]">
                    {locationLabel(shooting.location)}
                  </p>
                </div>
                <div className="rounded-[0.95rem] border border-[#eadfce] bg-[#fffaf4] p-4">
                  <p className="flex items-center gap-2 text-[0.9rem] font-extrabold text-[#303746]">
                    <UserRound className="h-4 w-4 text-[#f47c20]" />
                    Trạng thái
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-[1.05rem] font-extrabold text-[#222631]">
                    <CheckCircle2 className="h-5 w-5 text-[#f47c20]" />
                    {statusLabel(shooting.status)}
                  </p>
                </div>
                <div className="rounded-[0.95rem] border border-[#eadfce] bg-[#fffaf4] p-4">
                  <p className="flex items-center gap-2 text-[0.9rem] font-extrabold text-[#303746]">
                    <Clock className="h-4 w-4 text-[#f47c20]" />
                    Cập nhật
                  </p>
                  <p className="mt-2 text-[0.95rem] font-bold text-[#5d6472]">
                    {formatDateTime(shooting.updated_at)}
                  </p>
                </div>
              </aside>
            </div>
          </div>
        )}
      </section>

      <CustomerFooter />
    </main>
  );
}
