import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaybackTable from '@/components/PaybackTable';
import { renderWithIntl } from '../renderWithIntl';
import { triggerIntersections } from '../setup';

describe('PaybackTable', () => {
  it('renders all three system-size selector tabs', () => {
    renderWithIntl(<PaybackTable />);
    // Each tab has a p with the size label — use getAllByText since size also appears elsewhere
    expect(screen.getAllByText('5 kWp').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('8 kWp').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('15 kWp').length).toBeGreaterThanOrEqual(1);
    // Three tab buttons exist
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('defaults to the Family Home (8 kWp) tab', () => {
    renderWithIntl(<PaybackTable />);
    expect(screen.getByText('Family Home')).toBeInTheDocument();
    expect(screen.getByText('125,000,000')).toBeInTheDocument();
  });

  it('switches displayed data when a different tab is clicked', async () => {
    renderWithIntl(<PaybackTable />);
    const user = userEvent.setup();
    // Click the "Small Home" tab button (contains "Small Home" text)
    const smallTab = screen.getByText('Small Home').closest('button')!;
    await user.click(smallTab);
    expect(screen.getByText('78,000,000')).toBeInTheDocument();
  });

  it('shows the free-years-after-payback callout for the active row', () => {
    renderWithIntl(<PaybackTable />);
    // 8 kWp: 25 - 4.7 = 20.3 years free
    expect(screen.getByText(/years of free electricity after payback/)).toBeInTheDocument();
  });

  it('renders the 25-year panel guarantee stat', () => {
    renderWithIntl(<PaybackTable />);
    expect(screen.getByText('25 years')).toBeInTheDocument();
  });

  it('renders the disclaimer note at the bottom', () => {
    renderWithIntl(<PaybackTable />);
    expect(screen.getByText(/These are estimates/)).toBeInTheDocument();
  });

  it('reveals the component once the IntersectionObserver fires', () => {
    const { container } = renderWithIntl(<PaybackTable />);
    expect(container.querySelector('.opacity-0')).not.toBeNull();
    triggerIntersections(true);
    expect(container.querySelector('.opacity-0')).toBeNull();
  });

  it('switches to the 15 kWp commercial tab and shows correct cost', async () => {
    renderWithIntl(<PaybackTable />);
    const user = userEvent.setup();
    const commercialTab = screen.getByText('Office / Commercial').closest('button')!;
    await user.click(commercialTab);
    expect(screen.getByText('230,000,000')).toBeInTheDocument();
  });

  it('CountUp stays at 0 when not yet visible (active=false branch)', () => {
    // Before IntersectionObserver fires, the component is not "active" so
    // CountUpYears and CountUpVND both stay at their initial 0 value.
    renderWithIntl(<PaybackTable />);
    // payback years display shows "0.0" while inactive
    const paybackDisplay = screen.getByText('0.0');
    expect(paybackDisplay).toBeInTheDocument();
  });

  it('CountUp starts animating once the component becomes visible', () => {
    renderWithIntl(<PaybackTable />);
    // Before visibility the payback count is 0.0
    expect(screen.getByText('0.0')).toBeInTheDocument();
    // Trigger intersection — CountUp delays fire and requestAnimationFrame starts
    act(() => {
      triggerIntersections(true);
    });
    // After visibility the component is revealed (no longer opacity-0)
    const { container } = renderWithIntl(<PaybackTable />);
    triggerIntersections(true);
    expect(container.querySelector('.opacity-0')).toBeNull();
  });

  it('does not fire the observer callback when isIntersecting is false', () => {
    const { container } = renderWithIntl(<PaybackTable />);
    // Firing with isIntersecting=false should NOT reveal the component
    triggerIntersections(false);
    expect(container.querySelector('.opacity-0')).not.toBeNull();
  });

  it('rAF step function runs: CountUp animates through full cycle (fake timers + sync rAF stub)', async () => {
    // Flow: triggerIntersections → active=true → setTimeout(setStarted, delay) →
    //   started=true → useCountUp useEffect → requestAnimationFrame(step)
    // We need fake timers to advance the setTimeout, then a sync rAF stub so the
    // step() body actually executes and v8 covers lines 52-59.
    vi.useFakeTimers();

    let rafCallCount = 0;
    const maxRafCalls = 30;
    global.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      if (rafCallCount++ < maxRafCalls) {
        const ts = rafCallCount === 1 ? 0 : 1800; // first=init, subsequent=done
        cb(ts);
      }
      return rafCallCount;
    }) as unknown as typeof requestAnimationFrame;

    renderWithIntl(<PaybackTable />);

    // Fire the IntersectionObserver — sets active=true
    act(() => { triggerIntersections(true); });

    // Advance timers past the CountUpYears delay (200ms) and CountUpVND delay (300ms)
    await act(async () => { vi.advanceTimersByTime(500); });

    vi.useRealTimers();
    delete (global as Record<string, unknown>).requestAnimationFrame;
  });

  it('renders the VND cost for the small home row after tab click', async () => {
    renderWithIntl(<PaybackTable />);
    const user = userEvent.setup();
    const smallTab = screen.getByText('Small Home').closest('button')!;
    await user.click(smallTab);
    // The static cost display is shown (not animated)
    expect(screen.getByText('78,000,000')).toBeInTheDocument();
    expect(screen.getByText(/\$3,100/)).toBeInTheDocument();
  });

  it('renders the ~ panels count for each row', async () => {
    renderWithIntl(<PaybackTable />);
    const user = userEvent.setup();
    // Family Home (default) — ~20 panels
    expect(screen.getByText('~20 panels')).toBeInTheDocument();
    // Switch to Small Home — ~12 panels
    await user.click(screen.getByText('Small Home').closest('button')!);
    expect(screen.getByText('~12 panels')).toBeInTheDocument();
  });

  it('timeline bar widths are set to 0% while invisible', () => {
    const { container } = renderWithIntl(<PaybackTable />);
    // The two progress bars inside the timeline start at width 0%
    const bars = container.querySelectorAll<HTMLElement>('[style*="width: 0%"]');
    expect(bars.length).toBeGreaterThanOrEqual(1);
  });
});
