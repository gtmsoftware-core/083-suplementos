import type { Block, Page, PageSummary } from '@gtmsoftware-core/cms-sdk';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/components/blocks/block-renderer';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader, type MenuItem } from '@/components/site-header';
import { HOME_SLUG, cms } from './cms';
import { anchorId } from './links';

/**
 * Menu: the sections of this page marked "Mostrar no menu" in the CMS. A page without such
 * sections lists the other published pages instead.
 */
function menuFor(page: Page, pages: readonly PageSummary[]): MenuItem[] {
  const sections = page.blocks
    .filter((block: Block) => block.menuLabel)
    .map((block) => ({ label: block.menuLabel, href: `#${anchorId(block.menuLabel)}` }));
  if (sections.length > 0) return sections;
  return pages
    .filter((other) => other.slug !== page.slug && other.slug !== HOME_SLUG)
    .map((other) => ({ label: other.title, href: `/${other.slug}` }));
}

/** Shared by "/" (home slug) and "/[slug]". */
export async function renderPage(slug: string) {
  const [page, settings, pages] = await Promise.all([cms().getPage(slug), cms().getSettings(), cms().listPages()]);
  if (!page) notFound();
  return (
    <>
      <SiteHeader settings={settings} menu={menuFor(page, pages)} />
      <main>
        <BlockRenderer blocks={page.blocks} settings={settings} />
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const page = await cms().getPage(slug);
  if (!page) return {};
  const description = page.seo.description || undefined;
  return {
    title: page.seo.title || page.title,
    description,
    openGraph: {
      title: page.seo.title || page.title,
      description,
      images: page.seo.image ? [{ url: page.seo.image.url, alt: page.seo.image.alt }] : undefined,
    },
  };
}
