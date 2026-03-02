/* ══════════════════════════════════════════════
 * TỶ GIÁ PAGE – /ty-gia
 *
 * Programmatic SEO Hub cho currency tools
 * GEO Target: "tỷ giá hôm nay", "quy đổi tiền tệ du lịch"
 * MOAT: Tỷ giá MoMo + CTA thanh toán closed-loop
 *
 * Architecture:
 * - Server Component: metadata + JSON-LD
 * - Client Component: interactive converter + table
 * ══════════════════════════════════════════════ */

import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { ExchangeRateClient } from './ExchangeRateClient';

export const metadata: Metadata = {
  title: 'Tỷ Giá Hôm Nay – Quy Đổi Tiền Tệ Du Lịch Châu Á',
  description:
    'Xem tỷ giá ngoại tệ du lịch châu Á hôm nay: Yên Nhật JPY, Won KRW, Baht THB, SGD, TWD. Quy đổi VND nhanh, so sánh tỷ giá MoMo vs ngân hàng. Thanh toán quốc tế không phí ẩn.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/ty-gia`,
  },
  openGraph: {
    title: 'Tỷ Giá Hôm Nay – Quy Đổi Tiền Tệ Du Lịch | MoMo Travel',
    description: 'Bảng tỷ giá ngoại tệ du lịch cập nhật. Quy đổi VND sang JPY, KRW, THB, SGD tức thì. Thanh toán quốc tế qua MoMo không phí ẩn.',
    type: 'website',
    url: `${SITE_CONFIG.url}/ty-gia`,
  },
};

/** JSON-LD Schema cho WebApplication (Exchange Rate Tool) */
function ExchangeRateSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'MoMo Quy Đổi Tỷ Giá Du Lịch',
    description: 'Công cụ quy đổi tỷ giá ngoại tệ du lịch châu Á. So sánh tỷ giá MoMo với ngân hàng, tính chi phí du lịch.',
    url: `${SITE_CONFIG.url}/ty-gia`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'VND',
    },
    provider: {
      '@type': 'Organization',
      name: 'MoMo',
      url: 'https://momo.vn',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ExchangeRatePage() {
  return (
    <>
      <ExchangeRateSchema />
      <ExchangeRateClient />
    </>
  );
}
