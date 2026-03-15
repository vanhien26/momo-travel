// ─── Destination ────────────────────────────────────────────────────────────
export interface Destination {
  id: string
  slug: string
  name: string
  country: string
  countryCode: string
  region: 'domestic' | 'international'
  description: string
  shortDesc: string
  image: string
  flightFrom: number   // giá vé từ (VNĐ)
  hotelFrom: number    // giá khách sạn từ (VNĐ/đêm)
  hasEsim: boolean
  bestSeason: string
  highlights: string[]
  tags: string[]
  popular: boolean
}

export interface Country {
  id: string
  slug: string
  name: string
  code: string          // ISO 3166-1 alpha-2
  flag: string          // emoji or URL
  landmarkCount: number
  destinations: string[] // destination IDs
  description: string
  image: string
}

// ─── Airport ────────────────────────────────────────────────────────────────
export interface Airport {
  iata: string
  name: string
  city: string
  country: string
  countryCode: string
  popular: boolean
}

export interface AirportGuide {
  iata: string
  airportName: string
  city: string
  intro: string
  terminals: string[]
  tips: string[]
  nearbyHotels: string[]
  transport: string[]
}

// ─── Flight ──────────────────────────────────────────────────────────────────
export interface FlightRoute {
  from: string   // IATA
  to: string     // IATA
  priceFrom: number
  airline: string
  duration: string
  popular: boolean
}

// ─── Hotel ──────────────────────────────────────────────────────────────────
export interface Hotel {
  id: string
  name: string
  slug: string
  destinationId: string
  city: string
  stars: number
  priceFrom: number   // VNĐ/đêm
  image: string
  amenities: string[]
  rating: number
  reviewCount: number
  tag?: string        // 'flash-sale' | 'best-value' | 'luxury'
}

// ─── eSIM ────────────────────────────────────────────────────────────────────
export interface EsimCountry {
  id: string
  slug: string
  name: string
  flag: string
  region: string
  plans: EsimPlan[]
  popular: boolean
}

export interface EsimPlan {
  id: string
  name: string
  data: string       // e.g. '3GB', '10GB', 'Không giới hạn'
  days: number
  price: number      // VNĐ
  speed: string      // e.g. '4G LTE'
  carrier: string
  popular?: boolean
}

// ─── Exchange Rates ──────────────────────────────────────────────────────────
export interface Currency {
  code: string
  name: string
  namVi: string
  symbol: string
  flag: string
  rate: number       // VNĐ per 1 unit
  change: number     // % change today
  trend: 'up' | 'down' | 'stable'
}

// ─── Blog ────────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  category: BlogCategory
  tags: string[]
  image: string
  author: Author
  publishedAt: string  // ISO date
  readTime: number     // phút
  featured: boolean
  views?: number
}

export type BlogCategory =
  | 'kinh-nghiem'
  | 'diem-den'
  | 'am-thuc'
  | 've-may-bay'
  | 'khach-san'
  | 'esim'
  | 'ty-gia'
  | 'cong-nghe'

export interface Author {
  name: string
  avatar?: string
  role: string
}

// ─── Promotion ───────────────────────────────────────────────────────────────
export interface Promotion {
  id: string
  title: string
  subtitle: string
  discount: string
  code?: string
  category: 'esim' | 've-may-bay' | 'khach-san' | 'ty-gia'
  gradient: string
  icon: string
  expiry: string
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  content: string
  destination: string
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

// ─── Payment ─────────────────────────────────────────────────────────────────
export interface PaymentMethod {
  id: string
  name: string
  icon: string
  description: string
  fee: string
  supported: boolean
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  icon?: string
  children?: NavItem[]
}
