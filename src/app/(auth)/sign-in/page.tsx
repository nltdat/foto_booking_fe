"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiError, login } from "@/services/auth.service";
import { setAuthSession } from "@/store/auth-store";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await login({
        email,
        password
      });

      setAuthSession({
        accessToken: result.access,
        refreshToken: result.refresh,
        user: result.user
      });

      const nextPath = searchParams.get("next");
      const safeNextPath =
        nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//")
          ? nextPath
          : "/";
      router.push(safeNextPath);
    } catch (error) {
      if (error instanceof ApiError) {
        const apiMessage =
          error.data.detail ??
          error.data.email?.[0] ??
          error.data.password?.[0] ??
          error.data.non_field_errors?.[0] ??
          "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.";

        setErrorMessage(apiMessage);
      } else {
        setErrorMessage("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fdf0dc] px-4 py-12 sm:px-6">
      <div className="absolute right-4 top-8 flex items-center gap-2 text-sm font-medium text-[#2f2f37] sm:right-7">
        <span>VI</span>
        <Image
          src="/customer-home/national-flag.svg"
          alt="Tiếng Việt"
          width={16}
          height={16}
          className="h-4 w-4"
        />
      </div>

      <section className="w-full max-w-[23.5rem] rounded-[1.6rem] bg-white px-7 pb-8 pt-12 shadow-[0_18px_40px_rgba(195,138,72,0.22)] sm:px-8 sm:pb-9 sm:pt-14">
        <div className="mb-12 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#283142] transition hover:opacity-85"
          >
            <Image
              src="/customer-home/potonow.png"
              alt="Potonow"
              width={34}
              height={34}
              className="h-8 w-8"
            />
            <span className="text-xl font-extrabold tracking-[-0.05em]">
              potonow
            </span>
          </Link>
        </div>

        <form className="space-y-5" onSubmit={handleLoginSubmit}>
          <div className="space-y-2.5">
            <label
              htmlFor="email"
              className="block text-[0.95rem] font-medium text-[#343741]"
            >
              Email đăng nhập
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="h-12 w-full rounded-[0.9rem] border border-[#edf1f5] bg-[#eef3f8] px-4 text-[0.95rem] text-[#1f2430] outline-none transition placeholder:text-[#9aa4b2] focus:border-[#f47c20] focus:bg-white"
            />
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="password"
              className="block text-[0.95rem] font-medium text-[#343741]"
            >
              Mật khẩu
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
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

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-[0.95rem] text-[#8f8f99] transition hover:text-[#f47c20]"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          {errorMessage ? (
            <p className="rounded-[0.9rem] border border-[#ffd8cf] bg-[#fff4f1] px-4 py-3 text-[0.92rem] text-[#c24d2c]">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center rounded-[0.9rem] bg-gradient-to-r from-[#ff5b0d] to-[#ff8a00] text-[1.05rem] font-extrabold text-white shadow-[0_10px_24px_rgba(255,109,22,0.28)] transition hover:brightness-[0.98]"
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-5 text-center text-[0.98rem] text-[#7e838f]">Hoặc</div>

        <button
          type="button"
          className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-[0.9rem] border border-[#d7dfea] bg-white px-4 text-[0.95rem] font-semibold text-[#303443] transition hover:border-[#c4cfde] hover:bg-[#fbfcfe]"
        >
          <span
            aria-hidden="true"
            className="grid h-6 w-6 place-items-center rounded-full border border-[#dfe5ee] bg-white text-[1.05rem] font-bold leading-none text-[#4285f4]"
          >
            G
          </span>
          <span>Đăng nhập với Google</span>
        </button>

        <p className="mt-7 text-center text-[1rem] text-[#6f7482]">
          Chưa có tài khoản?{" "}
          <Link
            href="/sign-up"
            className="font-bold text-[#ff7a17] transition hover:text-[#ef6400]"
          >
            Đăng ký ngay!
          </Link>
        </p>
      </section>
    </main>
  );
}
