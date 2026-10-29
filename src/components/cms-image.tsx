import type { Image as CmsImageData } from '@gtmsoftware-core/cms-sdk';
import Image from 'next/image';

type CmsImageProps = { image: CmsImageData; className?: string; priority?: boolean; sizes?: string };

/**
 * Images come from any HTTPS address typed in the CMS, so they are served as they are (unoptimized).
 * After media upload (M5) moves them to a known host, configure `images.remotePatterns` and drop it.
 */
export function CmsImage({ image, className, priority, sizes = '100vw' }: CmsImageProps) {
  return (
    <Image
      src={image.url}
      alt={image.alt}
      fill
      unoptimized
      priority={priority}
      sizes={sizes}
      className={className ?? 'object-cover'}
    />
  );
}
