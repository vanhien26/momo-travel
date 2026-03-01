/* ══════════════════════════════════════════════
 * VALUE PROPOSITION – MoMo Travel Hub
 *
 * Content Strategy:
 * - Mỗi service card = 1 article semantic
 * - Feature list với concrete details (giá, số lượng)
 * - "Information Gain" cao: số liệu cụ thể, không generic
 *
 * SEO:
 * - H2 section heading cho topic hierarchy
 * - ID anchors cho internal linking
 * - Descriptive alt text patterns
 * ══════════════════════════════════════════════ */

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TRAVEL_SERVICES } from '@/lib/constants';
import type { TravelService } from '@/types';

interface ValuePropositionProps {
  title?: string;
  description?: string;
  services?: TravelService[];
}

export function ValueProposition({
  title = "Mọi Thứ Bạn Cần Cho Chuyến Đi Của Mình",
  description = "Từ SIM data quốc tế đến đặt vé bay, khách sạn và thanh toán tại chỗ — MoMo là bạn đồng hành duy nhất bạn cần mang theo.",
  services = TRAVEL_SERVICES,
}: ValuePropositionProps) {
  return (
    <section
      className="bg-white py-section"
      aria-labelledby="services-heading"
    >
      <div className="container-content">
        {/* ── Section Header ─────────────────── */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="services-heading"
            className="text-section text-balance text-[var(--text-primary)]"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            {description}
          </p>
        </div>

        {/* ── Service Cards Grid ─────────────── */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={service.id}
              as="article"
              className="flex flex-col"
            >
              {/* Icon + ID anchor cho deep linking */}
              <div id={service.id} className="scroll-mt-20">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-momo-50 text-3xl dark:bg-momo-950"
                  aria-hidden="true"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {service.icon}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)]">
                {service.title}
              </h3>

              {/*
                GEO: Descriptive paragraph với Information Gain.
                Chứa số liệu cụ thể (99.000đ, 30 quốc gia, 60 giây)
                thay vì mô tả chung chung.
              */}
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {service.description}
              </p>

              {/* Feature list */}
              <ul className="mt-4 space-y-2" aria-label={`Tính năng ${service.title}`}>
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-travel-forest"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M13.5 4.5L6 12L2.5 8.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                href={service.href}
                variant="ghost"
                size="sm"
                className="mt-5 self-start"
                ariaLabel={`Tìm hiểu thêm về ${service.title}`}
              >
                Tìm hiểu thêm
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
