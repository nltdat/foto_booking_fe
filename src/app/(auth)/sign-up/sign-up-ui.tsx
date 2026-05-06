"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Eye, EyeOff, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { ApiError, register } from "@/services/auth.service";
import type { UserRole } from "@/types/auth";

type AuthShellProps = {
  children: ReactNode;
  maxWidth?: string;
};

type FieldProps = {
  id?: string;
  name?: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  rightSlot?: ReactNode;
  hint?: string;
  className?: string;
  autoFocus?: boolean;
  autoComplete?: string;
};

type PasswordFieldProps = {
  id?: string;
  label: string;
  required?: boolean;
  hint?: string;
};

type ChoiceCardProps = {
  href: string;
  title: string;
  imageSrc: string;
};

const experienceOptions = [
  "Dưới 1 năm",
  "Từ 1-3 năm",
  "Trên 3 năm",
  "Trên 5 năm"
] as const;

function AuthShell({ children, maxWidth = "max-w-[33.8rem]" }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fdf0dc] px-4 py-10 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,242,225,0.95),_transparent_42%)]" />

      <div className="absolute right-4 top-7 z-10 flex items-center gap-2 text-sm font-medium text-[#2f2f37] sm:right-7">
        <span>VI</span>
        <Image
          src="/sign-up/national-flag.svg"
          alt="Tiếng Việt"
          width={16}
          height={16}
          className="h-4 w-4"
        />
      </div>

      <section
        className={`relative z-10 w-full ${maxWidth} rounded-[1.7rem] bg-white px-7 pb-7 pt-10 shadow-[0_18px_40px_rgba(195,138,72,0.2)] sm:px-8`}
      >
        <div className="mb-10 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#283142] transition hover:opacity-85"
          >
            <Image
              src="/sign-up/potonow.png"
              alt="Potonow"
              width={34}
              height={34}
              className="h-8 w-8"
            />
            <span className="text-xl font-extrabold tracking-[-0.05em]">potonow</span>
          </Link>
        </div>

        {children}
      </section>
    </main>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-center text-[1.08rem] font-extrabold text-[#ff7a17] sm:text-[1.14rem]">
      {children}
    </h1>
  );
}

function FormField({
  id,
  name,
  label,
  required,
  type = "text",
  placeholder,
  rightSlot,
  hint,
  className,
  autoFocus,
  autoComplete
}: FieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label className="block">
      <span className="mb-2 block text-[0.95rem] font-medium text-[#343741]">
        {label}
        {required ? <span className="text-[#ff6a42]"> *</span> : null}
      </span>

      <span className="relative block">
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required={required}
          autoComplete={autoComplete}
          className={`h-12 w-full rounded-[0.9rem] border border-[#edf1f5] bg-[#eef3f8] px-4 text-[0.95rem] text-[#1f2430] outline-none transition placeholder:text-[#a4adb9] focus:border-[#f47c20] focus:bg-white ${rightSlot ? "pr-12" : ""} ${className ?? ""}`}
        />
        {rightSlot ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#636a75]">
            {rightSlot}
          </span>
        ) : null}
      </span>

      {hint ? <FieldHint>{hint}</FieldHint> : null}
    </label>
  );
}

function PasswordField({ id, label, required, hint }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.95rem] font-medium text-[#343741]">
        {label}
        {required ? <span className="text-[#ff6a42]"> *</span> : null}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          required={required}
          autoComplete="new-password"
          className="h-12 w-full rounded-[0.9rem] border border-[#edf1f5] bg-[#eef3f8] px-4 pr-12 text-[0.95rem] text-[#1f2430] outline-none transition placeholder:text-[#a4adb9] focus:border-[#f47c20] focus:bg-white"
        />
        <button
          type="button"
          aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          onClick={() => setVisible((current) => !current)}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#515865] transition hover:bg-white hover:text-[#1f2430]"
        >
          {visible ? (
            <Eye className="h-5 w-5" strokeWidth={1.9} />
          ) : (
            <EyeOff className="h-5 w-5" strokeWidth={1.9} />
          )}
        </button>
      </div>

      {hint ? <FieldHint>{hint}</FieldHint> : null}
    </div>
  );
}

