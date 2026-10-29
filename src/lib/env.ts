import { z } from 'zod';

const envSchema = z.object({
  CMS_URL: z.url(),
  CMS_SITE_ID: z.string().startsWith('site_'),
  CMS_API_KEY: z.string().startsWith('cms_live_'),
  CMS_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | undefined;

/** Validated on first use, so a missing variable fails with a clear message instead of an empty request. */
export function env(source: Record<string, string | undefined> = process.env): Env {
  if (cached && source === process.env) return cached;
  const result = envSchema.safeParse(source);
  if (!result.success) {
    throw new Error(`Variáveis do CMS inválidas (veja .env.example):\n${z.prettifyError(result.error)}`);
  }
  if (source === process.env) cached = result.data;
  return result.data;
}
