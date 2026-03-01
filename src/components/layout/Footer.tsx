/* ══════════════════════════════════════════════
 * FOOTER – MoMo Travel Hub
 *
 * SEO Strategy:
 * - Internal Linking: Link đến tất cả trang dịch vụ & điểm đến
 * - Contextual Relevance: Links nhóm theo chủ đề
 * - Entity reinforcement: Logo + brand mention
 * - Semantic HTML: <footer> + <nav> elements
 * ══════════════════════════════════════════════ */

import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_LINKS, SITE_CONFIG, MOMO_ENTITY } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--border-default)] bg-[var(--bg-secondary)]"
      role="contentinfo"
    >
      <div className="container-content py-12 lg:py-16">
        {/* ── Footer Grid ──────────────────── */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-bold text-momo-700"
              aria-label="MoMo Travel Hub"
            >
              <Image
                src="https://homepage.momocdn.net/fileuploads/svg/momo-file-240411162904.svg"
                alt="MoMo Logo"
                width={28}
                height={28}
                className="shrink-0"
              />
              MoMo Travel
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {SITE_CONFIG.tagline}. Đặt SIM, vé bay, khách sạn và thanh toán khắp châu Á chỉ với một ứng dụng.
            </p>
            {/* App Store Links */}
            <div className="mt-4 flex gap-3">
              <Link
                href={SITE_CONFIG.appStoreUrl}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-700"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tải MoMo trên App Store"
              >
                App Store
              </Link>
              <Link
                href={SITE_CONFIG.playStoreUrl}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-700"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tải MoMo trên Google Play"
              >
                Google Play
              </Link>
            </div>
          </div>

          {/* Services Links – Internal Linking cho SEO */}
          <nav aria-label="Dịch vụ du lịch">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Dịch vụ
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-momo-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Destinations Links */}
          <nav aria-label="Điểm đến du lịch">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Điểm đến
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-momo-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Links */}
          <nav aria-label="Về công ty">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Về MoMo
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-momo-700"
                    {...(link.href.startsWith('http') && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Contact info – Entity reinforcement */}
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              Hotline: {MOMO_ENTITY.contactPoint.telephone}
            </p>
          </nav>
        </div>

        {/* ── Bottom Bar ───────────────────── */}
        <div className="mt-10 border-t border-[var(--border-default)] pt-6">
          <p className="text-center text-xs text-[var(--text-muted)]">
            © {currentYear} {MOMO_ENTITY.legalName}. Bảo lưu mọi quyền.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            {MOMO_ENTITY.address.streetAddress}, {MOMO_ENTITY.address.addressLocality}
          </p>
        </div>
      </div>
    </footer>
  );
}
