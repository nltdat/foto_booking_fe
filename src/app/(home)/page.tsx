"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  TimerReset
} from "lucide-react";
import CustomerFooter from "../components/footer";
import CustomerHeader from "../components/header";

const serif = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"]
});

const sans = Manrope({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"]
});

const heroSlides = [
  {
    id: "heritage",
    eyebrow: "Đặt lịch chụp hình",
    title: "Cùng Potonow ngay hôm nay",
    description:
      "Tìm photographer phù hợp, chọn concept đẹp và chốt lịch nhanh trên một giao diện đơn giản, rõ ràng.",
    image: "/customer-home/welcome-to-potonow.jpg",
    badge: "Concept ngoại cảnh"
  },
  {
    id: "portrait",
    eyebrow: "Bộ ảnh đúng gu",
    title: "Từ ý tưởng đến lịch chụp chỉ trong vài bước",
    description:
      "Potonow kết nối bạn với nhiếp ảnh gia đã được kiểm duyệt, giúp quá trình đặt lịch và theo dõi booking nhẹ hơn.",
    image: "/customer-home/welcome-to-potonow-2.jpg",
    badge: "Booking trong 24h"
  },
  {
    id: "student",
    eyebrow: "Chụp là thích",
    title: "Thích là chụp, phù hợp túi tiền",
    description:
      "Từ chụp cá nhân đến kỷ yếu, áo dài, cặp đôi hay sự kiện, mọi thể loại đều có lựa chọn ngân sách rõ ràng.",
    image: "/customer-home/welcome-to-potonow.webp",
    badge: "Giá minh bạch"
  }
] as const;

const reasons = [
  {
    icon: ShieldCheck,
    title: "Đảm Bảo Chất Lượng Dịch Vụ",
    description:
      "Thông tin và chất lượng của nhiếp ảnh gia được kiểm duyệt để bạn đặt lịch với mức độ an tâm cao hơn."
  },
  {
    icon: TimerReset,
    title: "Tổ Chức Buổi Chụp Nhanh Chóng",
    description:
      "Nhu cầu được ghép đúng photographer phù hợp và lịch có thể chốt nhanh, không phải trao đổi rời rạc."
  },
  {
    icon: Sparkles,
    title: "Quy Trình Cực Đơn Giản",
    description:
      "Từ lúc tạo booking đến khi nhận ảnh, toàn bộ hành trình được gom về một luồng dễ theo dõi."
  }
] as const;

const upcomingShoots = [
  {
    title: "Công nương quý tộc",
    author: "Ding Ding",
    postedAt: "15:19",
    type: "Cá nhân (1 người) · Ngoài trời",
    deadline: "23:59 22/04/2026",
    date: "25/04/2026 (Thứ 7)",
    location: "Đồng Nai",
    extras: ["Make-up + Làm tóc (1 người)"],
    budget: "500.000 VND - 1.500.000 VND",
    offers: 1
  },
  {
    title: "Chụp kỷ yếu",
    author: "Phương Vy",
    postedAt: "10:21",
    type: "Cá nhân (1 người) · Cần tư vấn",
    deadline: "23:59 07/05/2026",
    date: "10/05/2026 (CN)",
    location: "TP. Hồ Chí Minh",
    extras: ["Thuê studio", "Make-up + Làm tóc (1 người)"],
    budget: "500.000 VND - 1.000.000 VND",
    offers: 2
  },
  {
    title: "Áo dài",
    author: "Đinh Nữ Tường Vy",
    postedAt: "17/04",
    type: "Cá nhân (1 người) · Ngoài trời",
    deadline: "01:24:00",
    date: "21/04/2026 (Thứ 3)",
    location: "TP. Hồ Chí Minh · Vườn sở thú",
    extras: ["Make-up + Làm tóc (1 người)"],
    budget: "500.000 VND - 1.000.000 VND",
    offers: 3
  },
  {
    title: "Chụp concept kimono",
    author: "Song My",
    postedAt: "17/04",
    type: "Cặp đôi (2 người) · Ngoài trời",
    deadline: "23:59 30/04/2026",
    date: "03/05/2026 (CN)",
    location: "TP. Hồ Chí Minh",
    extras: ["Make-up + Làm tóc (1 người)"],
    budget: "500.000 VND - 2.000.000 VND",
    offers: 2
  }
] as const;

const categories = [
  { title: "Cá nhân", image: "/customer-home/shooting-type-personal-title.jpg" },
  { title: "Cặp đôi", image: "/customer-home/shooting-type-couple-title.jpg" },
  { title: "Gia đình", image: "/customer-home/shooting-type-family-title.jpg" },
  { title: "Nhóm", image: "/customer-home/shooting-type-group-title.jpg" },
  { title: "HSSV", image: "/customer-home/shooting-type-student-title.jpg" },
  { title: "Sự kiện", image: "/customer-home/shooting-type-event-title.jpg" }
] as const;

