/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  Award,
  CalendarDays,
  Camera,
  CheckCircle2,
  Heart,
  MapPin,
  Sparkles,
  Trophy,
  Users
} from "lucide-react";
import { manrope } from "../../../fonts";
import CustomerHeader from "../../../components/header";
import CustomerFooter from "../../../components/footer";

const heroImage = "https://potonow.vn/_next/static/media/desktop.8228c516.jpg";

const tabs = [
  { label: "Giới thiệu", href: "#gioi-thieu" },
  { label: "Thể lệ", href: "#the-le" },
  { label: "Bình chọn", href: "#binh-chon" },
  { label: "Kết quả", href: "#ket-qua" }
] as const;

const stats = [
  { label: "Chủ đề", value: "Hà Nội", icon: MapPin },
  { label: "Bình chọn", value: "15-22/07", icon: CalendarDays },
  { label: "Giải chính", value: "4", icon: Trophy }
] as const;

const rules = [
  "Ảnh dự thi cần thể hiện con người, nhịp sống, ký ức hoặc cảm xúc gắn với Hà Nội.",
  "Mỗi bài dự thi chịu trách nhiệm về bản quyền, nhân vật và nội dung hình ảnh.",
  "Giải Hanoi In Focus do Potonow lựa chọn dựa trên tính nghệ thuật, câu chuyện và độ phù hợp với chủ đề.",
  "Giải Hình ảnh được yêu thích được tính theo bình chọn cộng đồng, mỗi lượt thích hợp lệ tính 1 điểm.",
  "Bài dự thi có dấu hiệu gian lận, nội dung không phù hợp hoặc tranh chấp bản quyền có thể bị loại."
] as const;

const timeline = [
  {
    label: "Mở đăng ký",
    value: "01/07/2024",
    detail: "Nhận ảnh dự thi chủ đề Hà Nội"
  },
  {
    label: "Đóng đăng ký",
    value: "14/07/2024",
    detail: "Tổng hợp bài dự thi hợp lệ"
  },
  {
    label: "Bình chọn",
    value: "15-22/07/2024",
    detail: "Mỗi lượt thích hợp lệ tính 1 điểm"
  },
  {
    label: "Công bố kết quả",
    value: "28/07/2024",
    detail: "Công bố lúc 20:00"
  }
] as const;

const featureWinner = {
  title: "Hà Nội và chúng ta",
  author: "Lê Xuân Huy",
  description:
    "Mong chuyện tình chúng mình cũng như Hà Nội em nhỉ, một ngàn năm vẫn dịu dàng, bình thản và đầy thương nhớ.",
  image:
    "https://potonow-image-event-prod.pvnservices.com/event-focus-in-hanoi/66987174ec05ad0ef8f2df17/3b792cac-ad8d-4bbd-a9dc-8aaf0270d259.jpg?q=70&fm=webp&s=8ca63ae4bd064f2b17191a6a2576d92e"
} as const;

