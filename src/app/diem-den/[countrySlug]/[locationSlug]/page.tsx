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

// Cố định tham số để Next.js build Static Pages chính xác
export function generateStaticParams() {
    return COUNTRIES.flatMap((country) =>
        country.locations.map((loc) => ({
            countrySlug: country.slug,
            locationSlug: loc.slug,
        })),
    );
}

// Tối ưu SEO cho từng địa danh
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { countrySlug, locationSlug } = params;
    const country = COUNTRIES.find((c) => c.slug === countrySlug);
    const location = country?.locations.find((l) => l.slug === locationSlug);

    if (!country || !location) {
        return {
            title: 'Không tìm thấy địa danh | MoMo Travel',
        };
    }

    return {
        title: `Du lịch ${location.name}, ${country.name} - Giá vé & khách sạn | MoMo Travel`,
        description: `${location.description} Tham khảo giá vé máy bay từ ${location.flightPrice.toLocaleString('vi-VN')}đ, khách sạn và eSIM cho chuyến đi ${location.name} tại MoMo.`,
        openGraph: {
            title: `Kinh nghiệm du lịch ${location.name} tự túc - MoMo Travel`,
            description: location.description,
            images: [location.image || country.heroImage],
        },
    };
}

export default function LocationDetailPage({ params }: PageProps) {
    const { countrySlug, locationSlug } = params;
    const country = COUNTRIES.find((c) => c.slug === countrySlug);
    const location = country?.locations.find((l) => l.slug === locationSlug);

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
        <main className="overflow-x-hidden bg-white dark:bg-gray-950">
            {/* Breadcrumb - Tối ưu SEO Silo */}
            <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-3 text-sm text-gray-600 dark:text-gray-400 flex flex-wrap items-center gap-1">
                    {breadcrumbs.map((item, idx) => (
                        <span key={item.href} className="flex items-center gap-1">
                            {idx < breadcrumbs.length - 1 ? (
                                <Link href={item.href} className="hover:text-momo-600 transition-colors">
                                    {item.name}
                                </Link>
                            ) : (
                                <span className="font-semibold text-gray-900 dark:text-white">{item.name}</span>
                            )}
                            {idx < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
                        </span>
                    ))}
                </div>
            </nav>

            {/* 1. Hero Section - Antigravity Design */}
            <section className="relative min-h-[50vh] flex items-center bg-gray-900 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-60 scale-105"
                    style={{ backgroundImage: `url('${location.image}')` }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent" />

                <div className="relative z-20 container mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-4 rounded-full bg-momo-600 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
                        Khám phá {country.name}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        {location.name}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        {location.description}
                    </p>
                </div>
            </section>

            {/* 2. Quick Info Card - Tổng quan chi phí */}
            <section className="relative z-30 -mt-16 pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Chi phí tham khảo tại {location.name}
                                </h2>
                                <p className="text-gray-500 text-sm mt-1">Cập nhật giá vé & dịch vụ mới nhất từ MoMo</p>
                            </div>
                            {country.supportsMoMoPayment && (
                                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-2xl border border-green-100 dark:border-green-800 text-sm font-bold">
                                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Thanh toán MoMo ✅
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Flight */}
                            <div className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-momo-200 transition-all shadow-sm">
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">✈️</div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase">Vé máy bay</h3>
                                <p className="text-2xl font-black text-momo-600 mt-2">
                                    {location.flightPrice.toLocaleString('vi-VN')}đ
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Giá từ 1 chiều</p>
                            </div>

                            {/* Hotel */}
                            <div className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-momo-200 transition-all shadow-sm">
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">🏨</div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase">Khách sạn</h3>
                                <p className="text-2xl font-black text-momo-600 mt-2">
                                    {location.hotelPrice.toLocaleString('vi-VN')}đ
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Trung bình/đêm</p>
                            </div>

                            {/* eSIM */}
                            <div className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-momo-200 transition-all shadow-sm">
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">📡</div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase">eSIM Du lịch</h3>
                                <p className="text-2xl font-black text-momo-600 mt-2">
                                    {location.eSimPrice === 0 ? 'Miễn phí' : `${location.eSimPrice.toLocaleString('vi-VN')}đ`}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">{location.eSimPrice === 0 ? 'Quà tặng MoMo' : 'Nhận mã ngay'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Conversion Section - Combo Tiết Kiệm */}
            <section className="py-16 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Bắt đầu hành trình {location.name} của bạn</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-10">
                        Đặt trọn gói dịch vụ trên MoMo để nhận ưu đãi cộng dồn và quản lý hành trình dễ dàng hơn.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Button href="/ve-may-bay" className="w-full h-14 rounded-2xl font-bold bg-momo-600 hover:bg-momo-700 text-white transition-all shadow-lg">
                            Đặt vé máy bay
                        </Button>
                        <Button href={`/khach-san/${country.slug}/${location.slug}`} className="w-full h-14 rounded-2xl font-bold bg-white text-black border-2 border-black hover:bg-gray-50 transition-all">
                            Tìm khách sạn
                        </Button>
                        {hasEsim && (
                            <Button href={`/esim/${country.slug}`} className="w-full h-14 rounded-2xl font-bold bg-momo-100 text-momo-700 border border-momo-200 hover:bg-momo-200 transition-all">
                                Mua eSIM {country.name}
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* 4. Cross-linking - Quay lại hub quốc gia */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-500 mb-6">Bạn muốn khám phá thêm các địa danh khác?</p>
                    <Link 
                        href={`/diem-den/${country.slug}`}
                        className="inline-flex items-center gap-2 font-bold text-momo-600 hover:underline"
                    >
                        ← Xem tất cả điểm đến tại {country.name}
                    </Link>
                </div>
            </section>

            <FAQSection />
        </main>
    );
}