function FieldHint({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 flex items-start gap-1.5 text-[0.82rem] leading-5 text-[#9296a0]">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-current" strokeWidth={1.9} />
      <span>{children}</span>
    </p>
  );
}

function CheckboxLine({
  children,
  name,
  required
}: {
  children: ReactNode;
  name?: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-2.5 text-[0.95rem] leading-6 text-[#757b88]">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-[0.28rem] h-4 w-4 rounded border border-[#c8cfda] accent-[#ff7a17]"
      />
      <span>{children}</span>
    </label>
  );
}

function OutlineButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex h-12 items-center justify-center rounded-[0.9rem] border border-[#d9dfea] bg-white text-[1rem] font-extrabold text-[#2c3140] transition hover:border-[#c8d2df] hover:bg-[#fafbfd]"
    >
      {children}
    </Link>
  );
}

function PrimaryButton({ children, isSubmitting = false }: { children: ReactNode; isSubmitting?: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex h-12 items-center justify-center rounded-[0.9rem] bg-gradient-to-r from-[#ffb189] to-[#ffc98f] text-[1rem] font-extrabold text-white shadow-[0_10px_24px_rgba(255,154,74,0.24)] transition hover:brightness-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

function PhoneField() {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.95rem] font-medium text-[#343741]">Số điện thoại</span>
      <span className="relative block">
        <span className="absolute inset-y-0 left-4 flex items-center gap-2 text-[#7c8695]">
          <Image
            src="/sign-up/national-flag.svg"
            alt="Việt Nam"
            width={16}
            height={16}
            className="h-4 w-4"
          />
          <span className="text-[0.95rem]">+84</span>
        </span>
        <input
          type="tel"
          placeholder="0987 654 321"
          className="h-12 w-full rounded-[0.9rem] border border-[#edf1f5] bg-[#eef3f8] pl-[5.6rem] pr-4 text-[0.95rem] text-[#1f2430] outline-none transition placeholder:text-[#a4adb9] focus:border-[#f47c20] focus:bg-white"
        />
      </span>
    </label>
  );
}

function BirthDateField() {
  return (
    <FormField
      name="birth_date"
      label="Ngày sinh"
      placeholder="dd/mm/yyyy"
      rightSlot={<CalendarDays className="h-5 w-5" strokeWidth={1.8} />}
      hint="Bạn phải đủ 16 tuổi để đăng ký."
    />
  );
}

function ChoiceCard({ href, title, imageSrc }: ChoiceCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[1rem] bg-[#0d514d] shadow-[0_10px_22px_rgba(44,68,76,0.16)] transition hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(44,68,76,0.22)]"
    >
      <div className="relative h-[14.6rem]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 240px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04292b]/65 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-3 text-center text-[1.28rem] font-extrabold text-white">
          {title}
        </div>
      </div>
    </Link>
  );
}

export function SignUpRoleSelectionPage() {
  return (
    <AuthShell maxWidth="max-w-[34rem]">
      <SectionTitle>Đăng ký và bắt đầu trải nghiệm</SectionTitle>

      <p className="mt-6 text-center text-[1.08rem] text-[#3d3f49]">Bạn đăng ký với vai trò</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <ChoiceCard
          href="/sign-up/customer"
          title="Khách chụp hình"
          imageSrc="/sign-up/khach-chup-hinh.jpg"
        />
        <ChoiceCard
          href="/sign-up/photographer"
          title="Nhiếp ảnh gia"
          imageSrc="/sign-up/nhiep-anh-gia.jpg"
        />
      </div>

      <p className="mt-5 text-center text-[1rem] text-[#6f7482]">
        Đã có tài khoản?{" "}
        <Link href="/sign-in" className="font-bold text-[#ff7a17] transition hover:text-[#ef6400]">
          Đăng nhập ngay!
        </Link>
      </p>
    </AuthShell>
  );
}

export function CustomerSignUpPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (isSubmitting) return;
    event.preventDefault();
    await submitRegisterForm({
      event,
      role: "CUSTOMER",
      setErrorMessage,
      setIsSubmitting,
      onSuccess: () => router.push("/sign-in")
    });
  }

  return (
    <AuthShell maxWidth="max-w-[34rem]">
      <SectionTitle>Trở thành Khách chụp hình</SectionTitle>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            name="full_name"
            label="Họ và tên"
            required
            autoFocus
            autoComplete="name"
            className="border-[#ff8b3d] bg-white"
          />
          <BirthDateField />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField name="email" label="Email" required type="email" autoComplete="email" />
          <PhoneField />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <PasswordField
            id="customer-password"
            label="Mật khẩu"
            required
            hint="Mật khẩu phải từ 8 đến 32 ký tự, bao gồm ít nhất một chữ cái và một chữ số."
          />
          <PasswordField
            id="customer-password-confirm"
            label="Xác nhận mật khẩu"
            required
            hint="Mật khẩu và Xác nhận mật khẩu cần trùng khớp."
          />
        </div>

        <div className="space-y-1.5 pt-1">
          <CheckboxLine name="acceptTerms" required>
            Tôi đã đọc, hiểu rõ và đồng ý với{" "}
            <Link href="#" className="font-bold text-[#ff7a17]">
              Điều khoản dịch vụ
            </Link>{" "}
            của Potonow.
          </CheckboxLine>
          <CheckboxLine name="acceptPrivacy" required>
            Tôi đã đọc, hiểu rõ và đồng ý với{" "}
            <Link href="#" className="font-bold text-[#ff7a17]">
              Chính sách bảo mật
            </Link>{" "}
            của Potonow.
          </CheckboxLine>
        </div>

        {errorMessage ? (
          <p className="rounded-[0.9rem] border border-[#ffd8cf] bg-[#fff4f1] px-4 py-3 text-[0.92rem] text-[#c24d2c]">
            {errorMessage}
          </p>
        ) : null}

        <div className="grid gap-3 pt-1 sm:grid-cols-2">
          <OutlineButton href="/sign-up">Quay lại</OutlineButton>
          <PrimaryButton isSubmitting={isSubmitting}>{isSubmitting ? "Đang đăng ký..." : "Đăng ký tài khoản"}</PrimaryButton>
        </div>
      </form>
    </AuthShell>
  );
}

export function PhotographerSignUpPage() {
  const router = useRouter();
  const [equipment, setEquipment] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (isSubmitting) return;
    event.preventDefault();
    await submitRegisterForm({
      event,
      role: "PHOTOGRAPHER",
      setErrorMessage,
      setIsSubmitting,
      onSuccess: () => router.push("/sign-in")
    });
  }

  return (
    <AuthShell maxWidth="max-w-[34rem]">
      <SectionTitle>Trở thành Nhiếp ảnh gia</SectionTitle>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            name="full_name"
            label="Họ và tên"
            required
            autoFocus
            autoComplete="name"
            className="border-[#ff8b3d] bg-white"
          />
          <BirthDateField />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField name="email" label="Email" required type="email" autoComplete="email" />
          <PhoneField />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <PasswordField
            id="photographer-password"
            label="Mật khẩu"
            required
            hint="Mật khẩu phải từ 8 đến 32 ký tự, bao gồm ít nhất một chữ cái và một chữ số."
          />
          <PasswordField
            id="photographer-password-confirm"
            label="Xác nhận mật khẩu"
            required
            hint="Mật khẩu và Xác nhận mật khẩu cần trùng khớp."
          />
        </div>

        <div>
          <label className="mb-2 block text-[0.95rem] font-medium text-[#343741]">
            Địa điểm làm việc
            <span className="text-[0.76rem] font-medium text-[#9aa3af]">
              {" "}
              (đã cập nhật theo địa giới hành chính mới)
            </span>
          </label>
          <input className="h-12 w-full rounded-[0.9rem] border border-[#edf1f5] bg-[#eef3f8] px-4 text-[0.95rem] text-[#1f2430] outline-none transition focus:border-[#f47c20] focus:bg-white" />
          <FieldHint>Chọn tối đa 3 địa điểm</FieldHint>
        </div>

        <fieldset>
          <legend className="mb-3 text-[0.95rem] font-medium text-[#343741]">
            Số năm kinh nghiệm
          </legend>
          <div className="grid gap-3 text-[0.98rem] text-[#4a4f5e] sm:grid-cols-4">
            {experienceOptions.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="experience"
                  className="h-4 w-4 border-[#c8cfda] accent-[#ff7a17]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="mb-2 block text-[0.95rem] font-medium text-[#343741]">
            Thiết bị chụp hình đang sử dụng
          </label>
          <div className="relative">
            <textarea
              value={equipment}
              onChange={(event) => setEquipment(event.target.value.slice(0, 200))}
              className="min-h-[4.8rem] w-full resize-none rounded-[0.9rem] border border-[#edf1f5] bg-[#eef3f8] px-4 py-3 text-[0.95rem] text-[#1f2430] outline-none transition focus:border-[#f47c20] focus:bg-white"
            />
            <span className="absolute bottom-3 right-3 text-[0.85rem] text-[#9aa3af]">
              {equipment.length}/200
            </span>
          </div>
          <FieldHint>
            Loại thiết bị và thông số (ví dụ: Sony A7S3 + Lens sigma 24-70A)
          </FieldHint>
        </div>

        <div className="space-y-1.5 pt-1">
          <CheckboxLine name="acceptTerms" required>
            Tôi đã đọc, hiểu rõ và đồng ý với{" "}
            <Link href="#" className="font-bold text-[#ff7a17]">
              Điều khoản dịch vụ
            </Link>{" "}
            của Potonow.
          </CheckboxLine>
          <CheckboxLine name="acceptPrivacy" required>
            Tôi đã đọc, hiểu rõ và đồng ý với{" "}
            <Link href="#" className="font-bold text-[#ff7a17]">
              Chính sách bảo mật
            </Link>{" "}
            của Potonow.
          </CheckboxLine>
        </div>

        {errorMessage ? (
          <p className="rounded-[0.9rem] border border-[#ffd8cf] bg-[#fff4f1] px-4 py-3 text-[0.92rem] text-[#c24d2c]">
            {errorMessage}
          </p>
        ) : null}

        <div className="grid gap-3 pt-1 sm:grid-cols-2">
          <OutlineButton href="/sign-up">Quay lại</OutlineButton>
          <PrimaryButton isSubmitting={isSubmitting}>{isSubmitting ? "Đang đăng ký..." : "Đăng ký tài khoản"}</PrimaryButton>
        </div>
      </form>
    </AuthShell>
  );
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

function getRegisterErrorMessage(error: ApiError): string {
  return (
    error.data.detail ??
    error.data.username?.[0] ??
    error.data.email?.[0] ??
    error.data.password?.[0] ??
    error.data.password_confirm?.[0] ??
    error.data.role?.[0] ??
    error.data.non_field_errors?.[0] ??
    "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin."
  );
}

async function submitRegisterForm({
  event,
  role,
  setErrorMessage,
  setIsSubmitting,
  onSuccess
}: {
  event: FormEvent<HTMLFormElement>;
  role: UserRole;
  setErrorMessage: (message: string | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  onSuccess: () => void;
}) {
  const form = event.currentTarget;
  const formData = new FormData(form);
  const fullName = String(formData.get("full_name") ?? "");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get(`${role === "CUSTOMER" ? "customer" : "photographer"}-password`) ?? "");
  const passwordConfirm = String(
    formData.get(`${role === "CUSTOMER" ? "customer" : "photographer"}-password-confirm`) ?? ""
  );
  const acceptTerms = formData.get("acceptTerms") === "on";
  const acceptPrivacy = formData.get("acceptPrivacy") === "on";
  const { firstName, lastName } = splitFullName(fullName);

  if (!acceptTerms || !acceptPrivacy) {
    setErrorMessage("Bạn phải đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.");
    return;
  }

  if (password !== passwordConfirm) {
    setErrorMessage("Mật khẩu xác nhận không khớp.");
    return;
  }

  setIsSubmitting(true);
  setErrorMessage(null);

  try {
    await register({
      username: email,
      email,
      password,
      password_confirm: passwordConfirm,
      first_name: firstName,
      last_name: lastName,
      role
    });
    onSuccess();
  } catch (error) {
    if (error instanceof ApiError) {
      setErrorMessage(getRegisterErrorMessage(error));
    } else {
      setErrorMessage("Đăng ký thất bại. Vui lòng thử lại.");
    }
  } finally {
    setIsSubmitting(false);
  }
}
