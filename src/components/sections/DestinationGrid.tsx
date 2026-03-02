/* ══════════════════════════════════════════════
 * DESTINATION GRID – Top 8 Prominent Destinations
 *
 * Hiển thị 4 trong nước + 4 quốc tế dạng Grid 4 cột.
 * Mỗi card: Ảnh, Tên, Micro-table giá, Badge MoMo Pay, CTA.
 * ══════════════════════════════════════════════ */

import Image from 'next/image';
import Link from 'next/link';
import { COUNTRIES } from '@/data/destinations';
import type { Location } from '@/types';

type GridLocation = Location & {
    countrySlug: string;
    countryName: string;
    supportsMoMoPayment: boolean;
};

/* ── Chọn các địa danh nổi bật từ COUNTRIES ─────────────────── */
const GRID_LOCATIONS: GridLocation[] = COUNTRIES.flatMap((country) =>
    country.locations
        .filter((loc) => loc.isPopular)
        .map((loc) => ({
            ...loc,
            countrySlug: country.slug,
            countryName: country.name,
            supportsMoMoPayment: country.supportsMoMoPayment,
        })),
).slice(0, 8);

/* ── Format giá ──────────────────────────────── */
function formatPrice(price: number): string {
    if (price >= 1000000) {
        const millions = price / 1000000;
        return millions % 1 === 0 ? `${millions}tr` : `${millions.toFixed(1)}tr`;
    }
    return `${(price / 1000).toFixed(0)}k`;
}

export function DestinationGrid() {
    return (
        <section
            className="bg-[var(--bg-secondary)] py-section"
            aria-labelledby="destinations-heading"
        >
            <div className="container-content">
                {/* ── Section Header ─────────────────── */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2
                        id="destinations-heading"
                        className="text-section text-balance text-[var(--text-primary)]"
                    >
                        Điểm Đến Nổi Bật
                    </h2>
                    <p className="mt-4 text-lg text-[var(--text-secondary)]">
                        Khám phá bảng giá tổng hợp cho những điểm đến được yêu thích nhất — từ vé bay, eSIM đến khách sạn.
                    </p>
                </div>

                {/* ── Grid 4 cột ─────────────────────── */}
                <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {GRID_LOCATIONS.map((loc) => (
                        <DestinationCard key={`${loc.countrySlug}-${loc.slug}`} destination={loc} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Destination Card ────────────────────────── */
function DestinationCard({ destination }: { destination: GridLocation }) {
    const {
        slug,
        countrySlug,
        countryName,
        name,
        image,
        flightPrice,
        hotelPrice,
        eSimPrice,
        supportsMoMoPayment,
    } = destination;

    return (
        <Link
            href={`/diem-den/${countrySlug}/${slug}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-[var(--bg-primary)] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
        >
            {/* ── Image + Badge ────────────────────── */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={image}
                    alt={`Du lịch ${name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Tên điểm đến */}
                <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                        {name}
                    </h3>
                    <p className="text-xs text-white/80">
                        {countryName}
                    </p>
                </div>

                {/* Badges: MoMo Pay + Ví Trả Sau */}
                {supportsMoMoPayment && (
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                        <span className="flex items-center gap-1 rounded-full bg-momo-700/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg">
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            MoMo Pay
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-momo-700 shadow-lg">
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            Trả Sau
                        </span>
                    </div>
                )}
            </div>

            {/* ── Micro-table (Bảng giá nhỏ) ─────── */}
            <div className="flex-1 p-4">
                <div className="space-y-2">
                    {/* Vé máy bay */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                            <span aria-hidden="true">✈️</span>
                            Vé máy bay
                        </span>
                        <span className="font-semibold text-momo-700">
                            từ {formatPrice(flightPrice)}
                        </span>
                    </div>
                    {/* eSIM */}
                    {typeof eSimPrice === 'number' && eSimPrice > 0 && (
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                                <span aria-hidden="true">📡</span>
                                eSIM
                            </span>
                            <span className="font-semibold text-momo-700">
                                từ {formatPrice(eSimPrice)}
                            </span>
                        </div>
                    )}
                    {/* eSIM miễn phí (giá 0) */}
                    {typeof eSimPrice === 'number' && eSimPrice === 0 && (
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                                <span aria-hidden="true">📡</span>
                                eSIM
                            </span>
                            <span className="font-semibold text-momo-700">
                                Miễn phí
                            </span>
                        </div>
                    )}
                    {/* Khách sạn */}
                    {hotelPrice && (
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                                <span aria-hidden="true">🏨</span>
                                Khách sạn
                            </span>
                            <span className="font-semibold text-momo-700">
                                từ {formatPrice(hotelPrice)}/đêm
                            </span>
                        </div>
                    )}
                </div>

                {/* ── CTA Button ──────────────────────── */}
                <div className="mt-4 pt-3 border-t border-[var(--border-default)]">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 group-hover:text-momo-700 transition-colors">
                        Khám phá ngay
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                            <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}
