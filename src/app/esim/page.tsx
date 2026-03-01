'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ESIM_COUNTRY_LIST } from '@/data/esim-countries';

const REGIONS = ['Tất cả', 'Đông Nam Á', 'Đông Bắc Á', 'Châu Âu', 'Khác'];

export default function EsimHubPage() {
    const [activeFilter, setActiveFilter] = useState('Tất cả');

    const filteredCountries = ESIM_COUNTRY_LIST.filter(country =>
        activeFilter === 'Tất cả' || country.region === activeFilter
    );

    return (
        <main className="min-h-screen bg-[var(--bg-secondary)] overflow-x-hidden pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-4 tracking-tight">
                        eSIM Du lịch Quốc Tế
                    </h1>
                    <p className="text-lg text-[var(--text-secondary)]">
                        Vi vu khắp thế giới với Internet tốc độ cao. Mua và kích hoạt ngay trên MoMo chỉ trong 1 phút, không cần tháo lắp SIM vật lý.
                    </p>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                    {REGIONS.map((region) => (
                        <button
                            key={region}
                            onClick={() => setActiveFilter(region)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeFilter === region
                                    ? 'bg-momo-500 text-white shadow-md shadow-momo-500/20'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {region}
                        </button>
                    ))}
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, idx) => (
                            <Link
                                href={`/esim/${country.slug}`}
                                key={country.id}
                                className="group relative flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                            >
                                {/* Image Handle */}
                                <div className="aspect-[4/3] w-full relative overflow-hidden bg-gray-100">
                                    <Image
                                        src={country.image}
                                        alt={country.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        priority={idx < 6}
                                    />
                                    {/* Subtle Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                                    {/* Region Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        {country.region}
                                    </div>
                                </div>

                                {/* Content Handle */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-momo-600 dark:group-hover:text-momo-400 transition-colors">
                                        {country.name}
                                    </h2>
                                    <div className="flex-1 mt-6 flex items-end justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Giá chỉ từ</p>
                                            <p className="text-momo-600 dark:text-momo-400 font-extrabold text-xl">
                                                {country.priceFrom.toLocaleString('vi-VN')}đ
                                            </p>
                                        </div>
                                        <button className="bg-momo-500 group-hover:bg-momo-600 active:scale-95 text-white font-bold py-2.5 px-6 rounded-full text-sm transition-all shadow-sm">
                                            Xem gói cước
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Không tìm thấy eSIM</h3>
                            <p className="text-gray-500">Chưa có dữ liệu eSIM cho khu vực "{activeFilter}". Vui lòng chọn khu vực khác.</p>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
