import { env } from "@/lib/env";
import { createRevalidateHandler } from "@gtmsoftware-core/cms-sdk/next";

/** Called by the CMS after every change that the public sees. Configure this URL in the CMS admin. */
export async function POST(request: Request) {
  return createRevalidateHandler({ secret: env().CMS_WEBHOOK_SECRET })(request);
}
