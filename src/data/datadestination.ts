/* ══════════════════════════════════════════════
 * METADATA GENERATOR – MoMo Travel Hub
 *
 * Dynamic metadata cho mỗi trang:
 * - SEO title/description tối ưu CTR
 * - OpenGraph cho social sharing
 * - Twitter Card
 * - Canonical URL enforcement
 * ══════════════════════════════════════════════ */

import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Tạo metadata object cho Next.js App Router.
 *
 * SEO Notes:
 * - Title format: "{Page Title} | MoMo Travel Hub" (55-60 chars)
 * - Description: 150-160 chars, chứa keyword chính ở đầu
 * - Canonical: Luôn có để tránh duplicate content
 * - OG Image: 1200x630px cho optimal social preview
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  ogImage = '/images/og-travel-hub.jpg',
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;
  const canonicalUrl = `${SITE_CONFIG.url}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'MoMo du lịch',
      'thanh toán quốc tế',
      'SIM du lịch',
      'đặt vé bay',
      'đặt khách sạn châu Á',
      ...keywords,
    ],
    authors: [{ name: 'MoMo Vietnam', url: 'https://momo.vn' }],
    creator: 'MoMo Vietnam',
    publisher: 'MoMo Vietnam',

    /* ── Canonical & Alternate ─────────────── */
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'vi-VN': canonicalUrl,
      },
    },

    /* ── Robots ────────────────────────────── */
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },

    /* ── Open Graph ────────────────────────── */
    openGraph: {
      type: 'website',
      locale: SITE_CONFIG.locale,
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
    },

    /* ── Twitter Card ──────────────────────── */
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_CONFIG.url}${ogImage}`],
      creator: '@MoMoVietnam',
    },

    /* ── Other Meta ────────────────────────── */
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
  };
}