const photographers = [
  {
    name: "Một Vệt Lam",
    experience: "Dưới 1 năm",
    likes: 1,
    locations: "TP. Hồ Chí Minh",
    bio: "Nhiếp ảnh nghiệp dư với bảng màu dịu, nhiều nước và thiên về cảm xúc tự nhiên.",
    cover: "/customer-home/bg.png",
    avatar: "/customer-home/avatar.png",
    orientation: "landscape"
  },
  {
    name: "Lê Đình Quyền",
    experience: "Từ 1-3 năm",
    likes: 1,
    locations: "Thừa Thiên-Huế · Quảng Trị · Đà Nẵng",
    bio: "Tập trung chân dung, kỷ yếu, áo dài và phong cảnh với phong cách gần gũi, trẻ trung.",
    cover: "/customer-home/bg-2.png",
    avatar: "/customer-home/avatar-2.png",
    orientation: "portrait"
  },
  {
    name: "Trần Quang Thảo",
    experience: "Từ 1-3 năm",
    likes: 1,
    locations: "Đà Nẵng",
    bio: "Năng lượng cao, bắt khoảnh khắc nhanh, phù hợp các buổi chụp trẻ và cần nhiều tương tác.",
    cover: "/customer-home/bg-3.png",
    avatar: "/customer-home/avatar.jpeg",
    orientation: "portrait"
  }
] as const;

const searchFields = [
  { icon: Camera, label: "Thể loại" },
  { icon: CalendarDays, label: "Thời gian" },
  { icon: MapPin, label: "Địa điểm" }
] as const;

