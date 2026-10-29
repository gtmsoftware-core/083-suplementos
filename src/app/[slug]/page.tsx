import { pageMetadata, renderPage } from '@/lib/page-view';

/**
 * No page is rendered at build time; each one is rendered on its first visit and then cached
 * (ISR) until the CMS webhook revalidates its tags.
 */
export function generateStaticParams(): { slug: string }[] {
  return [];
}

export async function generateMetadata({ params }: PageProps<'/[slug]'>) {
  return pageMetadata((await params).slug);
}

export default async function CmsPage({ params }: PageProps<'/[slug]'>) {
  return renderPage((await params).slug);
}
