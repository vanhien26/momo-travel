import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BLOG_CATEGORIES, BLOG_POSTS, getCategoryBySlug, getPostsByCategory } from '@/data/blog';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface Props { params: Promise<{ categorySlug: string }> }

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ categorySlug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return {};
  return {
    title: cat.seoTitle,
    description: cat.description,
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const posts = getPostsByCategory(categorySlug);

  const breadcrumbs = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: category.name, href: `/blog/${category.slug}` },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-momo-950 via-momo-900 to-momo-800 py-14 sm:py-18">
        <div className="container-content">
          <Breadcrumb items={breadcrumbs} light />
          <h1 className="mt-4 text-hero text-white">{category.name}</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/80">{category.description}</p>
        </div>
      </section>

      <div className="container-content mt-10">
        {/* Other categories nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link href="/blog" className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:border-momo-300 transition-colors">
            Tất cả
          </Link>
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/${cat.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                cat.slug === categorySlug
                  ? 'bg-momo-700 text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-momo-300'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={post.coverImage} alt={post.title} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                    <span>·</span>
                    <span>{post.readingTime} phút đọc</span>
                  </div>
                  <h2 className="mt-2 text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-momo-700 transition-colors">
                    <Link href={`/blog/${categorySlug}/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-500">Chưa có bài viết trong danh mục này.</p>
          </div>
        )}
      </div>
    </main>
  );
}
