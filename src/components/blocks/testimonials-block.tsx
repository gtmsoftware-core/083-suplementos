import type { BlockOf } from '@gtmsoftware-core/cms-sdk';
import { Section } from '../section';

export function TestimonialsBlock({ block }: { block: BlockOf<'testimonials'> }) {
  return (
    <Section heading={block.heading || undefined} highlight={block.highlight}>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {block.items.map((item, index) => (
          <li key={index}>
            <figure className="flex h-full flex-col gap-4 rounded-md border border-line bg-panel p-7">
              <blockquote className="text-[17px] leading-relaxed text-[#e0e0e0]">“{item.quote}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span aria-hidden="true" className="size-11 rounded-full border-2 border-accent bg-line" />
                <span className="flex flex-col">
                  <span className="font-bold">{item.author}</span>
                  {item.role && <span className="text-[13px] text-muted">{item.role}</span>}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
