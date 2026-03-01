/* ══════════════════════════════════════════════
 * CTA BLOCK – Final CTA: Gói Quà 500K
 *
 * Đây là section cuối cùng, mục tiêu chốt hạ:
 * Tải app MoMo → Nhận gói quà 500K
 * Nút CTA có hiệu ứng pulse nổi bật nhất trang.
 * ══════════════════════════════════════════════ */

import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

interface CTABlockProps {
  title?: string;
  description?: string;
}

export function CTABlock({
  title,
  description,
}: CTABlockProps = {}) {
  const isDefault = !title;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-momo-900 via-momo-800 to-momo-950 py-section"
      aria-labelledby="cta-heading"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-15" aria-hidden="true">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-momo-400 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-travel-sand blur-3xl" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-travel-sky blur-3xl" />
      </div>

      <div className="container-content relative text-center">
        {/* Gift icon – only for default 500K variant */}
        {isDefault && (
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-5xl animate-float">
            🎁
          </div>
        )}

        <h2
          id="cta-heading"
          className="text-section text-balance text-white sm:text-4xl"
        >
          {isDefault ? (
            <>
              Tải MoMo Ngay — Nhận Gói Quà{' '}
              <span className="bg-gradient-to-r from-travel-sand via-yellow-300 to-travel-sand bg-clip-text text-transparent">
                500.000đ
              </span>
            </>
          ) : (
            title
          )}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          {description || 'Gói quà bao gồm: Voucher giảm 200K vé máy bay + 150K khách sạn + 100K eSIM + 50K hoàn tiền. Áp dụng cho người dùng mới tải app MoMo.'}
        </p>

        {/* Pulse CTA Button */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            href={SITE_CONFIG.appDeepLink}
            variant="ghost"
            size="lg"
            className="relative bg-white !text-momo-700 shadow-2xl hover:bg-gray-100 hover:scale-105 text-lg px-10 py-5 font-extrabold animate-pulse-glow transition-all"
            ariaLabel={isDefault ? 'Tải MoMo và nhận gói quà 500K' : 'Mở ứng dụng MoMo ngay'}
          >
            {isDefault ? '🎁 Nhận Quà 500K Ngay' : 'Mở App MoMo'}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 4L13.5 10L7.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>

        {/* Store badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            href={SITE_CONFIG.appStoreUrl}
            variant="ghost"
            size="md"
            isExternal
            className="border-2 border-white/30 !text-white hover:bg-white/15 hover:scale-105 transition-all"
            ariaLabel="Tải MoMo từ App Store"
          >
            App Store
          </Button>
          <Button
            href={SITE_CONFIG.playStoreUrl}
            variant="ghost"
            size="md"
            isExternal
            className="border-2 border-white/30 !text-white hover:bg-white/15 hover:scale-105 transition-all"
            ariaLabel="Tải MoMo từ Google Play"
          >
            Google Play
          </Button>
        </div>

        {/* Trust reinforcement */}
        <p className="mt-8 text-sm text-white/40">
          Miễn phí tải & đăng ký · Bảo mật PCI DSS Level 1 · Hỗ trợ 24/7 · Hơn 50 triệu người tin dùng
        </p>
      </div>
    </section>
  );
}
