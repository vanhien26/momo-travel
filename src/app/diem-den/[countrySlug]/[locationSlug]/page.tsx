import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { COUNTRIES } from '@/data/destinations';
import { Button } from '@/components/ui/Button';
import { FAQSection } from '@/components/sections/FAQSection';

interface PageProps {
    params: {
        countrySlug: string;
        locationSlug: string;
    };
}

export function generateStaticParams() {
    return COUNTRIES.flatMap((country) =>
        country.locations.map((loc) => ({
            countrySlug: country.slug,
            locationSlug: loc.slug,
        })),
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const country = COUNTRIES.find((c) => c.slug === params.countrySlug);
    const location = country?.locations.find((l) => l.slug === params.locationSlug);

    if (!country || !location) {
        return {
            title: 'Không tìm thấy địa danh | MoMo Travel',
        };
    }

    return {
        title: `Du lịch ${location.name}, ${country.name} - Giá vé & khách sạn | MoMo Travel`,
        description: `${location.description} Tham khảo giá vé máy bay, khách sạn và eSIM cho chuyến đi ${location.name}.`,
        openGraph: {
            title: `Du lịch ${location.name}, ${country.name} - MoMo Travel`,
            description: `${location.description}`,
            images: [location.image || country.heroImage],
        },
    };
}

export default function LocationDetailPage({ params }: PageProps) {
    const country = COUNTRIES.find((c) => c.slug === params.countrySlug);
    const location = country?.locations.find((l) => l.slug === params.locationSlug);

    if (!country || !location) {
        notFound();
    }

    const breadcrumbs = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Điểm đến', href: '/diem-den' },
        { name: country.name, href: `/diem-den/${country.slug}` },
        { name: location.name, href: `/diem-den/${country.slug}/${location.slug}` },
    ];

    const hasEsim = typeof location.eSimPrice === 'number' && location.eSimPrice >= 0;

    return (
        <main className="overflow-x-hidden">
            {/* Breadcrumb */}
            <nav className="bg-[var(--bg-secondary)] border-b border-gray-200 dark:border-gray-800">
                <div className="container-content py-3 text-sm text-[var(--text-secondary)] flex flex-wrap items-center gap-1">
                    {breadcrumbs.map((item, idx) => (
                        <span key={item.href} className="flex items-center gap-1">
                            {idx < breadcrumbs.length - 1 ? (
                                <Link href={item.href} className="hover:text-momo-600 dark:hover:text-momo-400">
                                    {item.name}
                                </Link>
                            ) : (
                                <span className="font-semibold text-[var(--text-primary)]">{item.name}</span>
                            )}
                            {idx < breadcrumbs.length - 1 && <span>/</span>}
                        </span>
                    ))}
                </div>
            </nav>

            {/* 1. Hero & Intro Section */}
            <section className="relative min-h-[60vh] flex items-center bg-gray-900 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url('${location.image || country.heroImage}')`, backgroundColor: '#e2e8f0' }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                <div className="relative z-20 container-content max-w-4xl text-center pt-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm font-semibold mb-4">
                        {country.name} • Địa danh nổi bật
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
                        {location.name}
                    </h1>
                    <p className="text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
                        {location.description}
                    </p>
                </div>
            </section>

            {/* 2. Bảng tóm tắt giá & MoMo Payment */}
            <section className="bg-white dark:bg-gray-900 py-12 -mt-10 relative z-30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Tổng quan chi phí tại {location.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Tham khảo nhanh giá vé máy bay, khách sạn và eSIM cho chuyến đi {location.name}.
                                </p>
                            </div>
                            {country.supportsMoMoPayment && country.isAsia && (
                                <div className="inline-flex items-center gap-2 rounded-full bg-momo-50 dark:bg-momo-900/40 px-4 py-2 text-xs font-semibold text-momo-700 dark:text-momo-300 border border-momo-100 dark:border-momo-800">
                                    <span>Thanh toán MoMo ✅</span>
                                    <span className="hidden sm:inline">Hỗ trợ tốt tại các đối tác ở {country.name}</span>
                                </div>
                            )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">✈️</span>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Vé máy bay
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Giá thấp nhất một chiều
                                </p>
                                <p className="text-xl font-extrabold text-momo-700">
                                    {location.flightPrice.toLocaleString('vi-VN')}đ
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">🏨</span>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Khách sạn
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Giá trung bình/đêm
                                </p>
                                <p className="text-xl font-extrabold text-momo-700">
                                    {location.hotelPrice.toLocaleString('vi-VN')}đ
                                </p>
                            </div>

                            {hasEsim && (
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">📡</span>
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                            eSIM du lịch
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        {location.eSimPrice === 0 ? 'Khuyến mãi đặc biệt' : 'Giá thấp nhất'}
                                    </p>
                                    <p className="text-xl font-extrabold text-momo-700">
                                        {location.eSimPrice === 0
                                            ? 'Miễn phí'
                                            : `${location.eSimPrice.toLocaleString('vi-VN')}đ`}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CTA đặt vé & khách sạn */}
            <section className="py-12 bg-momo-50/60 dark:bg-gray-900/60">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Sẵn sàng cho chuyến đi {location.name}?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Đặt vé máy bay, phòng khách sạn và eSIM dễ dàng trên MoMo. Tất cả đều hỗ trợ thanh toán
                        nhanh chóng, an toàn chỉ với vài chạm.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button href="/ve-may-bay" variant="primary" size="md">
                            Đặt vé máy bay
                        </Button>
                        <Button
                            href={`/khach-san/${country.slug}/${location.slug}`}
                            className="bg-white text-momo-700 border border-momo-200 px-8 py-3"
                        >
                            Tìm khách sạn
                        </Button>
                        {hasEsim && (
                            <Button href="/esim" variant="secondary" size="md">
                                Mua eSIM du lịch
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* 4. Link ngược về hub quốc gia để tăng internal link */}
            <section className="py-10 bg-[var(--bg-secondary)]">
                <div className="container-content text-center">
                    <p className="text-[var(--text-secondary)] mb-4">
                        Muốn xem thêm nhiều gợi ý khác tại {country.name}?
                    </p>
                    <Button
                        href={`/diem-den/${country.slug}`}
                        className="bg-momo-600 hover:bg-momo-700 text-white font-bold py-3 px-8 rounded-full"
                    >
                        Quay lại hub {country.name}
                    </Button>
                </div>
            </section>

            <FAQSection />
        </main>
    );
}

