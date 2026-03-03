/* ══════════════════════════════════════════════
 * SITEMAP – MoMo Travel Hub
 *
 * Cấu trúc URL chuẩn SEO:
 * /                              → Trang chủ
 * /esim                          → Hub eSIM
 * /esim/[country]                → eSIM theo quốc gia
 * /ve-may-bay                    → Hub vé máy bay
 * /khach-san                     → Hub khách sạn
 * /khach-san/[country]           → Khách sạn theo quốc gia
 * /khach-san/[country]/[city]    → Khách sạn theo thành phố
 * /thanh-toan                    → Thanh toán quốc tế
 * /diem-den                      → Hub điểm đến
 * /diem-den/[country]            → Điểm đến theo quốc gia
 * /diem-den/[country]/[city]     → Điểm đến chi tiết
 * /ty-gia                        → Hub tỷ giá
 * /ty-gia/[pair]                 → Tỷ giá chi tiết
 * /blog                          → Blog hub
 * /blog/[category]               → Blog category
 * /blog/[category]/[slug]        → Blog detail
 * ══════════════════════════════════════════════ */

import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { COUNTRIES } from '@/data/destinations';
import { ESIM_COUNTRY_LIST } from '@/data/esim-countries';
import { BLOG_CATEGORIES, BLOG_POSTS } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const now = new Date();

  /* ── 1. Trang chủ ──────────────────────────── */
  const home: MetadataRoute.Sitemap = [{
    url: base,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  }];

  /* ── 2. Service Hub Pages ──────────────────── */
  const serviceHubs: MetadataRoute.Sitemap = [
    { url: `${base}/esim`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/ve-may-bay`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/khach-san`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/thanh-toan`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/diem-den`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/ty-gia`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${base}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
  ].map(p => ({ ...p, lastModified: now }));

  /* ── 3. eSIM Country Pages: /esim/[country] ── */
  const esimPages: MetadataRoute.Sitemap = ESIM_COUNTRY_LIST.map(c => ({
    url: `${base}/esim/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  /* ── 4. Hotel Pages ────────────────────────── */
  // /khach-san/[country]
  const hotelCountryPages: MetadataRoute.Sitemap = COUNTRIES.map(c => ({
    url: `${base}/khach-san/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // /khach-san/[country]/[city]
  const hotelCityPages: MetadataRoute.Sitemap = COUNTRIES.flatMap(country =>
    country.locations.map(loc => ({
      url: `${base}/khach-san/${country.slug}/${loc.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  /* ── 5. Destination Pages ──────────────────── */
  // /diem-den/[country]
  const destCountryPages: MetadataRoute.Sitemap = COUNTRIES.map(c => ({
    url: `${base}/diem-den/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // /diem-den/[country]/[city]
  const destCityPages: MetadataRoute.Sitemap = COUNTRIES.flatMap(country =>
    country.locations.map(loc => ({
      url: `${base}/diem-den/${country.slug}/${loc.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  /* ── 6. Exchange Rate Pages ────────────────── */
  const currencySlugs = ['vnd-jpy', 'vnd-krw', 'vnd-thb', 'vnd-sgd', 'vnd-twd', 'vnd-myr', 'vnd-usd', 'vnd-cny'];
  const exchangePages: MetadataRoute.Sitemap = currencySlugs.map(slug => ({
    url: `${base}/ty-gia/${slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  /* ── 7. Blog Pages ─────────────────────────── */
  // /blog/[category]
  const blogCategoryPages: MetadataRoute.Sitemap = BLOG_CATEGORIES.map(cat => ({
    url: `${base}/blog/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // /blog/[category]/[slug]
  const blogPostPages: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${base}/blog/${post.categorySlug}/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...home,
    ...serviceHubs,
    ...esimPages,
    ...hotelCountryPages,
    ...hotelCityPages,
    ...destCountryPages,
    ...destCityPages,
    ...exchangePages,
    ...blogCategoryPages,
    ...blogPostPages,
  ];
}
