import { anchorId } from "@/lib/links";
import type { Block, SiteSettings } from "@gtmsoftware-core/cms-sdk";
import { AboutBlock } from "./about-block";
import { ContactBlock } from "./contact-block";
import { CtaBlock } from "./cta-block";
import { FaqBlock } from "./faq-block";
import { FeaturesBlock } from "./features-block";
import { GalleryBlock } from "./gallery-block";
import { HeroBlock } from "./hero-block";
import { NumberedCardsBlock } from "./numbered-cards-block";
import { ProductsBlock } from "./products-block";
import { RichTextBlock } from "./rich-text-block";
import { ServicesListBlock } from "./services-list-block";
import { StepsBlock } from "./steps-block";
import { TestimonialsBlock } from "./testimonials-block";

type ViewProps = { block: Block; settings: SiteSettings | null };

/**
 * One component per block type. A block added to the SDK makes this switch fail to compile until handled.
 * Items inside a block have no id and keep the order set in the CMS, so the block components key them by index.
 */
function BlockView({ block, settings }: ViewProps) {
  switch (block.type) {
    case "hero":
      return <HeroBlock block={block} settings={settings} />;
    case "rich-text":
      return <RichTextBlock block={block} />;
    case "features":
      return <FeaturesBlock block={block} />;
    case "numbered-cards":
      return <NumberedCardsBlock block={block} />;
    case "services-list":
      return <ServicesListBlock block={block} />;
    case "products":
      return <ProductsBlock block={block} settings={settings} />;
    case "steps":
      return <StepsBlock block={block} />;
    case "about":
      return <AboutBlock block={block} settings={settings} />;
    case "gallery":
      return <GalleryBlock block={block} />;
    case "testimonials":
      return <TestimonialsBlock block={block} />;
    case "faq":
      return <FaqBlock block={block} />;
    case "contact":
      return <ContactBlock block={block} settings={settings} />;
    case "cta":
      return <CtaBlock block={block} settings={settings} />;
    default:
      return assertNever(block);
  }
}

function assertNever(block: never): never {
  throw new Error(`Bloco sem componente: ${JSON.stringify(block)}`);
}

/** Blocks marked "Mostrar no menu" get an anchor the header links to. */
export function BlockRenderer({
  blocks,
  settings,
}: {
  blocks: readonly Block[];
  settings: SiteSettings | null;
}) {
  return blocks.map((block) =>
    block.menuLabel ? (
      <div key={block.id} id={anchorId(block.menuLabel)} className="scroll-mt-6">
        <BlockView block={block} settings={settings} />
      </div>
    ) : (
      <BlockView key={block.id} block={block} settings={settings} />
    )
  );
}
