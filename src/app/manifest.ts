import type { MetadataRoute } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'MoMo Travel',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#2e1065',
    theme_color: '#6d28d9',
    icons: [
      { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
