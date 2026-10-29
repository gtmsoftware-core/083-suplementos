import type { BlockOf, SiteSettings } from '@gtmsoftware-core/cms-sdk';
import { isExternal, resolveHref } from '@/lib/links';
import { CmsImage } from '../cms-image';
import { ImagePlaceholder } from '../image-placeholder';
import { SectionHeading } from '../section';

export function AboutBlock({ block, settings }: { block: BlockOf<'about'>; settings: SiteSettings | null }) {
  const paragraphs = block.text.split(/\n\s*\n/).filter((paragraph) => paragraph.trim());
  const href = block.link && resolveHref(block.link.href, settings);
  return (
    <section className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-12 px-6 py-20">
      <div className="relative aspect-[4/5] max-w-[460px] min-w-0 flex-[1_1_360px] overflow-hidden rounded-md border border-line bg-panel">
        {block.image ? <CmsImage image={block.image} sizes="460px" /> : <ImagePlaceholder label="Foto" />}
      </div>
      <div className="flex min-w-0 flex-[999_1_460px] flex-col gap-5">
        {block.eyebrow && <span className="text-[13px] font-extrabold tracking-[.12em] text-accent uppercase">{block.eyebrow}</span>}
        <SectionHeading heading={block.heading} highlight={block.highlight} />
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-[17px] leading-[1.7] whitespace-pre-line text-body">
            {paragraph}
          </p>
        ))}
        {block.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2.5">
            {block.tags.map((tag, index) => (
              <li key={index} className="rounded-full border border-[#333] px-3.5 py-2.5 text-sm font-semibold text-soft">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {block.link && href && (
          <a
            href={href}
            className="inline-flex min-h-11 items-center gap-2 self-start font-extrabold tracking-wide text-accent uppercase hover:underline"
            {...(isExternal(href) && { target: '_blank', rel: 'noopener noreferrer' })}
          >
            {block.link.label}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        )}
      </div>
    </section>
  );
}
