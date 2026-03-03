/* ══════════════════════════════════════════════
 * CTA BLOCK – Final CTA: Gói Quà 500K
 * Uses unified Button brand system
 * ══════════════════════════════════════════════ */

import { Button, ViTraSauBadge } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

interface CTABlockProps {
  title?: string;
  description?: string;
}

export function CTABlock({ title, description }: CTABlockProps = {}) {
  const isDefault = !title;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-momo-900 via-momo-800 to-momo-950 py-section"
      aria-labelledby="cta-heading"
    >
      {/* Decorative */}
      <div className="absolute inset-0 opacity-15" aria-hidden="true">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-momo-400 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-travel-sand blur-3xl" />
      </div>

      <div className="container-content relative text-center">
        {isDefault && (
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-5xl animate-float">
            🎁
          </div>
        )}

        <h2 id="cta-heading" className="text-section text-balance text-white sm:text-4xl">
          {isDefault ? (
            <>
              Tải MoMo Ngay — Nhận Gói Quà{' '}
              <span className="bg-gradient-to-r from-travel-sand via-yellow-300 to-travel-sand bg-clip-text text-transparent">
                500.000đ
              </span>
            </>
          ) : title}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          {description || 'Gói quà bao gồm: Voucher giảm 200K vé máy bay + 150K khách sạn + 100K eSIM + 50K hoàn tiền. Áp dụng cho người dùng mới tải app MoMo.'}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            href={SITE_CONFIG.appDeepLink}
            variant="dark"
            size="lg"
            className="animate-pulse-glow text-lg px-10 py-5 font-extrabold"
            ariaLabel={isDefault ? 'Tải MoMo và nhận gói quà 500K' : 'Mở ứng dụng MoMo ngay'}
          >
            {isDefault ? '🎁 Nhận Quà 500K Ngay' : 'Mở App MoMo'}
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button href={SITE_CONFIG.appStoreUrl} variant="ghost" size="xs" icon="none"
            className="text-white/60 hover:text-white hover:bg-white/10" isExternal>
            App Store
          </Button>
          <Button href={SITE_CONFIG.playStoreUrl} variant="ghost" size="xs" icon="none"
            className="text-white/60 hover:text-white hover:bg-white/10" isExternal>
            Google Play
          </Button>
          <ViTraSauBadge className="border-white/20 bg-white/10 text-white/70" />
        </div>
      </div>
    </section>
  );
}
