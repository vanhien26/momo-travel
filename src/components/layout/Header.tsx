/* ══════════════════════════════════════════════
 * HEADER – MoMo Travel Hub
 *
 * Features:
 * - Sticky header với blur backdrop
 * - Mobile hamburger menu (CSS-only, no JS library)
 * - CTA button deep link đến App MoMo
 * - Semantic nav element + ARIA labels
 *
 * Webview Optimization:
 * - Nhẹ, không dùng third-party menu library
 * - CSS backdrop-filter thay vì JS-based blur
 * ══════════════════════════════════════════════ */

'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-[var(--border-default)] bg-[var(--bg-primary)]/80 backdrop-blur-lg"
      role="banner"
    >
      <div className="container-content">
        <div className="flex h-16 items-center justify-between">
          {/* ── Logo ────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-momo-700 transition-colors hover:text-momo-600"
            aria-label="MoMo Travel Hub – Trang chủ"
          >
            {/* SVG Logo via Next/Image */}
            <Image
              src="https://homepage.momocdn.net/fileuploads/svg/momo-file-240411162904.svg"
              alt="MoMo Logo"
              width={32}
              height={32}
              className="shrink-0"
              priority
            />
            <span className="hidden sm:inline">MoMo Travel</span>
          </Link>

          {/* ── Desktop Navigation ──────────── */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Menu chính"
          >
            {NAV_LINKS.map((link) => {
              const isActive = link.href.startsWith('/') && (pathname === link.href || pathname.startsWith(link.href + '/'));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-momo-50 hover:text-momo-700 dark:hover:bg-momo-950 ${isActive
                    ? 'text-momo-500 font-bold dark:text-momo-400'
                    : 'text-[var(--text-secondary)] font-medium'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── CTA Button + Mobile Toggle ──── */}
          <div className="flex items-center gap-3">
            {/* CTA – Deep link đến App MoMo */}
            <Link
              href={SITE_CONFIG.appDeepLink}
              className="inline-flex items-center gap-2 rounded-full bg-momo-700 px-5 py-2.5 text-sm font-semibold text-white shadow-momo transition-all hover:bg-momo-600 hover:shadow-lg active:scale-[0.98]"
              aria-label="Mở ứng dụng MoMo"
            >
              <span className="hidden sm:inline">Mở App MoMo</span>
              <span className="sm:hidden">Mở App</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={toggleMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-momo-50 md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ──────────────────── */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="animate-fade-in border-t border-[var(--border-default)] pb-4 pt-2 md:hidden"
            aria-label="Menu di động"
          >
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = link.href.startsWith('/') && (pathname === link.href || pathname.startsWith(link.href + '/'));

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`block rounded-lg px-3 py-2.5 text-base transition-colors hover:bg-momo-50 hover:text-momo-700 ${isActive
                        ? 'text-momo-500 font-bold dark:text-momo-400'
                        : 'text-[var(--text-secondary)] font-medium'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
