'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { COUNTRIES, POPULAR_SEARCH_TERMS } from '@/data/destinations';
import { Button } from '@/components/ui/Button';

export default function DestinationHubPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    const filteredSuggestions = POPULAR_SEARCH_TERMS.filter((term) =>
        term.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const slugify = (value: string) =>
        value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/đ/g, 'd');

    const navigateBySearchSlug = (raw: string) => {
        const slug = slugify(raw);

        const allLocations = COUNTRIES.flatMap((country) =>
            country.locations.map((loc) => ({
                ...loc,
                countrySlug: country.slug,
            })),
        );

        // 1. Ưu tiên khớp Quốc gia
        const country = COUNTRIES.find((c) => c.slug === slug);
        if (country) {
            router.push(`/diem-den/${country.slug}`);
            return;
        }

        // 2. Nếu không phải quốc gia: tìm Địa danh và build URL lồng nhau
        const location = allLocations.find((loc) => loc.slug === slug);
        if (location) {
            router.push(`/diem-den/${location.countrySlug}/${location.slug}`);
            return;
        }

        // Fallback: vẫn đẩy về slug phẳng (legacy)
        router.push(`/diem-den/${slug}`);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigateBySearchSlug(searchQuery);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <main className="overflow-x-hidden">
            {/* 1. Hero Section & Search Bar */}
            <section className="relative flex min-h-[500px] flex-col items-center justify-center bg-gray-900 overflow-hidden py-24">
                {/* Background Image Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                <div className="relative z-20 container-content max-w-4xl text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
                        Khám phá điểm đến theo <span className="text-momo-400">Quốc Gia</span>
                    </h1>
                    <p className="text-xl text-white/90 mb-10 drop-shadow-md max-w-2xl mx-auto">
                        Chọn quốc gia bạn muốn đến, sau đó khám phá các địa danh nổi bật như Đà Lạt, Sapa, Tokyo, Bangkok…
                    </p>

                    <div className="relative max-w-2xl mx-auto w-full" ref={searchRef}>
                        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full bg-white rounded-full shadow-2xl overflow-hidden focus-within:ring-4 focus-within:ring-momo-500/30 transition-all">
                            <div className="pl-6 text-gray-400">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="w-full flex-1 appearance-none bg-transparent px-4 py-5 text-lg text-gray-900 placeholder-gray-500 focus:outline-none"
                                placeholder="Bạn muốn đi đâu? (VD: Việt Nam, Đà Lạt, Thái Lan)"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                            />
                            <button
                                type="submit"
                                className="bg-momo-700 hover:bg-momo-600 text-white px-8 py-5 h-full font-bold transition-colors"
                            >
                                Tìm kiếm
                            </button>
                        </form>

                        {/* Auto-complete Suggestions */}
                        {showSuggestions && searchQuery.length > 0 && filteredSuggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-4 duration-200">
                                <ul className="py-2">
                                    {filteredSuggestions.map((term, idx) => (
                                        <li key={idx}>
                                            <button
                                                type="button"
                                                className="w-full text-left px-6 py-3 hover:bg-momo-50 hover:text-momo-600 transition-colors text-gray-700 flex items-center gap-3"
                                                onClick={() => {
                                                    setSearchQuery(term);
                                                    setShowSuggestions(false);
                                                    navigateBySearchSlug(term);
                                                }}
                                            >
                                                <svg className="text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg>
                                                {term}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 2. Danh sách Quốc gia */}
            <section className="py-20 bg-[var(--bg-primary)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Chọn Quốc Gia Bạn Muốn Đến</h2>
                        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                            Mỗi quốc gia là một hub tổng hợp mọi địa danh nổi bật, vé máy bay, khách sạn và eSIM tương ứng.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {COUNTRIES.map((country) => {
                            const locations = country.locations;
                            return (
                                <Link
                                    key={country.slug}
                                    href={`/diem-den/${country.slug}`}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
                                >
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={country.heroImage}
                                            alt={country.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-2xl font-bold text-white mb-1">{country.name}</h3>
                                            <p className="text-sm text-white/80">
                                                {locations.length} địa danh nổi bật
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col text-left">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                                            {country.description}
                                        </p>
                                        {locations.length > 0 && (
                                            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-1">
                                                <span className="font-semibold mr-1">Địa danh nổi bật:</span>
                                                {locations.slice(0, 3).map((loc) => (
                                                    <span
                                                        key={loc.slug}
                                                        className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5"
                                                    >
                                                        {loc.name}
                                                    </span>
                                                ))}
                                                {locations.length > 3 && (
                                                    <span className="ml-1 text-xs text-momo-600 dark:text-momo-400">
                                                        +{locations.length - 3} địa danh khác
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. MoMo USPs Section */}
            <section className="bg-momo-50 dark:bg-momo-900/20 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Travel USP */}
                        <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-lg border border-momo-100 dark:border-momo-900">
                            <div className="w-14 h-14 bg-momo-100 dark:bg-momo-900/50 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="text-momo-600 dark:text-momo-400" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vì sao chọn MoMo Travel?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 text-green-500">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Dịch vụ All-in-One</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Từ vé máy bay, phòng khách sạn, vé xe khách đến eSIM du lịch quốc tế.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 text-green-500">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Giá luôn tốt nhất</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Hàng ngàn deal độc quyền, flash sale hằng tuần giúp tiết kiệm tối đa.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 text-green-500">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Hỗ trợ 24/7 nhiệt tình</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Đội ngũ chăm sóc khách hàng MoMo luôn đồng hành cùng bạn trên mọi nẻo đường.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* MoMo Super App USP */}
                        <div className="bg-gradient-to-br from-momo-600 to-momo-800 p-8 sm:p-10 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
                            <div className="relative z-10 w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="text-white" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                                    <line x1="2" y1="10" x2="22" y2="10"></line>
                                </svg>
                            </div>
                            <h3 className="relative z-10 text-2xl font-bold text-white mb-4">Siêu tiện ích trên 1 Ứng dụng</h3>
                            <ul className="relative z-10 space-y-4">
                                <li className="flex items-start gap-3 text-white/90">
                                    <div className="mt-1 text-momo-300">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Thanh toán 1 chạm an toàn</h4>
                                        <p className="text-white/70 text-sm mt-1">Không qua trung gian. Liên kết trực tiếp nguồn tiền MoMo/Thẻ ngân hàng.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-white/90">
                                    <div className="mt-1 text-momo-300">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Mua trước trả sau siêu hời</h4>
                                        <p className="text-white/70 text-sm mt-1">Hỗ trợ trả góp Vé máy bay, Khách sạn qua Ví Trả Sau linh hoạt 0% lãi suất.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-white/90">
                                    <div className="mt-1 text-momo-300">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Khách hàng Kim Cương</h4>
                                        <p className="text-white/70 text-sm mt-1">Tích điểm đổi ngàn quà tặng hấp dẫn cùng hệ sinh thái siêu ứng dụng số 1 Việt Nam.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
