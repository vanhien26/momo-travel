/* ══════════════════════════════════════════════
 * CONSTANTS – MoMo Travel Hub
 *
 * Centralized content & configuration data.
 * Cấu trúc này cho phép:
 * 1. CMS migration dễ dàng (swap data source)
 * 2. Programmatic SEO (generate pages from data)
 * 3. i18n readiness (wrap with translation keys)
 * ══════════════════════════════════════════════ */

import type {
  TravelService,
  FAQItem,
  ComparisonRow,
  Testimonial,
  UseCase,
  NavLink,
} from '@/types';

/* ── Site Configuration ──────────────────────── */
export const SITE_CONFIG = {
  name: 'MoMo Travel Hub',
  tagline: 'Du lịch châu Á – Thanh toán thông minh cùng MoMo',
  url: 'https://travel.momo.vn',
  locale: 'vi_VN',
  language: 'vi',
  logo: '/images/momo-logo.svg',
  /** Deep link scheme cho App MoMo */
  appDeepLink: '/',
  appStoreUrl: 'https://apps.apple.com/vn/app/momo/id918751511',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mservice.momotransfer',
} as const;

/* ── Entity Definition – SEO/GEO Critical ────── */
/**
 * ENTITY-DRIVEN SEO:
 * Định nghĩa MoMo như một thực thể (Entity) rõ ràng
 * để Google Knowledge Graph và AI Search hiểu
 * mối quan hệ MoMo ↔ Travel Services.
 */
export const MOMO_ENTITY = {
  name: 'MoMo',
  legalName: 'Công ty Cổ Phần Dịch Vụ Di Động Trực Tuyến (M_Service)',
  type: 'FinancialService',
  url: 'https://momo.vn',
  sameAs: [
    'https://www.facebook.com/MoMo.vn',
    'https://www.youtube.com/@MoMoVietnam',
    'https://vi.wikipedia.org/wiki/MoMo_(ứng_dụng)',
  ],
  address: {
    streetAddress: 'Tầng 5, Tòa nhà Phú Mỹ Hưng, 8 Hoàng Văn Thái',
    addressLocality: 'Quận 7, TP. Hồ Chí Minh',
    addressCountry: 'VN',
    postalCode: '700000',
  },
  contactPoint: {
    telephone: '1900-545-496',
    contactType: 'customer service',
    areaServed: 'VN',
    availableLanguage: 'Vietnamese',
  },
} as const;

/* ── Navigation ─────────────────────────────── */
export const NAV_LINKS: NavLink[] = [
  { label: 'Điểm đến', href: '/diem-den' },
  { label: 'SIM Du lịch', href: '/esim' },
  { label: 'Vé máy bay', href: '/ve-may-bay' },
  { label: 'Khách sạn', href: '/khach-san' },
  { label: 'Thanh toán', href: '#thanh-toan' },
  { label: 'So sánh', href: '#so-sanh' },
  { label: 'FAQ', href: '#faq' },
];

