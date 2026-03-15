import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Eye, ArrowRight } from 'lucide-react'
import { blogPosts, getFeaturedPosts, blogCategories } from '@/data/blog'
import { SITE_NAME } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Blog Du Lịch – Kinh Nghiệm, Điểm Đến, Ẩm Thực',
  description:
    'Blog du lịch MoMo – Kinh nghiệm du lịch Nhật Bản, Hàn Quốc, Thái Lan, mẹo đặt vé rẻ, hướng dẫn mua eSIM và nhiều hơn nữa.',
  keywords: ['blog du lịch', 'kinh nghiệm du lịch', 'mẹo du lịch', 'điểm đến'],
  openGraph: { title: `Blog Du Lịch | ${SITE_NAME}` },
}

const featured = getFeaturedPosts(3)
const categoryColors: Record<string, 'momo' | 'orange' | 'green' | 'blue'> = {
  'kinh-nghiem': 'momo',
  'diem-den': 'green',
  'am-thuc': 'orange',
  've-may-bay': 'blue',
  'khach-san': 'orange',
  'esim': 'blue',
  'ty-gia': 'green',
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Blog{' '}
            <span className="bg-gradient-to-r from-momo-300 to-orange-400 bg-clip-text text-transparent">
              Du Lịch
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            Kinh nghiệm, điểm đến, ẩm thực và mẹo tiết kiệm từ cộng đồng du lịch MoMo.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">📌 Bài viết nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main featured */}
            <Link href={`/blog/${featured[0]?.slug}`} className="lg:col-span-2 group">
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image
                  src={featured[0]?.image ?? ''}
                  alt={featured[0]?.title ?? ''}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <Badge variant={categoryColors[featured[0]?.category ?? ''] ?? 'momo'} className="mb-2">
                    {blogCategories.find((c) => c.id === featured[0]?.category)?.label}
                  </Badge>
                  <h3 className="text-white font-black text-xl leading-tight mb-2 group-hover:underline">
                    {featured[0]?.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/60 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {featured[0]?.readTime} phút đọc
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={11} /> {featured[0]?.views?.toLocaleString('vi-VN')} lượt xem
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Secondary featured */}
            <div className="space-y-4">
              {featured.slice(1, 3).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-3">
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant={categoryColors[post.category] ?? 'momo'} size="sm" className="mb-1">
                      {blogCategories.find((c) => c.id === post.category)?.label}
                    </Badge>
                    <h3 className="text-gray-900 font-bold text-sm leading-snug line-clamp-2 group-hover:text-momo-700">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                      <Clock size={10} /> {post.readTime} phút
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All posts */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-6">
            <button className="px-4 py-1.5 bg-momo-700 text-white rounded-full text-xs font-semibold">
              Tất cả
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat.id}
                className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 hover:border-momo-300 rounded-full text-xs font-semibold transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant={categoryColors[post.category] ?? 'momo'} size="sm" className="mb-2">
                      {blogCategories.find((c) => c.id === post.category)?.label}
                    </Badge>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-momo-700">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {post.readTime} phút
                      </span>
                      <span>{post.author.name}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
