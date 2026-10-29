import type { RichText as RichTextDoc, RichTextNode } from '@gtmsoftware-core/cms-sdk';
import type { ReactNode } from 'react';

/**
 * Renders the Tiptap JSON stored by the CMS with plain React elements: no HTML strings,
 * no dangerouslySetInnerHTML. Link addresses were already validated by the SDK schema.
 */
export function RichText({ doc }: { doc: RichTextDoc }) {
  return <div className="rich-text">{renderNodes(doc.content)}</div>;
}

function renderNodes(nodes: readonly RichTextNode[] | undefined): ReactNode {
  return nodes?.map((node, index) => <RichTextElement key={index} node={node} />);
}

function RichTextElement({ node }: { node: RichTextNode }): ReactNode {
  const children = renderNodes(node.content);
  switch (node.type) {
    case 'paragraph':
      return <p>{children}</p>;
    case 'heading':
      return node.attrs?.['level'] === 3 ? <h3>{children}</h3> : <h2>{children}</h2>;
    case 'bulletList':
      return <ul>{children}</ul>;
    case 'orderedList': {
      const start = node.attrs?.['start'];
      return <ol start={typeof start === 'number' ? start : undefined}>{children}</ol>;
    }
    case 'listItem':
      return <li>{children}</li>;
    case 'blockquote':
      return <blockquote>{children}</blockquote>;
    case 'hardBreak':
      return <br />;
    case 'text':
      return <MarkedText node={node} />;
    case 'doc':
      return children;
  }
}

function MarkedText({ node }: { node: RichTextNode }): ReactNode {
  let content: ReactNode = node.text ?? '';
  for (const mark of node.marks ?? []) {
    if (mark.type === 'bold') content = <strong>{content}</strong>;
    else if (mark.type === 'italic') content = <em>{content}</em>;
    else {
      const href = String(mark.attrs?.['href'] ?? '');
      const external = /^https?:\/\//i.test(href);
      content = (
        <a href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
          {content}
        </a>
      );
    }
  }
  return content;
}
