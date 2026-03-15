import type { BlogPost } from '@/types'
import { getBlogPlaceholder } from '@/lib/images'

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'kinh-nghiem-du-lich-nhat-ban-tu-tuc',
    title: 'Kinh nghiệm du lịch Nhật Bản tự túc 2025 – Chi phí và lịch trình chi tiết',
    excerpt:
      'Hướng dẫn đầy đủ cho chuyến du lịch Nhật Bản tự túc: từ xin visa, đặt vé máy bay giá rẻ, mua eSIM đến lên lịch trình tiết kiệm mà vẫn tận hưởng tối đa.',
    category: 'kinh-nghiem',
    tags: ['nhật bản', 'tự túc', 'tiết kiệm', 'esim'],
    image: getBlogPlaceholder(0),
    author: { name: 'Minh Huy', role: 'Travel Writer', avatar: '' },
    publishedAt: '2025-02-10',
    readTime: 12,
    featured: true,
    views: 45_600,
  },
  {
    id: '2',
    slug: 'top-10-bai-bien-dep-nhat-viet-nam',
    title: 'Top 10 bãi biển đẹp nhất Việt Nam năm 2025',
    excerpt:
      'Từ Phú Quốc đến Côn Đảo, từ Mỹ Khê đến Bãi Dài – điểm qua 10 bãi biển đẹp nhất Việt Nam phù hợp mọi ngân sách.',
    category: 'diem-den',
    tags: ['biển', 'việt nam', 'phú quốc', 'đà nẵng'],
    image: getBlogPlaceholder(1),
    author: { name: 'Thu Hà', role: 'Content Creator', avatar: '' },
    publishedAt: '2025-02-05',
    readTime: 8,
    featured: true,
    views: 38_200,
  },
  {
    id: '3',
    slug: 'mua-esim-du-lich-nuoc-ngoai-o-dau',
    title: 'Mua eSIM du lịch nước ngoài ở đâu? So sánh giá và chất lượng 2025',
    excerpt:
      'So sánh toàn diện các nhà cung cấp eSIM du lịch: MoMo, Airalo, Holafly – giá cả, tốc độ mạng và độ phủ sóng.',
    category: 'esim',
    tags: ['esim', 'du lịch nước ngoài', 'internet', 'mạng di động'],
    image: getBlogPlaceholder(2),
    author: { name: 'Khánh Linh', role: 'Tech Reviewer', avatar: '' },
    publishedAt: '2025-01-28',
    readTime: 6,
    featured: false,
    views: 22_100,
  },
  {
    id: '4',
    slug: 'am-thuc-thai-lan-nhung-mon-khong-the-bo-qua',
    title: 'Ẩm thực Thái Lan – 20 món không thể bỏ qua khi du lịch Bangkok',
    excerpt:
      'Pad Thai, Tom Yum, Mango Sticky Rice... Khám phá 20 món ăn đường phố và nhà hàng Thái Lan mà bạn nhất định phải thử.',
    category: 'am-thuc',
    tags: ['thái lan', 'ẩm thực', 'bangkok', 'street food'],
    image: getBlogPlaceholder(3),
    author: { name: 'Bảo Ngọc', role: 'Food Blogger', avatar: '' },
    publishedAt: '2025-01-20',
    readTime: 10,
    featured: true,
    views: 31_400,
  },
  {
    id: '5',
    slug: 'cach-dat-ve-may-bay-gia-re-tren-momo',
    title: 'Cách đặt vé máy bay giá rẻ trên MoMo – Mẹo tiết kiệm đến 40%',
    excerpt:
      'Bí quyết săn vé máy bay giá rẻ trên ứng dụng MoMo: thời điểm mua, flash sale, cashback và các mẹo ít người biết.',
    category: 've-may-bay',
    tags: ['vé máy bay', 'giá rẻ', 'momo', 'flash sale'],
    image: getBlogPlaceholder(4),
    author: { name: 'Tuấn Anh', role: 'Travel Hacker', avatar: '' },
    publishedAt: '2025-01-15',
    readTime: 7,
    featured: false,
    views: 28_900,
  },
  {
    id: '6',
    slug: 'hanh-trinh-sapa-4-ngay-3-dem',
    title: 'Hành trình Sapa 4 ngày 3 đêm – Lịch trình chi tiết và chi phí thực tế',
    excerpt:
      'Khám phá Sapa theo hành trình 4N3Đ: trekking Fansipan, ghé thăm bản làng dân tộc và chụp ảnh ruộng bậc thang đẹp nhất.',
    category: 'diem-den',
    tags: ['sapa', 'trekking', 'fansipan', 'lịch trình'],
    image: getBlogPlaceholder(5),
    author: { name: 'Hoàng Nam', role: 'Adventure Traveler', avatar: '' },
    publishedAt: '2025-01-08',
    readTime: 11,
    featured: false,
    views: 19_700,
  },
  {
    id: '7',
    slug: 'ty-gia-usd-vnd-hom-nay',
    title: 'Tỷ giá USD/VND hôm nay và cách đổi tiền tiết kiệm nhất khi đi du lịch',
    excerpt:
      'Theo dõi tỷ giá USD/VND cập nhật và so sánh nơi đổi ngoại tệ tốt nhất: ngân hàng, tiệm vàng hay ứng dụng MoMo?',
    category: 'ty-gia',
    tags: ['tỷ giá', 'usd', 'vnd', 'đổi tiền'],
    image: getBlogPlaceholder(0),
    author: { name: 'Thanh Mai', role: 'Finance Writer', avatar: '' },
    publishedAt: '2025-01-03',
    readTime: 5,
    featured: false,
    views: 15_300,
  },
  {
    id: '8',
    slug: 'khach-san-phu-quoc-view-bien-dep-nhat',
    title: 'Top 8 khách sạn Phú Quốc có view biển đẹp nhất – Từ bình dân đến sang chảnh',
    excerpt:
      'Tổng hợp 8 khách sạn Phú Quốc có tầm nhìn ra biển tuyệt đẹp phù hợp mọi ngân sách, từ 500K đến 5 triệu/đêm.',
    category: 'khach-san',
    tags: ['khách sạn', 'phú quốc', 'view biển', 'resort'],
    image: getBlogPlaceholder(1),
    author: { name: 'Lan Anh', role: 'Hotel Reviewer', avatar: '' },
    publishedAt: '2024-12-28',
    readTime: 9,
    featured: false,
    views: 24_500,
  },
]

export function getFeaturedPosts(limit = 4): BlogPost[] {
  return blogPosts.filter((p) => p.featured).slice(0, limit)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, limit)
}

export const blogCategories = [
  { id: 'kinh-nghiem', label: 'Kinh nghiệm' },
  { id: 'diem-den', label: 'Điểm đến' },
  { id: 'am-thuc', label: 'Ẩm thực' },
  { id: 've-may-bay', label: 'Vé máy bay' },
  { id: 'khach-san', label: 'Khách sạn' },
  { id: 'esim', label: 'eSIM' },
  { id: 'ty-gia', label: 'Tỷ giá' },
]