/* ── Travel Services (Value Proposition) ─────── */
export const TRAVEL_SERVICES: TravelService[] = [
  {
    id: 'sim-du-lich',
    title: 'SIM Du lịch Quốc tế',
    description:
      'Mua SIM data du lịch ngay trên MoMo. Kích hoạt tức thì, phủ sóng 4G/5G tại hơn 30 quốc gia châu Á. Giá chỉ từ 99.000đ cho 7 ngày không giới hạn data.',
    icon: '📡',
    href: '/sim-du-lich',
    features: [
      'Phủ sóng 4G/5G tại 30+ quốc gia châu Á',
      'Kích hoạt tức thì, không cần thay SIM vật lý',
      'Gói 7 ngày unlimited data từ 99.000đ',
      'eSIM tiện lợi, nhận qua MoMo trong 60 giây',
    ],
  },
  {
    id: 've-bay',
    title: 'Đặt Vé Máy Bay',
    description:
      'So sánh giá vé từ Vietnam Airlines, VietJet, Bamboo Airways và 50+ hãng bay quốc tế. Thanh toán 1 chạm, nhận e-ticket ngay trên MoMo.',
    icon: '✈️',
    href: '/ve-may-bay',
    features: [
      'So sánh giá từ 50+ hãng bay trong & ngoài nước',
      'Thanh toán 1 chạm bằng ví MoMo',
      'E-ticket gửi ngay, không cần in',
      'Hoàn tiền lên đến 5% vào ví MoMo',
    ],
  },
  {
    id: 'khach-san',
    title: 'Đặt Khách Sạn',
    description:
      'Hơn 200.000+ khách sạn, resort, homestay tại châu Á. Giá tốt nhất thị trường, xác nhận tức thì, thanh toán dễ dàng qua MoMo.',
    icon: '🏨',
    href: '/khach-san',
    features: [
      '200.000+ lựa chọn lưu trú toàn châu Á',
      'Giá cam kết tốt nhất hoặc hoàn tiền chênh lệch',
      'Xác nhận đặt phòng tức thì',
      'Miễn phí hủy phòng tại nhiều khách sạn',
    ],
  },
  {
    id: 'thanh-toan',
    title: 'Thanh Toán Khắp Châu Á',
    description:
      'Quẹt MoMo thanh toán tại hàng triệu điểm chấp nhận ở Nhật, Hàn, Thái, Singapore, Malaysia. Quy đổi tỷ giá minh bạch, không phí ẩn.',
    icon: '💳',
    href: '/thanh-toan',
    features: [
      'Thanh toán tại hàng triệu điểm bán ở châu Á',
      'Tỷ giá quy đổi minh bạch, cập nhật realtime',
      'Không phí giao dịch quốc tế ẩn',
      'Quản lý chi tiêu du lịch ngay trên app',
    ],
  },
];

/* ── Use Cases ──────────────────────────────── */
export const USE_CASES: UseCase[] = [
  {
    id: 'backpacker',
    title: 'Backpacker Châu Á',
    scenario:
      'Bạn lên kế hoạch khám phá Thái Lan – Campuchia – Việt Nam trong 3 tuần. Cần SIM data xuyên suốt, vé bay giá rẻ và thanh toán linh hoạt.',
    solution:
      'MoMo cung cấp SIM eSIM data roaming 3 nước, đặt vé bay nội địa giá tốt nhất, và thanh toán QR tại chợ đêm Bangkok hay Siem Reap.',
    icon: '🎒',
    ctaText: 'Khám phá ngay',
    ctaHref: '/ve-may-bay',
  },
  {
    id: 'family',
    title: 'Du Lịch Gia Đình',
    scenario:
      'Cả nhà 4 người muốn đi Nhật Bản mùa hoa anh đào. Cần đặt khách sạn family room, SIM cho cả nhà và thanh toán thuận tiện tại Nhật.',
    solution:
      'Đặt khách sạn family-friendly qua MoMo với giá cam kết tốt nhất, mua 4 SIM data Nhật Bản giá combo, quẹt MoMo thanh toán ở Don Quijote hay 7-Eleven.',
    icon: '👨‍👩‍👧‍👦',
    ctaText: 'Lên kế hoạch',
    ctaHref: '/khach-san',
  },
  {
    id: 'business',
    title: 'Công Tác Nước Ngoài',
    scenario:
      'Chuyến công tác Singapore 5 ngày, cần internet ổn định cho họp chuyên online, khách sạn gần trung tâm và thanh toán nhanh không rắc rối.',
    solution:
      'SIM eSIM Singapore kích hoạt tức thì, khách sạn CBD xác nhận ngay, thanh toán QR tại Grab, taxi và nhà hàng khắp Singapore.',
    icon: '💼',
    ctaText: 'Đặt ngay',
    ctaHref: '/sim-du-lich',
  },
  {
    id: 'honeymoon',
    title: 'Tuần Trăng Mật',
    scenario:
      'Cặp đôi mới cưới muốn có chuyến trăng mật lãng mạn ở Bali hoặc Maldives. Cần resort đẹp, không lo lắng về thanh toán.',
    solution:
      'Đặt resort 5 sao qua MoMo với ưu đãi đặc biệt cho cặp đôi, mua SIM data Indonesia, thanh toán mọi nơi từ spa đến nhà hàng.',
    icon: '💑',
    ctaText: 'Tìm resort',
    ctaHref: '/khach-san',
  },
];

