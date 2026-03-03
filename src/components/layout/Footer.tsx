/* ══════════════════════════════════════════════
 * FOOTER – MoMo Travel Hub v2
 * Fix: CSS vars now defined, added Ví Trả Sau badge
 * ══════════════════════════════════════════════ */

import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_LINKS, SITE_CONFIG, MOMO_ENTITY } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-gray-200 bg-gray-50"
      role="contentinfo"
    >
      <div className="container-content py-10 lg:py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
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
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              {SITE_CONFIG.tagline}. Đặt SIM, vé bay, khách sạn và thanh toán khắp châu Á chỉ với một ứng dụng.
            </p>

            {/* Ví Trả Sau badge in footer */}
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-momo-200 bg-momo-50 px-3 py-1.5 text-xs font-semibold text-momo-700">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Chấp nhận Ví Trả Sau
            </div>

            {/* Store Links */}
            <div className="mt-4 flex gap-2.5">
              <Link
                href={SITE_CONFIG.appStoreUrl}
                className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tải MoMo trên App Store"
              >
                App Store
              </Link>
              <Link
                href={SITE_CONFIG.playStoreUrl}
                className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tải MoMo trên Google Play"
              >
                Google Play
              </Link>
            </div>
          </div>

          {/* Services Links */}
          <nav aria-label="Dịch vụ du lịch">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-900">
              Dịch vụ
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 transition-colors hover:text-momo-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Destinations */}
          <nav aria-label="Điểm đến du lịch">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-900">
              Điểm đến
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.destinations.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 transition-colors hover:text-momo-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Blog */}
          <nav aria-label="Blog du lịch">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-900">
              Blog
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.blog.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 transition-colors hover:text-momo-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Về công ty">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-900">
              Về MoMo
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-momo-700"
                    {...(link.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-400">
              Hotline: {MOMO_ENTITY.contactPoint.telephone}
            </p>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-400">
            © {currentYear} {MOMO_ENTITY.legalName}. Bảo lưu mọi quyền.
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            {MOMO_ENTITY.address.streetAddress}, {MOMO_ENTITY.address.addressLocality}
          </p>
        </div>
      </div>
    </footer>
  );
}
