/* ══════════════════════════════════════════════
 * USE CASES – Tình huống Du lịch thực tế
 *
 * GEO Strategy:
 * - Scenario-based content mapping vào search intents
 * - Mỗi use case = 1 nhóm intent (backpacker, family, business, honeymoon)
 * - Concrete details trong solution (tên cửa hàng, hành động cụ thể)
 *
 * Information Gain:
 * - Không nói chung chung "thanh toán tiện lợi"
 * - Mà "quẹt MoMo ở Don Quijote, 7-Eleven"
 * ══════════════════════════════════════════════ */

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { USE_CASES } from '@/lib/constants';
import type { UseCase } from '@/types';

interface UseCasesProps {
  title?: string;
  description?: string;
  useCases?: UseCase[];
}

export function UseCases({
  title = "MoMo Phù Hợp Với Mọi Kiểu Du Lịch",
  description = "Dù bạn là backpacker, đi cùng gia đình, công tác hay hưởng tuần trăng mật — MoMo đều có giải pháp phù hợp.",
  useCases = USE_CASES,
}: UseCasesProps) {
  return (
    <section
      className="bg-momo-50 py-section"
      aria-labelledby="usecases-heading"
    >
      <div className="container-content">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="usecases-heading"
            className="text-section text-balance text-[var(--text-primary)]"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {useCases.map((useCase) => (
            <Card key={useCase.id} as="article" className="flex flex-col">
              <div className="flex items-start gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-momo-50 text-2xl dark:bg-momo-950"
                  aria-hidden="true"
                >
                  {useCase.icon}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {useCase.title}
                  </h3>
                </div>
              </div>

              {/* Scenario – Vấn đề/nhu cầu */}
              <div className="mt-4 rounded-lg bg-[var(--bg-secondary)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Tình huống
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {useCase.scenario}
                </p>
              </div>

              {/* Solution – Giải pháp MoMo */}
              <div className="mt-3 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-travel-forest">
                  Giải pháp MoMo
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {useCase.solution}
                </p>
              </div>

              <Button
                href={useCase.ctaHref}
                variant="ghost"
                size="sm"
                className="mt-4 self-start"
                ariaLabel={useCase.ctaText}
              >
                {useCase.ctaText}
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
