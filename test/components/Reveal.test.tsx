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

  it('does not reveal when IntersectionObserver fires with isIntersecting=false', () => {
    const { container } = render(
      <Reveal>
        <p>Hello</p>
      </Reveal>
    );
    triggerIntersections(false);
    // Still hidden — the !isIntersecting branch was taken
    expect(container.querySelector('.opacity-0')).not.toBeNull();
  });

  it('uses 0ms delay before visible and applies delay once visible', () => {
    const { container } = render(
      <Reveal delay={300}>
        <p>Hello</p>
      </Reveal>
    );
    const el = container.firstElementChild as HTMLElement;
    // Before visible: transitionDelay is '0ms'
    expect(el.style.transitionDelay).toBe('0ms');
    triggerIntersections(true);
    // After visible: transitionDelay matches the delay prop
    expect(el.style.transitionDelay).toBe('300ms');
  });
});
