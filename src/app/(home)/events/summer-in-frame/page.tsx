/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  Award,
  CalendarDays,
  Camera,
  CheckCircle2,
  Heart,
  Images,
  Trophy,
  Users
} from "lucide-react";
import { manrope } from "../../../fonts";
import CustomerHeader from "../../../components/header";
import CustomerFooter from "../../../components/footer";

const heroImage = "https://potonow.vn/_next/static/media/desktop.08101011.jpg";

const stats = [
  { label: "Ảnh/album", value: "10", icon: Images },
  { label: "Thời gian bình chọn", value: "18-24/08", icon: CalendarDays },
  { label: "Chủ đề", value: "Summer", icon: Camera }
] as const;

const tabs = [
  { label: "Giới thiệu", href: "#gioi-thieu" },
  { label: "Thể lệ", href: "#the-le" },
  { label: "Bình chọn", href: "#binh-chon" },
  { label: "Kết quả", href: "#ket-qua" }
] as const;

const partners = [
  {
    title: "Vietnam Is Awesome",
    content:
      "Cộng đồng hơn 200.000 thành viên kết nối người địa phương, expat, Việt kiều và du khách với văn hóa, trải nghiệm và những câu chuyện chân thực về Việt Nam."
  },
  {
    title: "Cafe Hàm Trú Ẩn",
    content:
      "Không gian cà phê xanh, yên tĩnh giữa Hà Nội, nơi thường xuyên tổ chức workshop sáng tạo, hội chợ thủ công và các hoạt động cộng đồng."
  },
  {
    title: "Hidden Gem Coffee",
    content:
      "Quán cà phê thân thiện môi trường trong lòng phố cổ Hà Nội, nổi bật với không gian tái chế, ấm cúng và đậm tinh thần văn hóa Việt."
  }
] as const;

const rules = [
  "Chọn một album tối đa 10 ảnh ghi lại khoảnh khắc mùa hè, du lịch và trải nghiệm có yếu tố con người.",
  "Mỗi người tham gia chỉ gửi một bài dự thi và chịu trách nhiệm về bản quyền, nội dung hình ảnh.",
  "Potonow có quyền sử dụng, chia sẻ và đăng tải ảnh dự thi cho mục đích truyền thông của cuộc thi.",
  "Các bài có dấu hiệu trùng lặp, nội dung không phù hợp, tranh chấp bản quyền hoặc tương tác bất thường có thể bị loại."
] as const;

const timeline = [
  {
    label: "Mở đăng ký",
    value: "28/07/2025",
    detail: "Công bố cuộc thi trên fanpage Potonow"
  },
  {
    label: "Đóng đăng ký",
    value: "17/08/2025",
    detail: "Nhận bài đến 11:59 PM"
  },
  {
    label: "Bình chọn",
    value: "18-24/08/2025",
    detail: "Mỗi lượt thích hợp lệ tính 1 điểm"
  },
  {
    label: "Công bố kết quả",
    value: "26/08/2025",
    detail: "Dự kiến lúc 3:00 PM"
  }
] as const;

const prizes = [
  {
    title: "Summer in Frame",
    subtitle: "Giải do đội ngũ Potonow lựa chọn",
    icon: Trophy,
    tone: "bg-[#f47c20] text-white"
  },
  {
    title: "Most Loved Photo",
    subtitle: "Giải do cộng đồng bình chọn",
    icon: Heart,
    tone: "bg-[#2b455f] text-white"
  },
  {
    title: "Consolation Prize",
    subtitle: "Các album nổi bật khác",
    icon: Award,
    tone: "bg-[#fff4e8] text-[#a94d0d]"
  }
] as const;

