/**
 * Sân bay & gợi ý tìm kiếm vé máy bay – dùng cho FlightSearchBar
 * Mã IATA thực tế, tên thành phố/địa danh đồng bộ với destinations
 */

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  countrySlug: string;
  /** Slug thành phố/địa danh (city) để link với destinations */
  citySlug: string;
  /** Thứ tự ưu tiên hiển thị (sân bay phổ biến = nhỏ hơn) */
  sortOrder: number;
}

/** Các sân bay Việt Nam (hub) + điểm đến từ COUNTRIES */
export const AIRPORTS: Airport[] = [
  // Việt Nam – hub
  { code: 'SGN', name: 'Tân Sơn Nhất', city: 'TP. Hồ Chí Minh', country: 'Việt Nam', countrySlug: 'viet-nam', citySlug: 'ho-chi-minh', sortOrder: 0 },
  { code: 'HAN', name: 'Nội Bài', city: 'Hà Nội', country: 'Việt Nam', countrySlug: 'viet-nam', citySlug: 'ha-noi', sortOrder: 1 },
  { code: 'DAD', name: 'Đà Nẵng', city: 'Đà Nẵng', country: 'Việt Nam', countrySlug: 'viet-nam', citySlug: 'da-nang', sortOrder: 2 },
  { code: 'CXR', name: 'Cam Ranh', city: 'Nha Trang', country: 'Việt Nam', countrySlug: 'viet-nam', citySlug: 'nha-trang', sortOrder: 3 },
  { code: 'DLI', name: 'Liên Khương', city: 'Đà Lạt', country: 'Việt Nam', countrySlug: 'viet-nam', citySlug: 'da-lat', sortOrder: 4 },
  { code: 'PQC', name: 'Phú Quốc', city: 'Phú Quốc', country: 'Việt Nam', countrySlug: 'viet-nam', citySlug: 'phu-quoc', sortOrder: 5 },
  { code: 'HUI', name: 'Phú Bài', city: 'Huế', country: 'Việt Nam', countrySlug: 'viet-nam', citySlug: 'hue', sortOrder: 6 },
  { code: 'DIN', name: 'Điện Biên', city: 'Điện Biên', country: 'Việt Nam', countrySlug: 'viet-nam', citySlug: 'dien-bien', sortOrder: 10 },
  // Nhật Bản
  { code: 'NRT', name: 'Narita', city: 'Tokyo', country: 'Nhật Bản', countrySlug: 'nhat-ban', citySlug: 'tokyo', sortOrder: 20 },
  { code: 'HND', name: 'Haneda', city: 'Tokyo', country: 'Nhật Bản', countrySlug: 'nhat-ban', citySlug: 'tokyo', sortOrder: 21 },
  { code: 'KIX', name: 'Kansai', city: 'Osaka', country: 'Nhật Bản', countrySlug: 'nhat-ban', citySlug: 'osaka', sortOrder: 22 },
  { code: 'NGO', name: 'Chubu', city: 'Nagoya', country: 'Nhật Bản', countrySlug: 'nhat-ban', citySlug: 'nagoya', sortOrder: 23 },
  { code: 'KIX', name: 'Kansai (Kyoto)', city: 'Kyoto', country: 'Nhật Bản', countrySlug: 'nhat-ban', citySlug: 'kyoto', sortOrder: 24 },
  { code: 'CTS', name: 'New Chitose', city: 'Hokkaido', country: 'Nhật Bản', countrySlug: 'nhat-ban', citySlug: 'hokkaido', sortOrder: 25 },
  // Thái Lan
  { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Thái Lan', countrySlug: 'thai-lan', citySlug: 'bangkok', sortOrder: 30 },
  { code: 'DMK', name: 'Don Mueang', city: 'Bangkok', country: 'Thái Lan', countrySlug: 'thai-lan', citySlug: 'bangkok', sortOrder: 31 },
  { code: 'CNX', name: 'Chiang Mai', city: 'Chiang Mai', country: 'Thái Lan', countrySlug: 'thai-lan', citySlug: 'chiang-mai', sortOrder: 32 },
  { code: 'HKT', name: 'Phuket', city: 'Phuket', country: 'Thái Lan', countrySlug: 'thai-lan', citySlug: 'phuket', sortOrder: 33 },
  // Hàn Quốc
  { code: 'ICN', name: 'Incheon', city: 'Seoul', country: 'Hàn Quốc', countrySlug: 'han-quoc', citySlug: 'seoul', sortOrder: 40 },
  { code: 'GMP', name: 'Gimpo', city: 'Seoul', country: 'Hàn Quốc', countrySlug: 'han-quoc', citySlug: 'seoul', sortOrder: 41 },
  { code: 'PUS', name: 'Gimhae', city: 'Busan', country: 'Hàn Quốc', countrySlug: 'han-quoc', citySlug: 'busan', sortOrder: 42 },
  { code: 'CJU', name: 'Jeju', city: 'Jeju', country: 'Hàn Quốc', countrySlug: 'han-quoc', citySlug: 'jeju', sortOrder: 43 },
  // Singapore, Malaysia, Indonesia (phổ biến)
  { code: 'SIN', name: 'Changi', city: 'Singapore', country: 'Singapore', countrySlug: 'singapore', citySlug: 'singapore', sortOrder: 50 },
  { code: 'KUL', name: 'Kuala Lumpur', city: 'Kuala Lumpur', country: 'Malaysia', countrySlug: 'malaysia', citySlug: 'kuala-lumpur', sortOrder: 51 },
  { code: 'CGK', name: 'Soekarno-Hatta', city: 'Jakarta', country: 'Indonesia', countrySlug: 'indonesia', citySlug: 'jakarta', sortOrder: 52 },
  { code: 'DPS', name: 'Ngurah Rai', city: 'Bali', country: 'Indonesia', countrySlug: 'indonesia', citySlug: 'bali', sortOrder: 53 },
];

/** Gợi ý tuyến bay phổ biến (origin – destination) */
export const POPULAR_ROUTES = [
  { from: 'SGN', to: 'HAN', label: 'TP.HCM → Hà Nội' },
  { from: 'SGN', to: 'DAD', label: 'TP.HCM → Đà Nẵng' },
  { from: 'SGN', to: 'PQC', label: 'TP.HCM → Phú Quốc' },
  { from: 'SGN', to: 'BKK', label: 'TP.HCM → Bangkok' },
  { from: 'SGN', to: 'SIN', label: 'TP.HCM → Singapore' },
  { from: 'SGN', to: 'ICN', label: 'TP.HCM → Seoul' },
  { from: 'SGN', to: 'NRT', label: 'TP.HCM → Tokyo' },
  { from: 'HAN', to: 'SGN', label: 'Hà Nội → TP.HCM' },
  { from: 'HAN', to: 'DAD', label: 'Hà Nội → Đà Nẵng' },
  { from: 'HAN', to: 'BKK', label: 'Hà Nội → Bangkok' },
];

/** Mã sân bay unique (một code chỉ lấy 1 lần) để tạo danh sách tuyến */
const UNIQUE_AIRPORT_CODES = Array.from(
  new Set(AIRPORTS.map((a) => a.code))
) as string[];

/** Tạo slug tuyến: sgn-han (lowercase) */
export function getRouteSlug(fromCode: string, toCode: string): string {
  return `${fromCode.toLowerCase()}-${toCode.toLowerCase()}`;
}

/** Parse slug tuyến → { from, to } (uppercase) hoặc null nếu invalid */
export function parseRouteSlug(routeSlug: string): { from: string; to: string } | null {
  const parts = routeSlug.toLowerCase().split('-').filter(Boolean);
  if (parts.length !== 2) return null;
  const from = parts[0]!.toUpperCase();
  const to = parts[1]!.toUpperCase();
  const valid = UNIQUE_AIRPORT_CODES.includes(from) && UNIQUE_AIRPORT_CODES.includes(to);
  return valid ? { from, to } : null;
}

/** Danh sách route slug dùng cho generateStaticParams (tuyến phổ biến + chiều ngược) */
export const FLIGHT_ROUTE_SLUGS: string[] = [
  ...POPULAR_ROUTES.map((r) => getRouteSlug(r.from, r.to)),
  ...POPULAR_ROUTES.map((r) => getRouteSlug(r.to, r.from)),
].filter((slug, i, arr) => arr.indexOf(slug) === i);

/** Lấy 1 sân bay theo mã (nếu trùng code thì ưu tiên sortOrder nhỏ) */
export function getAirportByCode(code: string): Airport | null {
  const normalized = code.toUpperCase();
  const list = AIRPORTS.filter((a) => a.code === normalized);
  if (list.length === 0) return null;
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder)[0] ?? null;
}

export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first';

export const CABIN_LABELS: Record<CabinClass, string> = {
  economy: 'Phổ thông',
  premium_economy: 'Phổ thông đặc biệt',
  business: 'Thương gia',
  first: 'Hạng nhất',
};
