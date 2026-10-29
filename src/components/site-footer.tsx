import type { SiteSettings } from '@gtmsoftware-core/cms-sdk';
import { BrandName } from './brand-name';

const handleOf = (url: string) => url.replace(/\/+$/, '').split('/').pop() ?? url;

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  if (!settings) return null;
  const instagram = settings.social.instagram;
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 px-6 py-10 text-sm text-muted">
        <BrandName name={settings.businessName} className="text-xl text-fg" />
        {settings.footerNote && <span>{settings.footerNote}</span>}
        {settings.openingHours.length > 0 && (
          <span>{settings.openingHours.map((entry) => `${entry.days}: ${entry.hours}`).join(' · ')}</span>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noopener noreferrer" className="font-bold text-accent hover:underline">
            @{handleOf(instagram)}
          </a>
        )}
      </div>
    </footer>
  );
}
