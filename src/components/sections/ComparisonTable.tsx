/* ══════════════════════════════════════════════
 * COMPARISON TABLE – So sánh Dịch vụ
 *
 * GEO Strategy:
 * - Table content cấu trúc rõ ràng cho AI trích xuất
 * - Checkmark/cross visual cho scan-ability
 * - MoMo column highlighted (visual bias)
 * - Semantic <table> + proper ARIA
 *
 * SEO:
 * - <caption> mô tả bảng cho screen readers
 * - Heading row dùng <th scope="col">
 * - Feature column dùng <th scope="row">
 * ══════════════════════════════════════════════ */

import { COMPARISON_DATA } from '@/lib/constants';

export function ComparisonTable() {
  /** Render cell value: boolean → icon, string → text */
  function renderCellValue(value: string | boolean, isMoMo = false) {
    if (typeof value === 'boolean') {
      return value ? (
        <span className={`inline-flex items-center justify-center ${isMoMo ? 'text-travel-forest' : 'text-travel-forest'}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Có">
            <path d="M16 5.5L7.5 14L4 10.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center text-red-400">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Không">
            <path d="M14 6L6 14M6 6l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      );
    }
    return <span className="text-sm">{value}</span>;
  }

  return (
    <section
      id="so-sanh"
      className="scroll-mt-20 bg-[var(--bg-secondary)] py-section"
      aria-labelledby="comparison-heading"
    >
      <div className="container-content">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="comparison-heading"
            className="text-section text-balance text-[var(--text-primary)]"
          >
            Tại Sao Chọn MoMo Cho Chuyến Du Lịch?
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            So sánh dịch vụ du lịch của MoMo với phương thức truyền thống
            và các ứng dụng khác.
          </p>
        </div>

        {/* ── Responsive Table Wrapper ────────── */}
        <div className="mt-10 overflow-x-auto rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] shadow-card">
          <table className="w-full min-w-[600px]">
            <caption className="sr-only">
              Bảng so sánh dịch vụ du lịch giữa MoMo, phương thức truyền thống và ứng dụng khác
            </caption>
            <thead>
              <tr className="border-b border-[var(--border-default)]">
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]"
                >
                  Tính năng
                </th>
                <th
                  scope="col"
                  className="bg-momo-50 px-6 py-4 text-center text-sm font-bold text-momo-700 dark:bg-momo-950 dark:text-momo-400"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <rect width="32" height="32" rx="6" fill="#a50064" />
                      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui">M</text>
                    </svg>
                    MoMo
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-sm font-semibold text-[var(--text-primary)]"
                >
                  Truyền thống
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-sm font-semibold text-[var(--text-primary)]"
                >
                  App khác
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, index) => (
                <tr
                  key={row.feature}
                  className={`border-b border-[var(--border-default)] last:border-0 ${
                    index % 2 === 0 ? '' : 'bg-[var(--bg-secondary)]/30'
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-left text-sm font-medium text-[var(--text-primary)]"
                  >
                    {row.feature}
                  </th>
                  <td className="bg-momo-50/50 px-6 py-4 text-center dark:bg-momo-950/30">
                    {renderCellValue(row.momo, true)}
                  </td>
                  <td className="px-6 py-4 text-center text-[var(--text-secondary)]">
                    {renderCellValue(row.traditional)}
                  </td>
                  <td className="px-6 py-4 text-center text-[var(--text-secondary)]">
                    {renderCellValue(row.otherApp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
