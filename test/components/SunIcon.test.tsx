import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SunIcon from '@/components/SunIcon';

describe('SunIcon', () => {
  it('renders an svg sized by the size prop', () => {
    const { container } = render(<SunIcon size={48} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });

  it('defaults to size 28 when no size is given', () => {
    const { container } = render(<SunIcon />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '28');
  });

  it('is hidden from assistive tech (purely decorative)', () => {
    const { container } = render(<SunIcon />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards a custom className', () => {
    const { container } = render(<SunIcon className="radiance-ring-slow" />);
    expect(container.querySelector('svg')).toHaveClass('radiance-ring-slow');
  });
});
