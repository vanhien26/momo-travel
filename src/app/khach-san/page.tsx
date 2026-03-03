import Image from 'next/image';
import Link from 'next/link';
import { COUNTRIES } from '@/data/destinations';
import type { Location } from '@/types';
import { HotelSearchBar } from './HotelSearchBar';

type HotelCardProps = {
  name: string;
  city: string;
  country: string;
  image: string;
  rating: number;
  address: string;
  originalPrice: number;
  discountedPrice: number;
  cashbackPercent: number;
  supportsMomoPayment: boolean;
};

const ALL_CITY_STATS = COUNTRIES.flatMap((country) =>
  country.locations.map((loc) => ({
    countrySlug: country.slug,
    countryName: country.name,
    supportsMomoPayment: country.supportsMoMoPayment,
    citySlug: loc.slug,
    cityName: loc.name,
    hotelPrice: loc.hotelPrice,
    flightPrice: loc.flightPrice,
    eSimPrice: loc.eSimPrice,
  })),
);

const TOP_STAYCATION_DESTINATIONS = ALL_CITY_STATS.slice(0, 6);

const MOCK_HOTELS: HotelCardProps[] = ALL_CITY_STATS.slice(0, 8).map((city, index) => ({
  name:
    index % 3 === 0
      ? `MoMo Signature ${city.cityName} Hotel`
      : index % 3 === 1
      ? `Skyline ${city.cityName} Boutique`
      : `Central ${city.cityName} Retreat`,
  city: city.cityName,
  country: city.countryName,
  image:
    city.citySlug === 'da-lat'
      ? '/images/destinations/da-lat.jpg'
      : city.citySlug === 'phu-quoc'
      ? '/images/destinations/phu-quoc.jpg'
      : city.citySlug === 'da-nang'
      ? '/images/destinations/da-nang.jpg'
      : '/images/destinations/hotels-generic.jpg',
  rating: 4.2 + (index % 3) * 0.3,
  address:
    city.citySlug === 'da-lat'
      ? 'Gần Hồ Xuân Hương, Đà Lạt'
      : city.citySlug === 'phu-quoc'
      ? 'Bãi Dài, Gành Dầu, Phú Quốc'
      : `Trung tâm ${city.cityName}`,
  originalPrice: Math.round(city.hotelPrice * 1.2),
  discountedPrice: city.hotelPrice,
  cashbackPercent: 5 + (index % 3) * 3,
  supportsMomoPayment: city.supportsMomoPayment,
}));

