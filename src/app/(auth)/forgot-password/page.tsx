"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ApiError, requestPasswordReset } from "@/services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await requestPasswordReset({ email });
      setSubmittedEmail(email);
      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? (error.data?.detail ??
            error.data?.email?.[0] ??
            "Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại.")
          : "Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại.";

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBackToForm() {
    setIsSuccess(false);
    setErrorMessage(null);
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

      <section className="w-full max-w-[34rem] rounded-[1.9rem] bg-white px-7 pb-8 pt-12 shadow-[0_24px_52px_rgba(195,138,72,0.22)] sm:px-10 sm:pb-10 sm:pt-14">
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
          <div className="flex flex-col items-center text-center">
            <h1 className="text-[1.95rem] font-extrabold tracking-[-0.04em] text-[#313845]">
              Đã gửi email đặt lại mật khẩu
            </h1>

            <div className="mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,_#fff5df,_#ffe0ac_64%,_#ffd48f)] shadow-[0_16px_30px_rgba(255,156,38,0.22)]">
              <MailCheck className="h-14 w-14 text-[#f08a16]" strokeWidth={1.9} />
            </div>

            <p className="mt-8 max-w-[26rem] text-[1.08rem] leading-8 text-[#596070]">
              Nếu email{" "}
              <span className="font-bold text-[#2f3441]">{submittedEmail}</span>{" "}
              tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi tới hộp thư đó.
            </p>

            <button
              type="button"
              onClick={handleBackToForm}
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#ff8a3c] px-6 text-[1rem] font-bold text-[#f36f15] transition hover:bg-[#fff6ef]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.1} />
              Quay lại
            </button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <h1 className="text-center text-[1.95rem] font-extrabold tracking-[-0.04em] text-[#ff7316]">
              Quên mật khẩu
            </h1>

            <div className="space-y-2.5">
              <label
                htmlFor="email"
                className="block text-[0.95rem] font-medium text-[#343741]"
              >
                Email
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

            {errorMessage ? (
              <p className="rounded-[0.9rem] border border-[#ffd8cf] bg-[#fff4f1] px-4 py-3 text-[0.92rem] text-[#c24d2c]">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center rounded-[0.9rem] bg-gradient-to-r from-[#ff5b0d] to-[#ff8a00] text-[1.05rem] font-extrabold text-white shadow-[0_10px_24px_rgba(255,109,22,0.28)] transition hover:brightness-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSubmitting ? "Đang gửi email..." : "Đặt lại mật khẩu"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