/* ── Testimonials (Social Proof) ────────────── */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Minh Anh',
    avatar: '/images/avatars/user-1.webp',
    role: 'Travel Blogger',
    content:
      'Trước đây mỗi lần đi Thái hay Nhật là phải lo đổi tiền, mua SIM riêng. Giờ mở MoMo là xong hết, tiện không tưởng.',
    rating: 5,
    destination: 'Nhật Bản',
  },
  {
    id: '2',
    name: 'Hoàng Dũng',
    avatar: '/images/avatars/user-2.webp',
    role: 'Doanh nhân',
    content:
      'Công tác Singapore thường xuyên. MoMo cho mình thanh toán taxi, ăn uống mà không cần mang theo nhiều cash. Tỷ giá rõ ràng.',
    rating: 5,
    destination: 'Singapore',
  },
  {
    id: '3',
    name: 'Thu Hà',
    avatar: '/images/avatars/user-3.webp',
    role: 'Mẹ bỉm sữa',
    content:
      'Đặt khách sạn family room ở Seoul qua MoMo, giá rẻ hơn booking trực tiếp. Còn được hoàn tiền 3% nữa.',
    rating: 5,
    destination: 'Hàn Quốc',
  },
  {
    id: '4',
    name: 'Bảo Trâm',
    avatar: '/images/avatars/user-4.webp',
    role: 'Sinh viên',
    content:
      'eSIM du lịch Thái Lan 99k cho 7 ngày, kích hoạt trên app luôn. Đỡ phải xếp hàng mua SIM ở sân bay.',
    rating: 5,
    destination: 'Thái Lan',
  },
];

/* ── Comparison Table Data ──────────────────── */
export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Mua SIM du lịch trực tuyến',
    momo: true,
    traditional: false,
    otherApp: 'Có (hạn chế)',
  },
  {
    feature: 'eSIM kích hoạt tức thì',
    momo: true,
    traditional: false,
    otherApp: false,
  },
  {
    feature: 'Đặt vé bay so sánh giá',
    momo: true,
    traditional: 'Qua đại lý',
    otherApp: true,
  },
  {
    feature: 'Đặt khách sạn cam kết giá tốt nhất',
    momo: true,
    traditional: false,
    otherApp: true,
  },
  {
    feature: 'Thanh toán QR tại nước ngoài',
    momo: 'Hàng triệu điểm châu Á',
    traditional: false,
    otherApp: 'Hạn chế',
  },
  {
    feature: 'Hoàn tiền (cashback) du lịch',
    momo: 'Lên đến 5%',
    traditional: false,
    otherApp: '1-2%',
  },
  {
    feature: 'Quản lý chi tiêu du lịch',
    momo: true,
    traditional: false,
    otherApp: false,
  },
  {
    feature: 'Tỷ giá minh bạch, không phí ẩn',
    momo: true,
    traditional: 'Phí đổi tiền cao',
    otherApp: 'Có phí ẩn',
  },
];

/* ── FAQ Data – Cấu trúc cho Schema + UI ────── */
/**
 * GEO STRATEGY:
 * Mỗi FAQ được viết theo format Answer-First
 * để AI Search dễ trích xuất featured snippet.
 * Câu đầu tiên trong answer = direct answer.
 */