export default function KhachSanPage() {
  const destinationOptions = COUNTRIES.flatMap((country) => [
    { label: country.name, value: country.slug },
    ...country.locations.map((loc: Location) => ({
      label: `${loc.name}, ${country.name}`,
      value: `${country.slug}/${loc.slug}`,
    })),
  ]);

  return (
    <main className="overflow-x-hidden bg-[var(--bg-primary)]">
      {/* Glassmorphism Header on scroll */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-white/60 backdrop-blur-xl dark:bg-slate-900/70">
        <div className="container-content flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-momo-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
              Khách sạn
            </span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              Trải nghiệm đặt phòng thông minh
            </span>
          </div>
          <div className="hidden text-xs text-[var(--text-secondary)] sm:block">
            Đặt phòng chủ động – Nghỉ dưỡng trọn vẹn
          </div>
        </div>
      </header>

      {/* A. Hero – Smart Booking Experience */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Background image / video placeholder */}
        <div className="absolute inset-0">
          <Image
            src="/images/destinations/hotel-hero.jpg"
            alt="Resort & khách sạn nghỉ dưỡng"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-momo-900/60" />
        </div>

        <div className="relative container-content py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-momo-200">
              Khách sạn & Resort trên MoMo
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight momo-trust-display-regular">
              Đặt Phòng Thông Minh
              <span className="block bg-gradient-to-r from-travel-sand via-momo-300 to-travel-sky bg-clip-text text-transparent">
                Cho Mọi Chuyến Đi
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-white/80">
              Từ staycation cuối tuần đến kỳ nghỉ dài ngày, MoMo giúp bạn đặt phòng nhanh chóng, giá tốt
              và an tâm tuyệt đối – chỉ trong vài chạm.
            </p>
          </div>

          {/* Search bar with quick filters & lunar dates */}
          <HotelSearchBar />
        </div>
      </section>

      {/* B. Financial Growth Section (USP MoMo) */}
      <section className="bg-[var(--bg-secondary)] py-12 sm:py-16">
        <div className="container-content space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Đặt Phòng Thông Minh Cùng MoMo
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Không chỉ đặt chỗ nghỉ – đây là giải pháp lưu trú gắn với tài chính thông minh cho cả hành trình.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Ví Trả Sau */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-momo-600 to-momo-800 p-5 text-white shadow-sm">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <h3 className="text-sm font-semibold mb-2">
                  Đặt phòng ngay, trả tiền sau 0% với Ví Trả Sau
                </h3>
                <p className="text-xs text-white/80 mb-3">
                  Trải nghiệm kỳ nghỉ mơ ước mà không cần trả toàn bộ chi phí ngay lập tức. Chia nhỏ thành nhiều kỳ thanh toán, không lãi suất.
                </p>
                <button className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-momo-700">
                  Tìm phòng hỗ trợ Ví Trả Sau
                </button>
              </div>
            </div>

            {/* Hoàn tiền & Tích Xu */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[var(--border-default)]">
              <h3 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">
                Hoàn tiền & Tích Xu MoMo
              </h3>
              <p className="mb-3 text-xs text-[var(--text-secondary)]">
                Nhận hoàn Xu tới 8% giá trị booking. Xu dùng giảm giá cho chuyến đi tiếp theo hoặc mua sắm trong hệ sinh thái MoMo.
              </p>
              <div className="flex items-center justify-between rounded-xl bg-momo-50 px-3 py-3 text-xs">
                <div>
                  <p className="font-semibold text-momo-700">Hoàn xu 5–8%</p>
                  <p className="text-[var(--text-secondary)]">
                    Tùy khách sạn & chương trình khuyến mãi.
                  </p>
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-momo-700">
                  💰 Tiết kiệm kép
                </span>
              </div>
            </div>

            {/* Snapshot chi phí tổng thể */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[var(--border-default)]">
              <h3 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">
                Thấy trước tổng chi phí chuyến đi
              </h3>
              <p className="mb-3 text-xs text-[var(--text-secondary)]">
                Tham khảo trước khung giá vé máy bay, khách sạn, eSIM cho mỗi điểm đến – không còn bất ngờ khi chốt booking.
              </p>
              <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                <li>• Đà Lạt: từ 590k vé máy bay + 450k/đêm khách sạn</li>
                <li>• Tokyo: từ 5.5tr vé máy bay + 2.1tr/đêm khách sạn</li>
                <li>• Bangkok: từ 1.25tr vé máy bay + 1.1tr/đêm khách sạn + eSIM từ 89k</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* C. Featured Destinations (Top Destinations for Staycation) */}
      <section className="bg-[var(--bg-primary)] py-12 sm:py-16">
        <div className="container-content space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Top Destinations for Staycation
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Những thành phố được người dùng MoMo đặt phòng nhiều nhất trong 30 ngày gần đây.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOP_STAYCATION_DESTINATIONS.map((city) => (
              <Link
                key={`${city.countrySlug}-${city.citySlug}`}
                href={`/khach-san/${city.countrySlug}/${city.citySlug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[var(--border-default)] hover:shadow-md hover:ring-momo-200 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={
                      city.citySlug === 'da-lat'
                        ? '/images/destinations/da-lat.jpg'
                        : city.citySlug === 'phu-quoc'
                        ? '/images/destinations/phu-quoc.jpg'
                        : city.citySlug === 'da-nang'
                        ? '/images/destinations/da-nang.jpg'
                        : '/images/destinations/hotels-generic.jpg'
                    }
                    alt={city.cityName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-bold text-white">{city.cityName}</h3>
                    <p className="text-xs text-white/80">{city.countryName}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4 text-sm">
                  <p className="text-[var(--text-secondary)]">
                    1.200+ chỗ nghỉ đang mở đặt. Giá trung bình từ{' '}
                    <span className="font-semibold text-momo-700">
                      {city.hotelPrice.toLocaleString('vi-VN')}đ
                    </span>{' '}
                    /đêm.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* D. Thematic Collections */}
      <section className="bg-[var(--bg-secondary)] py-12 sm:py-16">
        <div className="container-content space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Hotel Collections
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Gợi ý chỗ nghỉ theo phong cách du lịch của bạn – tối ưu cho SEO long-tail.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Workation */}
            <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[var(--border-default)]">
              <h3 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">
                💻 Workation-Friendly
              </h3>
              <p className="mb-3 text-xs text-[var(--text-secondary)]">
                Khách sạn có không gian làm việc riêng, wifi mạnh, gần quán cà phê & coworking.
              </p>
              <ul className="mb-3 space-y-1.5 text-xs text-[var(--text-secondary)]">
                <li>• MoMo Workation Studio – Đà Nẵng</li>
                <li>• Skyline Co-working Hotel – Hà Nội</li>
                <li>• Beachfront Digital Nomad Hub – Phú Quốc</li>
              </ul>
              <button className="mt-auto self-start rounded-full border border-momo-200 px-3 py-1 text-[11px] font-semibold text-momo-700">
                Xem bộ sưu tập
              </button>
            </div>

            {/* Couple / Romantic */}
            <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[var(--border-default)]">
              <h3 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">
                💞 Romantic Getaway
              </h3>
              <p className="mb-3 text-xs text-[var(--text-secondary)]">
                Resort & homestay lãng mạn cho cặp đôi ở Đà Lạt, Phú Quốc, Hội An.
              </p>
              <ul className="mb-3 space-y-1.5 text-xs text-[var(--text-secondary)]">
                <li>• Secret Garden Retreat – Đà Lạt</li>
                <li>• Sunset Lovers Resort – Phú Quốc</li>
                <li>• Lantern River Villa – Hội An</li>
              </ul>
              <button className="mt-auto self-start rounded-full border border-momo-200 px-3 py-1 text-[11px] font-semibold text-momo-700">
                Tìm nơi hẹn hò lý tưởng
              </button>
            </div>

            {/* Family-friendly */}
            <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[var(--border-default)]">
              <h3 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">
                👨‍👩‍👧 Family-Friendly
              </h3>
              <p className="mb-3 text-xs text-[var(--text-secondary)]">
                Khách sạn & resort có khu vui chơi trẻ em, hồ bơi và phòng rộng cho cả gia đình.
              </p>
              <ul className="mb-3 space-y-1.5 text-xs text-[var(--text-secondary)]">
                <li>• Family Lagoon Resort – Nha Trang</li>
                <li>• Kids Club Villa – Phú Quốc</li>
                <li>• City Park Family Hotel – Hà Nội</li>
              </ul>
              <button className="mt-auto self-start rounded-full border border-momo-200 px-3 py-1 text-[11px] font-semibold text-momo-700">
                Xem gợi ý cho gia đình
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* E. Trust & Social Proof */}
      <section className="bg-[var(--bg-primary)] py-12 sm:py-16">
        <div className="container-content grid gap-8 lg:grid-cols-[3fr,2fr]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
              MoMo Safety & Trust
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              An tâm đặt phòng với hệ sinh thái thanh toán hàng đầu Việt Nam – xác nhận tức thì, hỗ trợ
              24/7 và cam kết giá tốt.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <span className="mt-1 text-green-500">✔</span>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Xác nhận tức thì</h3>
                  <p className="text-[var(--text-secondary)] text-xs">
                    Ngay sau khi thanh toán, mã xác nhận được gửi lập tức. Không cần chờ email thủ
                    công hay gọi điện xác minh.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 text-green-500">✔</span>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Cam kết giá tốt nhất</h3>
                  <p className="text-[var(--text-secondary)] text-xs">
                    Nếu bạn tìm thấy giá rẻ hơn cho cùng hạng phòng & điều kiện, MoMo hoàn lại phần
                    chênh lệch dưới dạng quà tặng/Voucher.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 text-green-500">✔</span>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Hỗ trợ 24/7</h3>
                  <p className="text-[var(--text-secondary)] text-xs">
                    Đội ngũ CSKH sẵn sàng hỗ trợ qua chat trực tiếp trên app MoMo, từ lúc bạn đặt
                    cho đến sau khi check-out.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real Reviews & Stories */}
          <div className="space-y-3 text-xs">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[var(--border-default)]">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                “Phòng đúng như hình, thanh toán 1 chạm trên MoMo cực nhanh”
              </p>
              <p className="text-[var(--text-secondary)]">
                – Lan Anh, nghỉ dưỡng cuối tuần tại Đà Lạt
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[var(--border-default)]">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                “Ví Trả Sau cứu cánh chuyến đi gia đình đúng dịp cao điểm”
              </p>
              <p className="text-[var(--text-secondary)]">
                – Anh Tuấn, villa nguyên căn ở Phú Quốc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* F. Recent Hotels (mobile-optimized list) */}
      <section className="bg-[var(--bg-secondary)] py-12 sm:py-16">
        <div className="container-content space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Recent Hotels & Smart Deals
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Gợi ý nhanh một số khách sạn đang được đặt nhiều trên MoMo.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {MOCK_HOTELS.map((hotel) => (
              <HotelCard key={`${hotel.city}-${hotel.name}`} {...hotel} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function HotelCard(props: HotelCardProps) {
  const {
    name,
    city,
    country,
    image,
    rating,
    address,
    originalPrice,
    discountedPrice,
    cashbackPercent,
    supportsMomoPayment,
  } = props;

  return (
    <article className="flex gap-3 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[var(--border-default)] hover:shadow-md transition-shadow">
      <div className="relative h-28 w-28 flex-shrink-0 sm:h-32 sm:w-40">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-3 text-xs sm:text-sm">
        <div>
          <h3 className="line-clamp-2 text-[var(--text-primary)] font-semibold">{name}</h3>
          <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
            {city}, {country} • {address}
          </p>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--text_secondary)]">
            <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-0.5 text-[10px] font-semibold text-yellow-700">
              ★ {rating.toFixed(1)}
            </span>
            {supportsMomoPayment && (
              <span className="inline-flex items-center rounded-full bg-momo-50 px-2 py-0.5 text-[10px] font-semibold text-momo-700">
                Thanh toán MoMo ✅
              </span>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] text-[var(--text-muted)] line-through">
                {originalPrice.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <div className="text-base font-extrabold text-momo-700">
              {discountedPrice.toLocaleString('vi-VN')}đ
              <span className="text-[10px] font-normal text-[var(--text-secondary)]"> /đêm</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-[10px]">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 font-semibold text-green-700">
              Hoàn xu {cashbackPercent}% qua MoMo
            </span>
            <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 font-semibold text-purple-700">
              Ví Trả Sau 0%
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

