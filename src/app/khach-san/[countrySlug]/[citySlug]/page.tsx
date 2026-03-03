import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { COUNTRIES } from '@/data/destinations';
import { HOTELS } from '@/data/hotels';
import { Button, ViTraSauBadge } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTABlock } from '@/components/sections/CTABlock';

interface Props { params: Promise<{ countrySlug: string; citySlug: string }> }

export async function generateStaticParams() {
  return COUNTRIES.flatMap((country) =>
    country.locations.map((loc) => ({
      countrySlug: country.slug,
      citySlug: loc.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countrySlug, citySlug } = await params;
  const country = COUNTRIES.find(c => c.slug === countrySlug);
  const location = country?.locations.find(l => l.slug === citySlug);
  if (!country || !location) return {};
  return {
    title: `Khách Sạn ${location.name}, ${country.name} – Giá Tốt Nhất | MoMo`,
    description: `Đặt phòng khách sạn tại ${location.name}, ${country.name} với giá cam kết tốt nhất. Hoàn tiền qua MoMo, hỗ trợ Ví Trả Sau 0%.`,
  };
}

export default async function HotelCityPage({ params }: Props) {
  const { countrySlug, citySlug } = await params;
  const country = COUNTRIES.find(c => c.slug === countrySlug);
  const location = country?.locations.find(l => l.slug === citySlug);
  if (!country || !location) notFound();

  const hotels = HOTELS.filter(h => h.citySlug === location.slug && h.countrySlug === country.slug);

  const breadcrumbs = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Khách sạn', href: '/khach-san' },
    { name: country.name, href: `/khach-san/${country.slug}` },
    { name: location.name, href: `/khach-san/${country.slug}/${location.slug}` },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[250px] sm:h-[300px] overflow-hidden">
        <Image src={location.image} alt={`Khách sạn ${location.name}`} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="container-content">
            <Breadcrumb items={breadcrumbs} light />
            <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold text-white">
              Khách Sạn {location.name}
            </h1>
            <p className="mt-2 text-white/70 text-sm">
              {location.name}, {country.name} · {hotels.length} chỗ nghỉ
            </p>
          </div>
        </div>
      </section>

      {/* Quick info */}
      <div className="container-content py-6">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-momo-50 p-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-momo-700 font-bold">✈️ Vé bay từ</span>
            <span className="font-extrabold text-momo-700">{location.flightPrice.toLocaleString('vi-VN')}đ</span>
          </div>
          {location.eSimPrice > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-momo-700 font-bold">📡 eSIM từ</span>
              <span className="font-extrabold text-momo-700">{location.eSimPrice.toLocaleString('vi-VN')}đ</span>
            </div>
          )}
          <div className="ml-auto">
            <Button href={`/diem-den/${country.slug}/${location.slug}`} variant="ghost" size="xs">
              Xem hướng dẫn du lịch
            </Button>
          </div>
        </div>
      </div>

      {/* Hotel listing */}
      <section className="container-content pb-16">
        <div className="space-y-6">
          {hotels.map((hotel) => (
            <article
              key={hotel.id}
              className="flex flex-col sm:flex-row gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="relative h-48 sm:h-auto sm:w-56 shrink-0 overflow-hidden">
                <Image src={hotel.image} alt={hotel.name} fill className="object-cover" sizes="224px" />
                {hotel.cashbackPercent > 0 && (
                  <span className="absolute top-3 left-3 rounded-full bg-green-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                    Hoàn {hotel.cashbackPercent}%
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900">{hotel.name}</h2>
                    <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-[11px] font-bold text-yellow-700">
                      ★ {hotel.stars.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{hotel.address}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-momo-50 px-2.5 py-0.5 text-[11px] font-bold text-momo-700">MoMo Pay</span>
                    <ViTraSauBadge size="xs" />
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">{hotel.type}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-gray-400 line-through">{hotel.originalPrice.toLocaleString('vi-VN')}đ</span>
                    <div className="text-xl font-extrabold text-momo-700">
                      {hotel.discountedPrice.toLocaleString('vi-VN')}đ
                      <span className="text-xs font-normal text-gray-400"> /đêm</span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm">Đặt phòng</Button>
                </div>
              </div>
            </article>
          ))}

          {hotels.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-500">Chưa có khách sạn tại {location.name}. Đang cập nhật thêm!</p>
            </div>
          )}
        </div>
      </section>

      <CTABlock />
    </main>
  );
}
