import type { Airport } from './airports';

export type AirportGuideDestination = {
  countrySlug: string;
  locationSlug: string;
  /** Lý do gợi ý (SEO + UX) */
  note: string;
};

export type AirportGuide = {
  code: string;
  /** Ảnh hero (fallback nếu không có ảnh riêng) */
  heroImage: string;
  title: string;
  description: string;
  /** Gợi ý điểm đến bay từ sân bay này */
  suggestedDestinations: AirportGuideDestination[];
  /** Tips nhanh cho hành khách */
  tips: string[];
};

const HERO_FALLBACKS = {
  vn: '/images/destinations/da-nang.jpg',
  intl: '/images/destinations/hero-korea.jpg',
} as const;

export const AIRPORT_GUIDES: Record<string, AirportGuide> = {
  SGN: {
    code: 'SGN',
    heroImage: HERO_FALLBACKS.vn,
    title: 'Sân bay Tân Sơn Nhất (SGN)',
    description:
      'Cửa ngõ hàng không lớn nhất phía Nam, thuận tiện bay nội địa và kết nối nhanh đến các điểm đến châu Á.',
    suggestedDestinations: [
      { countrySlug: 'viet-nam', locationSlug: 'da-lat', note: 'Cuối tuần đổi gió, săn vé rẻ' },
      { countrySlug: 'viet-nam', locationSlug: 'phu-quoc', note: 'Biển đẹp – hợp nghỉ dưỡng' },
      { countrySlug: 'viet-nam', locationSlug: 'da-nang', note: 'Ẩm thực + biển + city break' },
      { countrySlug: 'thai-lan', locationSlug: 'bangkok', note: 'Mua sắm, chợ đêm, transit dễ' },
      { countrySlug: 'han-quoc', locationSlug: 'seoul', note: 'K-pop, mua sắm, mùa lá đỏ' },
      { countrySlug: 'nhat-ban', locationSlug: 'tokyo', note: 'City trip, trải nghiệm văn hóa' },
    ],
    tips: [
      'Đi sớm 2–3 tiếng vào giờ cao điểm.',
      'Ưu tiên thanh toán MoMo/QR để thao tác nhanh.',
      'Mang theo giấy tờ tuỳ thân bản gốc khi bay nội địa.',
    ],
  },
  HAN: {
    code: 'HAN',
    heroImage: '/images/destinations/sapa.jpg',
    title: 'Sân bay Nội Bài (HAN)',
    description:
      'Trung tâm kết nối miền Bắc, thuận tiện bay đến các thành phố du lịch trong nước và quốc tế.',
    suggestedDestinations: [
      { countrySlug: 'viet-nam', locationSlug: 'da-nang', note: 'Bay thẳng, nhiều khung giờ' },
      { countrySlug: 'viet-nam', locationSlug: 'phu-quoc', note: 'Đi biển mùa hè' },
      { countrySlug: 'thai-lan', locationSlug: 'bangkok', note: 'Giá cạnh tranh, lịch bay dày' },
      { countrySlug: 'han-quoc', locationSlug: 'seoul', note: 'Du lịch 4 mùa' },
      { countrySlug: 'nhat-ban', locationSlug: 'osaka', note: 'Food tour, thuận tiện đi Kyoto/Nara' },
    ],
    tips: [
      'Kiểm tra cổng/nhà ga (T1/T2) trước khi đi.',
      'Nếu bay quốc tế, chuẩn bị hộ chiếu và kiểm tra yêu cầu visa.',
    ],
  },
  DAD: {
    code: 'DAD',
    heroImage: HERO_FALLBACKS.vn,
    title: 'Sân bay Đà Nẵng (DAD)',
    description:
      'Cửa ngõ du lịch miền Trung, bay nhanh đến các thành phố lớn và kết nối thuận tiện các điểm nghỉ dưỡng.',
    suggestedDestinations: [
      { countrySlug: 'viet-nam', locationSlug: 'hoi-an', note: 'Phố cổ – đi gần, dễ kết hợp' },
      { countrySlug: 'viet-nam', locationSlug: 'hue', note: 'Di sản – ẩm thực – lịch sử' },
      { countrySlug: 'viet-nam', locationSlug: 'da-lat', note: 'Đi chơi 3N2Đ' },
      { countrySlug: 'thai-lan', locationSlug: 'phuket', note: 'Biển đảo, nghỉ dưỡng' },
    ],
    tips: [
      'Từ sân bay về trung tâm rất nhanh (khoảng 10–15 phút).',
      'Hợp lịch trình “Đà Nẵng – Hội An – Huế” trong 4–6 ngày.',
    ],
  },
  ICN: {
    code: 'ICN',
    heroImage: HERO_FALLBACKS.intl,
    title: 'Sân bay Incheon (ICN)',
    description:
      'Sân bay trung chuyển lớn của châu Á, thuận tiện khám phá Hàn Quốc và nối chuyến đi Nhật/Đông Nam Á.',
    suggestedDestinations: [
      { countrySlug: 'han-quoc', locationSlug: 'seoul', note: 'Trung tâm mua sắm – văn hoá' },
      { countrySlug: 'han-quoc', locationSlug: 'jeju', note: 'Đảo nghỉ dưỡng – thiên nhiên' },
      { countrySlug: 'nhat-ban', locationSlug: 'tokyo', note: 'Nối chuyến linh hoạt' },
      { countrySlug: 'thai-lan', locationSlug: 'bangkok', note: 'Đổi gió Đông Nam Á' },
    ],
    tips: [
      'Nên có phương án di chuyển AREX/bus về Seoul tùy giờ đáp.',
      'Nếu transit dài, cân nhắc city tour quanh Incheon/Seoul.',
    ],
  },
  BKK: {
    code: 'BKK',
    heroImage: HERO_FALLBACKS.intl,
    title: 'Sân bay Suvarnabhumi (BKK)',
    description:
      'Điểm đến và trung chuyển chính của Thái Lan, thuận tiện bay nội địa đến Phuket/Chiang Mai.',
    suggestedDestinations: [
      { countrySlug: 'thai-lan', locationSlug: 'bangkok', note: 'Chợ đêm – ẩm thực – shopping' },
      { countrySlug: 'thai-lan', locationSlug: 'phuket', note: 'Biển đảo, resort' },
      { countrySlug: 'thai-lan', locationSlug: 'chiang-mai', note: 'Chill, núi rừng, café' },
      { countrySlug: 'viet-nam', locationSlug: 'da-nang', note: 'Bay thẳng, nghỉ dưỡng' },
    ],
    tips: [
      'Airport Rail Link về trung tâm nhanh, hạn chế kẹt xe.',
      'Mua eSIM trước để có mạng ngay khi hạ cánh.',
    ],
  },
};

export function getAirportGuide(code: string): AirportGuide | null {
  return AIRPORT_GUIDES[code.toUpperCase()] ?? null;
}

export function sortAirportsForGuide(airports: Airport[]) {
  return [...airports].sort((a, b) => a.sortOrder - b.sortOrder || a.code.localeCompare(b.code));
}

