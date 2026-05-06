"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ApiError, resetPassword } from "@/services/auth.service";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");
  const isInvalidResetLink = !uid || !token;

  function getResetPasswordErrorMessage(error: ApiError): string {
    const data = error.data;

    if (data?.detail) {
      return data.detail;
    }

    const firstFieldError = [
      data?.uid?.[0],
      data?.token?.[0],
      data?.new_password?.[0],
      data?.new_password_confirm?.[0]
    ].find(Boolean);

    return firstFieldError ?? "Không thể đặt lại mật khẩu. Vui lòng thử lại.";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isInvalidResetLink) {
      setErrorMessage("Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await resetPassword({
        uid,
        token,
        new_password: password,
        new_password_confirm: confirmPassword
      });
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(getResetPasswordErrorMessage(error));
      } else {
        setErrorMessage("Không thể đặt lại mật khẩu. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fdf0dc] px-4 py-12 sm:px-6">
      <section className="w-full max-w-[30rem] rounded-[1.9rem] bg-white px-7 pb-8 pt-12 shadow-[0_24px_52px_rgba(195,138,72,0.22)] sm:px-10 sm:pb-10 sm:pt-14">
        <div className="mb-10 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#283142] transition hover:opacity-85"
          >
            <Image
              src="/customer-home/potonow.png"
              alt="Potonow"
              width={42}
              height={42}
              className="h-10 w-10"
            />
            <span className="text-[2rem] font-extrabold tracking-[-0.06em]">
              potonow
            </span>
          </Link>
        </div>

        {isSuccess ? (
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,_#fff5df,_#ffe0ac_64%,_#ffd48f)] shadow-[0_16px_30px_rgba(255,156,38,0.22)]">
              <CheckCircle2 className="h-12 w-12 text-[#f08a16]" strokeWidth={1.9} />
            </div>
            <h1 className="mt-7 text-[1.8rem] font-extrabold tracking-[-0.04em] text-[#313845]">
              Đặt lại mật khẩu thành công
            </h1>
            <p className="mt-4 text-[1rem] leading-7 text-[#616878]">
              Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập lại ngay bây giờ.
            </p>
            <Link
              href="/sign-in"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-[0.9rem] bg-gradient-to-r from-[#ff5b0d] to-[#ff8a00] px-7 text-[1rem] font-extrabold text-white shadow-[0_10px_24px_rgba(255,109,22,0.28)] transition hover:brightness-[0.98]"
            >
              Đi đến đăng nhập
            </Link>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <h1 className="text-center text-[1.95rem] font-extrabold tracking-[-0.04em] text-[#ff7316]">
              Thiết lập lại mật khẩu
            </h1>

            {isInvalidResetLink ? (
              <p className="rounded-[0.9rem] border border-[#ffd8cf] bg-[#fff4f1] px-4 py-3 text-[0.92rem] text-[#c24d2c]">
                Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
              </p>
            ) : null}

            <div className="space-y-2.5">
              <label
                htmlFor="password"
                className="block text-[0.95rem] font-medium text-[#343741]"
              >
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                  className="h-12 w-full rounded-[0.9rem] border border-[#edf1f5] bg-[#eef3f8] px-4 pr-12 text-[0.95rem] text-[#1f2430] outline-none transition placeholder:text-[#9aa4b2] focus:border-[#f47c20] focus:bg-white"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#515865] transition hover:bg-white hover:text-[#1f2430]"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" strokeWidth={1.9} />
                  ) : (
                    <EyeOff className="h-5 w-5" strokeWidth={1.9} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              <label
                htmlFor="confirm-password"
                className="block text-[0.95rem] font-medium text-[#343741]"
              >
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                  className="h-12 w-full rounded-[0.9rem] border border-[#edf1f5] bg-[#eef3f8] px-4 pr-12 text-[0.95rem] text-[#1f2430] outline-none transition placeholder:text-[#9aa4b2] focus:border-[#f47c20] focus:bg-white"
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"
                  }
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#515865] transition hover:bg-white hover:text-[#1f2430]"
                >
                  {showConfirmPassword ? (
                    <Eye className="h-5 w-5" strokeWidth={1.9} />
                  ) : (
                    <EyeOff className="h-5 w-5" strokeWidth={1.9} />
                  )}
                </button>
              </div>
            </div>

            {errorMessage ? (
              <p className="rounded-[0.9rem] border border-[#ffd8cf] bg-[#fff4f1] px-4 py-3 text-[0.92rem] text-[#c24d2c]">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting || isInvalidResetLink}
              className="flex h-12 w-full items-center justify-center rounded-[0.9rem] bg-gradient-to-r from-[#ff5b0d] to-[#ff8a00] text-[1.05rem] font-extrabold text-white shadow-[0_10px_24px_rgba(255,109,22,0.28)] transition hover:brightness-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
