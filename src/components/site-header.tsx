import type { SiteSettings } from '@gtmsoftware-core/cms-sdk';
import Link from 'next/link';
import { whatsappUrl } from '@/lib/links';
import { BrandName } from './brand-name';
import { SiteNav } from './site-nav';

export type MenuItem = Readonly<{ label: string; href: string }>;

type SiteHeaderProps = { settings: SiteSettings | null; menu: readonly MenuItem[] };

export function SiteHeader({ settings, menu }: SiteHeaderProps) {
  const whatsapp = whatsappUrl(settings);
  return (
    <header className="relative z-10 border-b border-line-soft">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          {settings?.logo && (
            // eslint-disable-next-line @next/next/no-img-element -- the logo may come from any HTTPS address
            <img src={settings.logo.url} alt="" className="h-12 w-auto" />
          )}
          <BrandName name={settings?.businessName ?? 'Início'} className="text-2xl" />
        </Link>
        <SiteNav menu={menu} whatsapp={whatsapp} />
      </div>
    </header>
  );
}
