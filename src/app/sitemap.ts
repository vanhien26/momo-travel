import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  const destinations = [
    'thai-lan', 'han-quoc', 'nhat-ban', 'singapore',
    'malaysia', 'dai-loan', 'indonesia',
  ];

  const destinationPages: MetadataRoute.Sitemap = destinations.map(
    (slug) => ({
      url: `${baseUrl}/diem-den/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })
  );

  const servicePages: MetadataRoute.Sitemap = [
    'sim-du-lich', 've-may-bay', 'khach-san', 'thanh-toan',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...servicePages, ...destinationPages];
}
