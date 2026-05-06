import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserRound
} from "lucide-react";
import { manrope } from "../../../fonts";
import CustomerFooter from "../../../components/footer";
import CustomerHeader from "../../../components/header";
import { blogPosts, getBlogPost, getRelatedPosts } from "../blog-data";

type BlogDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogDetailPageProps): Metadata {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết"
    };
  }

  return {
    title: `${post.title} | Hilu Blog`,
    description: post.excerpt
  };
}

function ArticleMeta({
  date,
  readTime,
  author
}: {
  date: string;
  readTime: string;
  author: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.92rem] font-semibold text-[#6d6257]">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-4 w-4 text-[#f47c20]" />
        {date}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-4 w-4 text-[#0f766e]" />
        {readTime}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <UserRound className="h-4 w-4 text-[#283142]" />
        {author}
      </span>
    </div>
  );
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <main className={`${manrope.className} min-h-screen bg-[#f8fbf8] text-[#242936]`}>
      <CustomerHeader />

      <article>
        <section className="border-b border-[#e3ebe6] bg-[#fffaf4] px-4 py-7 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[75rem]">
            <div className="flex flex-wrap items-center gap-2 text-[0.95rem] font-semibold text-[#6d6257]">
              <Link href="/" className="transition hover:text-[#f47c20]">
                Trang chủ
              </Link>
              <span className="text-[#b9aa9c]">/</span>
              <Link href="/blogs" className="transition hover:text-[#f47c20]">
                Blogs
              </Link>
              <span className="text-[#b9aa9c]">/</span>
              <span className="line-clamp-1 max-w-[22rem] text-[#283142]">{post.title}</span>
            </div>

            <Link
              href="/blogs"
              className="mt-8 inline-flex h-10 items-center gap-2 rounded-[0.75rem] border border-[#eadfce] bg-white px-4 text-[0.88rem] font-extrabold text-[#4a5362] transition hover:border-[#f47c20] hover:text-[#f47c20]"
            >
              <ArrowLeft className="h-4 w-4" />
              Về danh sách blog
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
              <div>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-[0.65rem] bg-[#fff1e6] px-3 py-1.5 text-[0.82rem] font-extrabold text-[#c45a10]"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h1 className="mt-5 max-w-[52rem] text-[2.25rem] font-extrabold leading-tight tracking-normal text-[#202a32] sm:text-[3.7rem]">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-[45rem] text-[1.05rem] leading-8 text-[#68717d]">
                  {post.excerpt}
                </p>
                <div className="mt-6">
                  <ArticleMeta date={post.date} readTime={post.readTime} author={post.author} />
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-[#dfe8e3] bg-white p-5 shadow-[0_16px_45px_rgba(36,61,59,0.08)]">
                <p className="text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#0f766e]">
                  Ghi chú đọc nhanh
                </p>
                <ul className="mt-4 space-y-3">
                  {post.checklist.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.95rem] leading-6 text-[#5b6672]">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f766e]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[75rem]">
            <div className="relative aspect-[1.75] overflow-hidden rounded-[1.4rem] border border-[#dfe8e3] bg-[#edf3ef] shadow-[0_20px_60px_rgba(36,61,59,0.08)]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-[75rem] gap-8 lg:grid-cols-[minmax(0,48rem)_20rem] lg:items-start">
            <div className="rounded-[1.35rem] border border-[#dfe8e3] bg-white px-5 py-7 shadow-[0_16px_45px_rgba(36,61,59,0.06)] sm:px-8 sm:py-9">
              <p className="text-[1.08rem] leading-8 text-[#4f5965]">{post.intro}</p>

              <div className="mt-9 space-y-9">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-[1.55rem] font-extrabold leading-tight tracking-normal text-[#202a32] sm:text-[2rem]">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-[1.02rem] leading-8 text-[#5f6a75]">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets?.length ? (
                      <ul className="mt-5 space-y-3 rounded-[1rem] bg-[#f5faf7] p-4">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2.5 text-[0.98rem] leading-7 text-[#53606b]"
                          >
                            <CheckCircle2 className="mt-1 h-[1.125rem] w-[1.125rem] shrink-0 text-[#0f766e]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="rounded-[1.25rem] border border-[#dfe8e3] bg-white p-5 shadow-[0_14px_38px_rgba(36,61,59,0.06)]">
                <p className="text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#0f766e]">
                  Checklist
                </p>
                <ul className="mt-4 space-y-3">
                  {post.checklist.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.92rem] leading-6 text-[#5f6a75]">
                      <CheckCircle2 className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-[#0f766e]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.25rem] border border-[#eadfce] bg-[#fffaf4] p-5">
                <p className="text-[1.12rem] font-extrabold text-[#202a32]">Sẵn sàng lên concept?</p>
                <p className="mt-2 text-[0.92rem] leading-6 text-[#68717d]">
                  Tạo booking để photographer hiểu rõ nhu cầu, địa điểm và ngân sách của bạn.
                </p>
                <Link
                  href="/bookings"
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-[0.75rem] bg-[#ff7a1a] px-4 text-[0.9rem] font-extrabold text-white transition hover:bg-[#eb690e]"
                >
                  Đặt lịch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </article>

      <section className="border-t border-[#e3ebe6] bg-[#fffaf4] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[75rem]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.18em] text-[#0f766e]">
                Bài liên quan
              </p>
              <h2 className="mt-3 text-[2rem] font-extrabold leading-tight tracking-normal text-[#202a32] sm:text-[2.55rem]">
                Đọc tiếp trên Hilu Blog
              </h2>
            </div>
            <Link
              href="/blogs"
              className="inline-flex h-10 items-center gap-2 text-[0.92rem] font-extrabold text-[#f47c20] transition hover:text-[#c45a10]"
            >
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blogs/${relatedPost.slug}`}
                className="group overflow-hidden rounded-[1.1rem] border border-[#dfe8e3] bg-white shadow-[0_12px_38px_rgba(36,61,59,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(36,61,59,0.1)]"
              >
                <div className="relative aspect-[1.75] overflow-hidden bg-[#edf3ef]">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover transition duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[0.82rem] font-bold text-[#0f766e]">
                    {relatedPost.categories[0]}
                  </p>
                  <h3 className="mt-2 text-[1.02rem] font-extrabold leading-snug tracking-normal text-[#202a32] transition group-hover:text-[#f47c20]">
                    {relatedPost.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CustomerFooter />
    </main>
  );
}
