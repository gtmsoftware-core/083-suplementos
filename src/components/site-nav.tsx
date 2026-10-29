'use client';

import { useEffect, useState } from 'react';
import type { MenuItem } from './site-header';

type SiteNavProps = { menu: readonly MenuItem[]; whatsapp: string | null };

const BAR = 'absolute left-0 block h-0.5 w-6 rounded bg-current transition duration-300 ease-out';

/**
 * Main navigation. Inline from `md` up; below that, a hamburger button opens and closes the
 * list with a height and fade animation. The closed list is `invisible`, so its links leave the tab order.
 */
export function SiteNav({ menu, whatsapp }: SiteNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    const desktop = window.matchMedia('(min-width: 48rem)');
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen(!open)}
        className="relative inline-flex size-11 items-center justify-center text-fg hover:text-accent md:hidden"
      >
        <span className="relative block h-4 w-6">
          <span className={`${BAR} top-0 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`${BAR} top-[7px] ${open ? 'scale-x-0 opacity-0' : ''}`} />
          <span className={`${BAR} top-[14px] ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </span>
      </button>
      <nav
        id="site-nav"
        aria-label="Principal"
        className={`grid basis-full transition-[grid-template-rows,opacity,visibility] duration-300 ease-out md:visible md:basis-auto md:grid-rows-[1fr] md:opacity-100 ${
          open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden md:overflow-visible">
          <div className="flex flex-col gap-1 pt-4 pb-2 text-sm font-semibold tracking-wide uppercase md:flex-row md:flex-wrap md:items-center md:gap-6 md:p-0">
            {menu.map((item) => (
              <a key={item.href} href={item.href} onClick={close} className="py-3 text-soft hover:text-accent md:py-0">
                {item.label}
              </a>
            ))}
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="mt-2 inline-flex min-h-11 items-center justify-center rounded bg-accent px-5 font-extrabold text-ink hover:brightness-110 md:mt-0"
              >
                Pedir no WhatsApp
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
