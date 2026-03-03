/* ══════════════════════════════════════════════
 * BREADCRUMB – MoMo Travel Hub
 *
 * Dual purpose:
 * 1. UI navigation (visual breadcrumb trail)
 * 2. Schema markup (BreadcrumbList JSON-LD)
 *
 * Dùng cho dynamic routes khi scale lên
 * hàng ngàn trang SIM/destinations.
 * ══════════════════════════════════════════════ */

import Link from 'next/link';
import type { BreadcrumbItem } from '@/types';
import { generateBreadcrumbSchema } from '@/lib/schema';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Light mode cho nền tối (hero sections) */
  light?: boolean;
}

export function Breadcrumb({ items, light = false }: BreadcrumbProps) {
  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visual breadcrumb */}
      <nav
        aria-label="Đường dẫn"
        className={light ? '' : 'container-content py-3'}
      >
        <ol className={`flex flex-wrap items-center gap-1 text-sm ${light ? 'text-white/50' : 'text-[var(--text-muted)]'}`}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {index > 0 && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {isLast ? (
                  <span className={`font-medium ${light ? 'text-white/80' : 'text-[var(--text-primary)]'}`} aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`transition-colors ${light ? 'hover:text-white' : 'hover:text-momo-700'}`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
