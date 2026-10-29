import { WHATSAPP_HREF, type SiteSettings } from '@gtmsoftware-core/cms-sdk';

const digits = (value: string) => value.replace(/\D/g, '');

/** wa.me link for the WhatsApp of the settings (Brazilian numbers get the 55 country code). */
export function whatsappUrl(settings: SiteSettings | null, message?: string): string | null {
  const number = digits(settings?.contact.whatsapp ?? '');
  if (!number) return null;
  const international = number.length <= 11 ? `55${number}` : number;
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${international}${text}`;
}

/** Resolves the special `#whatsapp` address typed in the CMS. Other addresses pass through. */
export function resolveHref(href: string, settings: SiteSettings | null): string {
  if (href !== WHATSAPP_HREF) return href;
  return whatsappUrl(settings) ?? '#';
}

export const isExternal = (href: string) => /^https?:\/\//i.test(href);

/** Anchor id for a section shown in the menu: "Como comprar" → "como-comprar". */
export function anchorId(label: string): string {
  return label
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
