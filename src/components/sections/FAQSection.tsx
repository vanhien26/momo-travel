/* ══════════════════════════════════════════════
 * FAQ SECTION – MoMo Travel Hub
 *
 * GEO Critical Component:
 * - FAQPage Schema đã inject ở root layout
 * - Mỗi FAQ item viết theo Answer-First format
 * - Accordion UI cho UX, nhưng content vẫn render
 *   cho SEO crawlers (không dùng JS-only rendering)
 *
 * Technical SEO:
 * - <details>/<summary> native HTML (no JS required)
 * - Content luôn trong DOM (crawlable by default)
 * - ID anchors cho direct linking
 * ══════════════════════════════════════════════ */

import { FAQ_DATA } from '@/lib/constants';
import type { FAQItem } from '@/types';

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs?: FAQItem[];
}

export function FAQSection({
  title = "Câu Hỏi Thường Gặp Về Du Lịch Cùng MoMo",
  description = "Giải đáp nhanh những thắc mắc phổ biến nhất khi sử dụng MoMo cho chuyến du lịch châu Á.",
  faqs = FAQ_DATA,
}: FAQSectionProps) {
  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-[var(--bg-primary)] py-section"
      aria-labelledby="faq-heading"
    >
      <div className="container-content">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="faq-heading"
            className="text-section text-balance text-[var(--text-primary)]"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            {description}
          </p>
        </div>

        {/* ── FAQ Accordion ──────────────────── */}
        <div
          className="mx-auto mt-10 max-w-3xl divide-y divide-[var(--border-default)] rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] shadow-card"
          role="list"
          aria-label="Danh sách câu hỏi thường gặp"
        >
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group"
              role="listitem"
              {...(index === 0 ? { open: true } : {})}
            >
              {/*
                <summary> = Câu hỏi (H3 semantic weight)
                Native HTML accordion – không cần JS library
              */}
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-[var(--text-primary)] transition-colors hover:text-momo-700 [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>

              {/*
                Answer content – GEO optimized:
                Câu đầu tiên = direct answer cho AI snippet extraction.
                Nội dung sau = supporting details.
                Luôn trong DOM cho crawlers.
              */}
              <div className="px-6 pb-5">
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
