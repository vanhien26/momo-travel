import type { Metadata, Viewport } from 'next';
import { Inter, Be_Vietnam_Pro } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/constants';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const fontBody = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const fontDisplay = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a0533' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    'MoMo Travel giúp bạn du lịch châu Á tiện lợi: mua sim du lịch quốc tế, đặt vé máy bay giá rẻ, book khách sạn và thanh toán QR tại 15+ quốc gia. Tải MoMo ngay!',
  applicationName: SITE_CONFIG.name,
  referrer: 'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: 'https://homepage.momocdn.net/fileuploads/svg/momo-file-240411162904.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${fontBody.variable} ${fontDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateWebSiteSchema()} />
        <link rel="dns-prefetch" href="https://www.momo.vn" />
      </head>

      <body className="min-h-screen font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-momo-500 focus:px-4 focus:py-2 focus:text-white"
        >
          Bỏ qua đến nội dung chính
        </a>

        <Header />

        <main id="main-content" className="w-full overflow-hidden">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
