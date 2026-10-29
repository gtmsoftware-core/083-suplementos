import type { BlockOf } from '@gtmsoftware-core/cms-sdk';
import { Section } from '../section';

export function StepsBlock({ block }: { block: BlockOf<'steps'> }) {
  return (
    <Section heading={block.heading || undefined} highlight={block.highlight} tone="raised">
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
        {block.items.map((step, index) => (
          <li key={index} className="flex flex-col gap-3.5">
            <span className="flex size-14 items-center justify-center rounded-full bg-accent font-display text-[26px] text-ink">
              {index + 1}
            </span>
            <h3 className="font-display text-[28px] uppercase">{step.title}</h3>
            {step.text && <p className="leading-relaxed text-body">{step.text}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}
