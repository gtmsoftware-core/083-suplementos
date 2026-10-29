import type { ReactNode } from 'react';
import { Highlighted } from './highlighted';

type SectionHeadingProps = { heading: string; highlight?: string; className?: string };

export function SectionHeading({ heading, highlight, className = '' }: SectionHeadingProps) {
  return (
    <h2 className={`font-display text-[clamp(40px,5vw,64px)] leading-none uppercase ${className}`}>
      <Highlighted text={heading} highlight={highlight} />
    </h2>
  );
}

type SectionProps = {
  heading?: string;
  highlight?: string;
  /** Text beside the heading on wide screens. */
  aside?: string;
  tone?: 'base' | 'raised';
  children: ReactNode;
};

/** Standard section: centered container, display heading and optional text beside it. */
export function Section({ heading, highlight, aside, tone = 'base', children }: SectionProps) {
  const body = (
    <div className="mx-auto max-w-[1240px] px-6 py-20">
      {heading && (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading heading={heading} highlight={highlight} />
          {aside && <p className="max-w-[420px] text-base leading-relaxed text-muted">{aside}</p>}
        </div>
      )}
      {children}
    </div>
  );
  return tone === 'raised' ? <div className="border-y border-line-soft bg-raised">{body}</div> : body;
}
