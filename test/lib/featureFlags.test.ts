import { describe, it, expect } from 'vitest';
import { SHOW_PROJECTS } from '@/lib/featureFlags';

describe('featureFlags', () => {
  it('keeps the projects grid off until there are more seed installations', () => {
    expect(SHOW_PROJECTS).toBe(false);
  });
});
