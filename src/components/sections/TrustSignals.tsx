/* ══════════════════════════════════════════════
 * TRUST SIGNALS – Social Proof Section
 *
 * Strategy:
 * - Testimonials từ personas khác nhau (blogger, doanh nhân, gia đình, sinh viên)
 * - Star ratings cho visual trust
 * - Destination tags cho contextual relevance
 * - Aggregate stats reinforcement
 * ══════════════════════════════════════════════ */

import { Card } from '@/components/ui/Card';
import { TESTIMONIALS } from '@/lib/constants';

export function TrustSignals() {
  return (
    <section
      className="bg-[var(--bg-secondary)] py-section"
      aria-labelledby="trust-heading"
    >
      <div className="container-content">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="trust-heading"
            className="text-section text-balance text-[var(--text-primary)]"
          >
            Hơn 50 Triệu Người Tin Dùng MoMo
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Từ backpacker solo đến gia đình, từ công tác đến du lịch nghỉ dưỡng —
            MoMo đồng hành cùng mọi chuyến đi.
          </p>
        </div>

        {/* ── Stats Bar ──────────────────────── */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: '50M+', label: 'Người dùng' },
            { value: '30+', label: 'Quốc gia phủ sóng' },
            { value: '4.8★', label: 'Đánh giá App Store' },
            { value: '99%', label: 'Tỷ lệ hài lòng' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-[var(--bg-primary)] p-4 text-center shadow-card"
            >
              <p className="text-2xl font-bold text-momo-700 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Testimonial Cards ──────────────── */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.id} as="article">
              {/* Star rating */}
              <div className="flex gap-0.5" aria-label={`Đánh giá ${testimonial.rating} trên 5 sao`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 text-travel-sand"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-momo-100 text-sm font-bold text-momo-700 dark:bg-momo-900"
                  aria-hidden="true"
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <cite className="text-sm font-semibold not-italic text-[var(--text-primary)]">
                    {testimonial.name}
                  </cite>
                  <p className="text-xs text-[var(--text-muted)]">
                    {testimonial.role} · {testimonial.destination}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
