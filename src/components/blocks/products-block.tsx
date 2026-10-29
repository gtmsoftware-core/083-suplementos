import type { BlockOf, SiteSettings } from '@gtmsoftware-core/cms-sdk';
import { whatsappUrl } from '@/lib/links';
import { ButtonLink } from '../button-link';
import { CmsImage } from '../cms-image';
import { ImagePlaceholder } from '../image-placeholder';
import { Section } from '../section';

/** Each "Pedir este" opens WhatsApp with the product name already in the message. */
export function ProductsBlock({ block, settings }: { block: BlockOf<'products'>; settings: SiteSettings | null }) {
  return (
    <Section heading={block.heading || undefined} highlight={block.highlight}>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
        {block.items.map((product, index) => {
          const order = whatsappUrl(settings, `Olá! Quero pedir: ${product.name}`) ?? '#';
          return (
            <li key={index}>
              <article className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-panel">
                <div className="relative aspect-square bg-panel-soft">
                  {product.image ? (
                    <CmsImage image={product.image} sizes="(min-width: 1024px) 300px, 50vw" />
                  ) : (
                    <ImagePlaceholder label="Foto do produto" />
                  )}
                  {product.tag && (
                    <span className="absolute top-3 left-3 rounded-sm bg-accent px-2.5 py-1.5 text-xs font-extrabold tracking-wide text-ink uppercase">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  {product.category && (
                    <span className="text-xs font-bold tracking-widest text-muted uppercase">{product.category}</span>
                  )}
                  <h3 className="text-lg leading-snug font-extrabold">{product.name}</h3>
                  {product.price && <span className="font-display text-[28px] text-accent">{product.price}</span>}
                  <ButtonLink
                    link={{ label: block.buttonLabel, href: order }}
                    href={order}
                    settings={settings}
                    variant="outline-accent"
                    className="mt-auto w-full px-3 py-3 text-sm"
                  />
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
