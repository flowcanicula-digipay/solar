import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Set when building for GitHub Pages project deployment (https://<user>.github.io/<repo>/),
// since the site otherwise serves from a domain root (Hostinger). Not used for production deploys.
const basePath = process.env.GITHUB_PAGES_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  env: {
    // Exposed to client/server code so hardcoded "/assets/..." paths (used with
    // unoptimized next/image, which does not auto-prefix basePath) resolve
    // correctly under a GitHub Pages project path like /<repo>/.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withNextIntl(nextConfig);
