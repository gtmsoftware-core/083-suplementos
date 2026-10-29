import 'react';

/** Theme variables set from the CMS site settings in the root layout. */
declare module 'react' {
  interface CSSProperties {
    '--color-primary'?: string;
    '--color-secondary'?: string;
  }
}
