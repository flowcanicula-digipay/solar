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
};

export default withNextIntl(nextConfig);