export const FAQ_DATA: FAQItem[] = [
  {
    question: 'MoMo có thể thanh toán ở những nước nào tại châu Á?',
    answer:
      'MoMo cho phép thanh toán QR tại hàng triệu điểm bán ở Nhật Bản, Hàn Quốc, Thái Lan, Singapore, Malaysia, Campuchia và nhiều quốc gia khác tại châu Á. Bạn chỉ cần mở app MoMo, quét mã QR tại cửa hàng và thanh toán bằng số dư ví hoặc thẻ liên kết. Tỷ giá được quy đổi tự động theo rate thị trường, không có phí giao dịch quốc tế ẩn.',
  },
  {
    question: 'Cách mua SIM du lịch quốc tế trên MoMo như thế nào?',
    answer:
      'Bạn mua SIM du lịch quốc tế trên MoMo chỉ trong 3 bước: Mở app MoMo → Chọn "SIM Du lịch" → Chọn quốc gia và gói data → Thanh toán. Với eSIM, bạn nhận mã kích hoạt trong vòng 60 giây qua app mà không cần thay SIM vật lý. Gói data phủ sóng 4G/5G tại hơn 30 quốc gia, giá từ 99.000đ cho 7 ngày unlimited.',
  },
  {
    question: 'Đặt vé máy bay trên MoMo có rẻ hơn các nền tảng khác không?',
    answer:
      'MoMo tổng hợp giá vé từ 50+ hãng bay bao gồm Vietnam Airlines, VietJet, Bamboo Airways và các hãng quốc tế, giúp bạn so sánh và chọn giá tốt nhất. Ngoài ra, MoMo thường xuyên có chương trình hoàn tiền lên đến 5% khi đặt vé bay, tích điểm thưởng và voucher giảm giá độc quyền chỉ có trên nền tảng MoMo.',
  },
  {
    question: 'Đặt khách sạn qua MoMo có được miễn phí hủy không?',
    answer:
      'Có, rất nhiều khách sạn trên MoMo cho phép miễn phí hủy phòng. Khi tìm kiếm khách sạn, bạn có thể bật bộ lọc "Miễn phí hủy" để chỉ hiển thị các lựa chọn linh hoạt. MoMo cũng cam kết giá tốt nhất thị trường – nếu bạn tìm được giá rẻ hơn ở nền tảng khác, MoMo sẽ hoàn tiền phần chênh lệch.',
  },
  {
    question: 'MoMo có an toàn khi thanh toán ở nước ngoài không?',
    answer:
      'MoMo đạt chứng nhận bảo mật quốc tế PCI DSS Level 1 – tiêu chuẩn cao nhất ngành thanh toán. Mọi giao dịch quốc tế được mã hóa end-to-end, xác thực bằng vân tay/FaceID, và có hệ thống chống gian lận AI realtime. Bạn cũng có thể đặt hạn mức chi tiêu du lịch và nhận thông báo mỗi giao dịch.',
  },
  {
    question: 'Tỷ giá quy đổi khi thanh toán bằng MoMo ở nước ngoài tính thế nào?',
    answer:
      'Tỷ giá quy đổi khi dùng MoMo ở nước ngoài được cập nhật theo rate thị trường realtime, hiển thị rõ ràng trước khi bạn xác nhận thanh toán. MoMo không thu phí giao dịch quốc tế ẩn hay markup tỷ giá. Bạn có thể xem lịch sử tỷ giá và quản lý chi tiêu ngoại tệ trực tiếp trong app.',
  },
];

/* ── Footer SEO Links ────────────────────────── */
export const FOOTER_LINKS = {
  services: [
    { label: 'SIM Du lịch Nhật Bản', href: '/sim/nhat-ban' },
    { label: 'SIM Du lịch Hàn Quốc', href: '/sim/han-quoc' },
    { label: 'SIM Du lịch Thái Lan', href: '/sim/thai-lan' },
    { label: 'SIM Du lịch Singapore', href: '/sim/singapore' },
    { label: 'Vé bay Đà Nẵng', href: '/ve-bay/da-nang' },
    { label: 'Vé bay Phú Quốc', href: '/ve-bay/phu-quoc' },
    { label: 'Khách sạn Đà Lạt', href: '/khach-san/da-lat' },
    { label: 'Khách sạn Nha Trang', href: '/khach-san/nha-trang' },
  ],
  destinations: [
    { label: 'Du lịch Nhật Bản', href: '/diem-den/nhat-ban' },
    { label: 'Du lịch Hàn Quốc', href: '/diem-den/han-quoc' },
    { label: 'Du lịch Thái Lan', href: '/diem-den/thai-lan' },
    { label: 'Du lịch Singapore', href: '/diem-den/singapore' },
    { label: 'Du lịch Bali', href: '/diem-den/bali' },
    { label: 'Du lịch Đài Loan', href: '/diem-den/dai-loan' },
  ],
  company: [
    { label: 'Về MoMo', href: 'https://momo.vn/gioi-thieu' },
    { label: 'Chính sách bảo mật', href: 'https://momo.vn/chinh-sach-bao-mat' },
    { label: 'Điều khoản sử dụng', href: 'https://momo.vn/dieu-khoan-su-dung' },
    { label: 'Liên hệ hỗ trợ', href: 'https://momo.vn/lien-he' },
  ],
} as const;
