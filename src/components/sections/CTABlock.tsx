/* ══════════════════════════════════════════════
 * CTA BLOCK – Conversion Section
 *
 * Mô hình chuyển đổi:
 * Web → App Download/Open (PLG strategy)
 *
 * Design:
 * - Gradient background (MoMo brand)
 * - Dual CTA: App Store + Google Play
 * - Urgency element (offer/benefit statement)
 * ══════════════════════════════════════════════ */

import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

interface CTABlockProps {
  title?: string;
  description?: string;
}

export function CTABlock({
  title = "Sẵn Sàng Cho Chuyến Đi Tiếp Theo?",
  description = "Tải MoMo ngay để nhận ưu đãi hoàn tiền 5% cho lần đặt dịch vụ du lịch đầu tiên. Hơn 50 triệu người Việt đã tin dùng.",
}: CTABlockProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-momo-800 via-momo-700 to-momo-900 py-section"
      aria-labelledby="cta-heading"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-travel-sand blur-3xl" />
      </div>

      <div className="container-content relative text-center">
        <h2
          id="cta-heading"
          className="text-section text-balance text-white"
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          {description}
        </p>

        {/* Dual CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Button
            href={SITE_CONFIG.appDeepLink}
            size="lg"
            className="bg-white text-momo-700 shadow-lg hover:bg-white/90"
            ariaLabel="Mở ứng dụng MoMo ngay"
          >
            Mở App MoMo
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 4L13.5 10L7.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <div className="flex gap-3">
            <Button
              href={SITE_CONFIG.appStoreUrl}
              variant="secondary"
              size="lg"
              isExternal
              className="border-white/30 text-white hover:bg-white/10 dark:border-white/30 dark:text-white"
              ariaLabel="Tải MoMo từ App Store"
            >
              App Store
            </Button>
            <Button
              href={SITE_CONFIG.playStoreUrl}
              variant="secondary"
              size="lg"
              isExternal
              className="border-white/30 text-white hover:bg-white/10 dark:border-white/30 dark:text-white"
              ariaLabel="Tải MoMo từ Google Play"
            >
              Google Play
            </Button>
          </div>
        </div>

        {/* Trust reinforcement */}
        <p className="mt-6 text-sm text-white/50">
          Miễn phí tải & đăng ký · Bảo mật PCI DSS Level 1 · Hỗ trợ 24/7
        </p>
      </div>
    </section>
  );
}
