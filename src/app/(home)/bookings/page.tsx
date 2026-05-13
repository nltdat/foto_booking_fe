"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode, ChangeEvent, DragEvent, FormEvent } from "react";
import { useMemo, useState, useRef, useEffect } from "react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  ImagePlus,
  MapPin,
  Upload,
  WalletCards,
  X
} from "lucide-react";
import { manrope } from "../../fonts";
import CustomerFooter from "../../components/footer";
import CustomerHeader from "../../components/header";
import { getAccessToken } from "@/lib/token-storage";
import { ApiError, login, register } from "@/services/auth.service";
import { createBooking } from "@/services/shooting.service";
import { setAuthSession } from "@/store/auth-store";
import type { BookingCategory, BookingEnvironment } from "@/types/shooting";

type Choice = {
  label: string;
  meta?: string;
  image?: string;
};

type ImagePreview = {
  id: string;
  name: string;
  url: string;
};

type LocationOption = {
  id: number;
  city_province: string;
  district: string;
};

const categories: Choice[] = [
  {
    label: "Cá nhân",
    meta: "(1 Người)",
    image: "/bookings/shooting-types/personal.jpg"
  },
  {
    label: "Cặp đôi",
    meta: "(2 Người)",
    image: "/bookings/shooting-types/couple.jpg"
  },
  {
    label: "Gia đình",
    meta: "(3-10 người)",
    image: "/bookings/shooting-types/family.jpg"
  },
  {
    label: "Nhóm",
    meta: "(2-10 người)",
    image: "/bookings/shooting-types/group.jpg"
  },
  {
    label: "HSSV",
    meta: "(1-10 người)",
    image: "/bookings/shooting-types/student.jpg"
  },
  {
    label: "Sự kiện",
    image: "/bookings/shooting-types/event.jpg"
  }
];

const settings: Choice[] = [
  { label: "Ngoài trời", image: "/bookings/shooting-contexts/outside.jpg" },
  { label: "Studio", image: "/bookings/shooting-contexts/studio.jpg" }
];

const locations = [
  "Hà Nội",
  "Đà Nẵng",
  "TP.Hồ Chí Minh",
  "An Giang",
  "Bắc Ninh",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đắk Lắk",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Tĩnh",
  "Hải Phòng",
  "Hưng Yên",
  "Khánh Hòa",
  "Lâm Đồng",
  "Nghệ An",
  "Quảng Ninh",
  "Thanh Hóa",
  "Thừa Thiên-Huế"
];

const services = ["Make-up + Làm tóc", "Thuê studio"];
const weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];

function formatMonth(date: Date) {
  return `tháng ${String(date.getMonth() + 1).padStart(2, "0")} ${date.getFullYear()}`;
}

function getMonthDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
  ];
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatMoneyInput(value: string) {
  return value.replace(/[^\d]/g, "");
}

function categoryToApi(value: string): BookingCategory {
  const map: Record<string, BookingCategory> = {
    "Cá nhân": "PERSONAL",
    "Cặp đôi": "COUPLE",
    "Gia đình": "FAMILY",
    "Nhóm": "PERSONAL",
    HSSV: "PERSONAL",
    "Sự kiện": "EVENT"
  };

  return map[value] ?? "PERSONAL";
}

function environmentToApi(value: string): BookingEnvironment {
  return value === "Studio" ? "STUDIO" : "OUTDOOR";
}

