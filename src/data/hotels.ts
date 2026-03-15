import type { Hotel } from '@/types'
import { getHotelPlaceholder } from '@/lib/images'

export const hotels: Hotel[] = [
  // ─── Đà Lạt ─────────────────────────────────────────────────────────────────
  {
    id: 'dalat-ana-mandara',
    name: 'Ana Mandara Villas Đà Lạt',
    slug: 'ana-mandara-dalat',
    destinationId: 'da-lat',
    city: 'Đà Lạt',
    stars: 5,
    priceFrom: 2_500_000,
    image: getHotelPlaceholder(0),
    amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'WiFi miễn phí', 'Xe đưa đón'],
    rating: 4.8,
    reviewCount: 1240,
    tag: 'luxury',
  },
  {
    id: 'dalat-romance',
    name: 'Đà Lạt Romance Hotel',
    slug: 'dalat-romance-hotel',
    destinationId: 'da-lat',
    city: 'Đà Lạt',
    stars: 4,
    priceFrom: 850_000,
    image: getHotelPlaceholder(1),
    amenities: ['WiFi miễn phí', 'Bãi đỗ xe', 'Nhà hàng', 'View thành phố'],
    rating: 4.5,
    reviewCount: 876,
    tag: 'best-value',
  },
  // ─── Phú Quốc ────────────────────────────────────────────────────────────────
  {
    id: 'pq-jw-marriott',
    name: 'JW Marriott Phú Quốc Emerald Bay',
    slug: 'jw-marriott-phu-quoc',
    destinationId: 'phu-quoc',
    city: 'Phú Quốc',
    stars: 5,
    priceFrom: 4_500_000,
    image: getHotelPlaceholder(2),
    amenities: ['Bãi biển riêng', 'Hồ bơi', 'Spa', 'Casino', 'Golf'],
    rating: 4.9,
    reviewCount: 2100,
    tag: 'luxury',
  },
  {
    id: 'pq-premier-residences',
    name: 'Premier Residences Phú Quốc',
    slug: 'premier-residences-phu-quoc',
    destinationId: 'phu-quoc',
    city: 'Phú Quốc',
    stars: 5,
    priceFrom: 1_800_000,
    image: getHotelPlaceholder(3),
    amenities: ['Hồ bơi', 'Bãi biển gần', 'Nhà hàng', 'WiFi'],
    rating: 4.6,
    reviewCount: 980,
    tag: 'flash-sale',
  },
  // ─── Đà Nẵng ─────────────────────────────────────────────────────────────────
  {
    id: 'dn-furama',
    name: 'Furama Resort Đà Nẵng',
    slug: 'furama-resort-danang',
    destinationId: 'da-nang',
    city: 'Đà Nẵng',
    stars: 5,
    priceFrom: 2_200_000,
    image: getHotelPlaceholder(0),
    amenities: ['Bãi biển riêng', 'Hồ bơi', 'Spa', 'Nhà hàng', 'Tennis'],
    rating: 4.7,
    reviewCount: 1560,
    tag: 'best-value',
  },
  {
    id: 'dn-pullman',
    name: 'Pullman Đà Nẵng Beach Resort',
    slug: 'pullman-danang',
    destinationId: 'da-nang',
    city: 'Đà Nẵng',
    stars: 5,
    priceFrom: 2_800_000,
    image: getHotelPlaceholder(1),
    amenities: ['Bãi biển trực tiếp', 'Hồ bơi vô cực', 'Spa', '5 nhà hàng'],
    rating: 4.8,
    reviewCount: 1890,
    tag: 'luxury',
  },
  // ─── Tokyo ────────────────────────────────────────────────────────────────────
  {
    id: 'tokyo-park-hyatt',
    name: 'Park Hyatt Tokyo',
    slug: 'park-hyatt-tokyo',
    destinationId: 'tokyo',
    city: 'Tokyo',
    stars: 5,
    priceFrom: 7_500_000,
    image: getHotelPlaceholder(2),
    amenities: ['Spa', 'Hồ bơi trong nhà', '3 nhà hàng', 'Gym', 'View núi Phú Sĩ'],
    rating: 4.9,
    reviewCount: 3200,
    tag: 'luxury',
  },
  {
    id: 'tokyo-ibis',
    name: 'ibis Tokyo Shinjuku',
    slug: 'ibis-tokyo-shinjuku',
    destinationId: 'tokyo',
    city: 'Tokyo',
    stars: 3,
    priceFrom: 1_200_000,
    image: getHotelPlaceholder(3),
    amenities: ['WiFi miễn phí', 'Nhà hàng', 'Vị trí trung tâm'],
    rating: 4.2,
    reviewCount: 2100,
    tag: 'best-value',
  },
  // ─── Bangkok ──────────────────────────────────────────────────────────────────
  {
    id: 'bkk-mandarin-oriental',
    name: 'Mandarin Oriental Bangkok',
    slug: 'mandarin-oriental-bangkok',
    destinationId: 'bangkok',
    city: 'Bangkok',
    stars: 5,
    priceFrom: 5_000_000,
    image: getHotelPlaceholder(0),
    amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'Ven sông Chao Phraya'],
    rating: 4.9,
    reviewCount: 4500,
    tag: 'luxury',
  },
  {
    id: 'bkk-novotel',
    name: 'Novotel Bangkok Sukhumvit 20',
    slug: 'novotel-bangkok-sukhumvit',
    destinationId: 'bangkok',
    city: 'Bangkok',
    stars: 4,
    priceFrom: 1_100_000,
    image: getHotelPlaceholder(1),
    amenities: ['Hồ bơi', 'Nhà hàng', 'WiFi', 'Gym', 'Gần BTS'],
    rating: 4.4,
    reviewCount: 1800,
    tag: 'flash-sale',
  },
]

export function getHotelsByDestination(destinationId: string): Hotel[] {
  return hotels.filter((h) => h.destinationId === destinationId)
}

export function getFeaturedHotels(limit = 6): Hotel[] {
  return hotels.filter((h) => h.tag).slice(0, limit)
}

export function getFlashSaleHotels(): Hotel[] {
  return hotels.filter((h) => h.tag === 'flash-sale')
}
