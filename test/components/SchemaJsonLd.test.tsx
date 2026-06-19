import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { jsonLdScripts } from '@/lib/schema';

describe('SchemaJsonLd', () => {
  it('renders one application/ld+json script tag per schema entry', () => {
    const { container } = render(<SchemaJsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(jsonLdScripts.length);
  });

  it('embeds the exact JSON-LD strings from lib/schema, unmodified', () => {
    const { container } = render(<SchemaJsonLd />);
    const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
    const rendered = scripts.map((s) => s.innerHTML);
    expect(rendered).toEqual(jsonLdScripts);
  });
});
