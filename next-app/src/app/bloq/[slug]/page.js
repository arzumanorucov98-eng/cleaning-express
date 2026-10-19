import { notFound } from 'next/navigation';
import { DEFAULT_BLOGS } from '@/lib/data';
import BlogDetailClient from '@/components/BlogDetailClient';

export function generateStaticParams() {
  return DEFAULT_BLOGS.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = DEFAULT_BLOGS.find((b) => b.slug === slug);
  if (!blog) return { title: 'Məqalə tapılmadı' };

  return {
    title: `${blog.seoTitle || blog.title} — Cleaning Express Service`,
    description: blog.seoDescription || blog.description,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = DEFAULT_BLOGS.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient slug={slug} initialBlog={blog} />;
}
