export const SITE_NAME = 'MoMo Travel'
export const SITE_URL = 'https://momotravel.vercel.app'
export const SITE_DESCRIPTION =
  'Đặt vé máy bay, khách sạn, mua eSIM và chuyển đổi ngoại tệ – tất cả trong ứng dụng MoMo. Du lịch Đông Nam Á và toàn cầu tiết kiệm hơn.'

export const MOMO_APP_STORE = 'https://apps.apple.com/vn/app/momo/id918751511'
export const MOMO_PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.mservice.momotransfer'

export const HOTLINE = '1900 545 496'
export const EMAIL = 'support@momo.vn'

// Số liệu thống kê
export const STATS = {
  users: '50M+',
  countries: '30+',
  rating: '4.8★',
  satisfaction: '99%',
}

// Nav items
export const NAV_ITEMS = [
  { label: 'Điểm đến', href: '/diem-den' },
  { label: 'eSIM', href: '/esim' },
  { label: 'Vé máy bay', href: '/ve-may-bay' },
  { label: 'Khách sạn', href: '/khach-san' },
  { label: 'Thanh toán', href: '/thanh-toan' },
  { label: 'Tỷ giá', href: '/ty-gia' },
  { label: 'Blog', href: '/blog' },
]

// Các hãng hàng không phổ biến
export const AIRLINES = [
  'Vietnam Airlines',
  'VietJet Air',
  'Bamboo Airways',
  'Pacific Airlines',
  'Singapore Airlines',
  'Thai Airways',
  'AirAsia',
  'Cathay Pacific',
  'Korean Air',
  'Japan Airlines',
]

// Số lượng hành khách tối đa
export const MAX_PASSENGERS = 9

// Múi giờ Việt Nam
export const VN_TIMEZONE = 'Asia/Ho_Chi_Minh'

// Định dạng tiền tệ
export const VND_LOCALE = 'vi-VN'
export const VND_CURRENCY = 'VND'

export function formatVND(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1).replace('.0', '')} tr`
  }
  if (amount >= 1_000) {
    return `${Math.round(amount / 1_000)}k`
  }
  return amount.toLocaleString('vi-VN') + 'đ'
}

export function formatVNDFull(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount)
}
