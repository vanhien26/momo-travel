/* ══════════════════════════════════════════════
 * HEADER – MoMo Travel Hub v2
 * Fix: CTA contrast, mobile UX, Ví Trả Sau badge
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
      className="sticky top-0 z-[100] w-full border-b border-gray-100/80 bg-white/95 backdrop-blur-lg"
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ── Logo ──────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-80"
            aria-label="MoMo Travel Hub – Trang chủ"
          >
            <Image
              src="https://homepage.momocdn.net/fileuploads/svg/momo-file-240411162904.svg"
              alt="MoMo Logo"
              width={32}
              height={32}
              className="shrink-0"
              priority
            />
            <span className="hidden font-display font-bold sm:inline-block">
              MoMo Travel
            </span>
          </Link>

          {/* ── Desktop Nav ──────────────────── */}
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Menu chính">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3.5 py-2 text-sm transition-all hover:bg-gray-50 hover:text-momo-700 ${
                    isActive
                      ? 'bg-momo-50 font-semibold text-momo-700'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── CTA + Mobile Toggle ──────────── */}
          <div className="flex items-center gap-2.5">
            {/* Badge Ví Trả Sau – compact */}
            <span className="hidden items-center gap-1 rounded-full border border-momo-200 bg-momo-50 px-2.5 py-1 text-[11px] font-semibold text-momo-700 lg:inline-flex">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Ví Trả Sau
            </span>

            {/* CTA Button – FIX: text-white thay vì text-black */}
            <Link
              href={SITE_CONFIG.appDeepLink}
              className="inline-flex items-center gap-1.5 rounded-full bg-momo-700 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-momo-600 hover:shadow-lg active:scale-[0.97]"
              aria-label="Mở ứng dụng MoMo"
            >
              <span className="hidden sm:inline">Mở App MoMo</span>
              <span className="sm:hidden">Mở App</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={toggleMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-colors hover:bg-momo-50 hover:text-momo-700 md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {isMobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ──────────────────── */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="border-t border-gray-100 pb-4 pt-3 md:hidden"
            aria-label="Menu di động"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`block rounded-xl px-4 py-3 text-[15px] transition-colors ${
                        isActive
                          ? 'bg-momo-50 font-semibold text-momo-700'
                          : 'font-medium text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Mobile Ví Trả Sau badge */}
            <div className="mt-3 flex items-center gap-2 px-4">
              <span className="inline-flex items-center gap-1 rounded-full border border-momo-200 bg-momo-50 px-3 py-1.5 text-xs font-semibold text-momo-700">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Chấp nhận Ví Trả Sau
              </span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
