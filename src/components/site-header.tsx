import type { SiteSettings } from '@gtmsoftware-core/cms-sdk';
import Link from 'next/link';
import { whatsappUrl } from '@/lib/links';
import { BrandName } from './brand-name';

export type MenuItem = Readonly<{ label: string; href: string }>;

type SiteHeaderProps = { settings: SiteSettings | null; menu: readonly MenuItem[] };

export function SiteHeader({ settings, menu }: SiteHeaderProps) {
  const whatsapp = whatsappUrl(settings);
  return (
    <header className="relative z-10 border-b border-line-soft">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          {settings?.logo && (
            // eslint-disable-next-line @next/next/no-img-element -- the logo may come from any HTTPS address
            <img src={settings.logo.url} alt="" className="h-12 w-auto" />
          )}
          <BrandName name={settings?.businessName ?? 'Início'} className="text-2xl" />
        </Link>
        <nav aria-label="Principal" className="flex flex-wrap items-center gap-6 text-sm font-semibold tracking-wide uppercase">
          {menu.map((item) => (
            <a key={item.href} href={item.href} className="text-soft hover:text-accent">
              {item.label}
            </a>
          ))}
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded bg-accent px-5 font-extrabold text-ink hover:brightness-110"
            >
              Pedir no WhatsApp
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
