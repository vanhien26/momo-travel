'use client';

import { useState, useEffect } from 'react';
import type { EsimCountry, EsimPackage } from '@/data/esim-countries';
import { Button } from '@/components/ui/Button';

interface EsimClientViewProps {
    country: EsimCountry;
    countrySlug: string;
}

export function EsimClientView({ country, countrySlug }: EsimClientViewProps) {
    const [selectedPackage, setSelectedPackage] = useState<EsimPackage | null>(null);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-12 pt-16">
                    <h2 className="text-section text-balance text-[var(--text-primary)]">
                        Chọn Gói Data Phù Hợp
                    </h2>
                    <p className="mt-4 text-lg text-[var(--text-secondary)]">
                        Đa dạng gói cước 3 ngày, 5 ngày, 7 ngày cho chuyến đi của bạn.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-16">
                    {country.packages.map((pkg) => (
                        <article
                            key={pkg.id}
                            onClick={() => setSelectedPackage(pkg)}
                            className={`relative flex flex-col rounded-2xl bg-[var(--bg-primary)] p-6 shadow-card transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl ${pkg.isBestSeller ? 'ring-2 ring-yellow-400' : 'border border-[var(--border-default)]'
                                } ${selectedPackage?.id === pkg.id ? 'ring-2 ring-momo-500 bg-momo-50/50 dark:bg-momo-900/20' : ''}`}
                        >
                            {pkg.isBestSeller && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black shadow-sm">
                                    🔥 Bán chạy nhất
                                </div>
                            )}

                            <div className="mb-4 pb-4 border-b border-[var(--border-default)] text-center">
                                <h3 className="text-xl font-bold text-[var(--text-primary)]">{pkg.days} Ngày</h3>
                                <p className="text-[var(--text-secondary)] mt-1">{pkg.dataPerDay}</p>
                            </div>

                            <div className="flex-1 text-center flex flex-col justify-center">
                                {pkg.originalPrice && (
                                    <p className="text-sm text-[var(--text-muted)] line-through mb-1">
                                        {pkg.originalPrice.toLocaleString('vi-VN')}đ
                                    </p>
                                )}
                                <p className="text-3xl font-extrabold text-momo-600 dark:text-momo-400">
                                    {pkg.price.toLocaleString('vi-VN')}đ
                                </p>
                            </div>

                            {selectedPackage?.id === pkg.id && (
                                <div className="absolute top-4 right-4 text-momo-500">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div
                className={`fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 transition-transform duration-300 ease-in-out border-t border-gray-100 dark:border-gray-800 ${selectedPackage ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <div className="font-bold text-gray-900 dark:text-white lg:text-lg">
                            {selectedPackage?.days} Ngày - {selectedPackage?.dataPerDay}
                        </div>
                        <div className="text-momo-600 dark:text-momo-400 font-extrabold text-xl lg:text-2xl">
                            {selectedPackage?.price.toLocaleString('vi-VN')}đ
                        </div>
                    </div>
                    <Button
                        href={`/esim/${countrySlug}/${selectedPackage?.id}`}
                        variant="primary"
                        size="lg"
                        ariaLabel={`Mua ngay gói ${selectedPackage?.days} ngày`}
                    >
                        Thanh toán ngay
                    </Button>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className={`fixed right-4 z-50 p-3 rounded-full bg-momo-500 text-white shadow-lg transition-all duration-300 hover:bg-momo-600 focus:outline-none focus:ring-2 focus:ring-momo-500 focus:ring-offset-2 ${showBackToTop
                    ? `opacity-100 pointer-events-auto ${selectedPackage ? 'bottom-24' : 'bottom-6'}`
                    : 'opacity-0 pointer-events-none bottom-0'
                    }`}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
            </button>
        </>
    );
}
