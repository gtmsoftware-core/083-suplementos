import { createCmsClient, type CmsClient } from '@gtmsoftware-core/cms-sdk';
import { env } from './env';

/** Slug of the page shown at "/". Create a page with this address in the CMS. */
export const HOME_SLUG = 'inicio';

let client: CmsClient | undefined;

/**
 * Reader of the CMS. Every request is cached by Next.js with the tags from `tagsFor`, and the
 * webhook at /api/revalidate refreshes exactly what changed.
 */
export function cms(): CmsClient {
  if (!client) {
    const { CMS_URL, CMS_SITE_ID, CMS_API_KEY } = env();
    client = createCmsClient({ baseUrl: CMS_URL, siteId: CMS_SITE_ID, apiKey: CMS_API_KEY });
  }
  return client;
}
