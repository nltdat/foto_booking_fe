"use client";

import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Camera,
  Circle,
  Eye,
  EyeOff,
  KeyRound,
  Mars,
  MessageCircle,
  Pencil,
  Settings,
  Trash2,
  UserCircle,
  Venus,
  X
} from "lucide-react";
import DatePickerField from "@/app/components/date-picker-field";
import CustomerFooter from "@/app/components/footer";
import { ApiError } from "@/services/auth.service";
import {
  changeCurrentUserPassword,
  deleteCurrentUser,
  getCurrentUser,
  updateCurrentUser
} from "@/services/user.service";
import { clearAuthSession, useAuthStore } from "@/store/auth-store";
import type { UserProfile } from "@/types/auth";

const navLinks = [
  { href: "/about", label: "Về Potonow" },
  { href: "/photographers", label: "Nhiếp Ảnh Gia" },
  { href: "/shootings", label: "Danh Sách Buổi Chụp" },
  { href: "/bookings", label: "Đặt Lịch" },
  { href: "/events/summer-in-frame", label: "Sự Kiện" },
  { href: "/blogs", label: "Blogs" }
] as const;

const initialProfile = {
  fullName: "",
  birthday: "",
  email: "",
  phone: "",
  gender: ""
};

type Profile = typeof initialProfile;
type ActiveTab = "profile" | "account";
type ExtendedUserProfile = UserProfile & {
  birth_date?: string | null;
  date_of_birth?: string | null;
  birthday?: string | null;
  phone?: string | null;
  phone_number?: string | null;
  gender?: string | null;
};

function getDisplayName(user: Pick<UserProfile, "first_name" | "last_name" | "username" | "email">): string {
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return fullName || user.username || user.email || "";
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length <= 1) {
    return {
      firstName: parts[0] ?? "",
      lastName: ""
    };
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1]
  };
}

function formatBackendDate(value?: string | null): string {
  if (!value) {
    return "";
  }

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    return `${match[3]}/${match[2]}/${match[1]}`;
  }

  return value;
}

function userToProfile(user: ExtendedUserProfile): Profile {
  return {
    fullName: getDisplayName(user),
    birthday: formatBackendDate(user.birth_date ?? user.date_of_birth ?? user.birthday),
    email: user.email ?? "",
    phone: user.phone ?? user.phone_number ?? "",
    gender: user.gender ?? ""
  };
}

