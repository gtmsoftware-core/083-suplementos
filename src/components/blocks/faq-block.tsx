import type { BlockOf } from '@gtmsoftware-core/cms-sdk';
import { Section } from '../section';

export function FaqBlock({ block }: { block: BlockOf<'faq'> }) {
  return (
    <Section heading={block.heading || undefined} highlight={block.highlight}>
      <div className="max-w-3xl divide-y divide-line rounded-md border border-line bg-panel">
        {block.items.map((item, index) => (
          <details key={index} className="group p-5">
            <summary className="cursor-pointer text-lg font-bold marker:text-accent">{item.question}</summary>
            <p className="mt-3 leading-relaxed whitespace-pre-line text-body">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
