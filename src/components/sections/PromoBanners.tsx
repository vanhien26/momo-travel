/* ══════════════════════════════════════════════
 * PROMO BANNERS – Ưu đãi hiện có
 *
 * Grid 3 banner với gradient backgrounds.
 * Mỗi banner có tiêu đề, mô tả ngắn và CTA.
 * ══════════════════════════════════════════════ */

import Link from 'next/link';

const PROMOS = [
    {
        id: 'esim-sale',
        title: 'eSIM Giảm 30%',
        description: 'Áp dụng cho tất cả gói eSIM Nhật Bản, Hàn Quốc, Thái Lan. Kích hoạt tức thì!',
        cta: 'Mua eSIM ngay',
        href: '/esim',
        gradient: 'from-travel-sky via-blue-500 to-travel-ocean',
        icon: '📡',
    },
    {
        id: 'flight-cashback',
        title: 'Hoàn 5% Vé Bay',
        description: 'Đặt vé máy bay qua MoMo, hoàn tiền trực tiếp vào ví. Không giới hạn số lần!',
        cta: 'Đặt vé ngay',
        href: '/ve-may-bay',
        gradient: 'from-momo-600 via-momo-500 to-momo-400',
        icon: '✈️',
    },
    {
        id: 'hotel-deal',
        title: 'Flash Sale Khách Sạn',
        description: 'Giảm đến 50% tại hơn 500 khách sạn 4-5 sao trong tuần này. Số lượng có hạn!',
        cta: 'Xem ưu đãi',
        href: '/khach-san',
        gradient: 'from-travel-sunset via-orange-500 to-amber-500',
        icon: '🏨',
    },
];

export function PromoBanners() {
    return (
        <section
            className="bg-white py-section"
            aria-labelledby="promo-heading"
        >
            <div className="container-content">
                <div className="mx-auto max-w-2xl text-center">
                    <h2
                        id="promo-heading"
                        className="text-section text-balance text-[var(--text-primary)]"
                    >
                        Ưu Đãi Đang Diễn Ra
                    </h2>
                    <p className="mt-4 text-lg text-[var(--text-secondary)]">
                        Săn deal du lịch cực hot — chỉ có trên MoMo!
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {PROMOS.map((promo) => (
                        <Link
                            key={promo.id}
                            href={promo.href}
                            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${promo.gradient} p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                        >
                            {/* Decorative circle */}
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5 blur-xl" aria-hidden="true" />

                            <div className="relative">
                                <span className="text-4xl" aria-hidden="true">{promo.icon}</span>
                                <h3 className="mt-4 text-xl font-bold">
                                    {promo.title}
                                </h3>
                                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                                    {promo.description}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white group-hover:gap-2.5 transition-all">
                                    {promo.cta}
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                                        <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
