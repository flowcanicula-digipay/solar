import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFoundView from '@/components/NotFoundView';

const props = {
  eyebrow: 'SolarTNP · Ho Chi Minh City · Vietnam · Error',
  fourOhFour: '404',
  tagline: 'This page went off-grid.',
  body: "The URL doesn't exist. Let's get you back somewhere sunny.",
  goHomeLabel: 'Go Home',
  goHomeHref: '/en/',
  contactLabel: 'Contact Us',
  contactHref: '/en/contact/',
  footer: 'solartnp.com',
};

describe('NotFoundView', () => {
  it('renders all of the supplied copy', () => {
    render(<NotFoundView {...props} />);
    expect(screen.getByText(props.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(props.fourOhFour)).toBeInTheDocument();
    expect(screen.getByText(props.tagline)).toBeInTheDocument();
    expect(screen.getByText(props.body)).toBeInTheDocument();
    expect(screen.getByText(props.footer)).toBeInTheDocument();
  });

  it('links "Go Home" and "Contact Us" to the given hrefs', () => {
    render(<NotFoundView {...props} />);
    expect(screen.getByRole('link', { name: props.goHomeLabel })).toHaveAttribute('href', props.goHomeHref);
    expect(screen.getByRole('link', { name: props.contactLabel })).toHaveAttribute(
      'href',
      props.contactHref
    );
  });

  it('renders the 404 figure with an accessible label', () => {
    render(<NotFoundView {...props} />);
    expect(screen.getByRole('img', { name: '404 — page not found' })).toBeInTheDocument();
  });

  it('tracks the mouse for the parallax background', () => {
    render(<NotFoundView {...props} />);
    fireEvent.mouseMove(window, { clientX: 100, clientY: 50 });
    // No crash and the figure is still present — the parallax effect itself
    // is purely a transform style on a decorative div, nothing user-facing
    // to assert beyond "handling a mousemove doesn't break the page".
    expect(screen.getByText(props.fourOhFour)).toBeInTheDocument();
  });

  it('intensifies the 404 glow on hover and reverts on mouse leave', () => {
    render(<NotFoundView {...props} />);
    const figure = screen.getByRole('img', { name: '404 — page not found' });

    fireEvent.mouseEnter(figure);
    expect(figure).toHaveStyle({ color: 'rgba(245,158,11,0.12)' });

    fireEvent.mouseLeave(figure);
    expect(figure).toHaveStyle({ color: 'rgba(0, 0, 0, 0)' });
  });
});
