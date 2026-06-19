import { describe, it, expect, afterEach, vi } from 'vitest';
import { buildCsp } from '@/lib/csp';

describe('buildCsp', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('always denies everything by default', () => {
    expect(buildCsp()).toContain("default-src 'none'");
  });

  it('allows unsafe-eval and unsafe-inline scripts in development', () => {
    vi.stubEnv('NODE_ENV', 'development');
    const csp = buildCsp();
    expect(csp).toContain("script-src 'self' 'unsafe-eval' 'unsafe-inline'");
  });

  it('locks script-src down to self only outside development', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const csp = buildCsp();
    expect(csp).toContain("script-src 'self'");
    expect(csp).not.toContain('unsafe-eval');
  });

  it('omits frame-ancestors (unsupported via <meta>, enforced via .htaccess instead)', () => {
    expect(buildCsp()).not.toContain('frame-ancestors');
  });

  it('allows Formspree for both connect-src and form-action', () => {
    const csp = buildCsp();
    expect(csp).toContain('connect-src');
    expect(csp).toContain('https://formspree.io');
    expect(csp).toContain('form-action https://formspree.io');
  });

  it('allows Google Fonts for style-src and font-src', () => {
    const csp = buildCsp();
    expect(csp).toContain('https://fonts.googleapis.com');
    expect(csp).toContain('https://fonts.gstatic.com');
  });

  it('joins directives with semicolons', () => {
    const csp = buildCsp();
    expect(csp.split('; ').length).toBeGreaterThan(5);
  });
});
