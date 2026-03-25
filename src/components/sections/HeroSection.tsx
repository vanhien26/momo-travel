'use client'

import Link from 'next/link'
import { ArrowRight, Star, Shield } from 'lucide-react'
import { DestinationSearch } from '@/components/search/DestinationSearch'
import { destinations } from '@/data/destinations'

const popularDestinations = destinations.filter((d) => d.popular).slice(0, 6)

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-hero-gradient overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-momo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-12">
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white/80 text-xs font-medium">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              4.8/5 App Store
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white/80 text-xs font-medium">
              <Shield size={12} className="text-green-400" />
              PCI DSS Level 1
            </span>
            <span className="bg-orange-500/20 border border-orange-500/40 px-3 py-1.5 rounded-full text-orange-300 text-xs font-medium">
              Ví Trả Sau – 0% lãi suất
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Bạn muốn{' '}
            <span className="bg-gradient-to-r from-momo-300 to-orange-400 bg-clip-text text-transparent">
              đi đâu?
            </span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Chọn điểm đến, MoMo lo hết phần còn lại — vé máy bay, khách sạn, eSIM và hơn thế nữa.
          </p>
        </div>

        {/* Search box */}
        <DestinationSearch />

        {/* Quick-pick pills */}
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap max-w-2xl mx-auto">
          <span className="text-xs text-white/50">Phổ biến:</span>
          {popularDestinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/diem-den/${dest.country}/${dest.slug}`}
              className="text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
            >
              {dest.name}
            </Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/diem-den"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            Khám phá tất cả điểm đến
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