const favoriteWinners = [
  {
    rank: "Giải nhất",
    title: "Hà Nội Mới",
    votes: 196,
    author: "Lương Thị Hải Linh",
    description:
      "Hình ảnh người con gái Việt với tà áo dài tại tòa soạn báo Hà Nội Mới, gợi một Hà Nội cổ kính, thanh lịch và thân thuộc.",
    image:
      "https://potonow-image-event-prod.pvnservices.com/event-focus-in-hanoi/669871a8ec05ad0ef8f2df40/36bce32f-bbbc-4b9f-b42b-b1db3c6f1768.jpg?q=70&fm=webp&s=33eef14f05bd0b02f688cc267f407051"
  },
  {
    rank: "Giải nhì",
    title: "Hà Nội, hoa và em",
    votes: 142,
    author: "Pivoine",
    description:
      "Khoảng thời gian ở Hà Nội vừa dài vừa ngắn, trôi qua bằng những mùa hoa, những góc phố và sự dịu dàng rất riêng.",
    image:
      "https://potonow-image-event-prod.pvnservices.com/event-focus-in-hanoi/669871ffec05ad0ef8f2df46/7715a76b-aec9-4a95-a280-8ec39cc3f43c.jpg?q=70&fm=webp&s=b50f75e3282f900839c55c66977c2ed8"
  },
  {
    rank: "Giải ba",
    title: "Cuộc đời nghệ thuật",
    votes: 83,
    author: "Đặng Đức Mạnh / Heather",
    description:
      "Khoảnh khắc bắt gặp một người nghệ sĩ bên Hồ Gươm, khi nhịp phố và niềm vui sáng tạo cùng hiện diện trong khung hình.",
    image:
      "https://potonow-image-event-prod.pvnservices.com/event-focus-in-hanoi/66987239ec05ad0ef8f2df92/064a1229-d0c4-4131-b634-5ed04cea2907.jpeg?q=70&fm=webp&s=6c496664f93fc24d7fcfe2a72d98af1d"
  },
  {
    rank: "Bài nổi bật",
    title: "Hà Nội, Phố và Hoa",
    votes: 66,
    author: "Đỗ Quý Quang",
    description:
      "Một góc gác nhỏ trên phố Hàng Vải, nơi ánh sáng, hoa và chất phố Hà Nội hòa vào nhau trong một khung hình yên tĩnh.",
    image:
      "https://potonow-image-event-prod.pvnservices.com/event-focus-in-hanoi/66987262ec05ad0ef8f2dfbb/c2e246a0-b8f2-4627-bb5b-756d37c24b18.JPG?q=70&fm=webp&s=0dd02931850279325da206a694d53d74"
  }
] as const;

