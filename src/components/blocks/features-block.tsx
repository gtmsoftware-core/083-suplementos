import type { BlockOf } from '@gtmsoftware-core/cms-sdk';

/** Accent strip, slightly tilted, with short benefits side by side. */
export function FeaturesBlock({ block }: { block: BlockOf<'features'> }) {
  return (
    <section className="my-2 mb-10 -skew-y-2 bg-accent text-ink">
      <div className="mx-auto grid max-w-[1240px] skew-y-2 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 px-6 py-9">
        {block.items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            <span className="font-display text-[26px] leading-tight uppercase">{item.title}</span>
            {item.text && <span className="text-[15px] leading-snug font-semibold">{item.text}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
