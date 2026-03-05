import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  parseRouteSlug,
  getAirportByCode,
  getRouteSlug,
  FLIGHT_ROUTE_SLUGS,
} from '@/data/airports';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { RouteResultsClient } from './RouteResultsClient';

type Props = {
  params: Promise<{ routeSlug: string }>;
};

export function generateStaticParams() {
  return FLIGHT_ROUTE_SLUGS.map((routeSlug) => ({ routeSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { routeSlug } = await params;
  const parsed = parseRouteSlug(routeSlug);
  if (!parsed) return { title: 'Tuyến bay | Vé máy bay MoMo' };

  const fromAirport = getAirportByCode(parsed.from);
  const toAirport = getAirportByCode(parsed.to);
  if (!fromAirport || !toAirport) return { title: 'Tuyến bay | Vé máy bay MoMo' };

  const title = `Vé máy bay ${fromAirport.city} → ${toAirport.city} (${parsed.from} - ${parsed.to}) | MoMo`;
  const description = `So sánh giá vé máy bay từ ${fromAirport.name} (${parsed.from}) đến ${toAirport.name} (${parsed.to}). Đặt vé nhanh, thanh toán MoMo, hoàn tiền đến 5%.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function FlightRoutePage({ params }: Props) {
  const { routeSlug } = await params;
  const parsed = parseRouteSlug(routeSlug);
  if (!parsed) notFound();

  const fromAirport = getAirportByCode(parsed.from);
  const toAirport = getAirportByCode(parsed.to);
  if (!fromAirport || !toAirport) notFound();

  const reverseSlug = getRouteSlug(parsed.to, parsed.from);
  const breadcrumbs = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Vé máy bay', href: '/ve-may-bay' },
    { name: `${fromAirport.code} - ${toAirport.code}`, href: `/ve-may-bay/${routeSlug}` },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero: tuyến + link 2 sân bay */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-content py-6">
          <Breadcrumb items={breadcrumbs} />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Vé máy bay {fromAirport.city} → {toAirport.city}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {fromAirport.name} ({fromAirport.code}) · {toAirport.name} ({toAirport.code})
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                href={`/ve-may-bay/san-bay/${fromAirport.code}`}
                variant="secondary"
                size="sm"
              >
                Sân bay {fromAirport.code}
              </Button>
              <Button
                href={`/ve-may-bay/san-bay/${toAirport.code}`}
                variant="secondary"
                size="sm"
              >
                Sân bay {toAirport.code}
              </Button>
              <Button href={`/ve-may-bay/${reverseSlug}`} variant="ghost" size="sm">
                Đổi chiều
              </Button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/ve-may-bay"
              className="inline-flex items-center rounded-xl bg-momo-50 px-4 py-2 text-sm font-semibold text-momo-700 hover:bg-momo-100"
            >
              ← Thay đổi tìm kiếm
            </Link>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="container-content py-10">
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <p className="text-sm text-slate-600">Đang tải kết quả…</p>
            </div>
          </div>
        }
      >
        <RouteResultsClient
          routeSlug={routeSlug}
          fromCode={parsed.from}
          toCode={parsed.to}
        />
      </Suspense>
    </main>
  );
}
