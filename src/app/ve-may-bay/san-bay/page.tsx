import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AIRPORTS } from '@/data/airports';
import { getAirportGuide, sortAirportsForGuide } from '@/data/airportGuides';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Danh sách sân bay | Vé máy bay MoMo',
  description:
    'Tra cứu thông tin sân bay, gợi ý điểm đến và mẹo đi lại. Chọn sân bay để xem mô tả, hình ảnh và các điểm du lịch nổi bật.',
};

const HERO_IMAGE = '/images/destinations/da-nang.jpg';

export default function SanBayHubPage() {
  const breadcrumbs = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Vé máy bay', href: '/ve-may-bay' },
    { name: 'Sân bay', href: '/ve-may-bay/san-bay' },
  ];

  const airports = sortAirportsForGuide(AIRPORTS);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Sân bay"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-momo-900/40 to-black/80" />
        </div>

        <div className="container-content relative py-10 sm:py-14">
          <Breadcrumb items={breadcrumbs} light />
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Thông tin sân bay
            <span className="block bg-gradient-to-r from-travel-sand via-momo-300 to-travel-sky bg-clip-text text-transparent">
              Gợi ý điểm đến & mẹo bay nhanh
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            Chọn một sân bay để xem mô tả, hình ảnh, tips đi lại và gợi ý các điểm đến nổi bật (có link sang trang điểm đến chi tiết).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/ve-may-bay" variant="dark" size="sm">
              Quay lại trang vé máy bay
            </Button>
          </div>
        </div>
      </section>

      <section className="container-content py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {airports.map((a) => {
            const guide = getAirportGuide(a.code);
            const title = guide?.title ?? `Sân bay ${a.name} (${a.code})`;
            const desc =
              guide?.description ??
              `Sân bay tại ${a.city}, ${a.country}. Nội dung đang được cập nhật thêm.`;

            return (
              <Link
                key={`${a.code}-${a.citySlug}-${a.countrySlug}`}
                href={`/ve-may-bay/san-bay/${a.code}`}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {a.country}
                      </p>
                      <h2 className="mt-1 text-base font-bold text-slate-900">
                        {title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        {a.city} • {a.name}
                      </p>
                    </div>
                    <span className="rounded-xl bg-momo-50 px-3 py-2 font-mono text-sm font-bold text-momo-700">
                      {a.code}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                    {desc}
                  </p>
                  <div className="mt-4">
                    <span className="inline-flex items-center text-sm font-semibold text-momo-700">
                      Xem chi tiết
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

