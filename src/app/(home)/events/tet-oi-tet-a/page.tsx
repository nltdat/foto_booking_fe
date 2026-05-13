/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Flower2,
  Gift,
  Heart,
  Images,
  Sparkles,
  Trophy,
  Users
} from "lucide-react";
import { manrope } from "../../../fonts";
import CustomerHeader from "../../../components/header";
import CustomerFooter from "../../../components/footer";

const heroImage = "https://potonow.vn/_next/static/media/desktop.0a4bcde9.jpg";

const tabs = [
  { label: "Giới thiệu", href: "#gioi-thieu" },
  { label: "Thể lệ", href: "#the-le" },
  { label: "Bình chọn", href: "#binh-chon" },
  { label: "Kết quả", href: "#ket-qua" }
] as const;

const stats = [
  { label: "Chủ đề", value: "Tết", icon: Flower2 },
  { label: "Bình chọn", value: "13-19/01", icon: CalendarDays },
  { label: "Giải thưởng", value: "3+", icon: Gift }
] as const;

const introBlocks = [
  {
    title: "Về Potonow",
    content:
      "Potonow là nền tảng đặt lịch chụp ảnh trực tuyến đầu tiên tại Việt Nam, giúp khách hàng tìm được nhiếp ảnh gia phù hợp và giúp nhiếp ảnh gia tiếp cận khách hàng rõ ràng, hiệu quả hơn."
  },
  {
    title: "Về Tủ Nhà Mây",
    content:
      "Tủ Nhà Mây phát triển áo dài với mong muốn đưa trang phục truyền thống vào đời sống thường ngày, kết hợp chất liệu văn hóa Việt với nhu cầu và nhịp sống hiện đại."
  },
  {
    title: "Về INSTAX by Fujifilm",
    content:
      "INSTAX truyền cảm hứng lưu giữ khoảnh khắc qua ảnh in tức thì, đồng hành cùng cuộc thi để lan tỏa tinh thần sum vầy, vui tươi và kết nối trong mùa Tết."
  }
] as const;

const rules = [
  "Chọn bức ảnh chân dung hoặc khoảnh khắc có người, phù hợp với tinh thần Tết.",
  "Mỗi thí sinh chỉ gửi một ảnh dự thi và chịu trách nhiệm về bản quyền, nội dung hình ảnh.",
  "Ảnh mặc áo dài từ Tủ Nhà Mây có thể tham gia thêm hạng mục Tết cùng Mây.",
  "Potonow và nhà tài trợ có quyền sử dụng ảnh dự thi cho mục đích truyền thông của cuộc thi.",
  "Bài dự thi trùng lặp, không phù hợp, tranh chấp bản quyền hoặc có tương tác bất thường có thể bị loại."
] as const;

const timeline = [
  {
    label: "Mở đăng ký",
    value: "23/12/2024",
    detail: "Công bố cuộc thi trên fanpage Potonow"
  },
  {
    label: "Đóng đăng ký",
    value: "12/01/2025",
    detail: "Nhận bài dự thi đến 24:00"
  },
  {
    label: "Bình chọn",
    value: "13-19/01/2025",
    detail: "Mỗi lượt thích hợp lệ tính 1 điểm"
  },
  {
    label: "Công bố kết quả",
    value: "20/01/2025",
    detail: "Dự kiến lúc 20:00"
  }
] as const;

const prizes = [
  {
    title: "Tết ơi Tết à",
    subtitle: "Giải do đội ngũ Potonow lựa chọn theo tiêu chí nghệ thuật, chất lượng và concept.",
    icon: Trophy,
    tone: "bg-[#b91c1c] text-white"
  },
  {
    title: "Hình ảnh được yêu thích",
    subtitle: "Giải cộng đồng bình chọn, mỗi lượt thích hợp lệ được tính một điểm.",
    icon: Heart,
    tone: "bg-[#0f5132] text-white"
  },
  {
    title: "Tết cùng Mây",
    subtitle: "Giải do nhà tài trợ Tủ Nhà Mây lựa chọn cho ảnh có áo dài của Mây.",
    icon: Award,
    tone: "bg-[#fff3d6] text-[#7a2e0e]"
  }
] as const;

