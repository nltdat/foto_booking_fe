import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Images,
  Sparkles,
  UsersRound
} from "lucide-react";
import { manrope } from "../../fonts";
import CustomerFooter from "../../components/footer";
import CustomerHeader from "../../components/header";

const storyStats = [
  { value: "7+", label: "năm kinh nghiệm sản xuất hình ảnh" },
  { value: "100+", label: "photographer từng cộng tác" },
  { value: "6", label: "nhóm nhu cầu chụp phổ biến" }
] as const;

const values = [
  {
    icon: HeartHandshake,
    title: "Kết nối đúng người",
    description:
      "Potonow giúp khách hàng tìm photographer phù hợp với phong cách, ngân sách và thời gian mong muốn."
  },
  {
    icon: Clock3,
    title: "Đặt lịch rõ ràng",
    description:
      "Quy trình đặt lịch được gom về một luồng dễ theo dõi để hạn chế trao đổi rời rạc và bỏ sót thông tin."
  },
  {
    icon: Images,
    title: "Lưu giữ khoảnh khắc",
    description:
      "Mỗi buổi chụp được xem như một cách giữ lại những giai đoạn đáng nhớ của tuổi trẻ, gia đình và công việc."
  }
] as const;

const shootingTypes = [
  {
    index: "01",
    title: "Cá nhân",
    fit: "1 người",
    time: "Tối thiểu 2 giờ",
    photos: "Tối thiểu 10 ảnh",
    image: "/customer-home/shooting-type-personal-title.jpg",
    description:
      "Dành cho những bộ ảnh ghi dấu cá tính, từ chân dung đời thường đến concept riêng ở địa điểm bạn yêu thích."
  },
  {
    index: "02",
    title: "Cặp đôi",
    fit: "2 người",
    time: "Tối thiểu 2 giờ",
    photos: "Tối thiểu 15 ảnh",
    image: "/customer-home/shooting-type-couple-title.jpg",
    description:
      "Ghi lại các dịp kỷ niệm, chuyến đi hoặc một ngày đẹp trời bên người thương bằng góc nhìn tự nhiên."
  },
  {
    index: "03",
    title: "Gia đình",
    fit: "3-10 người",
    time: "Tối thiểu 2 giờ",
    photos: "Tối thiểu 20 ảnh",
    image: "/customer-home/shooting-type-family-title.jpg",
    description:
      "Phù hợp cho những khung hình ấm áp của cả nhà, từ ảnh thường niên đến các cột mốc đáng nhớ."
  },
  {
    index: "04",
    title: "Nhóm",
    fit: "2-10 người",
    time: "Tối thiểu 2 giờ",
    photos: "Tối thiểu 15 ảnh",
    image: "/customer-home/shooting-type-group-title.jpg",
    description:
      "Một lựa chọn gọn gàng cho hội bạn, đội nhóm hoặc những buổi chụp cần mọi người đều có khoảnh khắc đẹp."
  },
  {
    index: "05",
    title: "HSSV",
    fit: "1-10 người",
    time: "Tối thiểu 4 giờ",
    photos: "Tối thiểu 20 ảnh",
    image: "/customer-home/shooting-type-student-title.jpg",
    description:
      "Dành cho kỷ yếu, tốt nghiệp và các hoạt động học sinh sinh viên cần lưu lại không khí tập thể."
  },
  {
    index: "06",
    title: "Sự kiện",
    fit: "Theo quy mô",
    time: "Linh hoạt",
    photos: "Theo gói chụp",
    image: "/customer-home/shooting-type-event-title.jpg",
    description:
      "Theo sát các sự kiện, lễ hội, workshop hoặc hoạt động thương hiệu để bắt trọn diễn biến quan trọng."
  }
] as const;

