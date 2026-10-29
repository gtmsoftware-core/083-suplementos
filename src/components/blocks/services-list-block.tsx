import type { BlockOf } from '@gtmsoftware-core/cms-sdk';
import { Section } from '../section';

export function ServicesListBlock({ block }: { block: BlockOf<'services-list'> }) {
  return (
    <Section heading={block.heading || undefined} highlight={block.highlight}>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {block.items.map((service, index) => (
          <li key={index} className="flex flex-col gap-3 rounded-md border border-line bg-panel p-6">
            <h3 className="text-lg font-extrabold">{service.title}</h3>
            {service.description && <p className="leading-relaxed text-muted">{service.description}</p>}
            {service.price && <p className="mt-auto font-display text-2xl text-accent">{service.price}</p>}
          </li>
        ))}
      </ul>
    </Section>
  );
}
