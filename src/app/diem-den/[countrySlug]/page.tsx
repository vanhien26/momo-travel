import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { COUNTRIES } from '@/data/destinations';

// Sửa interface
interface PageProps {
  params: { countrySlug: string };
}

// Sửa hàm component
export default function CountryPage({ params }: PageProps) {
  const { countrySlug } = params;
  // Cập nhật các hàm find dữ liệu sử dụng countrySlug thay vì slug
  // ...
}));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const country = COUNTRIES.find((c) => c.slug === params.countrySlug);

    if (!country) {
        return {
            title: 'Không tìm thấy quốc gia | MoMo Travel',
        };
    }

    return {
        title: `Du lịch ${country.name} - Cẩm nang điểm đến | MoMo Travel`,
        description: `Khám phá các địa danh nổi bật tại ${country.name}, đặt vé máy bay, khách sạn và eSIM ngay trên MoMo.`,
        openGraph: {
            title: `Du lịch ${country.name} - MoMo Travel`,
            description: `Khám phá các địa danh nổi bật tại ${country.name} cùng MoMo Travel.`,
            images: [country.heroImage],
        },
    };
}

export default function CountryHubPage({ params }: PageProps) {
    const country = COUNTRIES.find((c) => c.slug === params.countrySlug);
    if (!country) {
        notFound();
    }

    const locations = country.locations;

    return (
        <main className="overflow-x-hidden">
            {/* Breadcrumb */}
            <nav className="bg-[var(--bg-secondary)] border-b border-gray-200 dark:border-gray-800">
                <div className="container-content py-3 text-sm text-[var(--text-secondary)] flex flex-wrap items-center gap-1">
                    <Link href="/" className="hover:text-momo-600 dark:hover:text-momo-400">
                        Trang chủ
                    </Link>
                    <span>/</span>
                    <Link href="/diem-den" className="hover:text-momo-600 dark:hover:text-momo-400">
                        Điểm đến
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-[var(--text-primary)]">{country.name}</span>
                </div>
            </nav>

            {/* Hero quốc gia */}
            <section className="relative min-h-[50vh] flex items-center bg-gray-900 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url('${country.heroImage}')`, backgroundColor: '#1f2937' }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                <div className="relative z-20 container-content max-w-4xl text-center pt-16 pb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm font-semibold mb-4">
                        Hub điểm đến quốc gia
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
                        Du lịch {country.name} với MoMo
                    </h1>
                    <p className="text-lg sm:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
                        {country.description}
                    </p>
                </div>
            </section>

            {/* Grid các địa danh thuộc quốc gia */}
            <section className="bg-[var(--bg-primary)] py-16">
                <div className="container-content">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                                Địa danh nổi bật tại {country.name}
                            </h2>
                            <p className="text-[var(--text-secondary)]">
                                Chọn địa danh để xem chi tiết vé máy bay, khách sạn và gói eSIM phù hợp.
                            </p>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)]">
                            Tổng cộng{' '}
                            <span className="font-semibold text-momo-600 dark:text-momo-400">
                                {locations.length}
                            </span>{' '}
                            địa danh đang được MoMo Travel hỗ trợ.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {locations.map((loc) => (
                            <Link
                                key={loc.slug}
                                href={`/diem-den/${country.slug}/${loc.slug}`}
                                className="group relative flex flex-col rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={loc.image}
                                        alt={loc.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-3 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white mb-1">{loc.name}</h3>
                                        <p className="text-xs text-white/80 line-clamp-1">
                                            {country.name} • Địa danh nổi bật
                                        </p>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col text-left">
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
                                        {loc.description}
                                    </p>
                                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-momo-700 dark:text-momo-400">
                                        Xem chi tiết địa danh
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            aria-hidden="true"
                                            className="transition-transform group-hover:translate-x-1"
                                        >
                                            <path
                                                d="M5 3L9 7L5 11"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

