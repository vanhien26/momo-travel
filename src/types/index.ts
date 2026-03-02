/* ══════════════════════════════════════════════
 * TYPE DEFINITIONS – MoMo Travel Hub
 * Centralized types cho type-safety toàn dự án
 * ══════════════════════════════════════════════ */

/** Dịch vụ du lịch MoMo cung cấp */
export interface TravelService {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji hoặc SVG path
  href: string;
  features: string[];
}

/** Địa danh cụ thể (city/region) thuộc một quốc gia – dùng cho COUNTRIES */
export interface Location {
  name: string;
  slug: string;
  image: string;
  /** Giá vé máy bay thấp nhất đến địa danh này */
  flightPrice: number;
  /** Giá khách sạn trung bình/đêm tại địa danh này */
  hotelPrice: number;
  /** Giá eSIM thấp nhất cho quốc gia/địa danh này */
  eSimPrice: number;
  description: string;
  /** Đánh dấu địa danh nổi bật để ưu tiên hiển thị */
  isPopular?: boolean;
}

/** Quốc gia – hub chính cho /diem-den */
export interface Country {
  name: string;
  slug: string;
  description: string;
  /** Ảnh hero đại diện cho quốc gia */
  heroImage: string;
  /** Quốc gia thuộc Châu Á hay không – phục vụ logic GEO */
  isAsia: boolean;
  /** Các quốc gia Châu Á được ưu tiên hỗ trợ thanh toán MoMo */
  supportsMoMoPayment: boolean;
  /** Danh sách các địa danh thuộc quốc gia này */
  locations: Location[];
}

/** FAQ item – dùng cho cả UI và Schema markup */
export interface FAQItem {
  question: string;
  answer: string;
}

/** So sánh dịch vụ */
export interface ComparisonRow {
  feature: string;
  momo: string | boolean;
  traditional: string | boolean;
  otherApp: string | boolean;
}

/** Trust Signal / Social Proof */
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
  destination: string;
}

/** Use Case */
export interface UseCase {
  id: string;
  title: string;
  scenario: string;
  solution: string;
  icon: string;
  ctaText: string;
  ctaHref: string;
}

/** Breadcrumb item cho navigation + Schema */
export interface BreadcrumbItem {
  name: string;
  href: string;
}

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

/** Metadata config cho dynamic pages */
export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
}