export default function AboutPage() {
  return (
    <main className={`${manrope.className} min-h-screen bg-[#f8fbf8] text-[#242936]`}>
      <CustomerHeader />

      <section className="relative isolate overflow-hidden bg-[#172d31]">
        <div className="absolute inset-0">
          <Image
            src="/customer-home/bg.png"
            alt="Chân dung ngoài trời của Potonow"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,45,48,0.88),rgba(18,45,48,0.58),rgba(18,45,48,0.2))]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f8fbf8] to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[34rem] w-full max-w-[75rem] items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-[43rem] py-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[0.76rem] font-extrabold uppercase tracking-[0.18em] backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#ffd08a]" />
              Your Moments, Our Passion
            </div>

            <h1 className="mt-7 max-w-[41rem] text-[2.9rem] font-extrabold leading-[1.05] tracking-normal sm:text-[4.4rem]">
              Xin Chào, Đây Là Potonow!
            </h1>

            <p className="mt-6 max-w-[38rem] text-[1.05rem] leading-8 text-white/[0.86] sm:text-[1.16rem]">
              Nền tảng giúp bạn tìm photographer phù hợp, đặt lịch chụp rõ ràng và lưu giữ những
              khoảnh khắc đáng nhớ với chi phí dễ tiếp cận.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/bookings"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-[#ff7a1a] px-6 text-[0.98rem] font-extrabold text-white shadow-[0_16px_34px_rgba(255,122,26,0.28)] transition hover:bg-[#eb690e]"
              >
                Đặt lịch chụp hình ngay
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/photographers"
                className="inline-flex h-12 items-center justify-center rounded-[0.85rem] border border-white/55 px-6 text-[0.98rem] font-bold text-white transition hover:bg-white/12"
              >
                Tìm nhiếp ảnh gia
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[75rem] gap-4 md:grid-cols-3">
          {storyStats.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.4rem] border border-[#dfe8e3] bg-white px-6 py-5 shadow-[0_14px_42px_rgba(36,61,59,0.08)]"
            >
              <p className="text-[2.2rem] font-extrabold tracking-normal text-[#0f766e]">
                {item.value}
              </p>
              <p className="mt-1 text-[0.95rem] leading-6 text-[#58636f]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[75rem] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative min-h-[27rem] overflow-hidden rounded-[1.7rem] bg-[#d8eee7]">
            <Image
              src="/customer-home/reason.jpg"
              alt="Một buổi chụp hình của Potonow"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.2em] text-[#0f766e]">
              Câu chuyện
            </p>
            <h2 className="mt-4 text-[2.25rem] font-extrabold leading-tight tracking-normal text-[#202a32] sm:text-[3rem]">
              Chuyện Của Potonow
            </h2>
            <div className="mt-6 space-y-5 text-[1.02rem] leading-8 text-[#58636f]">
              <p>
                Potonow được xây dựng bởi những người yêu công nghệ và nhiếp ảnh, xuất phát từ
                mong muốn làm cho việc đặt lịch chụp trở nên nhẹ nhàng hơn với cả khách hàng lẫn
                photographer.
              </p>
              <p>
                Từ trải nghiệm làm hình ảnh và cộng tác với nhiều ekip, đội ngũ nhận thấy khách
                hàng thường mất nhiều thời gian để tìm người chụp phù hợp, còn photographer cũng
                cần một kênh ổn định để gặp đúng khách hàng.
              </p>
              <p>
                Vì vậy Potonow tập trung vào một hành trình rõ ràng: chọn nhu cầu, xem photographer,
                gửi booking và theo dõi buổi chụp trong cùng một nền tảng.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f0f7f4] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[75rem]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.2em] text-[#0f766e]">
                Cách Potonow tạo giá trị
              </p>
              <h2 className="mt-4 text-[2.15rem] font-extrabold leading-tight tracking-normal text-[#202a32] sm:text-[2.85rem]">
                Tối ưu quy trình để mỗi khoảnh khắc dễ được ghi lại hơn
              </h2>
            </div>
            <p className="max-w-[38rem] text-[1.02rem] leading-8 text-[#58636f] lg:justify-self-end">
              Thay vì để khách hàng tự tìm kiếm rời rạc, Potonow kết nối nhu cầu chụp với hồ sơ
              photographer, ngân sách và lịch trình trong một trải nghiệm thống nhất.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-[1.35rem] border border-[#dbe8e1] bg-white p-6 shadow-[0_16px_45px_rgba(36,61,59,0.07)]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-[0.9rem] bg-[#e7f6f3] text-[#0f766e]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[1.18rem] font-extrabold text-[#202a32]">{title}</h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-[#66717c]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[75rem]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.2em] text-[#0f766e]">
                Dịch vụ
              </p>
              <h2 className="mt-4 text-[2.15rem] font-extrabold leading-tight tracking-normal text-[#202a32] sm:text-[2.85rem]">
                Thông tin các thể loại chụp
              </h2>
            </div>
            <Link
              href="/bookings"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[0.8rem] bg-[#243f46] px-5 text-[0.95rem] font-extrabold text-white transition hover:bg-[#172d31]"
            >
              Xem nhu cầu chụp
              <Camera className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {shootingTypes.map((type) => (
              <article
                key={type.title}
                className="overflow-hidden rounded-[1.45rem] border border-[#e0e8e3] bg-white shadow-[0_16px_42px_rgba(36,61,59,0.08)]"
              >
                <div className="relative h-48">
                  <Image
                    src={type.image}
                    alt={`Thể loại chụp ${type.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.76rem] font-extrabold text-[#0f766e] backdrop-blur">
                    {type.index}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[1.28rem] font-extrabold text-[#202a32]">{type.title}</h3>
                  <p className="mt-3 min-h-[5.25rem] text-[0.94rem] leading-7 text-[#65707b]">
                    {type.description}
                  </p>
                  <dl className="mt-5 grid gap-2 text-[0.87rem] text-[#4f5b66]">
                    {[
                      ["Phù hợp", type.fit],
                      ["Thời gian", type.time],
                      ["Ảnh chỉnh sửa", type.photos]
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between gap-4">
                        <dt className="inline-flex items-center gap-2 font-semibold text-[#71808b]">
                          <CheckCircle2 className="h-4 w-4 text-[#0f766e]" />
                          {label}
                        </dt>
                        <dd className="text-right font-bold text-[#202a32]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[75rem] gap-8 overflow-hidden rounded-[1.7rem] bg-[#243f46] p-7 text-white sm:p-9 lg:grid-cols-[1fr_0.7fr] lg:p-12">
          <div>
            <p className="inline-flex items-center gap-2 text-[0.78rem] font-extrabold uppercase tracking-[0.18em] text-[#ffd08a]">
              <UsersRound className="h-4 w-4" />
              Bắt đầu buổi chụp của bạn
            </p>
            <h2 className="mt-4 max-w-[41rem] text-[2.05rem] font-extrabold leading-tight tracking-normal sm:text-[2.8rem]">
              Sẵn sàng biến ý tưởng thành một lịch chụp rõ ràng?
            </h2>
            <p className="mt-4 max-w-[40rem] text-[1rem] leading-8 text-white/[0.78]">
              Chọn thể loại, mô tả mong muốn và để Potonow giúp bạn gặp photographer phù hợp hơn.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <Link
              href="/bookings"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-[#ff7a1a] px-6 text-[0.98rem] font-extrabold text-white transition hover:bg-[#eb690e]"
            >
              Đặt lịch chụp hình ngay
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/shootings"
              className="inline-flex h-12 items-center justify-center rounded-[0.85rem] border border-white/25 px-6 text-[0.98rem] font-bold text-white transition hover:bg-white/10"
            >
              Xem danh sách buổi chụp
            </Link>
          </div>
        </div>
      </section>

      <CustomerFooter />
    </main>
  );
}
