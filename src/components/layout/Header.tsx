/* ══════════════════════════════════════════════
 * HEADER – MoMo Travel Hub v3
 * Unified Button brand, Ví Trả Sau badge
 * ══════════════════════════════════════════════ */

'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const qrData =
    SITE_CONFIG.appDeepLink && SITE_CONFIG.appDeepLink !== '/'
      ? SITE_CONFIG.appDeepLink
      : SITE_CONFIG.url;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    qrData,
  )}`;

  return (
    <header
      className="sticky top-0 z-[100] w-full border-b border-gray-100/80 bg-white/95 backdrop-blur-lg"
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
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
            <span className="hidden font-display font-bold sm:inline-block">MoMo Travel</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Menu chính">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-50 hover:text-momo-700 ${isActive ? 'bg-momo-50 font-semibold text-momo-700' : 'font-medium text-gray-600'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <div className="relative hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsQrOpen((prev) => !prev)}
              >
                Tải MoMo
              </Button>
              {isQrOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                  <p className="text-xs font-semibold text-slate-700">
                    Quét QR để tải MoMo
                  </p>
                  <div className="mt-2 flex justify-center">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                      <Image
                        src={qrSrc}
                        alt="QR tải ứng dụng MoMo"
                        width={128}
                        height={128}
                        className="h-32 w-32"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={toggleMenu}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
              aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Menu di động">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-3 text-sm transition-colors ${isActive
                      ? 'bg-momo-50 font-semibold text-momo-700'
                      : 'font-medium text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
            <Button variant="primary" size="md" fullWidth onClick={() => setIsQrOpen((prev) => !prev)}>
              Tải App MoMo
            </Button>
          </div>
          {isQrOpen && (
            <div className="mt-3 flex justify-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <Image
                  src={qrSrc}
                  alt="QR tải ứng dụng MoMo"
                  width={128}
                  height={128}
                  className="h-32 w-32"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
