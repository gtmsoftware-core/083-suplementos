import type { BlockOf, SiteSettings } from '@gtmsoftware-core/cms-sdk';
import { ButtonLink } from '../button-link';
import { CmsImage } from '../cms-image';
import { Highlighted } from '../highlighted';
import { ImagePlaceholder } from '../image-placeholder';

export function HeroBlock({ block, settings }: { block: BlockOf<'hero'>; settings: SiteSettings | null }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 -right-[10%] bottom-0 w-[55%] bg-accent opacity-[.12] [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
      />
      <div className="relative mx-auto flex max-w-[1240px] flex-wrap items-center gap-14 px-6 pt-20 pb-24">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-7">
          {block.eyebrow && (
            <span className="self-start rounded border border-accent px-3.5 py-2 text-[13px] font-bold tracking-widest text-accent uppercase">
              {block.eyebrow}
            </span>
          )}
          <h1 className="font-display text-[clamp(56px,8vw,112px)] leading-[1.02] uppercase">
            <Highlighted text={block.heading} highlight={block.highlight} />
          </h1>
          {block.subheading && <p className="max-w-[560px] text-lg leading-relaxed text-body">{block.subheading}</p>}
          {(block.button || block.secondaryButton) && (
            <div className="flex flex-wrap gap-3.5">
              {block.button && <ButtonLink link={block.button} settings={settings} />}
              {block.secondaryButton && <ButtonLink link={block.secondaryButton} settings={settings} variant="outline" />}
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-[1_1_380px] justify-center">
          <div className="relative aspect-square w-full max-w-[440px] overflow-hidden rounded-full border-[3px] border-accent bg-panel">
            {block.image ? (
              <CmsImage image={block.image} priority sizes="440px" className="object-contain p-10" />
            ) : (
              <ImagePlaceholder label="Logo ou foto" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
