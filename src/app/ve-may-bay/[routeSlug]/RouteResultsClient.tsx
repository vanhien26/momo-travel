'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';
import { AIRPORTS, getRouteSlug, CABIN_LABELS, type CabinClass } from '@/data/airports';

type MockFlight = {
  id: string;
  airline: string;
  flightNo: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  price: number;
  originalPrice?: number;
  cashbackPercent: number;
};

const MOCK_FLIGHTS: MockFlight[] = [
  { id: '1', airline: 'Vietnam Airlines', flightNo: 'VN 200', departTime: '06:00', arriveTime: '08:15', duration: '2h 15m', stops: 0, price: 1250000, originalPrice: 1490000, cashbackPercent: 5 },
  { id: '2', airline: 'VietJet Air', flightNo: 'VJ 102', departTime: '07:30', arriveTime: '09:50', duration: '2h 20m', stops: 0, price: 890000, originalPrice: 1100000, cashbackPercent: 5 },
  { id: '3', airline: 'Bamboo Airways', flightNo: 'QH 210', departTime: '09:00', arriveTime: '11:10', duration: '2h 10m', stops: 0, price: 1100000, cashbackPercent: 3 },
  { id: '4', airline: 'Vietnam Airlines', flightNo: 'VN 202', departTime: '12:00', arriveTime: '14:20', duration: '2h 20m', stops: 0, price: 1350000, cashbackPercent: 5 },
  { id: '5', airline: 'VietJet Air', flightNo: 'VJ 106', departTime: '15:45', arriveTime: '18:00', duration: '2h 15m', stops: 0, price: 950000, originalPrice: 1150000, cashbackPercent: 5 },
];

function getAirportName(code: string) {
  return AIRPORTS.find((a) => a.code === code)?.city ?? code;
}

function getDefaultDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

type Props = {
  routeSlug: string;
  fromCode: string;
  toCode: string;
};

export function RouteResultsClient({ routeSlug, fromCode, toCode }: Props) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date') ?? getDefaultDate();
  const returnDate = searchParams.get('return') ?? '';
  const adults = searchParams.get('adults') ?? '1';
  const children = searchParams.get('children') ?? '0';
  const infants = searchParams.get('infants') ?? '0';
  const cabin = (searchParams.get('cabin') ?? 'economy') as CabinClass;

  const fromName = getAirportName(fromCode);
  const toName = getAirportName(toCode);
  const isRoundTrip = !!returnDate;
  const reverseSlug = getRouteSlug(toCode, fromCode);

  const buildParams = (overrides: Record<string, string> = {}) => {
    const p = new URLSearchParams(searchParams.toString());
    Object.entries(overrides).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    return p.toString();
  };

  const reverseHref = `/ve-may-bay/${reverseSlug}?${buildParams()}`;

  return (
    <div className="container-content py-6">
      {/* Tóm tắt + đổi chiều */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="rounded-2xl bg-momo-50 p-4">
          <h1 className="text-lg font-bold text-slate-900">
            Chuyến bay {fromName} → {toName}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {date &&
              new Date(date + 'T12:00:00').toLocaleDateString('vi-VN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            {isRoundTrip && returnDate && (
              <>
                {' '}
                · Về:{' '}
                {new Date(returnDate + 'T12:00:00').toLocaleDateString('vi-VN', {
                  day: 'numeric',
                  month: 'short',
                })}
              </>
            )}
            {Number(adults) > 1 && <> · {adults} hành khách</>}
            {cabin && <> · {CABIN_LABELS[cabin] ?? cabin}</>}
          </p>
        </div>
        <Link
          href={reverseHref}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <ArrowRightLeft className="h-4 w-4" />
          Đổi chiều: {toName} → {fromName}
        </Link>
      </div>

      {/* Bộ lọc (giữ params hiện tại, có thể mở rộng thành form đổi ngày/cabin) */}
      <div className="mb-4 flex flex-wrap gap-2">
        {['Tất cả', 'Bay thẳng', 'Giá thấp nhất', 'Cất cánh sớm', 'Cất cánh muộn'].map((label) => (
          <button
            key={label}
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              label === 'Tất cả'
                ? 'bg-momo-500 text-white'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-momo-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Danh sách chuyến bay */}
      <div className="space-y-3">
        {MOCK_FLIGHTS.map((f) => (
          <article
            key={f.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-shadow hover:shadow-card-hover sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <span className="text-lg font-bold text-momo-600">{f.airline.slice(0, 2)}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{f.airline}</p>
                  <p className="text-xs text-slate-500">{f.flightNo}</p>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2 sm:gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900">{f.departTime}</p>
                  <p className="text-xs text-slate-500">{fromCode}</p>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <span className="text-xs text-slate-400">{f.duration}</span>
                  <div className="my-1 h-px w-full bg-slate-200" />
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                    {f.stops === 0 ? 'Bay thẳng' : `${f.stops} điểm dừng`}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900">{f.arriveTime}</p>
                  <p className="text-xs text-slate-500">{toCode}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 p-4 sm:min-w-[180px] sm:border-l sm:border-t-0 sm:justify-end sm:gap-4">
              <div className="text-right">
                {f.originalPrice != null && (
                  <p className="text-xs text-slate-400 line-through">
                    {f.originalPrice.toLocaleString('vi-VN')}đ
                  </p>
                )}
                <p className="text-xl font-extrabold text-momo-700">
                  {f.price.toLocaleString('vi-VN')}đ
                </p>
                {f.cashbackPercent > 0 && (
                  <p className="text-[11px] font-medium text-green-600">
                    Hoàn {f.cashbackPercent}% qua MoMo
                  </p>
                )}
              </div>
              <Link
                href={`/ve-may-bay/${routeSlug}?${buildParams()}`}
                className="inline-flex items-center gap-1 rounded-xl bg-momo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-momo-600"
              >
                Chọn <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Kết quả mẫu. Đặt vé thực tế qua ứng dụng MoMo để so sánh giá từ 50+ hãng bay.
      </p>
    </div>
  );
}
