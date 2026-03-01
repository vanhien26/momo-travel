import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DESTINATION_DETAILS, FEATURED_DESTINATIONS } from '@/data/destinations';
import { Button } from '@/components/ui/Button';
import { FAQSection } from '@/components/sections/FAQSection';

interface PageProps {
    params: {
        slug: string;
    };
}

// 1. Dynamic Metadata for GEO SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const data = DESTINATION_DETAILS[params.slug];

    if (!data) {
        return {
            title: 'Không tìm thấy điểm đến | MoMo Travel',
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

export function generateStaticParams() {
    return FEATURED_DESTINATIONS.map((dest) => ({
        slug: dest.slug,
    }));
}

export default function DestinationDetailPage({ params }: PageProps) {
    const dest = DESTINATION_DETAILS[params.slug];

    if (!dest) {
        notFound();
    }

    return (
        <main className="overflow-x-hidden">
            {/* 1. Hero & Intro Section */}
            <section className="relative min-h-[60vh] flex items-center bg-gray-900 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url('${dest.heroImage}')`, backgroundColor: '#e2e8f0' }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                <div className="relative z-20 container-content max-w-4xl text-center pt-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm font-semibold mb-4">
                        Khám Phá Cùng MoMo
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
                        {dest.name}
                    </h1>
                    <p className="text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
                        {dest.introText}
                    </p>
                </div>
            </section>

            {/* Intro details (Best time & Culture) */}
            <section className="bg-white dark:bg-gray-900 py-12 -mt-10 relative z-30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-8 border border-gray-100 dark:border-gray-700">
                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-2">
                                <span className="text-[#D82D8B]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </span>
                                Thời điểm lý tưởng
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 ml-8">{dest.bestTime}</p>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-2">
                                <span className="text-[#D82D8B]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                </span>
                                Văn hóa địa phương
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 ml-8">{dest.culture}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Cross-Selling: Flights */}
            <section className="py-16 bg-momo-50/50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Vé máy bay đi {dest.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Gợi ý các chuyến bay thẳng phổ biến giá rẻ nhất.
                            </p>
                        </div>
                        <Link href="/ve-may-bay" className="text-[#D82D8B] font-semibold hover:underline flex items-center gap-1">
                            Xem tất cả chặng bay <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dest.flights.map((flight, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{flight.route}</h3>
                                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        {flight.airline}
                                    </span>
                                </div>
                                <div className="flex-1"></div>
                                <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                                    <div>
                                        <span className="text-sm text-gray-500 block">Chỉ từ</span>
                                        <span className="text-2xl font-extrabold text-[#D82D8B]">
                                            {flight.price.toLocaleString('vi-VN')}đ
                                        </span>
                                    </div>
                                    <Button href={`/ve-may-bay`} className="bg-[#D82D8B] hover:bg-[#c6287e] text-white px-6">
                                        Đặt vé
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Cross-Selling: eSIM (Đã canh giữa nội dung) */}
            {dest.esimUrl && (
                <section className="py-10 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> {/* Thêm text-center ở đây */}
                        <div className="bg-[#a50064] rounded-3xl p-8 sm:p-16 overflow-hidden relative shadow-2xl border border-momo-800 flex flex-col items-center justify-center">

                            {/* Họa tiết trang trí chìm */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                                <svg width="600" height="600" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                            </div>

                            <div className="relative z-10 max-w-2xl mx-auto">
                                {/* Nhãn nhỏ phía trên */}
                                <span className="inline-block py-1.5 px-5 rounded-full bg-yellow-400 text-[#731648] text-xs font-black uppercase tracking-widest mb-6 shadow-md">
                                    Sản phẩm nên có cho {dest.name}
                                </span>

                                {/* Tiêu đề chính - Canh giữa */}
                                <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight drop-shadow-md font-display">
                                    Internet không biên giới tại {dest.name}
                                </h2>

                                {/* Đoạn mô tả - mx-auto để căn giữa khối văn bản */}
                                <p className="text-white/90 text-lg sm:text-xl mb-10 mx-auto leading-relaxed font-medium font-body">
                                    Chạm là có mạng. Nhận mã QR eSIM tức thì qua MoMo. Tự động kết nối mạng mạnh nhất tại {dest.name}.
                                </p>

                                {/* Nút bấm - Căn giữa trong Flexbox */}
                                <div className="flex justify-center">
                                    <Button
                                        href={dest.esimUrl}
                                        className="!bg-momo-700 !text-gray-900 font-bold py-4 px-12 text-xl rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 text-center inline-flex justify-center"
                                    >
                                        Mua eSIM {dest.name} ngay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 4. Cross-Selling: Hotels */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Lưu trú tuyệt vời tại {dest.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Các khách sạn được đặt nhiều nhất, vị trí trung tâm, giá ưu đãi.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dest.hotels.map((hotel, idx) => (
                            <div key={idx} className="group flex flex-col rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }} />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold text-gray-900 shadow-sm">
                                        <span className="text-yellow-400">★</span> {hotel.rating}
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col text-left">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{hotel.city}</span>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{hotel.name}</h3>
                                    <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-end">
                                        <div className="text-[#D82D8B] font-extrabold text-xl">
                                            {hotel.price.toLocaleString('vi-VN')}đ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link href="/khach-san" className="inline-flex items-center gap-2 text-[#D82D8B] font-bold hover:underline">
                            Tìm thêm khách sạn <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Lead Generation Banner */}
            <section className="py-10 bg-[var(--bg-secondary)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-momo-100 dark:bg-momo-900/30 rounded-3xl p-8 sm:p-10 border border-momo-200 dark:border-momo-800 text-center flex flex-col items-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-momo-800 dark:text-momo-300 mb-4 max-w-2xl">
                            Tải App MoMo nhận ngay mã giảm giá 100k cho chuyến đi {dest.name}!
                        </h2>
                        <p className="text-gray-700 dark:text-gray-400 mb-8 max-w-xl">
                            Rất nhiều mã khuyến mãi Vé máy bay, Khách sạn và eSIM đang chờ bạn. Chỉ dành cho khách hàng mới tải ứng dụng.
                        </p>
                        <Button href="/" className="bg-momo-600 hover:bg-momo-700 text-white font-bold py-4 px-10 text-lg rounded-full shadow-lg shadow-momo-500/30 hover:-translate-y-1 transition-transform">
                            Tải Ứng Dụng Ngay
                        </Button>
                    </div>
                </div>
            </section>

            {/* 6. Khám phá các điểm đến khác */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
                        Khám phá các điểm đến khác
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {FEATURED_DESTINATIONS.filter(d => d.slug !== dest.slug).slice(0, 6).map((otherDest) => (
                            <Link href={`/diem-den/${otherDest.slug}`} key={otherDest.slug} className="group relative flex flex-col items-center gap-4">
                                <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-sm group-hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800">
                                    <Image
                                        src={otherDest.image}
                                        alt={otherDest.name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                                </div>
                                <h3 className="text-gray-900 dark:text-gray-200 font-bold text-center group-hover:text-[#D82D8B] transition-colors">
                                    {otherDest.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <FAQSection />
        </main>
    );
}
