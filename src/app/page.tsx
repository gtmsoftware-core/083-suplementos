import { HOME_SLUG } from '@/lib/cms';
import { pageMetadata, renderPage } from '@/lib/page-view';

export const generateMetadata = () => pageMetadata(HOME_SLUG);

export default function HomePage() {
  return renderPage(HOME_SLUG);
}
