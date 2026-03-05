import Image from 'next/image';
import Link from 'next/link';
import { COUNTRIES } from '@/data/destinations';
import { HOTELS } from '@/data/hotels';
import { BLOG_POSTS } from '@/data/blog';
import { getImagePath } from '@/lib/images';
import { HotelSearchBar } from './HotelSearchBar';
import { Button } from '@/components/ui/Button';
import { FAQSection } from '@/components/sections/FAQSection';

const ALL_CITY_STATS = COUNTRIES.flatMap((country) =>
  country.locations.map((loc) => ({
    countrySlug: country.slug,
    countryName: country.name,
    citySlug: loc.slug,
    cityName: loc.name,
    hotelPrice: loc.hotelPrice,
    image: loc.image,
  })),
);

const TOP_DESTINATIONS = ALL_CITY_STATS.slice(0, 8);

const HOTEL_FAQS = [
  {
    question: 'Đặt phòng qua MoMo có cần trả tiền ngay không?',
    answer:
      'Bạn có thể thanh toán ngay bằng ví MoMo hoặc dùng Ví Trả Sau để đặt phòng trước, trả tiền sau 0% lãi suất trong 3 tháng. Hạn mức Ví Trả Sau lên đến 10 triệu đồng.',
  },
  {
    question: 'Hoàn tiền khi đặt khách sạn qua MoMo như thế nào?',
    answer:
      'Mỗi giao dịch đặt phòng qua MoMo đều được tích Xu, hoàn từ 3-8% tùy khách sạn và chương trình khuyến mãi. Xu dùng để giảm giá cho lần đặt tiếp theo hoặc mua sắm trong hệ sinh thái MoMo.',
  },
  {
    question: 'Có thể hủy phòng miễn phí không?',
    answer:
      'Nhiều khách sạn trên MoMo cho phép miễn phí hủy phòng nếu hủy trước 24-48 giờ. Khi tìm kiếm, hãy bật bộ lọc "Hủy miễn phí" để chỉ xem các lựa chọn linh hoạt.',
  },
];

export default function KhachSanPage() {
  return (
    <main className="overflow-x-hidden bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-white/70 backdrop-blur-xl">
        <div className="container-content flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-momo-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
              Khách sạn
            </span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              Trải nghiệm đặt phòng thông minh
            </span>
          </div>
        </div>
      </header>

      {/* Hero + Search */}
      <section className="relative overflow-visible bg-slate-950 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/destinations/da-lat.jpg"
            alt="Resort & khách sạn"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-momo-900/60" />
        </div>

        <div className="relative container-content py-14 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-momo-200">
              Khách sạn & Resort trên MoMo
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              Đặt Phòng Thông Minh
              <span className="block bg-gradient-to-r from-travel-sand via-momo-300 to-travel-sky bg-clip-text text-transparent">
                Cho Mọi Chuyến Đi
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
              Từ staycation cuối tuần đến kỳ nghỉ dài ngày, MoMo giúp bạn đặt phòng nhanh chóng, giá
              tốt và an tâm tuyệt đối – chỉ trong vài chạm.
            </p>
          </div>

          <HotelSearchBar />
        </div>
      </section>

      {/* Section 1: Khách sạn & resort nổi bật theo điểm đến */}
      <section className="bg-[var(--bg-secondary)] py-12 sm:py-16">
        <div className="container-content">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Khách sạn & Resort nổi bật
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Gợi ý theo điểm đến phổ biến, giá từ các đối tác MoMo
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TOP_DESTINATIONS.map((city) => {
              const cityHotels = HOTELS.filter(
                (h) => h.citySlug === city.citySlug && h.countrySlug === city.countrySlug,
              );
              const minPrice =
                cityHotels.length > 0
                  ? Math.min(...cityHotels.map((h) => h.discountedPrice))
                  : city.hotelPrice;

              return (
                <Link
                  key={`${city.countrySlug}-${city.citySlug}`}
                  href={`/khach-san/${city.countrySlug}/${city.citySlug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-card transition-all hover:shadow-card-hover"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={getImagePath(city.image)}
                      alt={city.cityName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-lg font-bold text-white">{city.cityName}</h3>
                      <p className="text-xs text-white/80">{city.countryName}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-[var(--text-secondary)]">
                      Từ{' '}
                      <span className="font-extrabold text-momo-700">
                        {minPrice.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-slate-400">/đêm</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Ưu đãi + Hỏi đáp */}
      <section className="bg-[var(--bg-primary)] py-12 sm:py-16">
        <div className="container-content grid gap-10 lg:grid-cols-[1fr,1.2fr]">
          {/* Ưu đãi */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Ưu đãi khi đặt qua MoMo
            </h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-gradient-to-br from-momo-600 to-momo-800 p-5 text-white">
                <h3 className="font-semibold">Ví Trả Sau 0%</h3>
                <p className="mt-1 text-sm text-white/85">
                  Đặt phòng trước, trả tiền sau trong 3 tháng. Không lãi suất.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-[var(--text-primary)]">Hoàn Xu 3-8%</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Mỗi giao dịch đều được tích Xu, dùng giảm giá lần sau.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-[var(--text-primary)]">Cam kết giá tốt nhất</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Tìm giá rẻ hơn? MoMo hoàn chênh lệch dưới dạng quà tặng.
                </p>
              </div>
            </div>
          </div>

          {/* Hỏi đáp */}
          <div>
            <FAQSection
              title="Câu hỏi thường gặp"
              description="Giải đáp nhanh về đặt phòng khách sạn qua MoMo"
              faqs={HOTEL_FAQS}
            />
          </div>
        </div>
      </section>

      {/* Section 3: Blog */}
      <section className="bg-[var(--bg-secondary)] py-12 sm:py-16">
        <div className="container-content">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                Bài viết mới từ Blog
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Kinh nghiệm, mẹo tiết kiệm và gợi ý điểm đến
              </p>
            </div>
            <Button href="/blog" variant="secondary" size="sm">
              Xem tất cả →
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BLOG_POSTS.slice(0, 4).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.categorySlug}/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={getImagePath(post.coverImage)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="line-clamp-2 font-semibold text-[var(--text-primary)] group-hover:text-momo-700">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-[var(--text-secondary)]">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
