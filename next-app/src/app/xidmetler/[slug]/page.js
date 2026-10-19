import { notFound } from 'next/navigation';
import { DEFAULT_SERVICES } from '@/lib/data';
import ServiceDetailClient from '@/components/ServiceDetailClient';

export function generateStaticParams() {
  return DEFAULT_SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = DEFAULT_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: 'Xidmət tapılmadı' };

  return {
    title: `${service.title} — qiyməti hesabla | Cleaning Express Service`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = DEFAULT_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient slug={slug} initialService={service} />;
}
