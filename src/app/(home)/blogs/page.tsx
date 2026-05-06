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

const categories = [
  "Chuyện Nhiếp Ảnh",
  "English article",
  "Nhiếp ảnh gia Potonow",
  "Sự kiện",
  "Về Potonow",
  "E-magazine"
] as const;

const blogPosts = [
  {
    title:
      "Ứng dụng Potonow chính thức ra mắt: Trải nghiệm đặt lịch chụp ảnh nhanh chóng, tiện lợi và linh hoạt",
    excerpt:
      "Đánh dấu bước phát triển mới trong hành trình số hoá trải nghiệm chụp ảnh, Potonow đã cho ra mắt ứng dụng đặt lịch chụp ảnh chuyên nghiệp đầu tiên tại Việt Nam.",
    image: "/blogs/app-potonow-launch.jpg",
    date: "01/07/2025",
    readTime: "4 phút đọc",
    categories: ["Về Potonow", "Sự kiện"],
    href: "https://potonow.vn/blogs/ung-dung-potonow-chinh-thuc-ra-mat-trai-nghiem-dat-lich-chup-anh-nhanh-chong-tien-loi-va-linh-hoat"
  },
  {
    title: "Tất tần tật những điều cần biết trước khi chụp ảnh doanh nghiệp",
    excerpt:
      "Trong bối cảnh thị trường ngày càng cạnh tranh, chụp ảnh doanh nghiệp trở thành một phần quan trọng trong chiến lược xây dựng hình ảnh thương hiệu của nhiều tổ chức.",
    image: "/blogs/corporate-photography.jpg",
    date: "17/02/2026",
    readTime: "5 phút đọc",
    categories: ["Chuyện Nhiếp Ảnh"],
    href: "https://potonow.vn/blogs/tat-tan-tat-nhung-dieu-can-biet-truoc-khi-chup-anh-doanh-nghiep"
  },
  {
    title: "Tuyệt chiêu chụp ảnh với hoa hướng dương bắt trọn sắc vàng dưới nắng rực rỡ",
    excerpt:
      "Những cánh đồng hoa hướng dương trải dài, nhuộm một màu vàng rực rỡ luôn là điểm đến khiến bất kỳ ai yêu cái đẹp cũng phải xao xuyến.",
    image: "/blogs/sunflower-portrait.jpg",
    date: "14/02/2026",
    readTime: "4 phút đọc",
    categories: ["Chuyện Nhiếp Ảnh"],
    href: "https://potonow.vn/blogs/tuyet-chieu-chup-anh-voi-hoa-huong-duong-bat-tron-sac-vang-duoi-nang-ruc-ro"
  },
  {
    title: "Xu hướng quà tết cho bố mẹ 2026: Tặng gì để trọn vẹn chữ hiếu?",
    excerpt:
      "Quà Tết cho bố mẹ không chỉ đơn thuần là một món đồ vật chất, mà còn là cách mỗi người con gửi gắm lời cảm ơn và yêu thương.",
    image: "/blogs/tet-gifts-family.jpg",
    date: "11/02/2026",
    readTime: "4 phút đọc",
    categories: ["Chuyện Nhiếp Ảnh"],
    href: "https://potonow.vn/blogs/xu-huong-qua-tet-cho-bo-me-2026-tang-gi-de-tron-ven-chu-hieu"
  },
  {
    title: "Bí kíp \"hành nghề\" dành cho nhiếp ảnh gia Potonow khi chụp hình cho khách nước ngoài",
    excerpt:
      "Với khách nước ngoài, buổi chụp thành công không chỉ dựa vào kỹ thuật mà còn ở sự tinh tế trong giao tiếp và cách làm việc.",
    image: "/blogs/foreign-client-tips.jpg",
    date: "15/01/2026",
    readTime: "4 phút đọc",
    categories: ["Nhiếp ảnh gia Potonow"],
    href: "https://potonow.vn/blogs/bi-kip-hanh-nghe-danh-cho-nhiep-anh-gia-potonow-khi-chup-hinh-cho-khach-nuoc-ngoai"
  },
  {
    title: "Tips cho nhiếp ảnh gia: 4 lỗi phổ biến khiến profile của bạn bị từ chối",
    excerpt:
      "Profile ấn tượng trên Potonow là chìa khóa để photographer được duyệt nhanh và thu hút khách hàng phù hợp.",
    image: "/blogs/profile-tips.jpg",
    date: "15/01/2026",
    readTime: "3 phút đọc",
    categories: ["Nhiếp ảnh gia Potonow"],
    href: "https://potonow.vn/blogs/tips-cho-nhiep-anh-gia-4-loi-pho-bien-khien-profile-cua-ban-bi-tu-choi"
  },
  {
    title: "Cách chụp ảnh chân dung đẹp tự nhiên, thu hút mọi ánh nhìn",
    excerpt:
      "Một bức ảnh chân dung đẹp là sự kết hợp hài hòa của nhiều yếu tố, từ ánh sáng, góc chụp đến biểu cảm.",
    image: "/blogs/natural-portrait.jpg",
    date: "15/01/2026",
    readTime: "4 phút đọc",
    categories: ["Chuyện Nhiếp Ảnh"],
    href: "https://potonow.vn/blogs/cach-chup-anh-chan-dung-dep-tu-nhien-thu-hut-moi-anh-nhin"
  },
  {
    title: "Mách bạn cách tạo dáng và địa điểm check-in chụp ảnh hoa ban Hà Nội",
    excerpt:
      "Mỗi độ tháng 2-3, hoa ban lại nở rộ, mang theo vẻ đẹp trong trẻo và lãng mạn rất riêng của Hà Nội.",
    image: "/blogs/hoa-ban-hanoi.jpg",
    date: "15/01/2026",
    readTime: "4 phút đọc",
    categories: ["Chuyện Nhiếp Ảnh"],
    href: "https://potonow.vn/blogs/mach-ban-cach-tao-dang-va-dia-diem-check-in-chup-anh-hoa-ban-ha-noi"
  },
  {
    title: "13 địa điểm chụp hình Tết đẹp ở Sài Gòn 2026: lên đồ đi chụp ngay và luôn!",
    excerpt:
      "Nếu bạn đang tìm kiếm địa điểm chụp hình Tết đẹp ở Sài Gòn, danh sách này sẽ giúp bộ ảnh xuân có nhiều lựa chọn hơn.",
    image: "/blogs/tet-saigon.jpg",
    date: "22/12/2025",
    readTime: "6 phút đọc",
    categories: ["Chuyện Nhiếp Ảnh"],
    href: "https://potonow.vn/blogs/13-dia-diem-chup-hinh-tet-dep-o-sai-gon-2025-len-do-di-chup-ngay-va-luon"
  },
  {
    title: "Đừng bỏ lỡ loạt địa điểm chụp ảnh tết đẹp ở Hà Nội năm 2026!",
    excerpt:
      "Tết Nguyên đán 2026 đang tới gần, những điểm chụp ảnh Tết tại Hà Nội sẽ giúp gia đình có bộ ảnh đáng nhớ.",
    image: "/blogs/tet-hanoi.jpg",
    date: "06/12/2025",
    readTime: "5 phút đọc",
    categories: ["Chuyện Nhiếp Ảnh"],
    href: "https://potonow.vn/blogs/dung-bo-lo-loat-dia-diem-chup-anh-tet-dep-o-ha-noi-nam-2025"
  },
  {
    title: "Tất tần tật về chụp ảnh Tết 2026: xu hướng, thể loại, concept và cách tạo dáng",
    excerpt:
      "Tết là dịp tuyệt vời để lưu giữ khoảnh khắc đẹp nhất cùng những người thân yêu bằng một bộ ảnh thật tự nhiên.",
    image: "/blogs/tet-concepts.jpg",
    date: "01/12/2025",
    readTime: "6 phút đọc",
    categories: ["Chuyện Nhiếp Ảnh"],
    href: "https://potonow.vn/blogs/tat-tan-tat-ve-chup-anh-tet-2025-xu-huong-the-loai-concept-va-cach-tao-dang"
  }
] as const;