const gallery = [
  "https://potonow-image-event-prod.pvnservices.com/event-focus-in-hanoi/66987289ec05ad0ef8f2dfc6/0985ec71-b749-4356-86a2-2fc50b02aafe.jpg?q=70&fm=webp&s=5419e4b4275f9bbacaf09667a114c9ae",
  "https://potonow-image-event-prod.pvnservices.com/event-focus-in-hanoi/669872b4ec05ad0ef8f2dfef/6c5cd6b2-72cd-43a1-9584-bfd86615364f.jpg?q=70&fm=webp&s=d47ace58dfc0f778ee4564a1ff74ac64",
  "https://potonow-image-event-prod.pvnservices.com/event-focus-in-hanoi/66987310ec05ad0ef8f2e04e/54f5d03e-bbba-4c71-bfbc-4fdd57f6043b.jpg?q=70&fm=webp&s=7811dc3aefff28fa92be54faed3d19e6",
  "https://potonow-image-event-prod.pvnservices.com/event-focus-in-hanoi/66987387ec05ad0ef8f2e054/49e2e271-4e96-4fcc-a167-5a00e352a817.jpg?q=70&fm=webp&s=35a7187abd176c9ced0921d353bcc7d9",
  "https://potonow-image-event-prod.pvnservices.com/event-focus-in-hanoi/669873cfec05ad0ef8f2e063/c091bf4c-e867-4972-8d6a-150625cee7e9.jpg?q=70&fm=webp&s=62e02402b7f2f16e5b378550dc9e0279"
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

export default function FocusInHanoiPage() {
  return (
    <main className={`${manrope.className} min-h-screen bg-[#fffaf4] text-[#1f2937]`}>
      <CustomerHeader />

      <section className="relative overflow-hidden bg-[#e9eef2]">
        <img
          src={heroImage}
          alt="Hanoi In Focus"
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
              Hanoi In Focus
            </h1>
            <p className="mt-5 text-[1.08rem] leading-8 text-[#566173]">
              Cuộc thi ảnh kể lại Hà Nội qua góc nhìn của người yêu thành phố:
              những tà áo dài, con phố, mùa hoa, Hồ Gươm và các khoảnh khắc đời
              thường đã làm nên ký ức rất riêng.
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
            <h2 className="text-[1.35rem] font-extrabold text-[#243246]">Tinh thần cuộc thi</h2>
            <p className="mt-4 text-[0.98rem] leading-7 text-[#5d6472]">
              Hanoi In Focus đặt trọng tâm vào câu chuyện phía sau khung hình.
              Mỗi tác phẩm là một lát cắt về thành phố: cũ và mới, tĩnh và động,
              thân quen nhưng luôn có điều để nhìn lại.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Tôn vinh góc nhìn cá nhân về Hà Nội.",
                "Khuyến khích ảnh có câu chuyện, cảm xúc và nhân vật rõ nét.",
                "Kết nối cộng đồng yêu nhiếp ảnh với những địa điểm, mùa hoa và nhịp sống thủ đô."
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-lg bg-[#fff8ef] p-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#f47c20]" />
                  <p className="text-[0.95rem] leading-6 text-[#5d6472]">{item}</p>
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
            description="Các điểm chính được dựng lại theo tinh thần trang Hanoi In Focus gốc."
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
          description="Các giải yêu thích được xếp hạng theo lượt bình chọn hợp lệ trên trang sự kiện."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Hanoi In Focus", subtitle: "Giải do Potonow lựa chọn", icon: Trophy, tone: "bg-[#f47c20] text-white" },
            { title: "Giải nhất", subtitle: "Ảnh được yêu thích nhất", icon: Heart, tone: "bg-[#2b455f] text-white" },
            { title: "Giải nhì / ba", subtitle: "Các tác phẩm có lượt vote cao", icon: Award, tone: "bg-[#fff4e8] text-[#a94d0d]" }
          ].map(({ icon: Icon, title, subtitle, tone }) => (
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
              Bản clone giữ banner, nhịp layout và ảnh kết quả từ nguồn Potonow.
            </p>
          </div>
          <Link
            href="https://potonow.vn/events/focus-in-hanoi"
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
              Những tác phẩm thắng giải và được yêu thích từ trang Hanoi In Focus.
            </p>
          </div>

          <article className="grid overflow-hidden rounded-lg border border-white/15 bg-white/8 backdrop-blur lg:grid-cols-[0.95fr_1.05fr]">
            <img
              src={featureWinner.image}
              alt={featureWinner.title}
              className="h-full min-h-[26rem] w-full object-cover"
            />
            <div className="p-6 sm:p-8">
              <p className="inline-flex items-center gap-2 rounded-lg bg-[#ffd0a3] px-3 py-1 text-[0.78rem] font-extrabold uppercase text-[#6b3307]">
                <Trophy className="h-4 w-4" />
                Hanoi In Focus
              </p>
              <h3 className="mt-5 text-[2rem] font-extrabold">{featureWinner.title}</h3>
              <p className="mt-4 text-[1rem] leading-7 text-[#dce5ef]">{featureWinner.description}</p>
              <p className="mt-6 inline-flex items-center gap-2 font-bold text-[#ffd0a3]">
                <Users className="h-4 w-4" />
                {featureWinner.author}
              </p>
            </div>
          </article>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {favoriteWinners.map((winner) => (
              <article key={winner.title} className="overflow-hidden rounded-lg border border-white/15 bg-white/8 backdrop-blur">
                <img
                  src={winner.image}
                  alt={winner.title}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="inline-flex items-center gap-2 rounded-lg bg-[#ffd0a3] px-3 py-1 text-[0.72rem] font-extrabold uppercase text-[#6b3307]">
                    <Award className="h-4 w-4" />
                    {winner.rank}
                  </p>
                  <h3 className="mt-3 text-[1.06rem] font-extrabold">{winner.title}</h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-[0.9rem] font-bold text-[#ffd0a3]">
                    <Heart className="h-4 w-4" />
                    {winner.votes} votes
                  </p>
                  <p className="mt-3 line-clamp-3 text-[0.88rem] leading-6 text-[#dce5ef]">
                    {winner.description}
                  </p>
                  <p className="mt-3 text-[0.9rem] font-bold text-white">{winner.author}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {gallery.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Hanoi In Focus gallery ${index + 1}`}
                className="aspect-[4/5] w-full rounded-lg object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <CustomerFooter />
    </main>
  );
}
