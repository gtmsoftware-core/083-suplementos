import type { BlockOf } from '@gtmsoftware-core/cms-sdk';
import { Section } from '../section';

const number = (index: number) => String(index + 1).padStart(2, '0');

export function NumberedCardsBlock({ block }: { block: BlockOf<'numbered-cards'> }) {
  return (
    <Section heading={block.heading || undefined} highlight={block.highlight} aside={block.intro || undefined}>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {block.items.map((item, index) => (
          <li key={index} className="flex min-h-44 flex-col gap-3 rounded-md border border-line bg-panel px-6 py-7">
            <span className="font-display text-[44px] leading-none text-accent">{number(index)}</span>
            <span className="font-display text-[26px] leading-tight uppercase">{item.title}</span>
            {item.text && <span className="text-sm leading-normal text-muted">{item.text}</span>}
          </li>
        ))}
      </ul>
    </Section>
  );
}
