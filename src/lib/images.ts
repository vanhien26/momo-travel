// Unsplash image helpers – sử dụng ảnh royalty-free cho placeholder

const UNSPLASH_BASE = 'https://images.unsplash.com'

export const destinationImages: Record<string, string> = {
  'da-lat':
    `${UNSPLASH_BASE}/photo-1559592413-7cec4d0cae2b?w=800&q=80`,
  'phu-quoc':
    `${UNSPLASH_BASE}/photo-1573455494060-c5595004fb6c?w=800&q=80`,
  'da-nang':
    `${UNSPLASH_BASE}/photo-1554019947-e83d5cbe9eb7?w=800&q=80`,
  'sapa':
    `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=800&q=80`,
  'ha-noi':
    `${UNSPLASH_BASE}/photo-1583417319070-4a69db38a482?w=800&q=80`,
  'hoi-an':
    `${UNSPLASH_BASE}/photo-1559592413-7cec4d0cae2b?w=800&q=80`,
  'nha-trang':
    `${UNSPLASH_BASE}/photo-1528127269322-539801943592?w=800&q=80`,
  'tokyo':
    `${UNSPLASH_BASE}/photo-1540959733332-eab4deabeeaf?w=800&q=80`,
  'osaka':
    `${UNSPLASH_BASE}/photo-1590559899731-a382839e5549?w=800&q=80`,
  'kyoto':
    `${UNSPLASH_BASE}/photo-1493976040374-85c8e12f0c0e?w=800&q=80`,
  'bangkok':
    `${UNSPLASH_BASE}/photo-1508009603885-50cf7c579365?w=800&q=80`,
  'phuket':
    `${UNSPLASH_BASE}/photo-1589394815804-964ed0be2eb5?w=800&q=80`,
  'chiang-mai':
    `${UNSPLASH_BASE}/photo-1552465011-b4e21bf6e79a?w=800&q=80`,
  'seoul':
    `${UNSPLASH_BASE}/photo-1538485399081-7191377e8241?w=800&q=80`,
  'busan':
    `${UNSPLASH_BASE}/photo-1583417319070-4a69db38a482?w=800&q=80`,
  'singapore':
    `${UNSPLASH_BASE}/photo-1525625293386-3f8f99389edd?w=800&q=80`,
  'bali':
    `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=800&q=80`,
  'paris':
    `${UNSPLASH_BASE}/photo-1502602898657-3e91760cbb34?w=800&q=80`,
}

export const countryImages: Record<string, string> = {
  'viet-nam':
    `${UNSPLASH_BASE}/photo-1583417319070-4a69db38a482?w=800&q=80`,
  'nhat-ban':
    `${UNSPLASH_BASE}/photo-1540959733332-eab4deabeeaf?w=800&q=80`,
  'thai-lan':
    `${UNSPLASH_BASE}/photo-1508009603885-50cf7c579365?w=800&q=80`,
  'han-quoc':
    `${UNSPLASH_BASE}/photo-1538485399081-7191377e8241?w=800&q=80`,
}

export function getDestinationImage(slug: string): string {
  return destinationImages[slug] ?? `${UNSPLASH_BASE}/photo-1488085061387-422e29b40080?w=800&q=80`
}

export function getCountryImage(slug: string): string {
  return countryImages[slug] ?? `${UNSPLASH_BASE}/photo-1488085061387-422e29b40080?w=800&q=80`
}

export function getHotelPlaceholder(index = 0): string {
  const hotels = [
    `${UNSPLASH_BASE}/photo-1566073771259-6a8506099945?w=600&q=80`,
    `${UNSPLASH_BASE}/photo-1582719508461-905c673771fd?w=600&q=80`,
    `${UNSPLASH_BASE}/photo-1571896349842-33c89424de2d?w=600&q=80`,
    `${UNSPLASH_BASE}/photo-1551882547-ff40c4fe1fa7?w=600&q=80`,
  ]
  return hotels[index % hotels.length]
}

export function getBlogPlaceholder(index = 0): string {
  const blogs = [
    `${UNSPLASH_BASE}/photo-1488085061387-422e29b40080?w=800&q=80`,
    `${UNSPLASH_BASE}/photo-1467269204594-9661b134dd2b?w=800&q=80`,
    `${UNSPLASH_BASE}/photo-1503220317375-aaad61436b1b?w=800&q=80`,
    `${UNSPLASH_BASE}/photo-1476514525535-07fb3b4ae5f1?w=800&q=80`,
    `${UNSPLASH_BASE}/photo-1530789253388-582c481c54b0?w=800&q=80`,
    `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=800&q=80`,
  ]
  return blogs[index % blogs.length]
}
