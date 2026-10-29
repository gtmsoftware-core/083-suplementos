import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RichText } from './rich-text';

describe('RichText', () => {
  it('renders Tiptap JSON as elements, with marks and safe external links', () => {
    const html = renderToStaticMarkup(
      <RichText
        doc={{
          type: 'doc',
          content: [
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Título' }] },
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Agende ', marks: [{ type: 'bold' }] },
                { type: 'text', text: 'aqui', marks: [{ type: 'link', attrs: { href: 'https://wa.me/1' } }] },
              ],
            },
            { type: 'bulletList', content: [{ type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Item' }] }] }] },
          ],
        }}
      />,
    );
    expect(html).toBe(
      '<div class="rich-text"><h2>Título</h2><p><strong>Agende </strong>' +
        '<a href="https://wa.me/1" target="_blank" rel="noopener noreferrer">aqui</a></p>' +
        '<ul><li><p>Item</p></li></ul></div>',
    );
  });

  it('escapes text instead of interpreting it as HTML', () => {
    const html = renderToStaticMarkup(
      <RichText doc={{ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: '<script>x</script>' }] }] }} />,
    );
    expect(html).toContain('&lt;script&gt;');
  });
});