function ChoiceCard({
  choice,
  active,
  onClick
}: {
  choice: Choice;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group overflow-hidden rounded-xl border bg-white text-left shadow-[0_10px_30px_rgba(35,24,15,0.08)] transition ${
        active
          ? "border-[#f47c20] ring-2 ring-[#ffd4a8]"
          : "border-[#eadfce] hover:-translate-y-0.5 hover:border-[#f4b36f]"
      }`}
    >
      <span className="relative block h-40 overflow-hidden bg-[#f2e7d9]">
        {choice.image ? (
          <Image
            src={choice.image}
            alt={choice.label}
            width={420}
            height={260}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : null}
        <span className="absolute inset-0 bg-gradient-to-t from-[#21140c]/75 via-[#21140c]/20 to-transparent" />
        {active ? (
          <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-[#f47c20] text-white">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
        ) : null}
        <span className="absolute bottom-4 left-4 right-4">
          <span className="block text-[1.12rem] font-extrabold text-white">{choice.label}</span>
          {choice.meta ? (
            <span className="mt-1 block text-[0.88rem] font-bold text-white/86">{choice.meta}</span>
          ) : null}
        </span>
      </span>
    </button>
  );
}

function SectionTitle({
  children,
  aside
}: {
  children: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="text-[1.18rem] font-extrabold text-[#263142]">{children}</h2>
      {aside ? <div className="text-[0.9rem] font-semibold text-[#776a5d]">{aside}</div> : null}
    </div>
  );
}

function getAuthErrorMessage(error: unknown, fallbackMessage: string) {
  if (!(error instanceof ApiError)) {
    return fallbackMessage;
  }

  return (
    error.data.detail ??
    error.data.username?.[0] ??
    error.data.email?.[0] ??
    error.data.password?.[0] ??
    error.data.password_confirm?.[0] ??
    error.data.non_field_errors?.[0] ??
    fallbackMessage
  );
}

function AuthModal({
  onClose,
  onAuthenticated
}: {
  onClose: () => void;
  onAuthenticated: () => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await login({ email, password });
      setAuthSession({
        accessToken: result.access,
        refreshToken: result.refresh,
        user: result.user
      });
      onAuthenticated();
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegisterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
    const [firstName = "", ...restName] = fullName.split(/\s+/).filter(Boolean);

    if (password !== passwordConfirm) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await register({
        username: email,
        email,
        password,
        password_confirm: passwordConfirm,
        first_name: restName.length > 0 ? firstName : "",
        last_name: restName.length > 0 ? restName.join(" ") : firstName,
        role: "CUSTOMER"
      });
      setMode("login");
      setSuccessMessage("Đăng ký thành công. Vui lòng đăng nhập để tiếp tục đặt lịch.");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1d1d]/48 px-4 py-8">
      <div className="relative w-full max-w-[28rem] rounded-[0.8rem] bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-6">
        <button
          type="button"
          aria-label="Đóng"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-[#1f2530] transition hover:bg-[#f2f4f7]"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="pr-9 text-[1.05rem] font-extrabold text-[#283142]">
          Đăng nhập/Đăng ký để tiếp tục
        </h2>

        <div className="mt-5 grid grid-cols-2 rounded-[0.7rem] bg-[#f1f4f7] p-1 text-[0.9rem] font-extrabold">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMessage(null);
            }}
            className={`h-9 rounded-[0.55rem] transition ${mode === "login" ? "bg-white text-[#f47c20] shadow-sm" : "text-[#68717d]"}`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setErrorMessage(null);
            }}
            className={`h-9 rounded-[0.55rem] transition ${mode === "register" ? "bg-white text-[#f47c20] shadow-sm" : "text-[#68717d]"}`}
          >
            Đăng ký
          </button>
        </div>

        {successMessage ? (
          <p className="mt-4 rounded-[0.7rem] border border-[#bfe8cc] bg-[#f1fff5] px-3 py-2 text-[0.86rem] font-semibold text-[#20733b]">
            {successMessage}
          </p>
        ) : null}
        {errorMessage ? (
          <p className="mt-4 rounded-[0.7rem] border border-[#ffd4c4] bg-[#fff5f0] px-3 py-2 text-[0.86rem] font-semibold text-[#bd4a1d]">
            {errorMessage}
          </p>
        ) : null}

        {mode === "login" ? (
          <form className="mt-5 space-y-4" onSubmit={handleLoginSubmit}>
            <label className="block">
              <span className="mb-2 block text-[0.82rem] font-bold text-[#333946]">Email đăng nhập</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="h-11 w-full rounded-[0.65rem] border border-transparent bg-[#edf3f8] px-3 text-[0.94rem] outline-none transition focus:border-[#f47c20] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[0.82rem] font-bold text-[#333946]">Mật khẩu</span>
              <span className="relative block">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="h-11 w-full rounded-[0.65rem] border border-transparent bg-[#edf3f8] px-3 pr-11 text-[0.94rem] outline-none transition focus:border-[#f47c20] focus:bg-white"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[#596270] hover:bg-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-[0.7rem] bg-[#ff6b00] text-[0.98rem] font-extrabold text-white transition hover:bg-[#ef5f00] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
            <div className="text-center text-[0.9rem] text-[#7a808b]">
              Chưa có tài khoản?{" "}
              <button type="button" onClick={() => setMode("register")} className="font-extrabold text-[#ff6b00]">
                Đăng ký ngay!
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-5 space-y-4" onSubmit={handleRegisterSubmit}>
            <label className="block">
              <span className="mb-2 block text-[0.82rem] font-bold text-[#333946]">Họ và tên</span>
              <input
                name="fullName"
                autoComplete="name"
                required
                className="h-11 w-full rounded-[0.65rem] border border-transparent bg-[#edf3f8] px-3 text-[0.94rem] outline-none transition focus:border-[#f47c20] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[0.82rem] font-bold text-[#333946]">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="h-11 w-full rounded-[0.65rem] border border-transparent bg-[#edf3f8] px-3 text-[0.94rem] outline-none transition focus:border-[#f47c20] focus:bg-white"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[0.82rem] font-bold text-[#333946]">Mật khẩu</span>
                <span className="relative block">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="h-11 w-full rounded-[0.65rem] border border-transparent bg-[#edf3f8] px-3 pr-10 text-[0.94rem] outline-none transition focus:border-[#f47c20] focus:bg-white"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[#596270] hover:bg-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
              </label>
              <label className="block">
                <span className="mb-2 block text-[0.82rem] font-bold text-[#333946]">Xác nhận</span>
                <span className="relative block">
                  <input
                    name="passwordConfirm"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="h-11 w-full rounded-[0.65rem] border border-transparent bg-[#edf3f8] px-3 pr-10 text-[0.94rem] outline-none transition focus:border-[#f47c20] focus:bg-white"
                  />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"}
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[#596270] hover:bg-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-[0.7rem] bg-[#ff6b00] text-[0.98rem] font-extrabold text-white transition hover:bg-[#ef5f00] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Đang đăng ký..." : "Đăng ký tài khoản"}
            </button>
            <div className="text-center text-[0.9rem] text-[#7a808b]">
              Đã có tài khoản?{" "}
              <button type="button" onClick={() => setMode("login")} className="font-extrabold text-[#ff6b00]">
                Đăng nhập ngay!
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function CustomerBookingsPage() {
  const [category, setCategory] = useState("Cá nhân");
  const [setting, setSetting] = useState("Ngoài trời");
  const [location, setLocation] = useState("Hà Nội");
  const [detailLocation, setDetailLocation] = useState("");
  const [month, setMonth] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate());
  const [selectedServices, setSelectedServices] = useState<string[]>(["Make-up + Làm tóc"]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [apiLocations, setApiLocations] = useState<LocationOption[]>([]);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const monthDays = useMemo(() => getMonthDays(month), [month]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrlsRef = useRef<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  useEffect(() => {
    window.localStorage.removeItem("fotonow.booking_draft");
    window.indexedDB.deleteDatabase("fotonow_booking_draft");

    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      previewUrlsRef.current = [];
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchLocations() {
      try {
        const response = await fetch("/api/locations", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as LocationOption[];
        if (isMounted) {
          setApiLocations(data);
        }
      } catch {
        if (isMounted) {
          setApiLocations([]);
        }
      }
    }

    fetchLocations();

    return () => {
      isMounted = false;
    };
  }, []);

  function moveMonth(offset: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
    setSelectedDay(1);
  }

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    );
  }

  function getSelectedShootDate() {
    return new Date(month.getFullYear(), month.getMonth(), selectedDay);
  }

  function getSelectedLocationId() {
    const normalizedLocation = location.replace(/\s+/g, "").toLowerCase();
    const matchedLocation = apiLocations.find(
      (item) => item.city_province.replace(/\s+/g, "").toLowerCase() === normalizedLocation
    );

    return matchedLocation?.id ?? null;
  }

  async function handleSubmitBooking() {
    setSubmitError(null);
    setSubmitMessage(null);

    const normalizedBudgetMin = formatMoneyInput(budgetMin);
    const normalizedBudgetMax = formatMoneyInput(budgetMax);

    if (!title.trim()) {
      setSubmitError("Vui lòng nhập tiêu đề buổi chụp.");
      return;
    }

    if (!description.trim()) {
      setSubmitError("Vui lòng nhập nội dung buổi chụp.");
      return;
    }

    if (!normalizedBudgetMin || !normalizedBudgetMax) {
      setSubmitError("Vui lòng nhập khoảng chi phí mong muốn.");
      return;
    }

    if (!getAccessToken()) {
      setShowAuthModal(true);
      return;
    }

    const locationId = getSelectedLocationId();
    if (!locationId) {
      setSubmitError("Chưa tìm được mã địa điểm để tạo lịch chụp. Vui lòng thử lại sau.");
      return;
    }

    const shootDate = getSelectedShootDate();
    const deadlineDate = new Date(shootDate);
    deadlineDate.setDate(deadlineDate.getDate() - 2);

    setIsSubmitting(true);

    try {
      await createBooking({
        title: title.trim(),
        category: categoryToApi(category),
        shoot_date: formatDateInput(shootDate),
        deadline_date: deadlineDate.toISOString(),
        location: locationId,
        environment: environmentToApi(setting),
        requires_makeup: selectedServices.includes("Make-up + Làm tóc"),
        budget_min: normalizedBudgetMin,
        budget_max: normalizedBudgetMax
      });

      setSubmitMessage("Yêu cầu đặt lịch đã được gửi thành công.");
    } catch {
      setSubmitError("Không thể gửi yêu cầu đặt lịch. Vui lòng kiểm tra lại thông tin và thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleImageFiles(files: File[]) {
    const imageFiles = files.filter((file) => file.type.startsWith("image/")).slice(0, 5);

    if (imageFiles.length === 0) {
      return;
    }

    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));

    const nextPreviews = imageFiles.map((file, index) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${index}`,
        name: file.name,
        url: URL.createObjectURL(file)
      }));

    previewUrlsRef.current = nextPreviews.map((preview) => preview.url);
    setImagePreviews(nextPreviews);
  }

  function removeImagePreview(id: string) {
    setImagePreviews((current) => {
      const removedPreview = current.find((preview) => preview.id === id);
      if (removedPreview?.url.startsWith("blob:")) {
        URL.revokeObjectURL(removedPreview.url);
      }

      const nextPreviews = current.filter((preview) => preview.id !== id);
      previewUrlsRef.current = nextPreviews.map((preview) => preview.url);
      return nextPreviews;
    });
  }

  return (
    <main className={`${manrope.className} min-h-screen bg-[#fcf8f2] text-[#23180f]`}>
      <CustomerHeader />

      <section className="mx-auto w-full max-w-[75rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end">
          <div>
            <h1 className="text-[2.25rem] font-extrabold tracking-[-0.04em] text-[#263142] sm:text-[3.4rem]">
              Đặt lịch chụp hình
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[1.02rem] font-semibold text-[#62574d]">
              <span className="rounded-full bg-[#f47c20] px-3 py-1 text-[0.8rem] font-extrabold text-white">
                Mới
              </span>
              Đặt lịch trực tiếp với Nhiếp ảnh gia yêu thích.
              <Link href="/photographers" className="font-extrabold text-[#f47c20] hover:underline">
                Thử ngay!
              </Link>
            </p>
          </div>

          <div className="rounded-[0.8rem] border border-[#eadfce] bg-white px-5 py-4 shadow-[0_14px_36px_rgba(89,61,44,0.07)]">
            <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.12em] text-[#b46925]">
              Tóm tắt
            </p>
            <div className="mt-3 grid gap-2 text-[0.94rem] font-bold text-[#394150]">
              <span>{category} · {setting}</span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#f47c20]" /> {location}
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#f47c20]" /> Ngày {selectedDay}, {formatMonth(month)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-6">
            <section className="rounded-[0.8rem] border border-[#eadfce] bg-white/90 p-5 shadow-[0_16px_42px_rgba(89,61,44,0.07)] sm:p-6">
              <SectionTitle
                aside={
                  <Link href="/shootings" className="text-[#f47c20] hover:underline">
                    Thông tin chi tiết về các thể loại chụp, xem tại đây
                  </Link>
                }
              >
                Chọn thể loại
              </SectionTitle>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {categories.map((item) => (
                  <ChoiceCard
                    key={item.label}
                    choice={item}
                    active={category === item.label}
                    onClick={() => setCategory(item.label)}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-[0.8rem] border border-[#eadfce] bg-white/90 p-5 shadow-[0_16px_42px_rgba(89,61,44,0.07)] sm:p-6">
              <SectionTitle>Chọn bối cảnh</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                {settings.map((item) => (
                  <ChoiceCard
                    key={item.label}
                    choice={item}
                    active={setting === item.label}
                    onClick={() => setSetting(item.label)}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-[0.8rem] border border-[#eadfce] bg-white/90 p-5 shadow-[0_16px_42px_rgba(89,61,44,0.07)] sm:p-6">
              <SectionTitle>Chọn địa điểm (đã cập nhật theo địa giới hành chính mới)*</SectionTitle>
              <div className="flex max-h-36 flex-wrap gap-2 overflow-auto pr-1">
                {locations.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLocation(item)}
                    className={`h-10 rounded-full border px-4 text-[0.9rem] font-extrabold transition ${
                      location === item
                        ? "border-[#f47c20] bg-[#fff0dd] text-[#c66416]"
                        : "border-[#eadfce] bg-white text-[#4d5664] hover:border-[#f4b36f]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-[0.95rem] font-extrabold text-[#2f3744]">
                  Địa điểm chi tiết (nếu có)
                </span>
                <input
                  type="text"
                  value={detailLocation}
                  onChange={(event) => setDetailLocation(event.target.value)}
                  placeholder="Tên studio, quán cà phê, địa chỉ cụ thể..."
                  className="h-12 w-full rounded-[0.7rem] border border-[#e5d8c7] bg-[#fffaf4] px-4 text-[0.96rem] outline-none transition placeholder:text-[#a99a8c] focus:border-[#f47c20] focus:bg-white"
                />
              </label>
            </section>

            <section className="rounded-[0.8rem] border border-[#eadfce] bg-white/90 p-5 shadow-[0_16px_42px_rgba(89,61,44,0.07)] sm:p-6">
              <SectionTitle
                aside="Thời hạn để NAG đề nghị chụp là 48 tiếng trước giờ chụp."
              >
                Ngày chụp dự kiến
              </SectionTitle>
              <div className="rounded-[0.8rem] border border-[#eadfce] bg-[#fffaf4] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    aria-label="Tháng trước"
                    onClick={() => moveMonth(-1)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#eadfce] bg-white text-[#394150]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="text-[1rem] font-extrabold text-[#263142]">{formatMonth(month)}</p>
                  <button
                    type="button"
                    aria-label="Tháng sau"
                    onClick={() => moveMonth(1)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#eadfce] bg-white text-[#394150]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {weekdays.map((day) => (
                    <span key={day} className="text-[0.78rem] font-extrabold text-[#7a6d61]">
                      {day}
                    </span>
                  ))}
                  {monthDays.map((day, index) =>
                    day ? (
                      <button
                        key={`${day}-${index}`}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`aspect-square rounded-full text-[0.9rem] font-extrabold transition ${
                          selectedDay === day
                            ? "bg-[#f47c20] text-white shadow-[0_10px_22px_rgba(244,124,32,0.28)]"
                            : "bg-white text-[#3d4654] hover:bg-[#fff0dd]"
                        }`}
                      >
                        {String(day).padStart(2, "0")}
                      </button>
                    ) : (
                      <span key={`blank-${index}`} />
                    )
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-[0.8rem] border border-[#eadfce] bg-white/90 p-5 shadow-[0_16px_42px_rgba(89,61,44,0.07)] sm:p-6">
              <SectionTitle>Chi tiết buổi chụp</SectionTitle>
              <div className="grid gap-4">
                <label>
                  <span className="mb-2 block text-[0.95rem] font-extrabold text-[#2f3744]">
                    Tiêu đề buổi chụp*
                  </span>
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Ví dụ: Chụp ảnh cá nhân tại Hồ Tây"
                    className="h-12 w-full rounded-[0.7rem] border border-[#e5d8c7] bg-[#fffaf4] px-4 text-[0.96rem] outline-none transition placeholder:text-[#a99a8c] focus:border-[#f47c20] focus:bg-white"
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[0.95rem] font-extrabold text-[#2f3744]">
                    Nội dung buổi chụp*
                  </span>
                  <textarea
                    maxLength={200}
                    rows={5}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Mô tả concept, outfit, số người, thời gian mong muốn..."
                    className="w-full resize-none rounded-[0.7rem] border border-[#e5d8c7] bg-[#fffaf4] px-4 py-3 text-[0.96rem] outline-none transition placeholder:text-[#a99a8c] focus:border-[#f47c20] focus:bg-white"
                  />
                  <span className="mt-1 block text-right text-[0.82rem] font-bold text-[#9a8b7e]">
                    {description.length}/200
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-[0.8rem] border border-[#eadfce] bg-white/90 p-5 shadow-[0_16px_42px_rgba(89,61,44,0.07)] sm:p-6">
              <SectionTitle
                aside="Nên cộng chi phí ước tính của mỗi dịch vụ vào ngân sách mong muốn."
              >
                Dịch vụ đi kèm
              </SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => {
                  const active = selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`flex min-h-[3.25rem] items-center justify-between rounded-[0.7rem] border px-4 py-3 text-left text-[0.96rem] font-extrabold transition ${
                        active
                          ? "border-[#f47c20] bg-[#fff0dd] text-[#c66416]"
                          : "border-[#eadfce] bg-white text-[#4d5664] hover:border-[#f4b36f]"
                      }`}
                    >
                      {service}
                      <span className={`grid h-5 w-5 place-items-center rounded-full border ${
                        active ? "border-[#f47c20] bg-[#f47c20] text-white" : "border-[#d6c9ba]"
                      }`}>
                        {active ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[0.8rem] border border-[#eadfce] bg-white/90 p-5 shadow-[0_16px_42px_rgba(89,61,44,0.07)] sm:p-6">
              <SectionTitle>Chi phí mong muốn</SectionTitle>
              <div className="mb-4 flex items-start gap-3 rounded-[0.7rem] bg-[#fff5e8] p-4">
                <Image
                  src="/bookings/avatar/popo.png"
                  alt="Popo"
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-full bg-white object-cover"
                />
                <div>
                  <p className="font-extrabold text-[#263142]">Trợ lý Popo</p>
                  <p className="mt-1 text-[0.92rem] font-semibold text-[#6d6257]">
                    Buổi chụp này sẽ có giá là bao nhiêu nhỉ?
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-[0.95rem] font-extrabold text-[#2f3744]">
                    Từ (VND)*
                  </span>
                  <input
                    inputMode="numeric"
                    value={budgetMin}
                    onChange={(event) => setBudgetMin(event.target.value)}
                    placeholder="1.000.000"
                    className="h-12 w-full rounded-[0.7rem] border border-[#e5d8c7] bg-[#fffaf4] px-4 text-[0.96rem] outline-none transition placeholder:text-[#a99a8c] focus:border-[#f47c20] focus:bg-white"
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[0.95rem] font-extrabold text-[#2f3744]">
                    Đến (VND)*
                  </span>
                  <input
                    inputMode="numeric"
                    value={budgetMax}
                    onChange={(event) => setBudgetMax(event.target.value)}
                    placeholder="2.000.000"
                    className="h-12 w-full rounded-[0.7rem] border border-[#e5d8c7] bg-[#fffaf4] px-4 text-[0.96rem] outline-none transition placeholder:text-[#a99a8c] focus:border-[#f47c20] focus:bg-white"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[0.8rem] border border-[#eadfce] bg-white/90 p-5 shadow-[0_16px_42px_rgba(89,61,44,0.07)] sm:p-6">
              <SectionTitle
                aside="Giúp Nhiếp ảnh gia dễ hình dung concept hơn. Chọn tối đa 5 ảnh."
              >
                Ảnh minh hoạ mong muốn (nếu có)
              </SectionTitle>
              <label
                className="flex min-h-[10rem] cursor-pointer flex-col items-center justify-center rounded-[0.8rem] border-2 border-dashed border-[#e2d4c4] bg-[#fffaf4] px-4 text-center transition hover:border-[#f4b36f] hover:bg-white"
                onDragOver={(e: DragEvent<HTMLLabelElement>) => {
                  e.preventDefault();
                }}
                onDrop={(e: DragEvent<HTMLLabelElement>) => {
                  e.preventDefault();
                  handleImageFiles(Array.from(e.dataTransfer.files));
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleImageFiles(Array.from(e.target.files || []));
                    e.currentTarget.value = "";
                  }}
                />

                {imagePreviews.length > 0 ? (
                  <div className="grid w-full grid-cols-2 gap-2 px-2 sm:grid-cols-5">
                    {imagePreviews.map((preview, idx) => (
                      <span
                        key={preview.id}
                        className="group relative block overflow-hidden rounded-[0.55rem] border border-[#eadfce] bg-white"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview.url}
                          alt={`Ảnh minh hoạ ${idx + 1}`}
                          className="aspect-square w-full object-cover"
                        />
                        <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[#21140c]/78 via-[#21140c]/20 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                          <span className="block w-full truncate text-left text-[0.72rem] font-bold text-white">
                            {preview.name}
                          </span>
                        </span>
                        <button
                          type="button"
                          aria-label={`Xoá ${preview.name}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeImagePreview(preview.id);
                          }}
                          className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-[#23180f]/78 text-[1rem] font-bold leading-none text-white opacity-0 shadow-[0_6px_14px_rgba(0,0,0,0.2)] transition hover:bg-[#f47c20] group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-[#f47c20]" />
                    <span className="mt-3 text-[0.98rem] font-extrabold text-[#394150]">
                      Kéo file vào đây hoặc nhấn vào đây để tải lên
                    </span>
                    <span className="mt-1 text-[0.86rem] font-semibold text-[#8a7b6c]">
                      PNG, JPG hoặc WEBP
                    </span>
                  </>
                )}
              </label>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[0.8rem] border border-[#eadfce] bg-white p-5 shadow-[0_18px_50px_rgba(89,61,44,0.1)]">
              <div className="mb-5 grid h-36 place-items-center rounded-[0.7rem] bg-[#fff4e7] text-[#f47c20]">
                <ImagePlus className="h-12 w-12" strokeWidth={1.6} />
              </div>
              <div className="space-y-4 text-[0.95rem]">
                <div>
                  <p className="font-extrabold text-[#263142]">Tiêu đề buổi chụp:</p>
                  <p className="mt-1 font-semibold text-[#7a6d61]">
                    {title.trim() || "Chưa nhập tiêu đề"}
                  </p>
                </div>
                <div>
                  <p className="font-extrabold text-[#263142]">Chi phí mong muốn:</p>
                  <p className="mt-1 flex items-center gap-2 font-semibold text-[#7a6d61]">
                    <WalletCards className="h-4 w-4 text-[#f47c20]" />
                    {budgetMin || budgetMax ? `${budgetMin || "..."} - ${budgetMax || "..."} VND` : "Chưa cập nhật"}
                  </p>
                </div>
              </div>
              {submitMessage ? (
                <p className="mt-5 rounded-[0.7rem] border border-[#bfe8cc] bg-[#f1fff5] px-4 py-3 text-[0.88rem] font-semibold text-[#20733b]">
                  {submitMessage}
                </p>
              ) : null}
              {submitError ? (
                <p className="mt-5 rounded-[0.7rem] border border-[#ffd4c4] bg-[#fff5f0] px-4 py-3 text-[0.88rem] font-semibold text-[#bd4a1d]">
                  {submitError}
                </p>
              ) : null}
              <div className="my-5 border-t border-dashed border-[#dfd1bf]" />
              <button
                type="button"
                onClick={handleSubmitBooking}
                disabled={isSubmitting}
                className="h-12 w-full rounded-[0.8rem] bg-[#f47c20] text-[0.98rem] font-extrabold text-white shadow-[0_14px_30px_rgba(244,124,32,0.24)] transition hover:bg-[#dd6a12]"
              >
                {isSubmitting ? "Đang gửi..." : "Xác nhận yêu cầu"}
              </button>
            </div>
          </aside>
        </div>
      </section>

      {showAuthModal ? (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={() => {
            setShowAuthModal(false);
            handleSubmitBooking();
          }}
        />
      ) : null}

      <CustomerFooter />
    </main>
  );
}