function formatPhoneForForm(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("84") && digits.length === 11) {
    return `+84 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }

  return phone;
}

function normalizePhoneForDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("84")) {
    return `+${digits}`;
  }

  return phone;
}

function MyPageHeader({ avatarSrc, displayName }: { avatarSrc: string; displayName: string }) {
  return (
    <header className="border-b border-[#f0f0f0] bg-white">
      <div className="mx-auto flex h-[3.75rem] w-full max-w-[65rem] items-center justify-between gap-6 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/customer-home/potonow.png"
            alt="Potonow"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="text-[1.18rem] font-bold text-[#252836]">potonow</span>
        </Link>

        <nav className="hidden items-center gap-6 text-[0.94rem] font-medium text-[#272b37] lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[#ff6b22]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4 text-[#111827]">
          <button type="button" className="hidden items-center gap-1.5 text-[0.9rem] md:flex">
            VI
            <Image
              src="/customer-home/national-flag.svg"
              alt="Vietnamese"
              width={10}
              height={10}
              className="mt-3 h-2.5 w-2.5"
            />
          </button>
          <button type="button" aria-label="Thông báo" className="grid h-7 w-7 place-items-center">
            <Bell className="h-5 w-5" strokeWidth={2} />
          </button>
          <button type="button" aria-label="Tin nhắn" className="grid h-7 w-7 place-items-center">
            <MessageCircle className="h-5 w-5" strokeWidth={2} />
          </button>
          <button type="button" aria-label="Tài khoản" className="grid h-8 w-8 place-items-center rounded-full">
            <img
              src={avatarSrc}
              alt={displayName || "Tài khoản"}
              className="h-8 w-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

function LemonFace() {
  return (
    <div className="absolute left-1/2 top-[1.1rem] h-[15.5rem] w-[28rem] -translate-x-1/2">
      <span className="absolute left-[8.2rem] top-[3rem] h-[4.2rem] w-[3.05rem] rounded-[1.35rem] bg-[#3f2416]" />
      <span className="absolute right-[8.2rem] top-[3rem] h-[4.2rem] w-[3.05rem] rounded-[1.35rem] bg-[#3f2416]" />
      <span className="absolute left-[6.4rem] top-[1.95rem] h-[3rem] w-[4.8rem] rotate-[38deg] rounded-t-full border-t-[0.42rem] border-[#3f2416]" />
      <span className="absolute right-[6.4rem] top-[1.95rem] h-[3rem] w-[4.8rem] rotate-[-38deg] rounded-t-full border-t-[0.42rem] border-[#3f2416]" />
      <span className="absolute left-[12rem] top-[7.85rem] h-[4.2rem] w-[9.6rem] rounded-b-full border-b-[0.42rem] border-[#fb6d22]" />
      <span className="absolute left-[5.2rem] top-[8.2rem] h-[4rem] w-[6rem] rounded-full bg-[#ff8a1f] opacity-45 blur-xl" />
      <span className="absolute right-[5.2rem] top-[8.2rem] h-[4rem] w-[6rem] rounded-full bg-[#ff8a1f] opacity-45 blur-xl" />
      <span className="absolute left-[7rem] top-[9rem] h-[0.45rem] w-[2.5rem] rotate-[-55deg] rounded-full bg-[#fb6d22]" />
      <span className="absolute left-[8.45rem] top-[9rem] h-[0.45rem] w-[2.5rem] rotate-[-55deg] rounded-full bg-[#fb6d22]" />
      <span className="absolute left-[9.85rem] top-[9rem] h-[0.45rem] w-[2.5rem] rotate-[-55deg] rounded-full bg-[#fb6d22]" />
      <span className="absolute right-[7rem] top-[9rem] h-[0.45rem] w-[2.5rem] rotate-[-55deg] rounded-full bg-[#fb6d22]" />
      <span className="absolute right-[8.45rem] top-[9rem] h-[0.45rem] w-[2.5rem] rotate-[-55deg] rounded-full bg-[#fb6d22]" />
      <span className="absolute right-[9.85rem] top-[9rem] h-[0.45rem] w-[2.5rem] rotate-[-55deg] rounded-full bg-[#fb6d22]" />
      <span className="absolute right-[5.2rem] top-0 h-[3.25rem] w-[5.5rem] rotate-[28deg] rounded-[70%_30%_70%_30%] bg-[#04bd05]" />
      <span className="absolute right-[1.4rem] top-[0.55rem] h-[3.55rem] w-[4.5rem] rotate-[52deg] rounded-[70%_30%_70%_30%] bg-[#02ad0d]" />
    </div>
  );
}

function EditProfileModal({
  profile,
  onClose,
  onSave
}: {
  profile: Profile;
  onClose: () => void;
  onSave: (profile: Profile) => Promise<void>;
}) {
  const [form, setForm] = useState({
    ...profile,
    phone: formatPhoneForForm(profile.phone)
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function updateField(field: keyof Profile, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-[28.75rem] rounded-[0.7rem] bg-white p-3 shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[1.05rem] font-bold text-[#252836]">Cập nhật thông tin</h2>
          <button type="button" aria-label="Đóng" onClick={onClose} className="grid h-7 w-7 place-items-center">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-[0.72rem] font-medium text-[#313743]">
            Họ và tên <span className="text-[#ff4d22]">*</span>
            <input
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              className="mt-1 h-8 w-full rounded-[0.55rem] bg-[#edf2f7] px-3 text-[0.86rem] font-medium outline-none"
            />
          </label>

          <DatePickerField
            value={form.birthday}
            onChange={(value) => updateField("birthday", value)}
            label="Ngày sinh"
            required
            size="sm"
            hint="Bạn phải đủ 16 tuổi để đăng ký."
            inputClassName="h-8 w-full rounded-[0.55rem] bg-[#edf2f7] px-3 pr-9 text-[0.86rem] font-medium outline-none"
          />

          <label className="block text-[0.72rem] font-medium text-[#313743]">
            Email <span className="text-[#ff4d22]">*</span>
            <input
              value={form.email}
              readOnly
              className="mt-1 h-8 w-full rounded-[0.55rem] bg-[#edf2f7] px-3 text-[0.86rem] font-medium outline-none"
            />
          </label>

          <label className="block text-[0.72rem] font-medium text-[#313743]">
            Số điện thoại <span className="text-[#ff4d22]">*</span>
            <div className="mt-1 flex h-8 items-center gap-2 rounded-[0.55rem] bg-[#edf2f7] px-3">
              <span className="rounded bg-[#da251d] px-1 text-[0.62rem] text-[#ffde00]">★</span>
              <input
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="Chưa cập nhật"
                className="w-full bg-transparent text-[0.86rem] font-medium outline-none"
              />
            </div>
          </label>
        </div>

        <div className="mt-3">
          <p className="mb-1.5 text-[0.72rem] font-medium text-[#313743]">
            Giới tính <span className="text-[#ff4d22]">*</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "Nam", icon: Mars },
              { value: "Nữ", icon: Venus },
              { value: "Khác", icon: Circle }
            ].map((option) => {
              const Icon = option.icon;
              const isActive = form.gender === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField("gender", option.value)}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-[0.8rem] border px-3 text-[0.78rem] ${
                    isActive
                      ? "border-[#ff6b22] bg-[#fff7f1] text-[#ff6b22]"
                      : "border-[#dce6f1] bg-[#f8fbff] text-[#586575]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {option.value}
                </button>
              );
            })}
          </div>
        </div>

        {errorMessage ? (
          <p className="mt-3 rounded-[0.55rem] border border-[#ffd8cf] bg-[#fff4f1] px-3 py-2 text-[0.78rem] text-[#c24d2c]">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-8 rounded-[0.55rem] border border-[#dce2ea] text-[0.86rem] font-semibold text-[#252836]"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={async () => {
              setIsSaving(true);
              setErrorMessage(null);

              try {
                await onSave({
                  ...form,
                  phone: normalizePhoneForDisplay(form.phone)
                });
                onClose();
              } catch {
                setErrorMessage("Không thể cập nhật thông tin. Vui lòng thử lại.");
              } finally {
                setIsSaving(false);
              }
            }}
            className="h-8 rounded-[0.55rem] bg-[#ff681f] text-[0.86rem] font-semibold text-white disabled:opacity-60"
          >
            {isSaving ? "Đang lưu..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
}

type PasswordFieldKey = "oldPassword" | "newPassword" | "confirmPassword";

function ChangePasswordModal({
  onClose,
  onChangePassword
}: {
  onClose: () => void;
  onChangePassword: (payload: Record<PasswordFieldKey, string>) => Promise<void>;
}) {
  const [form, setForm] = useState<Record<PasswordFieldKey, string>>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [visibleFields, setVisibleFields] = useState<Record<PasswordFieldKey, boolean>>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields: Array<{ key: PasswordFieldKey; label: string; autoComplete: string }> = [
    { key: "oldPassword", label: "Mật khẩu cũ", autoComplete: "current-password" },
    { key: "newPassword", label: "Mật khẩu mới", autoComplete: "new-password" },
    { key: "confirmPassword", label: "Xác nhận mật khẩu", autoComplete: "new-password" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-[19.3rem] rounded-[0.55rem] bg-white p-3.5 shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="text-[0.98rem] font-bold text-[#252836]">Đổi mật khẩu</h2>
          <button type="button" aria-label="Đóng" onClick={onClose} className="grid h-6 w-6 place-items-center">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setErrorMessage(null);
            setSuccessMessage(null);

            if (form.newPassword !== form.confirmPassword) {
              setErrorMessage("Mật khẩu xác nhận không khớp.");
              return;
            }

            setIsSubmitting(true);
            try {
              await onChangePassword(form);
              setSuccessMessage("Đã đổi mật khẩu thành công.");
              setForm({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
              });
            } catch (error) {
              if (error instanceof ApiError) {
                setErrorMessage(
                  error.data.detail ??
                    error.data.old_password?.[0] ??
                    error.data.new_password?.[0] ??
                    error.data.new_password_confirm?.[0] ??
                    error.data.non_field_errors?.[0] ??
                    "Không thể đổi mật khẩu. Vui lòng thử lại."
                );
              } else {
                setErrorMessage("Không thể đổi mật khẩu. Vui lòng thử lại.");
              }
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <div className="space-y-2.5">
            {fields.map((field) => {
              const isVisible = visibleFields[field.key];
              return (
                <label key={field.key} className="block text-[0.7rem] font-medium text-[#313743]">
                  {field.label} <span className="text-[#ff4d22]">*</span>
                  <div className="mt-1 flex h-8 items-center rounded-[0.55rem] bg-[#edf2f7] px-3">
                    <input
                      value={form[field.key]}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, [field.key]: event.target.value }))
                      }
                      type={isVisible ? "text" : "password"}
                      autoComplete={field.autoComplete}
                      required
                      className="min-w-0 flex-1 bg-transparent text-[0.86rem] font-medium outline-none"
                    />
                    <button
                      type="button"
                      aria-label={isVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      onClick={() =>
                        setVisibleFields((current) => ({ ...current, [field.key]: !current[field.key] }))
                      }
                      className="grid h-6 w-6 shrink-0 place-items-center text-[#252836]"
                    >
                      {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </label>
              );
            })}
          </div>

          {errorMessage ? (
            <p className="mt-3 text-[0.78rem] font-medium text-[#d52b1e]">{errorMessage}</p>
          ) : null}

          {successMessage ? (
            <p className="mt-3 text-[0.78rem] font-medium text-[#16803a]">{successMessage}</p>
          ) : null}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-8 rounded-[0.55rem] border border-[#dce2ea] text-[0.86rem] font-semibold text-[#252836]"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-8 rounded-[0.55rem] bg-[#ff681f] text-[0.86rem] font-semibold text-white disabled:opacity-60"
            >
              {isSubmitting ? "Đang đổi..." : "Xác nhận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteAccountConfirmModal({
  onClose,
  onDeleteAccount
}: {
  onClose: () => void;
  onDeleteAccount: (password: string) => Promise<void>;
}) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-[19.3rem] rounded-[0.55rem] bg-white p-3.5 shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h2 className="text-[0.98rem] font-bold leading-6 text-[#252836]">
            Bạn chắc chắn muốn xoá tài khoản?
          </h2>
          <button type="button" aria-label="Đóng" onClick={onClose} className="grid h-6 w-6 shrink-0 place-items-center">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-[0.86rem] leading-6 text-[#505663]">
          Khi bạn xoá tài khoản, tất cả dữ liệu của bạn sẽ bị xoá khỏi hệ thống và không thể khôi phục. Bạn chắc chắn muốn tiếp tục?
        </p>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setErrorMessage(null);
            setIsSubmitting(true);

            try {
              await onDeleteAccount(password);
            } catch (error) {
              if (error instanceof ApiError) {
                setErrorMessage(
                  error.data.detail ??
                    error.data.password?.[0] ??
                    error.data.non_field_errors?.[0] ??
                    "Không thể xóa tài khoản. Vui lòng thử lại."
                );
              } else {
                setErrorMessage("Không thể xóa tài khoản. Vui lòng thử lại.");
              }
              setIsSubmitting(false);
            }
          }}
        >
          <label className="mt-4 block text-[0.7rem] font-medium text-[#313743]">
            Mật khẩu xác nhận <span className="text-[#ff4d22]">*</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="mt-1 h-8 w-full rounded-[0.55rem] bg-[#edf2f7] px-3 text-[0.86rem] font-medium outline-none"
            />
          </label>

          {errorMessage ? (
            <p className="mt-3 text-[0.78rem] font-medium text-[#d52b1e]">{errorMessage}</p>
          ) : null}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-8 rounded-[0.55rem] border border-[#dce2ea] text-[0.86rem] font-semibold text-[#252836]"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-8 rounded-[0.55rem] bg-[#ff681f] text-[0.86rem] font-semibold text-white disabled:opacity-60"
            >
              {isSubmitting ? "Đang xóa..." : "Xác nhận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MyPage() {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const authUser = useAuthStore((state) => state.user);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateAuthUser = useAuthStore((state) => state.updateUser);
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [avatarSrc, setAvatarSrc] = useState("/my-page/avatar.webp");
  const [coverSrc, setCoverSrc] = useState<string>("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [imageStatus, setImageStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!authUser) {
      return;
    }

    applyUserData(authUser);
  }, [authUser]);

  useEffect(() => {
    if (!isHydrated || !isAuthenticated) {
      return;
    }

    let isMounted = true;

    getCurrentUser()
      .then((user) => {
        if (!isMounted) {
          return;
        }

        updateAuthUser(user);
        applyUserData(user);
      })
      .catch(() => {
        if (isMounted) {
          setImageStatus("Không thể tải ảnh đã lưu. Vui lòng đăng nhập lại.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, isHydrated, updateAuthUser]);

  function getFreshImageUrl(url: string): string {
    if (url.startsWith("blob:")) {
      return url;
    }

    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}v=${Date.now()}`;
  }

  function applyUserData(user: ExtendedUserProfile) {
    setProfile(userToProfile(user));

    if (user.avatar_url) {
      setAvatarSrc(getFreshImageUrl(user.avatar_url));
    }

    if (user.cover_image_url) {
      setCoverSrc(getFreshImageUrl(user.cover_image_url));
    }
  }

  async function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
    kind: "avatar" | "cover"
  ) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const setPreview = kind === "avatar" ? setAvatarSrc : setCoverSrc;
    setPreview(previewUrl);
    setImageStatus(kind === "avatar" ? "Đang cập nhật ảnh đại diện..." : "Đang cập nhật ảnh bìa...");

    try {
      await updateCurrentUser(kind === "avatar" ? { avatar: file } : { cover_image: file });
      const updatedUser = await getCurrentUser();
      updateAuthUser(updatedUser);
      applyUserData(updatedUser);

      setImageStatus(kind === "avatar" ? "Đã cập nhật ảnh đại diện." : "Đã cập nhật ảnh bìa.");
    } catch {
      setImageStatus("Không thể cập nhật ảnh. Vui lòng đăng nhập lại hoặc thử lại sau.");
    } finally {
      event.target.value = "";
    }
  }

  async function handleProfileSave(nextProfile: Profile): Promise<void> {
    const { firstName, lastName } = splitFullName(nextProfile.fullName);
    await updateCurrentUser({
      first_name: firstName,
      last_name: lastName
    });

    const updatedUser = await getCurrentUser();
    updateAuthUser(updatedUser);
    applyUserData(updatedUser);
  }

  async function handleChangePassword(form: Record<PasswordFieldKey, string>): Promise<void> {
    await changeCurrentUserPassword({
      old_password: form.oldPassword,
      new_password: form.newPassword,
      new_password_confirm: form.confirmPassword
    });
  }

  async function handleDeleteAccount(password: string): Promise<void> {
    await deleteCurrentUser({ password });
    clearAuthSession();
    router.push("/sign-in");
  }

  return (
    <div className="min-h-screen bg-white text-[#252836]">
      <MyPageHeader avatarSrc={avatarSrc} displayName={profile.fullName} />

      <main className="min-h-[54rem] px-4 pb-20 pt-3">
        <section className="relative mx-auto h-[16.75rem] w-full max-w-[57.25rem] overflow-hidden rounded-[0.7rem] bg-[#ffc400]">
          {coverSrc ? (
            <img src={coverSrc} alt="Ảnh bìa" className="h-full w-full object-cover" />
          ) : (
            <LemonFace />
          )}

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleImageChange(event, "cover")}
          />
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="absolute bottom-3.5 right-3.5 inline-flex h-9 items-center gap-2 rounded-[0.55rem] bg-white px-4 text-[0.92rem] font-semibold text-[#22242c] shadow-sm"
          >
            <Camera className="h-4 w-4" />
            Đổi ảnh bìa
          </button>
        </section>

        <section className="mx-auto w-full max-w-[27.2rem]">
          <div className="relative -mt-12 flex flex-col items-center">
            <div className="relative">
              <img
                src={avatarSrc}
                alt={profile.fullName || "Tài khoản"}
                className="h-24 w-24 rounded-full border-[0.28rem] border-white object-cover"
              />
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => handleImageChange(event, "avatar")}
              />
              <button
                type="button"
                aria-label="Đổi ảnh đại diện"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-2 right-[-0.35rem] grid h-7 w-7 place-items-center rounded-[0.45rem] border border-[#d6d6d6] bg-white text-[#1f2937]"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <h1 className="mt-4 text-center text-[1.25rem] font-bold text-[#252836]">
              {profile.fullName || "Đang tải..."}
            </h1>
          </div>

          {imageStatus ? (
            <p className="mt-3 text-center text-[0.78rem] font-medium text-[#6f727b]">
              {imageStatus}
            </p>
          ) : null}

          <div className="mt-2 grid grid-cols-2 border-b border-[#d7dde6] text-center text-[0.95rem] font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`flex h-[2.2rem] items-center justify-center gap-1.5 border-b-2 ${
                activeTab === "profile"
                  ? "border-[#ff6b22] text-[#ff6b22]"
                  : "border-transparent text-[#9a9ca3]"
              }`}
            >
              <UserCircle className="h-4 w-4" />
              Thông tin cá nhân
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("account")}
              className={`flex h-[2.2rem] items-center justify-center gap-1.5 border-b-2 ${
                activeTab === "account"
                  ? "border-[#ff6b22] text-[#ff6b22]"
                  : "border-transparent text-[#9a9ca3]"
              }`}
            >
              <Settings className="h-4 w-4" />
              Tài khoản
            </button>
          </div>

          {activeTab === "profile" ? (
            <>
              <dl className="mt-4 space-y-5 text-[0.9rem]">
                <div>
                  <dt className="mb-1 text-[0.78rem] font-medium text-[#6f727b]">Họ và tên</dt>
                  <dd className="font-medium text-[#222631]">{profile.fullName || "Chưa cập nhật"}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[0.78rem] font-medium text-[#6f727b]">Ngày sinh</dt>
                  <dd className="font-medium text-[#222631]">{profile.birthday || "Chưa cập nhật"}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[0.78rem] font-medium text-[#6f727b]">Email</dt>
                  <dd className="font-medium text-[#222631]">{profile.email || "Chưa cập nhật"}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[0.78rem] font-medium text-[#6f727b]">Số điện thoại</dt>
                  <dd className="font-medium text-[#222631]">{profile.phone || "Chưa cập nhật"}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="mt-4 flex h-8 w-full items-center justify-center gap-2 rounded-[0.45rem] border border-[#ff6b22] text-[0.9rem] font-semibold text-[#ff6b22]"
              >
                <Pencil className="h-3.5 w-3.5" />
                Cập nhật thông tin
              </button>
            </>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsChangePasswordOpen(true)}
                className="flex h-8 items-center justify-center gap-2 rounded-[0.45rem] border border-[#ff6b22] text-[0.9rem] font-semibold text-[#ff6b22]"
              >
                <KeyRound className="h-3.5 w-3.5" />
                Đổi mật khẩu
              </button>
              <button
                type="button"
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="flex h-8 items-center justify-center gap-2 rounded-[0.45rem] border border-[#e02828] text-[0.9rem] font-semibold text-[#e02828]"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Xóa tài khoản
              </button>
            </div>
          )}
        </section>
      </main>

      <CustomerFooter />

      {isEditOpen ? (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditOpen(false)}
          onSave={handleProfileSave}
        />
      ) : null}

      {isChangePasswordOpen ? (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordOpen(false)}
          onChangePassword={handleChangePassword}
        />
      ) : null}

      {isDeleteConfirmOpen ? (
        <DeleteAccountConfirmModal
          onClose={() => setIsDeleteConfirmOpen(false)}
          onDeleteAccount={handleDeleteAccount}
        />
      ) : null}
    </div>
  );
}
