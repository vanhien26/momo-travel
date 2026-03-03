import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, BLOG_CATEGORIES, getPostBySlug, getCategoryBySlug, getRelatedPosts } from '@/data/blog';
import { ServiceWidget } from '@/components/sections/ServiceWidget';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTABlock } from '@/components/sections/CTABlock';

interface Props { params: Promise<{ categorySlug: string; slug: string }> }

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    categorySlug: p.categorySlug,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { categorySlug, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.categorySlug !== categorySlug) notFound();

  const category = getCategoryBySlug(categorySlug);
  const related = getRelatedPosts(slug, 3);

  const breadcrumbs = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: category?.name || '', href: `/blog/${categorySlug}` },
    { name: post.title, href: `/blog/${categorySlug}/${slug}` },
  ];

  /** Tính vị trí chèn widget — phân phối đều trong content */
  const widgetPositions = post.inlineWidgets.map((_, i) => {
    const total = post.content.length;
    return Math.min(Math.floor((total / (post.inlineWidgets.length + 1)) * (i + 1)), total - 1);
  });

  return (
    <main className="min-h-screen bg-white pb-0">
      {/* Hero cover */}
      <section className="relative h-[300px] sm:h-[400px] overflow-hidden">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="container-content">
            <Breadcrumb items={breadcrumbs} light />
            {category && (
              <Link href={`/blog/${categorySlug}`}
                className="mt-3 inline-block rounded-full bg-momo-700 px-3 py-1 text-xs font-bold text-white">
                {category.name}
              </Link>
            )}
            <h1 className="mt-3 max-w-3xl text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>
            <div className="mt-3 flex items-center gap-4 text-sm text-white/70">
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
              <span>·</span>
              <span>{post.readingTime} phút đọc</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article content */}
      <article className="container-content py-10">
        <div className="mx-auto max-w-3xl">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500">{tag}</span>
            ))}
          </div>

          {/* Content blocks with inline service widgets */}
          {post.content.map((block, idx) => (
            <div key={idx}>
              <p className="mb-6 text-base leading-relaxed text-gray-700">{block}</p>

              {/* Chèn widget nếu vị trí khớp */}
              {widgetPositions.includes(idx) && (
                <ServiceWidget type={post.inlineWidgets[widgetPositions.indexOf(idx)]} />
              )}
            </div>
          ))}
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-14">
          <div className="container-content">
            <h2 className="text-section text-gray-900">Bài Viết Liên Quan</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.categorySlug}/${rp.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={rp.coverImage} alt={rp.title} fill sizes="33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-momo-700 transition-colors">{rp.title}</h3>
                    <p className="mt-1 text-xs text-gray-400">{rp.readingTime} phút đọc</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABlock />
    </main>
  );
}
