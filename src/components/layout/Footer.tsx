import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { HOTLINE, EMAIL, MOMO_APP_STORE, MOMO_PLAY_STORE } from '@/lib/constants'

const footerLinks = {
  'Dịch vụ': [
    { label: 'Vé máy bay', href: '/ve-may-bay' },
    { label: 'Khách sạn', href: '/khach-san' },
    { label: 'eSIM du lịch', href: '/esim' },
    { label: 'Tỷ giá ngoại tệ', href: '/ty-gia' },
    { label: 'Thanh toán quốc tế', href: '/thanh-toan' },
  ],
  'Điểm đến': [
    { label: 'Đà Lạt', href: '/diem-den/da-lat' },
    { label: 'Phú Quốc', href: '/diem-den/phu-quoc' },
    { label: 'Đà Nẵng', href: '/diem-den/da-nang' },
    { label: 'Tokyo', href: '/diem-den/tokyo' },
    { label: 'Bangkok', href: '/diem-den/bangkok' },
  ],
  'Blog du lịch': [
    { label: 'Kinh nghiệm', href: '/blog?cat=kinh-nghiem' },
    { label: 'Ẩm thực', href: '/blog?cat=am-thuc' },
    { label: 'Mẹo tiết kiệm', href: '/blog?cat=ve-may-bay' },
    { label: 'Hướng dẫn eSIM', href: '/blog?cat=esim' },
    { label: 'Tất cả bài viết', href: '/blog' },
  ],
  'MoMo': [
    { label: 'Giới thiệu', href: 'https://momo.vn/gioi-thieu' },
    { label: 'Tuyển dụng', href: 'https://momo.vn/tuyen-dung' },
    { label: 'Chính sách bảo mật', href: 'https://momo.vn/chinh-sach-bao-mat' },
    { label: 'Điều khoản sử dụng', href: 'https://momo.vn/dieu-khoan' },
    { label: 'Hỗ trợ khách hàng', href: '/ho-tro' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-momo-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-momo-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black">M</span>
              </div>
              <span className="text-white font-bold text-xl">
                MoMo <span className="text-momo-300">Travel</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Đặt vé máy bay, khách sạn, mua eSIM và chuyển đổi ngoại tệ – tất cả trong một ứng dụng MoMo. Du lịch thông minh, tiết kiệm hơn.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Phone size={14} />
                <span>Hotline: {HOTLINE}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Mail size={14} />
                <span>{EMAIL}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={14} />
                <span>181 Cao Thắng, Quận 10, TP.HCM</span>
              </div>
            </div>

            {/* App store badges */}
            <div className="flex gap-3">
              <a
                href={MOMO_APP_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors text-xs font-medium"
              >
                <span>🍎</span>
                App Store
              </a>
              <a
                href={MOMO_PLAY_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors text-xs font-medium"
              >
                <span>▶️</span>
                Google Play
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 MoMo Travel. Phát triển bởi{' '}
            <a href="https://momo.vn" className="text-momo-300 hover:text-momo-200">
              MoMo E-Wallet
            </a>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-xs">🔒 PCI DSS Level 1</span>
            <span className="text-white/40 text-xs">✅ NAPAS Certified</span>
            <span className="text-white/40 text-xs">🏆 4.8★ App Store</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
