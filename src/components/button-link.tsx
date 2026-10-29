import type { Link, SiteSettings } from '@gtmsoftware-core/cms-sdk';
import { isExternal, resolveHref } from '@/lib/links';

const VARIANTS = {
  solid: 'bg-accent text-ink hover:brightness-110',
  outline: 'border-2 border-fg text-fg hover:bg-fg hover:text-ink',
  'outline-accent': 'border-2 border-accent text-accent hover:bg-accent hover:text-ink',
  dark: 'bg-ink text-fg hover:bg-black',
  'outline-dark': 'border-2 border-ink text-ink hover:bg-ink hover:text-fg',
} as const;

type ButtonLinkProps = {
  link: Link;
  settings: SiteSettings | null;
  variant?: keyof typeof VARIANTS;
  /** Final address, when the caller already built it (e.g. a WhatsApp message for a product). */
  href?: string;
  className?: string;
};

/** CMS button. `#whatsapp` opens the WhatsApp of the settings; external addresses open in a new tab. */
export function ButtonLink({ link, settings, variant = 'solid', href, className = '' }: ButtonLinkProps) {
  const target = href ?? resolveHref(link.href, settings);
  return (
    <a
      href={target}
      className={`inline-flex min-h-11 items-center justify-center rounded px-7 py-4 text-base font-extrabold tracking-wide uppercase transition ${VARIANTS[variant]} ${className}`}
      {...(isExternal(target) && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {link.label}
    </a>
  );
}
