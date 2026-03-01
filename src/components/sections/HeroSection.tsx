/* ══════════════════════════════════════════════
 * HERO SECTION – MoMo Travel Hub (Updated with Search)
 * ══════════════════════════════════════════════ */

import { HeroSearch } from './HeroSearch';

interface HeroSectionProps {
  title?: React.ReactNode;
  description?: string;
}

export function HeroSection({
  title = (
    <>
      Du Lịch Châu Á
      <br />
      <span className="bg-gradient-to-r from-travel-sand via-momo-300 to-travel-sky bg-clip-text text-transparent">
        Thanh Toán Thông Minh Cùng MoMo
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
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-travel-sky blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-momo-400 blur-3xl" />
      </div>

      <div className="container-content relative py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* ── H1 – Primary Keyword Target ──── */}
          <h1
            id="hero-heading"
            className="text-hero text-balance text-white leading-tight"
          >
            {title}
          </h1>

          {/* GEO: Answer-First paragraph */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {description}
          </p>

          {/* ── SEARCH BAR (Replaced 2 Buttons) ── */}
          <HeroSearch />

          {/* ── Trust Badges ─────────────────── */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-yellow-400">
                <path d="M9 1L11.5 6L17 6.5L13 10.5L14 16L9 13.5L4 16L5 10.5L1 6.5L6.5 6L9 1Z" fill="currentColor" />
              </svg>
              <span>4.8/5 App Store</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 6H3C2.45 6 2 6.45 2 7V15C2 15.55 2.45 16 3 16H15C15.55 16 16 15.55 16 15V7C16 6.45 15.55 6 15 6ZM9 13C7.34 13 6 11.66 6 10C6 8.34 7.34 7 9 7C10.66 7 12 8.34 12 10C12 11.66 10.66 13 9 13ZM16 3H2C1.45 3 1 3.45 1 4V5H17V4C17 3.45 16.55 3 16 3Z" fill="currentColor" />
              </svg>
              <span>PCI DSS Level 1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}