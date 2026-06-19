import { describe, it, expect } from 'vitest';
import { routing } from '@/i18n/routing';

describe('routing', () => {
  it('supports exactly en, vi, ja', () => {
    expect(routing.locales).toEqual(['en', 'vi', 'ja']);
  });

  it('defaults to English', () => {
    expect(routing.defaultLocale).toBe('en');
  });

  it('always shows the locale prefix in the URL', () => {
    expect(routing.localePrefix).toBe('always');
  });
});
