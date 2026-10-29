import { pageSchema, siteSettingsSchema } from '@gtmsoftware-core/cms-sdk';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BlockRenderer } from './block-renderer';

const settings = siteSettingsSchema.parse({
  businessName: '083 Suplementos',
  logo: null,
  colors: { primary: '#3CE11E', secondary: '#0A0A0A' },
  contact: { phone: '', whatsapp: '(83) 99999-8888', email: '' },
  address: { street: '', city: 'Natuba', state: 'PB', postalCode: '' },
  social: { instagram: 'https://www.instagram.com/083suplementtos/', facebook: '', linkedin: '', youtube: '', tiktok: '' },
  openingHours: [],
});

/** One valid example of every block, parsed by the SDK schema exactly as the client delivers it. */
const page = pageSchema.parse({
  title: 'Início',
  slug: 'inicio',
  seo: { title: '', description: '', image: null },
  blocks: [
    { id: '1', type: 'hero', eyebrow: 'Natuba · Paraíba', heading: 'Suplemento direto\nde fábrica.', highlight: 'de fábrica.', subheading: '', image: null, button: { label: 'Falar com especialista', href: '#whatsapp' } },
    { id: '2', type: 'rich-text', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Sobre nós' }] }] } },
    { id: '3', type: 'features', items: [{ title: 'Direto de fábrica', text: 'Preço mais baixo.' }] },
    { id: '4', type: 'numbered-cards', heading: 'Escolha pelo objetivo', highlight: 'objetivo', intro: '', items: [{ title: 'Ganho de massa', text: '' }] },
    { id: '5', type: 'services-list', heading: 'Serviços', items: [{ title: 'Avaliação', description: '', price: 'R$ 50' }] },
    { id: '6', type: 'products', menuLabel: 'Produtos', heading: 'Mais pedidos', items: [{ name: 'Whey 900g', category: 'Proteína', tag: 'Mais vendido', price: '', image: null }] },
    { id: '7', type: 'steps', menuLabel: 'Como comprar', heading: 'Comprar é simples', items: [{ title: 'Escolha', text: '' }] },
    { id: '8', type: 'about', eyebrow: 'Direcionamento certo', heading: 'Quem vende entende de treino', text: 'Primeiro.\n\nSegundo.', image: null, tags: ['Dica do dia'], link: null },
    { id: '9', type: 'gallery', heading: '', images: [{ url: 'https://img.test/a.jpg', alt: 'Loja' }] },
    { id: '10', type: 'testimonials', heading: '', items: [{ author: 'Ana', quote: 'Ótimo atendimento', role: 'Natuba-PB' }] },
    { id: '11', type: 'faq', heading: 'Dúvidas', items: [{ question: 'Entrega no sábado?', answer: 'Sim.' }] },
    { id: '12', type: 'contact', heading: 'Contato', text: '', showMap: false },
    { id: '13', type: 'cta', heading: 'Entregamos em Natuba e região', text: '', button: { label: 'Pedir no WhatsApp', href: '#whatsapp' } },
  ],
});

describe('BlockRenderer', () => {
  const html = renderToStaticMarkup(<BlockRenderer blocks={page.blocks} settings={settings} />);

  it('renders every block type of the SDK', () => {
    for (const text of ['Natuba · Paraíba', 'Sobre nós', 'Direto de fábrica', 'Ganho de massa', 'R$ 50', 'Whey 900g', 'Escolha', 'Dica do dia', 'Loja', 'Ótimo atendimento', 'Entrega no sábado?', 'Contato', 'Entregamos em Natuba']) {
      expect(html).toContain(text);
    }
  });

  it('highlights words, numbers cards and splits paragraphs', () => {
    expect(html).toContain('<span class="text-accent">objetivo</span>');
    expect(html).toContain('>01<');
    expect(html).toContain('Suplemento direto<br/>');
    expect(html.match(/whitespace-pre-line text-body">(Primeiro\.|Segundo\.)</g)).toHaveLength(2);
  });

  it('turns #whatsapp and product buttons into WhatsApp links', () => {
    expect(html).toContain('href="https://wa.me/5583999998888"');
    expect(html).toContain(`href="https://wa.me/5583999998888?text=${encodeURIComponent('Olá! Quero pedir: Whey 900g')}"`);
  });

  it('gives menu sections an anchor', () => {
    expect(html).toContain('id="produtos"');
    expect(html).toContain('id="como-comprar"');
  });
});
