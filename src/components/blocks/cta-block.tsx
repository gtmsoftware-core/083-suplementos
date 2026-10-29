import type { BlockOf, SiteSettings } from '@gtmsoftware-core/cms-sdk';
import { ButtonLink } from '../button-link';
import { SectionHeading } from '../section';

/** Accent band closing the page, with up to two buttons. */
export function CtaBlock({ block, settings }: { block: BlockOf<'cta'>; settings: SiteSettings | null }) {
  return (
    <section className="bg-accent text-ink">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-10 px-6 py-20">
        <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-4">
          <SectionHeading heading={block.heading} highlight={block.highlight} className="[&_.text-accent]:text-ink [&_.text-accent]:underline" />
          {block.text && <p className="max-w-[560px] text-lg leading-snug font-semibold">{block.text}</p>}
        </div>
        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
          <ButtonLink link={block.button} settings={settings} variant="dark" />
          {block.secondaryButton && <ButtonLink link={block.secondaryButton} settings={settings} variant="outline-dark" />}
        </div>
      </div>
    </section>
  );
}
