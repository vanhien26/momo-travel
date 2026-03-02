/* ══════════════════════════════════════════════
 * EXCHANGE RATE DATA – MoMo Travel Hub
 *
 * Programmatic SEO: Mỗi currency pair = 1 trang SEO
 * GEO Target: "tỷ giá [tiền tệ] hôm nay"
 * MOAT: Tỷ giá + CTA thanh toán MoMo closed-loop
 * ══════════════════════════════════════════════ */

export interface CurrencyPair {
  /** Mã tiền tệ quốc tế ISO 4217 */
  code: string;
  /** Tên tiếng Việt */
  name: string;
  /** Slug cho URL: /ty-gia/vnd-jpy */
  slug: string;
  /** Quốc gia liên quan */
  country: string;
  /** Emoji cờ quốc gia */
  flag: string;
  /** Ký hiệu tiền tệ */
  symbol: string;
  /** Tỷ giá tham khảo: 1 đơn vị ngoại tệ = ? VND */
  rateToVND: number;
  /** Biến động 24h (%) – positive = tăng */
  change24h: number;
  /** Tỷ giá mua vào (ngân hàng) */
  buyRate: number;
  /** Tỷ giá bán ra (ngân hàng) */
  sellRate: number;
  /** Tỷ giá MoMo (competitive advantage) */
  momoRate: number;
  /** Quốc gia có hỗ trợ thanh toán MoMo */
  momoPaySupported: boolean;
  /** Cập nhật lần cuối */
  lastUpdated: string;
  /** Mức phổ biến (dùng để sort) */
  popularity: number;
  /** Nội dung SEO cho trang chi tiết */
  seoTitle: string;
  seoDescription: string;
  /** Mẹo du lịch liên quan đến tiền tệ */
  travelTip: string;
}

/**
 * Exchange Rate Data
 * Nguồn tham khảo: Vietcombank + MoMo rate
 * Dữ liệu mẫu – production sẽ fetch từ API realtime
 */
