/* ══════════════════════════════════════════════
 * VALUE PROPOSITION – MoMo Travel USPs
 *
 * Default: 4 USP cards (All-in-1, XU, Ví Trả Sau, PCI-DSS)
 * Also supports custom services via props (backward compat)
 * ══════════════════════════════════════════════ */

import { Layers, Coins, CreditCard, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { TravelService } from '@/types';

/* ── Default USP Data ────────────────────────── */
const USP_ITEMS = [
  {
    id: 'all-in-one',
    title: 'Tất Cả Trong 1 Ứng Dụng',
    description: 'Đặt vé máy bay, khách sạn, mua eSIM du lịch và bảo hiểm — tất cả trên cùng một ứng dụng MoMo. Không cần tải thêm app nào khác.',
    icon: Layers,
    bgColor: 'bg-sky-50',
  },
  {
    id: 'xu-rewards',
    title: 'Tích XU Đổi Voucher',
    description: 'Mỗi giao dịch du lịch đều được hoàn tiền và tích điểm XU. Đổi voucher giảm giá dịch vụ khác trên MoMo — càng đi càng lời.',
    icon: Coins,
    bgColor: 'bg-amber-50',
  },
  {
    id: 'vi-tra-sau',
    title: 'Ví Trả Sau – 0% Lãi Suất',
    description: 'Mua trước, trả sau với hạn mức lên đến 10 triệu đồng. Trả góp 0% lãi suất cho vé máy bay và khách sạn — đi du lịch không lo tài chính.',
    icon: CreditCard,
    bgColor: 'bg-momo-50',
    highlight: true,
  },
  {
    id: 'pci-dss',
    title: 'An Toàn PCI-DSS Level 1',
    description: 'Chứng nhận bảo mật quốc tế cao nhất ngành thanh toán. Mã hóa end-to-end, xác thực sinh trắc học — yên tâm thanh toán ở bất kỳ đâu.',
    icon: ShieldCheck,
    bgColor: 'bg-emerald-50',
  },
];

/* ── Props ────────────────────────────────────── */
interface ValuePropositionProps {
  title?: string;
  description?: string;
  /** Legacy: pass custom TravelService[] for sub-pages */
  services?: TravelService[];
}

export function ValueProposition({
  title = 'Tại Sao Chọn MoMo Travel?',
  description = 'Hệ sinh thái du lịch & tài chính thông minh nhất Việt Nam — từ đặt chỗ đến thanh toán đều có MoMo lo.',
  services,
}: ValuePropositionProps) {
  return (
    <section
      className="bg-white py-section"
      aria-labelledby="usp-heading"
    >
      <div className="container-content">
        {/* ── Section Header ─────────────────── */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="usp-heading"
            className="text-section text-balance text-[var(--text-primary)]"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            {description}
          </p>
        </div>

        {/* ── Cards Grid ─────────────────────── */}
        {services ? (
          /* Legacy mode: render TravelService cards */
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Card key={service.id} as="article" className="flex flex-col">
                <div id={service.id} className="scroll-mt-20">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-momo-50 text-3xl dark:bg-momo-950"
                    aria-hidden="true"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {service.icon}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)]">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{service.description}</p>
                <ul className="mt-4 space-y-2" aria-label={`Tính năng ${service.title}`}>
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-travel-forest" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button href={service.href} variant="ghost" size="sm" className="mt-5 self-start" ariaLabel={`Tìm hiểu thêm về ${service.title}`}>
                  Tìm hiểu thêm
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          /* Default mode: new USP cards with lucide icons */
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {USP_ITEMS.map((item) => {
              const IconComp = item.icon;
              return (
                <article
                  key={item.id}
                  className={`relative flex flex-col rounded-3xl bg-[var(--bg-primary)] p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${item.highlight ? 'ring-2 ring-momo-500/30' : ''
                    }`}
                >
                  {item.highlight && (
                    <span className="absolute -top-3 left-6 rounded-full bg-momo-700 px-3 py-1 text-[11px] font-bold text-white shadow-momo">
                      🔥 Key Growth
                    </span>
                  )}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bgColor}`}>
                    <IconComp className="h-7 w-7 text-momo-700" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
