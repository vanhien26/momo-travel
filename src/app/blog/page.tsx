import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_CATEGORIES, BLOG_POSTS } from '@/data/blog';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Blog Du Lịch – Kinh Nghiệm & Mẹo Hay | MoMo Travel',
  description: 'Tổng hợp kinh nghiệm du lịch châu Á, mẹo tiết kiệm, điểm đến hot và ẩm thực đặc sắc. Cập nhật liên tục từ MoMo Travel Hub.',
};

export default function BlogHubPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-momo-950 via-momo-900 to-momo-800 py-16 sm:py-20 text-center">
        <div className="container-content">
          <h1 className="text-hero text-white">Blog Du Lịch</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Kinh nghiệm, mẹo tiết kiệm, điểm đến hot và ẩm thực châu Á — tất cả để chuyến đi của bạn hoàn hảo hơn.
          </p>
        </div>
      </section>

      <div className="container-content mt-12">
        {/* Categories */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/${cat.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-momo-300 hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-momo-700 transition-colors">
                {cat.name}
              </h2>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">{cat.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-momo-700">
                Xem danh mục
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Latest Posts */}
        <h2 className="mt-16 text-section text-gray-900">Bài Viết Mới Nhất</h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => {
            const category = BLOG_CATEGORIES.find(c => c.slug === post.categorySlug);
            return (
              <article key={post.slug} className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all hover:shadow-lg">
                {/* Cover */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {category && (
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-momo-700 backdrop-blur-sm">
                      {category.name}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                    <span>·</span>
                    <span>{post.readingTime} phút đọc</span>
                  </div>

                  <h3 className="mt-2 text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-momo-700 transition-colors">
                    <Link href={`/blog/${post.categorySlug}/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2 flex-1 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