const resultAlbums = [
  {
    code: "SIF-2A02AE",
    prize: "Summer in Frame",
    badge: "Grand Prize",
    images: [
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-2A02AE/1.jpg?fm=webp&q=90&w=961&s=f92c8df0e900d8c98424683f66c10576",
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-2A02AE/2.png?fm=webp&q=90&w=961&s=96163515f398aaafad7b68540958b5b1",
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-2A02AE/3.jpg?fm=webp&q=90&w=961&s=d26b2531970894494b0741b8d49b76b9",
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-2A02AE/4.jpg?fm=webp&q=90&w=961&s=d11f772744e5c494b7a15f729432b2f3"
    ]
  },
  {
    code: "SIF-429546",
    prize: "Most Loved Photo",
    badge: "Community Choice",
    images: [
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-429546/1.jpg?fm=webp&q=90&w=961&s=98a044b952ef64c08252e95b610f8d05",
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-429546/2.jpg?fm=webp&q=90&w=961&s=445e1ce4ec5e655ee3621512acb26fcd",
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-429546/3.jpg?fm=webp&q=90&w=961&s=4a189cc0c436c3c62353a39c094d39f6",
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-429546/4.jpg?fm=webp&q=90&w=961&s=5f081feed02693ac07fc9c0768730122"
    ]
  },
  {
    code: "SIF-DA1A1D",
    prize: "Consolation Prize",
    badge: "Featured Album",
    images: [
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-DA1A1D/1.jpg?fm=webp&q=90&w=961&s=75def5a4532eaa227285f0b178c24d23",
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-DA1A1D/2.jpg?fm=webp&q=90&w=961&s=29f77e75be0deb597763291054c85915",
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-DA1A1D/3.jpg?fm=webp&q=90&w=961&s=68f872139ee3915ded28904a00fa62dd",
      "https://potonow-image-event-prod.pvnservices.com/sif/SIF-DA1A1D/4.jpg?fm=webp&q=90&w=961&s=656c6a5f1c0b5e69db65e00eda507864"
    ]
  }
] as const;

function SectionTitle({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.18em] text-[#f47c20]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[2rem] font-extrabold leading-tight text-[#243246] sm:text-[2.55rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[1rem] leading-7 text-[#5d6472]">{description}</p>
      ) : null}
    </div>
  );
}

