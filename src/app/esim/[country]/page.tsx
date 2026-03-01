import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ESIM_COUNTRIES } from '@/data/esim-countries';
import { Button } from '@/components/ui/Button';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABlock } from '@/components/sections/CTABlock';
import { EsimClientView } from './EsimClientView';

interface PageProps {
    params: {
        country: string;
    };
}

// 1. Dynamic Metadata for GEO SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const data = ESIM_COUNTRIES[params.country];

    if (!data) {
        return {
            title: 'Không tìm thấy quốc gia | MoMo Travel',
        };
    }

    return {
        title: data.seoTitle,
        description: data.seoDescription,
        openGraph: {
            title: data.seoTitle,
            description: data.seoDescription,
            images: [data.heroImage],
        }
    };
}

// 2. Static Generation config (optional)
export function generateStaticParams() {
    return Object.keys(ESIM_COUNTRIES).map((country) => ({
        country,
    }));
}

export default function CountryEsimPage({ params }: PageProps) {
    const country = ESIM_COUNTRIES[params.country];

    if (!country) {
        notFound();
    }

    return (
        <main className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-momo-950 via-momo-900 to-momo-800 py-16 sm:py-20 lg:py-28">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-travel-sky blur-3xl" />
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-momo-400 blur-3xl" />
                </div>

                <div className="container-content relative text-center">
                    <span className="mb-4 inline-block text-6xl" aria-hidden="true">{country.flagIcon}</span>
                    <h1 className="text-hero text-balance text-white">
                        eSIM {country.name}
                        <br />
                        <span className="bg-gradient-to-r from-travel-sand via-momo-300 to-travel-sky bg-clip-text text-transparent">
                            Chạm Là Có Mạng
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
                        {country.seoDescription}
                    </p>
                </div>
            </section>

            {/* Pricing Table Section - Client Component with State & Interactivity */}
            <section className="bg-[var(--bg-secondary)] py-section">
                <EsimClientView country={country} countrySlug={params.country} />
            </section>

            {/* SEO Content: Why Choose MoMo eSIM */}
            <section className="bg-[var(--bg-primary)] py-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                        Vì Sao Nên Mua eSIM {country.name} Trên MoMo?
                    </h2>
                    <div className="prose prose-momo dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                            {country.whyChooseContent}
                        </p>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="bg-[var(--bg-secondary)] py-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <h2 className="text-center text-section text-[var(--text-primary)] mb-10">
                        So Sánh Nhanh: Mua Trên MoMo vs Sân Bay
                    </h2>

                    <div className="overflow-x-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-momo-50 dark:bg-momo-900/30">
                                    <th className="p-4 font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] w-1/3">Tiêu Trí</th>
                                    <th className="p-4 font-bold text-momo-700 dark:text-momo-400 border-b border-[var(--border-default)] w-1/3">eSIM Trên MoMo</th>
                                    <th className="p-4 font-semibold text-[var(--text-secondary)] border-b border-[var(--border-default)] w-1/3">SIM Sân Bay</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-default)]">
                                <tr>
                                    <td className="p-4 text-[var(--text-secondary)]">Thời gian kích hoạt</td>
                                    <td className="p-4 text-[var(--text-primary)] font-medium">60 giây (Nhận QR liền tay)</td>
                                    <td className="p-4 text-[var(--text-muted)]">Chờ 15-30 phút tháo lắp, cấu hình</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-[var(--text-secondary)]">Tiện lợi</td>
                                    <td className="p-4 text-[var(--text-primary)] font-medium">Nằm nhà mua sẵn, không thẻ tháo cứng</td>
                                    <td className="p-4 text-[var(--text-muted)]">Phải xếp hàng tại quầy ở sân bay nước bạn</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-[var(--text-secondary)]">Giữ liên lạc</td>
                                    <td className="p-4 text-[var(--text-primary)] font-medium">Song song nhận SMS từ SIM gốc (OTP Bank)</td>
                                    <td className="p-4 text-[var(--text-muted)]">Bị mất rớt SIM gốc gốc, không nhận mã OTP</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-[var(--text-secondary)]">Chi Phí (Tham khảo)</td>
                                    <td className="p-4 text-momo-600 font-bold">Từ ~89.000đ (Cam kết rẻ nhất)</td>
                                    <td className="p-4 text-[var(--text-muted)]">Tối thiểu ~150.000đ - 250.000đ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA & FAQ */}
            <FAQSection />

            <CTABlock
                title={`Sẵn Sàng Mở Mạng Tại ${country.name}?`}
                description="Mở app MoMo quét QR kích hoạt eSIM ngay để bắt đầu hành trình khám phá không độ trễ."
            />
        </main>
    );
}