const featuredPost = blogPosts[0];
const latestPosts = blogPosts.slice(1);

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
                Potonow Blog
              </div>
              <h1 className="mt-5 max-w-[46rem] text-[2.45rem] font-extrabold leading-tight tracking-normal text-[#202a32] sm:text-[4rem]">
                Cảm hứng chụp ảnh, concept đẹp và mẹo đặt lịch
              </h1>
              <p className="mt-5 max-w-[42rem] text-[1.02rem] leading-8 text-[#68717d] sm:text-[1.1rem]">
                Tuyển chọn những bài viết nổi bật từ Potonow về nhiếp ảnh, địa điểm,
                xu hướng concept và kinh nghiệm làm việc cùng photographer.
              </p>
            </div>

            <div className="grid gap-3 rounded-[1.35rem] border border-[#dfe8e3] bg-white p-5 shadow-[0_16px_45px_rgba(36,61,59,0.08)]">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-[0.9rem] bg-[#e7f6f3] text-[#0f766e]">
                  <ImageIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[1.25rem] font-extrabold text-[#202a32]">
                    {blogPosts.length} bài viết nổi bật
                  </p>
                  <p className="text-[0.92rem] leading-6 text-[#68717d]">
                    Ảnh thật được chọn từ Potonow Blog.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
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
                href={featuredPost.href}
                target="_blank"
                rel="noreferrer"
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
                    href={featuredPost.href}
                    target="_blank"
                    rel="noreferrer"
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
                Đọc thêm từ Potonow
              </h2>
            </div>
            <p className="max-w-[32rem] text-[0.98rem] leading-7 text-[#68717d]">
              Các bài viết được sắp xếp theo nhịp cập nhật của trang mẫu, ưu tiên nội dung hữu ích
              cho cả khách chụp và photographer.
            </p>
          </div>

          <div className="grid gap-5">
            {latestPosts.map((post) => (
              <article
                key={post.title}
                className="group grid gap-4 rounded-[1.2rem] border border-[#dfe8e3] bg-white p-3 shadow-[0_12px_38px_rgba(36,61,59,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(36,61,59,0.1)] sm:grid-cols-[17rem_1fr] sm:gap-5 sm:p-4"
              >
                <Link
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
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

                    <Link href={post.href} target="_blank" rel="noreferrer">
                      <h3 className="mt-3 text-[1.12rem] font-extrabold leading-snug tracking-normal text-[#202a32] transition hover:text-[#f47c20] sm:text-[1.32rem]">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-2 text-[0.95rem] leading-7 text-[#66717c]">{post.excerpt}</p>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <PostMeta date={post.date} readTime={post.readTime} />
                    <Link
                      href={post.href}
                      target="_blank"
                      rel="noreferrer"
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
