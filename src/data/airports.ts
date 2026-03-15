import type { Airport } from '@/types'

export const airports: Airport[] = [
  // ─── Việt Nam ───────────────────────────────────────────────────────────────
  { iata: 'SGN', name: 'Tân Sơn Nhất', city: 'TP. Hồ Chí Minh', country: 'Việt Nam', countryCode: 'VN', popular: true },
  { iata: 'HAN', name: 'Nội Bài', city: 'Hà Nội', country: 'Việt Nam', countryCode: 'VN', popular: true },
  { iata: 'DAD', name: 'Đà Nẵng', city: 'Đà Nẵng', country: 'Việt Nam', countryCode: 'VN', popular: true },
  { iata: 'PQC', name: 'Phú Quốc', city: 'Phú Quốc', country: 'Việt Nam', countryCode: 'VN', popular: true },
  { iata: 'DLI', name: 'Liên Khương', city: 'Đà Lạt', country: 'Việt Nam', countryCode: 'VN', popular: true },
  { iata: 'CXR', name: 'Cam Ranh', city: 'Nha Trang', country: 'Việt Nam', countryCode: 'VN', popular: true },
  { iata: 'HUI', name: 'Phú Bài', city: 'Huế', country: 'Việt Nam', countryCode: 'VN', popular: false },
  { iata: 'VCA', name: 'Cần Thơ', city: 'Cần Thơ', country: 'Việt Nam', countryCode: 'VN', popular: false },
  { iata: 'VII', name: 'Vinh', city: 'Vinh', country: 'Việt Nam', countryCode: 'VN', popular: false },
  { iata: 'VDH', name: 'Đồng Hới', city: 'Đồng Hới', country: 'Việt Nam', countryCode: 'VN', popular: false },

  // ─── Quốc tế phổ biến ──────────────────────────────────────────────────────
  { iata: 'NRT', name: 'Narita', city: 'Tokyo', country: 'Nhật Bản', countryCode: 'JP', popular: true },
  { iata: 'HND', name: 'Haneda', city: 'Tokyo', country: 'Nhật Bản', countryCode: 'JP', popular: true },
  { iata: 'KIX', name: 'Kansai', city: 'Osaka', country: 'Nhật Bản', countryCode: 'JP', popular: true },
  { iata: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Thái Lan', countryCode: 'TH', popular: true },
  { iata: 'DMK', name: "Don Mueang", city: 'Bangkok', country: 'Thái Lan', countryCode: 'TH', popular: true },
  { iata: 'HKT', name: 'Phuket', city: 'Phuket', country: 'Thái Lan', countryCode: 'TH', popular: true },
  { iata: 'ICN', name: 'Incheon', city: 'Seoul', country: 'Hàn Quốc', countryCode: 'KR', popular: true },
  { iata: 'SIN', name: 'Changi', city: 'Singapore', country: 'Singapore', countryCode: 'SG', popular: true },
  { iata: 'KUL', name: 'Kuala Lumpur', city: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY', popular: true },
  { iata: 'DPS', name: 'Ngurah Rai', city: 'Bali', country: 'Indonesia', countryCode: 'ID', popular: true },
  { iata: 'TPE', name: 'Taoyuan', city: 'Đài Bắc', country: 'Đài Loan', countryCode: 'TW', popular: false },
  { iata: 'PEK', name: 'Thủ Đô', city: 'Bắc Kinh', country: 'Trung Quốc', countryCode: 'CN', popular: false },
  { iata: 'PVG', name: 'Phổ Đông', city: 'Thượng Hải', country: 'Trung Quốc', countryCode: 'CN', popular: false },
  { iata: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'Pháp', countryCode: 'FR', popular: false },
]

export function searchAirports(query: string): Airport[] {
  const q = query.toLowerCase()
  return airports.filter(
    (a) =>
      a.iata.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
  )
}

export function getPopularAirports(): Airport[] {
  return airports.filter((a) => a.popular)
}

export function getDomesticAirports(): Airport[] {
  return airports.filter((a) => a.countryCode === 'VN')
}

export function getAirportByIata(iata: string): Airport | undefined {
  return airports.find((a) => a.iata === iata)
}
