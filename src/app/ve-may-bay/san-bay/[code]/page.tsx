import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AIRPORTS, type Airport } from '@/data/airports';
import { COUNTRIES } from '@/data/destinations';
import { getAirportGuide } from '@/data/airportGuides';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';

type PageProps = {
  params: { code: string };
};

function uniqAirportCodes() {
  return Array.from(new Set(AIRPORTS.map((a) => a.code)));
}

export function generateStaticParams() {
  return uniqAirportCodes().map((code) => ({ code }));
}

function getAirportByCode(code: string): Airport | null {
  const normalized = code.toUpperCase();
  const candidates = AIRPORTS.filter((a) => a.code === normalized);
  if (candidates.length === 0) return null;
  return [...candidates].sort((a, b) => a.sortOrder - b.sortOrder)[0]!;
}

function getFallbackImage(countrySlug: string, locationSlug: string) {
  if (countrySlug === 'viet-nam') {
    if (locationSlug === 'da-lat') return '/images/destinations/da-lat.jpg';
    if (locationSlug === 'da-nang') return '/images/destinations/da-nang.jpg';
    return '/images/destinations/da-nang.jpg';
  }
  if (countrySlug === 'han-quoc') return '/images/destinations/hero-korea.jpg';
  return '/images/destinations/da-nang.jpg';
}

function getAirportCodeForLocation(countrySlug: string, locationSlug: string): string | null {
  const match = AIRPORTS.find((a) => a.countrySlug === countrySlug && a.citySlug === locationSlug);
  return match?.code ?? null;
}

function getTomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const airport = getAirportByCode(params.code);
  if (!airport) return { title: 'Không tìm thấy sân bay' };

  const guide = getAirportGuide(airport.code);
  const title = guide?.title ?? `Sân bay ${airport.name} (${airport.code})`;

  return {
    title: `${title} | Vé máy bay MoMo`,
    description:
      guide?.description ??
      `Thông tin sân bay ${airport.name} (${airport.code}) tại ${airport.city}, ${airport.country}.`,
    openGraph: {
      title: `${title} | Vé máy bay MoMo`,
      images: [guide?.heroImage ?? '/images/destinations/da-nang.jpg'],
    },
  };
}

export default function AirportDetailPage({ params }: PageProps) {
  const airport = getAirportByCode(params.code);
  if (!airport) notFound();

  const guide = getAirportGuide(airport.code);
  const heroImage = guide?.heroImage ?? '/images/destinations/da-nang.jpg';

  const breadcrumbs = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Vé máy bay', href: '/ve-may-bay' },
    { name: 'Sân bay', href: '/ve-may-bay/san-bay' },
    { name: airport.code, href: `/ve-may-bay/san-bay/${airport.code}` },
  ];

  const suggested = (guide?.suggestedDestinations ?? [])
    .map((d) => {
      const country = COUNTRIES.find((c) => c.slug === d.countrySlug);
      const location = country?.locations.find((l) => l.slug === d.locationSlug);
      if (!country || !location) return null;

      const img = getFallbackImage(country.slug, location.slug);
      const toAirport = getAirportCodeForLocation(country.slug, location.slug);
      const routeSlug = toAirport
        ? `${airport.code.toLowerCase()}-${toAirport.toLowerCase()}`
        : '';
      const searchHref = routeSlug
        ? `/ve-may-bay/${routeSlug}?date=${getTomorrowISO()}`
        : '/ve-may-bay';

      return {
        key: `${country.slug}-${location.slug}`,
        country,
        location,
        img,
        note: d.note,
        destinationHref: `/diem-den/${country.slug}/${location.slug}`,
        searchHref,
      };
    })
    .filter(Boolean) as Array<{
    key: string;
    country: (typeof COUNTRIES)[number];
    location: (typeof COUNTRIES)[number]['locations'][number];
    img: string;
    note: string;
    destinationHref: string;
    searchHref: string;
  }>;

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image src={heroImage} alt={airport.name} fill className="object-cover opacity-60" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-momo-900/40 to-black/80" />
        </div>

        <div className="container-content relative py-10 sm:py-14">
          <Breadcrumb items={breadcrumbs} light />

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {airport.country} • {airport.city}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                {guide?.title ?? `Sân bay ${airport.name}`}
              </h1>
              <p className="mt-3 text-sm text-white/85 sm:text-base">
                {guide?.description ??
                  `Sân bay ${airport.name} (${airport.code}) tại ${airport.city}, ${airport.country}.`}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
              <p className="text-xs text-white/70">Mã sân bay</p>
              <p className="font-mono text-2xl font-extrabold text-travel-sand">{airport.code}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/ve-may-bay" variant="dark" size="sm">
              Tìm vé máy bay
            </Button>
            <Button href="/ve-may-bay/san-bay" variant="dark" size="sm">
              Xem danh sách sân bay
            </Button>
          </div>
        </div>
      </section>

      <section className="container-content py-10">
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Thông tin nhanh</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">Sân bay</p>
                  <p className="mt-1 font-semibold text-slate-900">{airport.name}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">Thành phố</p>
                  <p className="mt-1 font-semibold text-slate-900">{airport.city}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">Quốc gia</p>
                  <p className="mt-1 font-semibold text-slate-900">{airport.country}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">Mã IATA</p>
                  <p className="mt-1 font-mono font-extrabold text-momo-700">{airport.code}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                Gợi ý điểm đến bay từ {airport.city}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Một số điểm đến nổi bật thường được tìm kiếm khi khởi hành từ {airport.code}. Bạn có thể bấm vào
                “Xem điểm đến” để đọc hướng dẫn chi tiết.
              </p>

              {suggested.length === 0 ? (
                <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  Chưa có gợi ý cho sân bay này. Đang cập nhật thêm.
                </div>
              ) : (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {suggested.map((d) => (
                    <article
                      key={d.key}
                      className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-shadow hover:shadow-card-hover"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={d.img}
                          alt={d.location.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4">
                          <p className="text-xs font-semibold text-white/80">{d.country.name}</p>
                          <h3 className="text-lg font-extrabold text-white">{d.location.name}</h3>
                          <p className="mt-1 text-xs text-white/80">{d.note}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="text-sm">
                            <span className="text-slate-500">Vé bay từ </span>
                            <span className="font-extrabold text-momo-700">
                              {d.location.flightPrice.toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button href={d.destinationHref} variant="secondary" size="xs" icon="arrow">
                              Xem điểm đến
                            </Button>
                            <Button href={d.searchHref} variant="primary" size="xs" icon="arrow">
                              Tìm vé
                            </Button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Mẹo đi sân bay</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {(guide?.tips ?? ['Đến sớm 2 tiếng (nội địa) và 3 tiếng (quốc tế).']).map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-momo-500" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Khám phá thêm</h2>
              <div className="mt-3 space-y-2">
                <Link
                  href="/diem-den"
                  className="block rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Xem tất cả điểm đến →
                </Link>
                <Link
                  href="/ve-may-bay"
                  className="block rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Quay lại tìm vé →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

