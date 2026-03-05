/* ══════════════════════════════════════════════
 * HERO SECTION – MoMo Travel Hub v2
 * Fix: Mobile spacing, Badge Ví Trả Sau in trust bar
 * ══════════════════════════════════════════════ */

import { HeroSearch } from './HeroSearch';

interface HeroSectionProps {
  title?: React.ReactNode;
  description?: string;
}

export function HeroSection({
  title = (
    <>
      Du Lịch{" "}
      <span className="bg-gradient-to-r from-travel-sand via-momo-300 to-travel-sky bg-clip-text text-transparent">
        cùng MoMo
      </span>
    </>
  ),
  description = "MoMo giúp bạn đặt SIM du lịch quốc tế, vé máy bay, khách sạn và thanh toán tại hàng triệu điểm bán khắp châu Á — tất cả trong một ứng dụng duy nhất. eSIM kích hoạt trong 60 giây, hoàn tiền đến 5%.",
}: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-momo-950 via-momo-900 to-momo-800"
      aria-labelledby="hero-heading"
    >
      {/* Decorative blurs */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-travel-sky blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-momo-400 blur-3xl" />
      </div>

      <div className="container-content relative py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            id="hero-heading"
            className="text-hero text-balance text-white leading-tight"
          >
            {title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg sm:mt-6">
            {description}
          </p>

          {/* Search Bar */}
          <HeroSearch />

          {/* ── Trust Badges + Ví Trả Sau ──── */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-sm text-white/50">
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="text-yellow-400">
                <path d="M9 1L11.5 6L17 6.5L13 10.5L14 16L9 13.5L4 16L5 10.5L1 6.5L6.5 6L9 1Z" fill="currentColor" />
              </svg>
              <span>4.8/5 App Store</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/50">
                <path d="M8 1a3 3 0 013 3v2H5V4a3 3 0 013-3zM4 6h8a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" fill="currentColor" />
              </svg>
              <span>PCI DSS Level 1</span>
            </div>
            {/* Badge Ví Trả Sau */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-travel-sand" aria-hidden="true">
                <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="text-xs font-medium text-white/70">Ví Trả Sau 0%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