export default function CustomerDashboardPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [favoritePhotographers, setFavoritePhotographers] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  const onToggleFavorite = (name: string) => {
    setFavoritePhotographers((current) =>
      current.includes(name)
        ? current.filter((favoriteName) => favoriteName !== name)
        : [...current, name]
    );
  };

  return (
    <main
      className={`${sans.className} min-h-screen bg-[#fcf8f2] text-[14px] text-[#23180f] lg:text-[14.5px]`}
    >
      <CustomerHeader />

      <section id="booking" className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[71rem]">
          <div className="relative h-[25.5rem] overflow-hidden rounded-[2rem] border border-[#e7d7c5] bg-[#efe5d5] shadow-[0_24px_70px_rgba(89,61,44,0.14)] sm:h-[29.5rem] lg:h-[32rem]">
            <div className="absolute inset-0">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === activeSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                  <div className="absolute inset-0" />
                </div>
              ))}
            </div>

            <div className="relative z-10 h-full px-7 pb-24 pt-8 sm:px-9 lg:px-14 lg:pb-28 lg:pt-12">
              <div className="max-w-[31rem]">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-3.5 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[#9f6a3f] backdrop-blur">
                  <Sparkles className="h-4 w-4" />
                  {currentSlide.badge}
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-4 z-20 px-4 sm:px-8 lg:px-16">
              <div className="mx-auto grid max-w-[44rem] items-center gap-0 overflow-hidden rounded-[1.35rem] border border-white/80 bg-white shadow-[0_18px_45px_rgba(82,57,35,0.18)] md:grid-cols-[1fr_1fr_1fr_9rem]">
                {searchFields.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 border-b border-[#f1e6d9] px-4 py-3.5 text-[#2b3341] last:border-b-0 md:border-b-0 md:border-r"
                  >
                    <Icon className="h-4 w-4 text-[#5b6171]" />
                    <span className="text-[1rem] font-semibold">{label}</span>
                  </div>
                ))}

                <Link
                  href="/bookings"
                  className="flex items-center justify-center gap-3 bg-[#f47c20] px-5 py-3.5 text-[1rem] font-extrabold text-white transition hover:bg-[#dd6a12]"
                >
                  <ArrowRight className="h-5 w-5" />
                  Đặt lịch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="story"
        className="mx-auto w-full max-w-[75rem] px-4 py-[4.5rem] sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-[75rem] items-center gap-0 px-4 lg:grid-cols-[1.08fr_0.88fr]">
          <div className="relative z-0 overflow-hidden rounded-[2rem]">
            <Image
              src="/customer-home/chup-la-thich-thich-la-chup.jpg"
              alt="Chụp là thích"
              width={900}
              height={1000}
              className="h-[27.5rem] w-full rounded-[2rem] object-cover lg:h-[32rem]"
            />
          </div>

          <div className="z-10 mt-[-2.5rem] flex flex-col lg:-ml-8 lg:mt-0">
            <h2 className="ml-12 mt-12 text-[2rem] font-bold leading-[1.16] tracking-[-0.03em] text-[#f47c20] sm:text-[2.45rem]">
              Chụp Là Thích!
              <br />
              Thích Là Chụp!
            </h2>

            <div className="mt-4 rounded-[2rem] bg-[#f7f7f7] backdrop-blur-xl px-7 py-7 shadow-[0_18px_40px_rgba(65,49,35,0.06)] sm:px-8 sm:py-8">
              <div className="space-y-3 text-[0.95rem] leading-7 text-[#474c57] sm:text-[0.98rem]">
                <p>
                  Bạn đang muốn sở hữu một bộ ảnh độc đáo và phù hợp túi tiền?<br/>
                  Bạn đang phân vân giữa vô vàn những dịch vụ chụp hình trôi nổi trên thị trường hiện nay?<br/>
                  Bạn đang lo ngại về chất lượng hình ảnh thực tế so với hình ảnh quảng cáo?<br/>
                  Đừng lo, đã có Potonow!!!
                </p>
                <p className="pt-3">
                  Potonow - Nền tảng đặt lịch chụp hình nhanh chóng, tiện lợi và
                  phù hợp túi tiền dành riêng cho bạn!
                </p>
              </div>

              <div className="mt-8 flex justify-center sm:justify-start">
                <Link
                  href="/about"
                  className="rounded-[1.05rem] bg-[#f47c20] px-6 py-2.5 text-[0.95rem] font-bold text-white shadow-[0_16px_30px_rgba(244,124,32,0.2)] transition hover:bg-[#dd6a12]"
                >
                  Chuyện của Potonow
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[75rem] px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.4rem] bg-white px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <div>
              <h2 className="max-w-3xl text-[1.95rem] font-bold leading-[1.22] tracking-[-0.03em] text-[#f47c20] sm:text-[2.45rem]">
                3 Lý Do
                <br />
                Để Đặt Lịch Chụp Ở Potonow
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {reasons.map((reason) => {
                  const Icon = reason.icon;

                  return (
                    <article
                      key={reason.title}
                      className="min-h-[18rem] rounded-[1.7rem] bg-[#f8f8f8] px-4.5 py-5 shadow-[0_16px_40px_rgba(90,65,42,0.05)]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#f47c20] text-[#f47c20]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-[0.98rem] font-extrabold leading-8 text-[#2d3340] sm:text-[1.04rem]">
                        {reason.title}
                      </h3>
                      <p className="mt-2 text-[0.9rem] leading-7 text-[#6d6f78]">
                        {reason.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="relative lg:pt-1">
              <div className="overflow-hidden rounded-[2rem] bg-[#f5f5f5] shadow-[0_20px_50px_rgba(90,65,42,0.08)]">
                <Image
                  src="/customer-home/reason.jpg"
                  alt="Reason to choose Potonow"
                  width={900}
                  height={1100}
                  className="h-[24rem] w-full object-cover object-center sm:h-[27rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="upcoming"
        className="mx-auto w-full max-w-[75rem] px-4 py-14 sm:px-6 lg:px-8"
      >
        <h2 className="text-center text-[1.9rem] font-bold tracking-[-0.03em] text-[#f47c20] sm:text-[2.15rem]">
          Danh sách chụp hình sắp tới
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {upcomingShoots.map((shoot) => (
            <article
              key={shoot.title}
              className="rounded-[1.5rem] bg-[#f7f7f7] px-4.5 py-3.5 shadow-[0_16px_36px_rgba(93,68,43,0.05)] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[1.05rem] font-extrabold capitalize text-[#2f3544] sm:text-[1.18rem]">
                    {shoot.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-[#5f6470]">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#6d7280] text-[11px]">
                      ◌
                    </span>
                    <span className="font-semibold text-[#38404f]">{shoot.author}</span>
                    <span className="text-[#8b8d96]">· {shoot.postedAt}</span>
                  </div>
                </div>
                <span className="rounded-full bg-[#ffe8c8] px-3 py-1 text-xs font-medium text-[#a36123]">
                  Đang tìm
                </span>
              </div>

              <div className="mt-3 grid gap-x-4 gap-y-2 text-[0.9rem] text-[#434956] sm:grid-cols-[1fr_auto]">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-[#4e5563]" />
                  <span>{shoot.type}</span>
                </div>
                <div className="text-right text-[#595d69]">
                  Hạn tìm NAG: <span className="font-extrabold">{shoot.deadline}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#4e5563]" />
                  <span>{shoot.date}</span>
                </div>
                <div className="text-right text-[#595d69]">
                  Đề nghị chụp: <span className="font-extrabold">{shoot.offers}</span>
                </div>

                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="h-4 w-4 text-[#4e5563]" />
                  <span>{shoot.location}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {shoot.extras.map((extra) => (
                  <span
                    key={extra}
                    className="rounded-full bg-[#ffe8c8] px-3 py-1 text-[0.88rem] text-[#484d59]"
                  >
                    {extra}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-[0.98rem] font-extrabold text-[#ff6d0a] sm:text-[1.08rem]">
                {shoot.budget}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="#booking"
            className="rounded-[1.1rem] bg-[#ff6d0a] px-6 py-3.5 text-[0.98rem] font-extrabold text-white shadow-[0_14px_28px_rgba(255,109,10,0.22)] transition hover:bg-[#eb6204]"
          >
            Đặt lịch chụp hình ngay!
          </Link>
        </div>
      </section>

      <section
        id="categories"
        className="mx-auto w-full max-w-[75rem] px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="bg-white py-2">
          <h2 className="text-center text-[1.75rem] font-bold tracking-[-0.03em] text-[#f47c20] sm:text-[1.95rem]">
            Đa dạng thể loại chụp hình
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <article
                key={category.title}
                className="group relative overflow-hidden rounded-[1.5rem]"
              >
                <div className="relative h-32 overflow-hidden sm:h-44">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_20%,rgba(0,0,0,0.58)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-center px-4 pb-4">
                    <h3 className="text-[0.98rem] font-extrabold text-white sm:text-[1.02rem]">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="photographers"
        className="mx-auto w-full max-w-[75rem] px-4 py-14 sm:px-6 lg:px-8"
      >
        <h2 className="text-center text-[1.75rem] font-bold tracking-[-0.03em] text-[#f47c20] sm:text-[1.95rem]">
          Nhiếp ảnh gia có thể bạn yêu thích
        </h2>

        <div className="mt-8 grid items-stretch gap-6 xl:grid-cols-3">
          {photographers.map((photographer) => {
            const isFavorite = favoritePhotographers.includes(photographer.name);

            return (
              <article
                key={photographer.name}
                className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#f0f0f0] bg-[#f8f9fa] shadow-sm transition-all hover:shadow-md"
              >
              {/* 1. Phần Ảnh phía trên */}
              <div className="relative h-[18rem] overflow-hidden sm:h-[18.5rem] lg:h-[19rem]">
                {/* Lớp nền blur tối (Giống ảnh 1) */}
                <Image
                  src={photographer.cover}
                  alt=""
                  fill
                  className="scale-150 object-cover blur-[10px] opacity-90 brightness-75" 
                />
                
                {/* Gradient che trên dưới để mượt hơn */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Nút điều hướng nhỏ gọn hơn */}
                <Link
                  href="/photographers"
                  aria-label={`Xem hồ sơ nhiếp ảnh gia trước của ${photographer.name}`}
                  className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Link>
                <Link
                  href="/photographers"
                  aria-label={`Xem hồ sơ nhiếp ảnh gia tiếp theo của ${photographer.name}`}
                  className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </Link>

                {/* Ảnh chính hiển thị ở giữa */}
                <div className="relative h-full w-full p-2">
                  <Image
                    src={photographer.cover}
                    alt={photographer.name}
                    fill
                    className="object-contain object-center"
                  />
                </div>
              </div>

              {/* 2. Phần Nội dung phía dưới */}
              <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <div className="flex gap-4">
                  {/* Avatar bo viền trắng dày */}
                  <div className="relative mt-2 h-16 w-16 flex-shrink-0">
                    <Image
                      src={photographer.avatar}
                      alt={photographer.name}
                      fill
                      className="rounded-full border-4 border-white object-cover shadow-lg"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-[#f47c20]">{photographer.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{photographer.experience}</span>
                      <span className="h-3 w-[1px] bg-gray-300" />
                      <span>{photographer.likes} lượt thích</span>
                    </div>
                    {/* Tag vị trí */}
                    <div className="mt-2">
                      <span className="rounded-md bg-[#fff0de] px-3 py-1 text-xs font-bold text-[#ff7a16]">
                        {photographer.locations}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Đoạn giới thiệu - Bỏ khung xám, dùng nền trắng/bo tròn nhẹ */}
                <div className="mt-4 flex-1 rounded-2xl border border-gray-50 bg-white p-4 text-[0.9rem] leading-relaxed text-gray-600 shadow-sm">
                  {photographer.bio}
                </div>

                {/* Footer nút bấm */}
                <div className="mt-5 flex items-center justify-between pt-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 font-semibold text-[#f47c20]"
                    aria-pressed={isFavorite}
                    onClick={() => onToggleFavorite(photographer.name)}
                  >
                    <Heart className="h-5 w-5" />
                    {isFavorite ? "Đã yêu thích" : "Yêu thích"}
                  </button>
                  <Link href="/bookings" className="flex items-center gap-2 font-bold text-[#f47c20]">
                    Xem & Đặt lịch
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              </article>
            );
          })}
        </div>
      </section>

      <CustomerFooter />
    </main>
  );
}

function InfoRow({
  icon: Icon,
  value
}: {
  icon: typeof CalendarDays;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#f47c20]" />
      <span>{value}</span>
    </div>
  );
}
