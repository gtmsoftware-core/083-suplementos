import type { BlockOf, SiteSettings } from '@gtmsoftware-core/cms-sdk';
import { whatsappUrl } from '@/lib/links';
import { Section } from '../section';

function fullAddress({ address }: SiteSettings): string {
  return [address.street, address.city, address.state, address.postalCode].filter(Boolean).join(', ');
}

/** Contact data comes from the site settings, so it is edited in a single place. */
export function ContactBlock({ block, settings }: { block: BlockOf<'contact'>; settings: SiteSettings | null }) {
  const contact = settings?.contact;
  const address = settings ? fullAddress(settings) : '';
  const whatsapp = whatsappUrl(settings);
  return (
    <Section heading={block.heading || undefined} highlight={block.highlight} tone="raised">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="grid content-start gap-3 text-lg">
          {block.text && <p className="whitespace-pre-line text-body">{block.text}</p>}
          {whatsapp && (
            <a className="font-bold text-accent hover:underline" href={whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp: {contact?.whatsapp}
            </a>
          )}
          {contact?.phone && <a href={`tel:+55${contact.phone.replace(/\D/g, '')}`}>Telefone: {contact.phone}</a>}
          {contact?.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
          {address && <p className="text-muted">{address}</p>}
        </div>
        {block.showMap && address && (
          <iframe
            title={`Mapa: ${address}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
            className="h-72 w-full rounded-md border border-line"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </Section>
  );
}
