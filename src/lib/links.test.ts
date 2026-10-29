import type { SiteSettings } from '@gtmsoftware-core/cms-sdk';
import { describe, expect, it } from 'vitest';
import { anchorId, resolveHref, whatsappUrl } from './links';

const settings = { contact: { phone: '', whatsapp: '(83) 99999-8888', email: '' } } as SiteSettings;

describe('links', () => {
  it('builds WhatsApp links from the settings, with an optional message', () => {
    expect(whatsappUrl(settings)).toBe('https://wa.me/5583999998888');
    expect(whatsappUrl(settings, 'Quero o Whey')).toBe('https://wa.me/5583999998888?text=Quero%20o%20Whey');
    expect(whatsappUrl(null)).toBeNull();
  });

  it('resolves #whatsapp and keeps other addresses', () => {
    expect(resolveHref('#whatsapp', settings)).toBe('https://wa.me/5583999998888');
    expect(resolveHref('/contato', settings)).toBe('/contato');
  });

  it('turns menu labels into anchors', () => {
    expect(anchorId('Como comprar')).toBe('como-comprar');
    expect(anchorId('Orientação')).toBe('orientacao');
  });
});
