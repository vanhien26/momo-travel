import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SchemaMarkup } from '@/components/seo/SchemaMarkup'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} – Vé máy bay, Khách sạn, eSIM giá tốt`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'vé máy bay giá rẻ',
    'đặt khách sạn',
    'esim du lịch',
    'tỷ giá ngoại tệ',
    'du lịch đông nam á',
    'momo travel',
    'thanh toán quốc tế',
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Du lịch thông minh hơn cùng MoMo`,
    description: SITE_DESCRIPTION,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} – Du lịch thông minh hơn cùng MoMo`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
