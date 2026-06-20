import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Reveal from '@/components/Reveal';
import { triggerIntersections } from '../setup';

describe('Reveal', () => {
  it('starts hidden and renders its children', () => {
    const { container, getByText } = render(
      <Reveal>
        <p>Hello</p>
      </Reveal>
    );

    expect(getByText('Hello')).toBeInTheDocument();
    expect(container.querySelector('.opacity-0')).not.toBeNull();
  });

  it('reveals once the IntersectionObserver reports visibility', () => {
    const { container } = render(
      <Reveal>
        <p>Hello</p>
      </Reveal>
    );

    triggerIntersections(true);

    expect(container.querySelector('.opacity-0')).toBeNull();
    expect(container.querySelector('.opacity-100')).not.toBeNull();
  });

  it('applies the passed className and transition delay', () => {
    const { container } = render(
      <Reveal className="grid gap-4" delay={150}>
        <p>Hello</p>
      </Reveal>
    );
    triggerIntersections(true);

    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveClass('grid', 'gap-4');
    expect(el.style.transitionDelay).toBe('150ms');
  });
});
