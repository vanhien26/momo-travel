import type { Currency } from '@/types'

// Tỷ giá tham khảo – cập nhật theo thực tế khi deploy
export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', namVi: 'Đô la Mỹ', symbol: '$', flag: '🇺🇸', rate: 25_400, change: 0.12, trend: 'up' },
  { code: 'EUR', name: 'Euro', namVi: 'Euro', symbol: '€', flag: '🇪🇺', rate: 27_200, change: -0.08, trend: 'down' },
  { code: 'GBP', name: 'British Pound', namVi: 'Bảng Anh', symbol: '£', flag: '🇬🇧', rate: 31_800, change: 0.21, trend: 'up' },
  { code: 'JPY', name: 'Japanese Yen', namVi: 'Yên Nhật', symbol: '¥', flag: '🇯🇵', rate: 170, change: 0.05, trend: 'up' },
  { code: 'KRW', name: 'Korean Won', namVi: 'Won Hàn Quốc', symbol: '₩', flag: '🇰🇷', rate: 19, change: -0.03, trend: 'stable' },
  { code: 'THB', name: 'Thai Baht', namVi: 'Baht Thái', symbol: '฿', flag: '🇹🇭', rate: 720, change: 0.15, trend: 'up' },
  { code: 'SGD', name: 'Singapore Dollar', namVi: 'Đô la Singapore', symbol: 'S$', flag: '🇸🇬', rate: 18_900, change: -0.10, trend: 'down' },
  { code: 'CNY', name: 'Chinese Yuan', namVi: 'Nhân dân tệ', symbol: '¥', flag: '🇨🇳', rate: 3_500, change: 0.02, trend: 'stable' },
  { code: 'AUD', name: 'Australian Dollar', namVi: 'Đô la Úc', symbol: 'A$', flag: '🇦🇺', rate: 16_200, change: 0.08, trend: 'up' },
  { code: 'HKD', name: 'Hong Kong Dollar', namVi: 'Đô la Hồng Kông', symbol: 'HK$', flag: '🇭🇰', rate: 3_250, change: 0.03, trend: 'stable' },
  { code: 'TWD', name: 'Taiwan Dollar', namVi: 'Đô la Đài Loan', symbol: 'NT$', flag: '🇹🇼', rate: 790, change: -0.05, trend: 'down' },
  { code: 'MYR', name: 'Malaysian Ringgit', namVi: 'Ringgit Malaysia', symbol: 'RM', flag: '🇲🇾', rate: 5_600, change: 0.11, trend: 'up' },
  { code: 'IDR', name: 'Indonesian Rupiah', namVi: 'Rupiah Indonesia', symbol: 'Rp', flag: '🇮🇩', rate: 1.6, change: -0.07, trend: 'down' },
  { code: 'PHP', name: 'Philippine Peso', namVi: 'Peso Philippines', symbol: '₱', flag: '🇵🇭', rate: 440, change: 0.04, trend: 'stable' },
]

export function getPopularCurrencies(): Currency[] {
  const popularCodes = ['USD', 'EUR', 'JPY', 'KRW', 'THB', 'SGD']
  return currencies.filter((c) => popularCodes.includes(c.code))
}

export function getCurrencyByCode(code: string): Currency | undefined {
  return currencies.find((c) => c.code === code)
}

export function convert(amount: number, fromCode: string, toCode: string): number {
  const from = getCurrencyByCode(fromCode)
  const to = getCurrencyByCode(toCode)
  if (!from || !to) return 0
  // Chuyển sang VND rồi sang đơn vị đích
  const inVnd = amount * from.rate
  return inVnd / to.rate
}

export function convertToVnd(amount: number, fromCode: string): number {
  const from = getCurrencyByCode(fromCode)
  if (!from) return 0
  return amount * from.rate
}

export function convertFromVnd(amount: number, toCode: string): number {
  const to = getCurrencyByCode(toCode)
  if (!to) return 0
  return amount / to.rate
}