export const CURRENCY_PAIRS: CurrencyPair[] = [
  {
    code: 'JPY',
    name: 'Yên Nhật',
    slug: 'vnd-jpy',
    country: 'Nhật Bản',
    flag: '🇯🇵',
    symbol: '¥',
    rateToVND: 168.5,
    change24h: 0.35,
    buyRate: 166.2,
    sellRate: 172.8,
    momoRate: 168.5,
    momoPaySupported: true,
    lastUpdated: '2025-03-02T10:00:00+07:00',
    popularity: 1,
    seoTitle: 'Tỷ giá Yên Nhật (JPY) hôm nay – Quy đổi VND/JPY cập nhật',
    seoDescription: 'Xem tỷ giá Yên Nhật JPY hôm nay. 1 Yên Nhật = bao nhiêu VND? Quy đổi nhanh VND sang JPY, so sánh tỷ giá ngân hàng và MoMo. Thanh toán tại Nhật bằng MoMo.',
    travelTip: 'Tại Nhật Bản, bạn có thể thanh toán bằng MoMo QR tại Don Quijote, 7-Eleven, Lawson, FamilyMart và hàng triệu cửa hàng khác. Tỷ giá MoMo thường tốt hơn đổi tiền mặt tại sân bay Narita.',
  },
  {
    code: 'KRW',
    name: 'Won Hàn Quốc',
    slug: 'vnd-krw',
    country: 'Hàn Quốc',
    flag: '🇰🇷',
    symbol: '₩',
    rateToVND: 17.8,
    change24h: -0.12,
    buyRate: 17.5,
    sellRate: 18.2,
    momoRate: 17.8,
    momoPaySupported: true,
    lastUpdated: '2025-03-02T10:00:00+07:00',
    popularity: 2,
    seoTitle: 'Tỷ giá Won Hàn Quốc (KRW) hôm nay – Quy đổi VND/KRW',
    seoDescription: 'Tỷ giá Won Hàn Quốc KRW hôm nay cập nhật. 1 Won = bao nhiêu đồng Việt Nam? Quy đổi VND sang KRW nhanh, so sánh tỷ giá MoMo vs ngân hàng.',
    travelTip: 'Tại Hàn Quốc, nhiều nơi chấp nhận thanh toán QR qua MoMo. Myeongdong, Gangnam, Hongdae đều có điểm chấp nhận MoMo Pay. Tỷ giá MoMo không phí ẩn, tốt hơn đổi tại Myeongdong.',
  },
  {
    code: 'THB',
    name: 'Baht Thái',
    slug: 'vnd-thb',
    country: 'Thái Lan',
    flag: '🇹🇭',
    symbol: '฿',
    rateToVND: 723,
    change24h: 0.08,
    buyRate: 718,
    sellRate: 735,
    momoRate: 723,
    momoPaySupported: true,
    lastUpdated: '2025-03-02T10:00:00+07:00',
    popularity: 3,
    seoTitle: 'Tỷ giá Baht Thái (THB) hôm nay – Quy đổi VND/THB cập nhật',
    seoDescription: 'Tỷ giá Baht Thái THB hôm nay. Đổi 1 triệu VND được bao nhiêu Baht? Quy đổi VND/THB, so sánh tỷ giá ngân hàng vs MoMo. Thanh toán tại Thái Lan.',
    travelTip: 'Thanh toán MoMo QR tại Thái Lan rất phổ biến — chợ đêm Chatuchak, Big C, Tesco Lotus, 7-Eleven đều chấp nhận. Tỷ giá MoMo tốt hơn đổi tiền tại sân bay Suvarnabhumi.',
  },
  {
    code: 'SGD',
    name: 'Đô la Singapore',
    slug: 'vnd-sgd',
    country: 'Singapore',
    flag: '🇸🇬',
    symbol: 'S$',
    rateToVND: 19250,
    change24h: 0.22,
    buyRate: 19100,
    sellRate: 19450,
    momoRate: 19250,
    momoPaySupported: true,
    lastUpdated: '2025-03-02T10:00:00+07:00',
    popularity: 4,
    seoTitle: 'Tỷ giá Đô Singapore (SGD) hôm nay – Quy đổi VND/SGD',
    seoDescription: 'Tỷ giá SGD hôm nay. 1 Đô Singapore bằng bao nhiêu VND? Xem bảng quy đổi VND/SGD cập nhật, so sánh tỷ giá MoMo với ngân hàng.',
    travelTip: 'Singapore là nơi thanh toán không tiền mặt (cashless) phổ biến nhất ĐNA. MoMo QR được chấp nhận rộng rãi tại nhà hàng, taxi, cửa hàng tiện lợi. Hầu như không cần đổi tiền mặt.',
  },
  {
    code: 'TWD',
    name: 'Đô la Đài Loan',
    slug: 'vnd-twd',
    country: 'Đài Loan',
    flag: '🇹🇼',
    symbol: 'NT$',
    rateToVND: 795,
    change24h: -0.05,
    buyRate: 788,
    sellRate: 808,
    momoRate: 795,
    momoPaySupported: false,
    lastUpdated: '2025-03-02T10:00:00+07:00',
    popularity: 5,
    seoTitle: 'Tỷ giá Đô Đài Loan (TWD) hôm nay – Quy đổi VND/TWD',
    seoDescription: 'Tỷ giá Đô Đài Loan TWD hôm nay. 1 Đô Đài Loan = bao nhiêu VND? Bảng quy đổi VND sang TWD cập nhật mới nhất.',
    travelTip: 'Đài Loan vẫn sử dụng tiền mặt nhiều ở chợ đêm và cửa hàng nhỏ. Nên đổi trước một ít TWD tại sân bay Taoyuan. Mua eSIM Đài Loan trên MoMo từ 190.000đ.',
  },
  {
    code: 'MYR',
    name: 'Ringgit Malaysia',
    slug: 'vnd-myr',
    country: 'Malaysia',
    flag: '🇲🇾',
    symbol: 'RM',
    rateToVND: 5820,
    change24h: 0.15,
    buyRate: 5780,
    sellRate: 5890,
    momoRate: 5820,
    momoPaySupported: true,
    lastUpdated: '2025-03-02T10:00:00+07:00',
    popularity: 6,
    seoTitle: 'Tỷ giá Ringgit Malaysia (MYR) hôm nay – Quy đổi VND/MYR',
    seoDescription: 'Tỷ giá Ringgit Malaysia MYR hôm nay. 1 Ringgit bằng bao nhiêu VND? So sánh tỷ giá ngân hàng và MoMo, quy đổi VND/MYR nhanh.',
    travelTip: 'Tại Malaysia, MoMo QR được chấp nhận tại nhiều cửa hàng tại Kuala Lumpur, Penang. Grab Malaysia cũng chấp nhận thanh toán MoMo.',
  },
  {
    code: 'USD',
    name: 'Đô la Mỹ',
    slug: 'vnd-usd',
    country: 'Hoa Kỳ',
    flag: '🇺🇸',
    symbol: '$',
    rateToVND: 25480,
    change24h: 0.1,
    buyRate: 25350,
    sellRate: 25680,
    momoRate: 25480,
    momoPaySupported: false,
    lastUpdated: '2025-03-02T10:00:00+07:00',
    popularity: 7,
    seoTitle: 'Tỷ giá USD hôm nay – Đô la Mỹ quy đổi VND cập nhật',
    seoDescription: '1 USD bằng bao nhiêu VND hôm nay? Tỷ giá Đô la Mỹ cập nhật từ Vietcombank, BIDV và MoMo. Bảng quy đổi USD/VND nhanh nhất.',
    travelTip: 'USD là tiền tệ tham chiếu quốc tế. Khi đi du lịch châu Á, đổi VND sang ngoại tệ địa phương qua MoMo thường có tỷ giá tốt hơn đổi qua USD trung gian.',
  },
  {
    code: 'CNY',
    name: 'Nhân dân tệ',
    slug: 'vnd-cny',
    country: 'Trung Quốc',
    flag: '🇨🇳',
    symbol: '¥',
    rateToVND: 3510,
    change24h: -0.08,
    buyRate: 3480,
    sellRate: 3560,
    momoRate: 3510,
    momoPaySupported: false,
    lastUpdated: '2025-03-02T10:00:00+07:00',
    popularity: 8,
    seoTitle: 'Tỷ giá Nhân dân tệ (CNY) hôm nay – Quy đổi VND/CNY',
    seoDescription: 'Tỷ giá CNY hôm nay. 1 Nhân dân tệ bằng bao nhiêu VND? Xem bảng quy đổi VND/CNY cập nhật, mẹo thanh toán khi du lịch Trung Quốc.',
    travelTip: 'Trung Quốc sử dụng WeChat Pay/Alipay là chủ yếu. Nên mang theo tiền mặt CNY hoặc thẻ Visa/Mastercard. Mua eSIM Trung Quốc trên MoMo giúp truy cập mạng không bị chặn.',
  },
];

/** Lấy currency pair theo slug */
export function getCurrencyBySlug(slug: string): CurrencyPair | undefined {
  return CURRENCY_PAIRS.find(c => c.slug === slug);
}

/** Format số tiền VND */
export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(Math.round(amount));
}

/** Format tỷ giá có dấu phẩy */
export function formatRate(rate: number): string {
  if (rate < 100) return rate.toFixed(2);
  return new Intl.NumberFormat('vi-VN').format(rate);
}
