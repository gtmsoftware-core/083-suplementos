import type { BlockOf } from '@gtmsoftware-core/cms-sdk';
import { CmsImage } from '../cms-image';
import { Section } from '../section';

export function GalleryBlock({ block }: { block: BlockOf<'gallery'> }) {
  return (
    <Section heading={block.heading || undefined} highlight={block.highlight}>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {block.images.map((image, index) => (
          <li key={index} className="relative aspect-square overflow-hidden rounded-md border border-line bg-panel">
            <CmsImage image={image} sizes="(min-width: 768px) 33vw, 50vw" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