export default function SummerInFramePage() {
  return (
    <main className={`${manrope.className} min-h-screen bg-[#fffaf4] text-[#1f2937]`}>
      <CustomerHeader />

      <section className="relative overflow-hidden bg-[#f7eadc]">
        <img
          src={heroImage}
          alt="Summer in Frame"
          className="h-[19rem] w-full object-cover object-center sm:h-[28rem] lg:h-[36rem]"
        />
      </section>

      <nav className="sticky top-[5.15rem] z-30 border-y border-[#eadfce] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[75rem] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {tabs.map((tab) => (
            <a
              key={tab.href}
              href={tab.href}
              className="inline-flex h-11 shrink-0 items-center rounded-lg px-5 text-[0.95rem] font-extrabold text-[#2f3d52] transition hover:bg-[#fff4e8] hover:text-[#f47c20]"
            >
              {tab.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="gioi-thieu" className="mx-auto w-full max-w-[75rem] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-lg bg-[#fff0dd] px-3 py-1 text-[0.82rem] font-extrabold uppercase tracking-[0.14em] text-[#d06416]">
              Photo contest
            </p>
            <h1 className="mt-5 text-[2.65rem] font-extrabold leading-[1.03] text-[#203047] sm:text-[4rem]">
              Summer in Frame
            </h1>
            <p className="mt-5 text-[1.08rem] leading-8 text-[#566173]">
              Cuộc thi ảnh do Potonow tổ chức, nơi những khoảnh khắc mùa hè,
              du lịch và trải nghiệm được kể lại bằng album ảnh có con người là
              trung tâm cảm xúc.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg border border-[#eadfce] bg-white p-4">
                  <Icon className="h-5 w-5 text-[#f47c20]" />
                  <p className="mt-3 text-[1.35rem] font-extrabold text-[#243246]">{value}</p>
                  <p className="text-[0.82rem] font-bold text-[#657184]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#eadfce] bg-white p-6 shadow-[0_18px_50px_rgba(35,24,15,0.08)]">
            <h2 className="text-[1.35rem] font-extrabold text-[#243246]">Về Potonow</h2>
            <p className="mt-4 text-[0.98rem] leading-7 text-[#5d6472]">
              Potonow là nền tảng đặt lịch chụp ảnh trực tuyến đầu tiên tại Việt
              Nam, được phát triển và vận hành bởi Potonow Co., Ltd. Sau nhiều
              năm làm việc trong lĩnh vực sản xuất hình ảnh, Potonow ra đời để
              kết nối khách hàng với nhiếp ảnh gia phù hợp một cách nhanh hơn,
              rõ ràng hơn và hiệu quả hơn.
            </p>
            <div className="mt-6 grid gap-3">
              {partners.map((partner) => (
                <div key={partner.title} className="rounded-lg bg-[#fff8ef] p-4">
                  <p className="font-extrabold text-[#243246]">{partner.title}</p>
                  <p className="mt-2 text-[0.92rem] leading-6 text-[#657184]">
                    {partner.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="the-le" className="border-y border-[#eadfce] bg-white py-14">
        <div className="mx-auto w-full max-w-[75rem] px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Rules"
            title="Thể lệ tham gia"
            description="Các mốc thời gian và tiêu chí được giữ theo tinh thần trang sự kiện gốc."
          />

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {rules.map((rule) => (
                <div key={rule} className="flex gap-3 rounded-lg border border-[#eadfce] bg-[#fffaf4] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f47c20]" />
                  <p className="text-[0.96rem] leading-7 text-[#4e596b]">{rule}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {timeline.map((item) => (
                <div key={item.label} className="rounded-lg bg-[#203047] p-5 text-white">
                  <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#ffd0a3]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-[1.45rem] font-extrabold">{item.value}</p>
                  <p className="mt-2 text-[0.92rem] leading-6 text-[#dce5ef]">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="binh-chon" className="mx-auto w-full max-w-[75rem] px-4 py-14 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Voting"
          title="Bình chọn cộng đồng"
          description="Mỗi lượt thích hợp lệ được tính 1 điểm. Người dùng cần đăng nhập Potonow để bình chọn cho các album yêu thích."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {prizes.map(({ icon: Icon, title, subtitle, tone }) => (
            <div key={title} className={`rounded-lg p-6 ${tone}`}>
              <Icon className="h-8 w-8" />
              <p className="mt-5 text-[1.35rem] font-extrabold">{title}</p>
              <p className="mt-2 text-[0.95rem] leading-6 opacity-85">{subtitle}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg border border-[#eadfce] bg-white p-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-extrabold text-[#243246]">Bạn muốn xem trang gốc?</p>
            <p className="mt-1 text-[0.94rem] text-[#657184]">
              Bản clone giữ layout, banner và ảnh sự kiện từ nguồn Potonow.
            </p>
          </div>
          <Link
            href="https://potonow.vn/events/summer-in-frame"
            target="_blank"
            className="inline-flex h-11 items-center rounded-lg bg-[#f47c20] px-5 font-extrabold text-white transition hover:bg-[#dd6710]"
          >
            Mở trang gốc
          </Link>
        </div>
      </section>

      <section id="ket-qua" className="bg-[#203047] py-14 text-white">
        <div className="mx-auto w-full max-w-[75rem] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.18em] text-[#ffd0a3]">
              Result
            </p>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-tight sm:text-[2.55rem]">
              Kết quả cuộc thi
            </h2>
            <p className="mt-4 text-[1rem] leading-7 text-[#dce5ef]">
              Những album nổi bật được trình bày theo tinh thần gallery kết quả
              của trang Summer in Frame.
            </p>
          </div>

          <div className="space-y-8">
            {resultAlbums.map((album) => (
              <article key={album.code} className="rounded-lg border border-white/15 bg-white/8 p-4 backdrop-blur">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-lg bg-[#ffd0a3] px-3 py-1 text-[0.78rem] font-extrabold uppercase text-[#6b3307]">
                      <Award className="h-4 w-4" />
                      {album.badge}
                    </p>
                    <h3 className="mt-3 text-[1.45rem] font-extrabold">{album.prize}</h3>
                  </div>
                  <p className="inline-flex items-center gap-2 text-[0.95rem] font-bold text-[#dce5ef]">
                    <Users className="h-4 w-4" />
                    Participant: {album.code}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {album.images.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={`${album.code} photo ${index + 1}`}
                      className="aspect-[4/5] w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  ))}
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
