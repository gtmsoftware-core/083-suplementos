import type { BlockOf } from '@gtmsoftware-core/cms-sdk';
import { RichText } from '../rich-text';

export function RichTextBlock({ block }: { block: BlockOf<'rich-text'> }) {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16">
      <div className="max-w-3xl">
        <RichText doc={block.content} />
      </div>
    </section>
  );
}
