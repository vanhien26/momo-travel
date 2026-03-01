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

/** Điểm đến du lịch */
export interface Destination {
  id: string;
  name: string;
  country: string;
  slug: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
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
