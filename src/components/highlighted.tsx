import { Fragment } from 'react';

/**
 * Heading text with the CMS "highlight" words in the accent color. Line breaks typed in the CMS are kept.
 */
export function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  const index = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || index < 0) return <Lines text={text} />;
  return (
    <>
      <Lines text={text.slice(0, index)} />
      <span className="text-accent">
        <Lines text={highlight} />
      </span>
      <Lines text={text.slice(index + highlight.length)} />
    </>
  );
}

function Lines({ text }: { text: string }) {
  const lines = text.split('\n');
  return lines.map((line, index) => (
    <Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </Fragment>
  ));
}
