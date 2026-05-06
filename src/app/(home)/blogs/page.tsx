import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  ImageIcon,
  Sparkles,
  Tags
} from "lucide-react";
import { manrope } from "../../fonts";
import CustomerFooter from "../../components/footer";
import CustomerHeader from "../../components/header";
import { blogCategories, blogPosts, featuredPost, latestPosts } from "./blog-data";

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="inline-flex h-10 shrink-0 items-center rounded-[0.8rem] border border-[#eadfce] bg-white px-4 text-[0.92rem] font-bold text-[#4a5362] shadow-[0_8px_24px_rgba(35,24,15,0.05)]">
      {label}
    </span>
  );
}

function PostMeta({ date, readTime }: { date: string; readTime: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.86rem] font-semibold text-[#7a6d61]">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-4 w-4 text-[#f47c20]" />
        {date}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-4 w-4 text-[#0f766e]" />
        {readTime}
      </span>
    </div>
  );
}

export default function CustomerBlogsPage() {
  return (
    <main className={`${manrope.className} min-h-screen bg-[#f8fbf8] text-[#242936]`}>
      <CustomerHeader />

      <section className="border-b border-[#e3ebe6] bg-[#fffaf4] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[75rem]">
          <div className="flex items-center gap-2 text-[0.95rem] font-semibold text-[#6d6257]">
            <Link href="/" className="transition hover:text-[#f47c20]">
              Trang chủ
            </Link>
            <span className="text-[#b9aa9c]">/</span>
            <span className="text-[#283142]">Blogs</span>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd8b8] bg-[#fff3e8] px-4 py-2 text-[0.76rem] font-extrabold uppercase tracking-[0.18em] text-[#c45a10]">
                <Sparkles className="h-4 w-4" />
                Hilu Blog
              </div>
              <h1 className="mt-5 max-w-[46rem] text-[2.45rem] font-extrabold leading-tight tracking-normal text-[#202a32] sm:text-[4rem]">
                Cảm hứng chụp ảnh, concept đẹp và mẹo đặt lịch
              </h1>
              <p className="mt-5 max-w-[42rem] text-[1.02rem] leading-8 text-[#68717d] sm:text-[1.1rem]">
                Tuyển chọn những bài viết nổi bật về nhiếp ảnh, địa điểm, xu hướng concept và
                kinh nghiệm làm việc cùng photographer.
              </p>
            </div>

            <div className="grid gap-3 rounded-[1.35rem] border border-[#dfe8e3] bg-white p-5 shadow-[0_16px_45px_rgba(36,61,59,0.08)]">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-[0.9rem] bg-[#e7f6f3] text-[#0f766e]">
                  <ImageIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[1.25rem] font-extrabold text-[#202a32]">
                    {blogPosts.length} bài viết nội bộ
                  </p>
                  <p className="text-[0.92rem] leading-6 text-[#68717d]">
                    Ảnh đã được lưu trong hilu.pics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 flex gap-2 overflow-x-auto pb-2">
            {blogCategories.map((category) => (
              <CategoryPill key={category} label={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[75rem]">
          <article className="overflow-hidden rounded-[1.45rem] border border-[#dfe8e3] bg-white shadow-[0_20px_60px_rgba(36,61,59,0.08)]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <Link
                href={`/blogs/${featuredPost.slug}`}
                className="group relative block aspect-[1.75] overflow-hidden lg:aspect-auto lg:min-h-full"
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 690px"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </Link>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-[0.65rem] bg-[#fff1e6] px-3 py-1.5 text-[0.82rem] font-extrabold text-[#c45a10]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-5 text-[1.7rem] font-extrabold leading-tight tracking-normal text-[#202a32] sm:text-[2.45rem]">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-[1rem] leading-8 text-[#66717c]">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <PostMeta date={featuredPost.date} readTime={featuredPost.readTime} />
                  <Link
                    href={`/blogs/${featuredPost.slug}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[0.8rem] bg-[#ff7a1a] px-4 text-[0.92rem] font-extrabold text-white transition hover:bg-[#eb690e]"
                  >
                    Đọc bài
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[75rem]">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-[0.78rem] font-extrabold uppercase tracking-[0.18em] text-[#0f766e]">
                <Tags className="h-4 w-4" />
                Bài mới
              </p>
              <h2 className="mt-3 text-[2rem] font-extrabold leading-tight tracking-normal text-[#202a32] sm:text-[2.65rem]">
                Đọc thêm từ Hilu
              </h2>
            </div>
            <p className="max-w-[32rem] text-[0.98rem] leading-7 text-[#68717d]">
              Các bài viết được dựng thành trang nội bộ, ưu tiên nội dung hữu ích cho cả khách
              chụp và photographer.
            </p>
          </div>

          <div className="grid gap-5">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="group grid gap-4 rounded-[1.2rem] border border-[#dfe8e3] bg-white p-3 shadow-[0_12px_38px_rgba(36,61,59,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(36,61,59,0.1)] sm:grid-cols-[17rem_1fr] sm:gap-5 sm:p-4"
              >
                <Link
                  href={`/blogs/${post.slug}`}
                  className="relative block aspect-[1.75] overflow-hidden rounded-[0.95rem] bg-[#edf3ef]"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 272px"
                    className="object-cover transition duration-300 group-hover:scale-[1.04]"
                  />
                </Link>

                <div className="flex flex-col justify-between px-1 py-1 sm:py-2">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-[0.6rem] bg-[#f1f7f4] px-3 py-1.5 text-[0.8rem] font-bold text-[#0f766e]"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blogs/${post.slug}`}>
                      <h3 className="mt-3 text-[1.12rem] font-extrabold leading-snug tracking-normal text-[#202a32] transition hover:text-[#f47c20] sm:text-[1.32rem]">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-2 text-[0.95rem] leading-7 text-[#66717c]">{post.excerpt}</p>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <PostMeta date={post.date} readTime={post.readTime} />
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-[0.9rem] font-extrabold text-[#f47c20] transition hover:text-[#c45a10]"
                    >
                      Đọc bài
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CustomerFooter />
    </main>
  );
}