const resultPhotos = [
  {
    code: "6783FFFA",
    prize: "Tết ơi Tết à",
    badge: "Potonow Choice",
    image:
      "https://potonow-image-event-prod.pvnservices.com/tet-oi-tet-a/6783fffa11b031d6e7005bc0/0aaf3d9b-70ad-4096-bc23-372598672e43.png?q=70&fm=webp&s=0eedcafd699001d59f269ac043eea152"
  },
  {
    code: "67840040",
    prize: "Hình ảnh được yêu thích",
    badge: "Favorite",
    image:
      "https://potonow-image-event-prod.pvnservices.com/tet-oi-tet-a/6784004011b031d6e7005be8/dde77c62-1554-4adb-b214-92830e01abb6.png?q=70&fm=webp&s=6928ebd8ec6b8c0faac06f503e49303d"
  },
  {
    code: "67840076",
    prize: "Tết cùng Mây",
    badge: "Sponsor Choice",
    image:
      "https://potonow-image-event-prod.pvnservices.com/tet-oi-tet-a/6784007611b031d6e7005bf0/2e50d2ac-0985-4f04-8b66-a6569e2c6e7a.png?q=70&fm=webp&s=d0dc55c6c0a2dca8503c2ebb2674b85c"
  },
  {
    code: "678400BB",
    prize: "Giải nổi bật",
    badge: "Featured",
    image:
      "https://potonow-image-event-prod.pvnservices.com/tet-oi-tet-a/678400bb11b031d6e7005bff/8e7f534b-4a33-499d-9d87-56ee701c78f4.png?q=70&fm=webp&s=ac0f7bc328f25726b9b0df0f199dbfc0"
  },
  {
    code: "678400FF",
    prize: "Giải nổi bật",
    badge: "Featured",
    image:
      "https://potonow-image-event-prod.pvnservices.com/tet-oi-tet-a/678400ff11b031d6e7005c24/a300c71d-042c-4676-938b-441492ec1c3c.png?q=70&fm=webp&s=1d94ce1200802733c80de55c1465392f"
  },
  {
    code: "67840147",
    prize: "Giải nổi bật",
    badge: "Featured",
    image:
      "https://potonow-image-event-prod.pvnservices.com/tet-oi-tet-a/6784014711b031d6e7005c31/4f8c7c4b-f4f8-4b6d-bfb2-6699243be398.png?q=70&fm=webp&s=77611d1882c1b57f8df331b32a89859d"
  },
  {
    code: "6784017F",
    prize: "Giải nổi bật",
    badge: "Featured",
    image:
      "https://potonow-image-event-prod.pvnservices.com/tet-oi-tet-a/6784017f11b031d6e7005c3a/583e3196-1e18-4944-9d47-ce2c14d7d730.png?q=70&fm=webp&s=b1a7659339ca7110932ff209ea999325"
  },
  {
    code: "678401A4",
    prize: "Giải nổi bật",
    badge: "Featured",
    image:
      "https://potonow-image-event-prod.pvnservices.com/tet-oi-tet-a/678401a411b031d6e7005c40/8e03eaae-8697-4b61-9243-435f39c120d4.png?q=70&fm=webp&s=84ff651a4d8d9934d940e09f78d9baec"
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
      <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.18em] text-[#b91c1c]">
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

export default function TetOiTetAPage() {
  return (
    <main className={`${manrope.className} min-h-screen bg-[#fffaf4] text-[#1f2937]`}>
      <CustomerHeader />

      <section className="relative overflow-hidden bg-[#f7eadc]">
        <img
          src={heroImage}
          alt="Tết ơi Tết à"
          className="h-[19rem] w-full object-cover object-center sm:h-[28rem] lg:h-[36rem]"
        />
      </section>

      <nav className="sticky top-[5.15rem] z-30 border-y border-[#eadfce] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[75rem] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {tabs.map((tab) => (
            <a
              key={tab.href}
              href={tab.href}
              className="inline-flex h-11 shrink-0 items-center rounded-lg px-5 text-[0.95rem] font-extrabold text-[#2f3d52] transition hover:bg-[#fff1e6] hover:text-[#b91c1c]"
            >
              {tab.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="gioi-thieu" className="mx-auto w-full max-w-[75rem] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-lg bg-[#fff1e6] px-3 py-1 text-[0.82rem] font-extrabold uppercase tracking-[0.14em] text-[#b91c1c]">
              Photo contest
            </p>
            <h1 className="mt-5 text-[2.65rem] font-extrabold leading-[1.03] text-[#203047] sm:text-[4rem]">
              Tết ơi Tết à
            </h1>
            <p className="mt-5 text-[1.08rem] leading-8 text-[#566173]">
              Cuộc thi ảnh tôn vinh những khoảnh khắc Tết thân thương: áo dài,
              gia đình, phố phường, những chuyến đi đầu năm và cảm giác đoàn tụ
              sau một năm nhiều nỗ lực.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg border border-[#eadfce] bg-white p-4">
                  <Icon className="h-5 w-5 text-[#b91c1c]" />
                  <p className="mt-3 text-[1.35rem] font-extrabold text-[#243246]">{value}</p>
                  <p className="text-[0.82rem] font-bold text-[#657184]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#eadfce] bg-white p-6 shadow-[0_18px_50px_rgba(35,24,15,0.08)]">
            <h2 className="text-[1.35rem] font-extrabold text-[#243246]">Về cuộc thi</h2>
            <p className="mt-4 text-[0.98rem] leading-7 text-[#5d6472]">
              Khi năm cũ khép lại và năm mới đến gần, Tết luôn là mùa của sắc
              màu, truyền thống và những kỷ niệm khó quên. Potonow tổ chức Tết
              ơi Tết à để lưu giữ các khoảnh khắc rạng rỡ ấy qua nhiếp ảnh.
            </p>
            <div className="mt-6 grid gap-3">
              {introBlocks.map((block) => (
                <div key={block.title} className="rounded-lg bg-[#fff8ef] p-4">
                  <p className="font-extrabold text-[#243246]">{block.title}</p>
                  <p className="mt-2 text-[0.92rem] leading-6 text-[#657184]">{block.content}</p>
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
            description="Các điều kiện và mốc thời gian chính được dựng theo trang sự kiện gốc."
          />

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {rules.map((rule) => (
                <div key={rule} className="flex gap-3 rounded-lg border border-[#eadfce] bg-[#fffaf4] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f7a46]" />
                  <p className="text-[0.96rem] leading-7 text-[#4e596b]">{rule}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {timeline.map((item) => (
                <div key={item.label} className="rounded-lg bg-[#203047] p-5 text-white">
                  <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#f7d27c]">
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
          title="Bình chọn và giải thưởng"
          description="Người dùng đăng nhập Potonow để bình chọn cho ảnh yêu thích. Mỗi lượt thích hợp lệ được tính 1 điểm."
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
            <p className="font-extrabold text-[#243246]">Xem bản gốc trên Potonow</p>
            <p className="mt-1 text-[0.94rem] text-[#657184]">
              Bản clone giữ banner, nhịp layout và ảnh sự kiện từ nguồn Potonow.
            </p>
          </div>
          <Link
            href="https://potonow.vn/events/tet-oi-tet-a"
            target="_blank"
            className="inline-flex h-11 items-center rounded-lg bg-[#b91c1c] px-5 font-extrabold text-white transition hover:bg-[#991b1b]"
          >
            Mở trang gốc
          </Link>
        </div>
      </section>

      <section id="ket-qua" className="bg-[#203047] py-14 text-white">
        <div className="mx-auto w-full max-w-[75rem] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.18em] text-[#f7d27c]">
              Result
            </p>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-tight sm:text-[2.55rem]">
              Kết quả cuộc thi
            </h2>
            <p className="mt-4 text-[1rem] leading-7 text-[#dce5ef]">
              Các ảnh dự thi nổi bật được trình bày theo tinh thần gallery kết
              quả của trang Tết ơi Tết à.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resultPhotos.map((photo) => (
              <article key={photo.code} className="overflow-hidden rounded-lg border border-white/15 bg-white/8 backdrop-blur">
                <img
                  src={photo.image}
                  alt={`${photo.prize} ${photo.code}`}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="inline-flex items-center gap-2 rounded-lg bg-[#f7d27c] px-3 py-1 text-[0.72rem] font-extrabold uppercase text-[#5c2609]">
                    <Sparkles className="h-4 w-4" />
                    {photo.badge}
                  </p>
                  <h3 className="mt-3 text-[1.06rem] font-extrabold">{photo.prize}</h3>
                  <p className="mt-2 inline-flex items-center gap-2 text-[0.9rem] font-bold text-[#dce5ef]">
                    <Users className="h-4 w-4" />
                    Participant: {photo.code}
                  </p>
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
