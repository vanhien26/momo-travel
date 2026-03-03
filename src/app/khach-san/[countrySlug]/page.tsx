import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { COUNTRIES } from '@/data/destinations';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface Props { params: Promise<{ countrySlug: string }> }

export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({ countrySlug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countrySlug } = await params;
  const country = COUNTRIES.find(c => c.slug === countrySlug);
  if (!country) return {};
  return {
    title: `Khách Sạn ${country.name} – Đặt Phòng Giá Tốt | MoMo Travel`,
    description: `Tìm và đặt phòng khách sạn tại ${country.name} với giá cam kết tốt nhất. Hỗ trợ Ví Trả Sau, hoàn tiền qua MoMo.`,
  };
}

export default async function HotelCountryPage({ params }: Props) {
  const { countrySlug } = await params;
  const country = COUNTRIES.find(c => c.slug === countrySlug);
  if (!country) notFound();

  const breadcrumbs = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Khách sạn', href: '/khach-san' },
    { name: country.name, href: `/khach-san/${country.slug}` },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <section className="bg-gradient-to-br from-momo-950 to-momo-800 py-14">
        <div className="container-content">
          <Breadcrumb items={breadcrumbs} light />
          <h1 className="mt-4 text-hero text-white">Khách Sạn {country.name}</h1>
          <p className="mt-3 max-w-xl text-lg text-white/80">
            {country.description} Đặt phòng qua MoMo để nhận hoàn tiền và hỗ trợ Ví Trả Sau 0%.
          </p>
        </div>
      </section>

      <div className="container-content mt-10">
        <h2 className="text-section text-gray-900">Chọn Thành Phố</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {country.locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/khach-san/${country.slug}/${loc.slug}`}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={loc.image} alt={`Khách sạn ${loc.name}`} fill sizes="33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-xl font-bold text-white">{loc.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">{loc.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-momo-700">
                    từ {loc.hotelPrice.toLocaleString('vi-VN')}đ<span className="text-xs font-normal text-gray-400"> /đêm</span>
                  </span>
                  <Button variant="primary" size="xs" icon="arrow">Xem phòng</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
