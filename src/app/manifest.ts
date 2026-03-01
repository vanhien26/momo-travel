import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MoMo Travel Hub',
    short_name: 'MoMo Travel',
    description: 'Du lịch châu Á – Thanh toán thông minh cùng MoMo',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#a50064',
    icons: [
      { src: '/images/momo-icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/momo-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
