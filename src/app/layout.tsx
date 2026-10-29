import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { cms } from '@/lib/cms';
import './globals.css';

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await cms().getSettings();
  const name = settings?.businessName ?? 'Site';
  return { title: { default: name, template: `%s | ${name}` } };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await cms().getSettings();
  const theme = settings ? { '--color-primary': settings.colors.primary } : undefined;
  return (
    <html lang="pt-BR" className={`${anton.variable} ${inter.variable}`}>
      <body className="min-h-screen overflow-x-hidden font-sans antialiased" style={theme}>
        {children}
      </body>
    </html>
  );
}
