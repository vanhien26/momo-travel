import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { destinations } from '@/data/destinations'
import { blogPosts } from '@/data/blog'
import { esimCountries } from '@/data/esim-countries'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/ve-may-bay`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/khach-san`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/esim`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/ty-gia`, lastModified: now, changeFrequency: 'hourly', priority: 0.8 },
    { url: `${SITE_URL}/diem-den`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/thanh-toan`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
  ]

  // Destination pages
  const destPages: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${SITE_URL}/diem-den/${d.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // eSIM country pages
  const esimPages: MetadataRoute.Sitemap = esimCountries.map((c) => ({
    url: `${SITE_URL}/esim/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...destPages, ...esimPages, ...blogPages]
}
