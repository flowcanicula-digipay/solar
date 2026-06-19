import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { withBasePath } from '@/lib/assetPath';

describe('withBasePath', () => {
  const original = process.env.NEXT_PUBLIC_BASE_PATH;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
  });

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_BASE_PATH;
    } else {
      process.env.NEXT_PUBLIC_BASE_PATH = original;
    }
  });

  it('returns the path unchanged when no base path is configured', () => {
    expect(withBasePath('/assets/logo/logo.svg')).toBe('/assets/logo/logo.svg');
  });

  it('prefixes the path with the configured base path', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/tnp-solar';
    expect(withBasePath('/assets/logo/logo.svg')).toBe('/tnp-solar/assets/logo/logo.svg');
  });

  it('treats an empty string base path the same as unset', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '';
    expect(withBasePath('/favicon.ico')).toBe('/favicon.ico');
  });
});
