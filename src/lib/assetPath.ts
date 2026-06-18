/**
 * Prefixes a root-relative asset path (e.g. "/assets/logo/logo.svg") with the
 * configured basePath. Required because next/image with `unoptimized: true`
 * does not auto-prefix basePath for plain string src values — without this,
 * images 404 when the site is deployed under a sub-path (e.g. GitHub Pages
 * project sites at /<repo>/).
 */
export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
}
