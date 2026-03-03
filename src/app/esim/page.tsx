'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ESIM_COUNTRY_LIST } from '@/data/esim-countries';
import { Button, ViTraSauBadge } from '@/components/ui/Button';

const REGIONS = ['Tất cả', 'Đông Nam Á', 'Đông Bắc Á', 'Châu Âu', 'Khác'];

export default function EsimHubPage() {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const filteredCountries = ESIM_COUNTRY_LIST.filter(c =>
    activeFilter === 'Tất cả' || c.region === activeFilter
  );

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-momo-950 via-momo-900 to-momo-800 py-16 sm:py-20 text-center">
        <div className="container-content">
          <h1 className="text-hero text-white">eSIM Du Lịch Quốc Tế</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Vi vu khắp thế giới với Internet tốc độ cao. Mua và kích hoạt ngay trên MoMo chỉ trong 1 phút.
          </p>
          <div className="mt-6 flex justify-center">
            <ViTraSauBadge className="border-white/20 bg-white/10 text-white/70" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Quick Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {REGIONS.map((region) => (
            <button key={region} onClick={() => setActiveFilter(region)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                activeFilter === region
                  ? 'bg-momo-700 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}>
              {region}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, idx) => (
              <Link href={`/esim/${country.slug}`} key={country.id}
                className="group relative flex flex-col rounded-3xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100">
                <div className="aspect-[4/3] w-full relative overflow-hidden">
                  <Image src={country.image} alt={country.name} fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={idx < 6} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {country.region}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-momo-700 transition-colors">
                    {country.name}
                  </h2>
                  <div className="flex-1 mt-6 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Giá chỉ từ</p>
                      <p className="text-momo-700 font-extrabold text-xl">{country.priceFrom.toLocaleString('vi-VN')}đ</p>
                    </div>
                    <Button variant="primary" size="sm">Xem gói cước</Button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy eSIM</h3>
              <p className="text-gray-500">Chưa có dữ liệu cho khu vực &ldquo;{activeFilter}&rdquo;.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
