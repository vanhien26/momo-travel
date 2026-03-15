import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Eye, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'
import { blogPosts, getPostBySlug, getRelatedPosts, blogCategories } from '@/data/blog'
import { SITE_NAME } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { JsonLd } from '@/components/seo/SchemaMarkup'
import { articleSchema } from '@/lib/schema'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(post)
  const categoryLabel = blogCategories.find((c) => c.id === post.category)?.label

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          excerpt: post.excerpt,
          image: post.image,
          slug: post.slug,
          publishedAt: post.publishedAt,
          author: post.author.name,
        })}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <Link href="/blog" className="flex items-center gap-1 text-white/60 hover:text-white text-xs mb-4">
            <ArrowLeft size={12} /> Quay lại Blog
          </Link>
          {categoryLabel && <Badge variant="momo" className="mb-3">{categoryLabel}</Badge>}
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{post.title}</h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-momo-100 rounded-full flex items-center justify-center text-momo-700 font-bold text-xs">
              {post.author.name[0]}
            </div>
            <span>{post.author.name}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400">{post.author.role}</span>
          </div>
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            {new Date(post.publishedAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} /> {post.readTime} phút đọc
          </span>
          {post.views && (
            <span className="flex items-center gap-1">
              <Eye size={13} /> {post.views.toLocaleString('vi-VN')} lượt xem
            </span>
          )}
        </div>

        {/* Excerpt as intro */}
        <div className="bg-momo-50 border-l-4 border-momo-600 rounded-r-xl px-5 py-4 mb-8">
          <p className="text-momo-800 font-medium text-sm leading-relaxed">{post.excerpt}</p>
        </div>

        {/* Content placeholder */}
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            Bài viết đầy đủ sẽ được tải từ CMS hoặc Markdown. Dưới đây là nội dung tóm tắt và thông tin hữu ích cho người đọc về chủ đề <strong>{post.title}</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            {post.excerpt} Với những kinh nghiệm thực tế được tổng hợp từ cộng đồng du lịch MoMo, bài viết này sẽ giúp bạn chuẩn bị tốt nhất cho chuyến hành trình sắp tới.
          </p>
          <h2 className="text-xl font-black text-gray-900 mt-8 mb-4">Những điều cần biết</h2>
          <ul className="space-y-2 mb-6">
            {post.tags.map((tag) => (
              <li key={tag} className="flex items-start gap-2 text-gray-700">
                <span className="text-momo-600 mt-0.5">•</span>
                <span className="capitalize">Thông tin về {tag}</span>
              </li>
            ))}
          </ul>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 my-6">
            <p className="text-orange-800 text-sm font-medium">
              💡 <strong>Mẹo từ MoMo:</strong> Đặt vé, khách sạn và mua eSIM trước khi đi để tiết kiệm nhất. Dùng Ví Trả Sau 0% lãi suất cho các chi phí lớn.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-momo-100 hover:text-momo-700 cursor-pointer transition-colors">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-momo-900 rounded-2xl p-6 mt-10 text-white text-center">
          <div className="text-3xl mb-3">✈️</div>
          <h3 className="font-black text-lg mb-2">Sẵn sàng khám phá?</h3>
          <p className="text-white/60 text-sm mb-4">
            Đặt vé, book khách sạn và mua eSIM ngay trên MoMo.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/ve-may-bay" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
              ✈️ Tìm vé máy bay
            </Link>
            <Link href="/esim" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
              📡 Mua eSIM
            </Link>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="relative h-32 overflow-hidden">
                      <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-gray-900 text-xs leading-snug line-clamp-2 group-hover:text-momo-700">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mt-1.5">
                        <Clock size={10} /> {p.readTime} phút
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
