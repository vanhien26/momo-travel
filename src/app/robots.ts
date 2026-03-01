/* =============================================================
 * ROBOTS.TXT
 * 
 * GEO NOTE: Cho phép tất cả AI crawlers (GPTBot, Google-Extended,
 * ClaudeBot, etc.) index nội dung. Đây là chiến lược mở cho
 * AI Search visibility.
 * ============================================================= */

import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
