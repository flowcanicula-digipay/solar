import '@testing-library/jest-dom/vitest';
import React from 'react';
import { act } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.clearAllMocks();
});

vi.mock('next-intl/server', () => import('./mocks/nextIntlServer'));

// [locale]/layout.tsx renders <NextIntlClientProvider messages={messages}>
// without an explicit `locale` prop — in production Next's RSC bridge
// forwards the request-scoped locale across the server/client boundary
// automatically. Calling the layout directly in a test bypasses that bridge
// entirely, so NextIntlClientProvider can't infer it and throws. Default it
// here rather than changing the (working-in-production) source.
vi.mock('next-intl', async () => {
  const actual = await vi.importActual<typeof import('next-intl')>('next-intl');
  return {
    ...actual,
    NextIntlClientProvider: (props: Record<string, unknown>) =>
      actual.NextIntlClientProvider({
        locale: 'en',
        ...props,
      } as Parameters<typeof actual.NextIntlClientProvider>[0]),
  };
});

// next-intl/navigation's createNavigation() (used by src/i18n/navigation.ts)
// pulls in next/navigation internally, which Vite/Vitest fails to resolve
// through Next's ESM export map ("Did you mean next/navigation.js"). Mocking
// the thin app wrapper directly sidesteps that resolution entirely — Link
// becomes a plain <a>, and the router is a stable object so tests can assert
// on calls to its methods (e.g. LanguageSwitcher calling router.replace).
const mockRouter = { push: vi.fn(), replace: vi.fn(), back: vi.fn(), refresh: vi.fn() };

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...rest
  }: { href: string | { pathname: string }; children?: React.ReactNode } & Record<string, unknown>) =>
    React.createElement('a', { href: typeof href === 'string' ? href : href.pathname, ...rest }, children),
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => mockRouter),
  getPathname: vi.fn(({ href }: { href: string | { pathname: string } }) =>
    typeof href === 'string' ? href : href.pathname
  ),
}));

// next/font/google ships a webpack loader that resolves to real font files at
// build time. Outside Next's build pipeline (i.e. in Vitest) that loader
// doesn't exist and the real package would try to hit the network, so every
// font factory is replaced with a stub returning the shape callers use
// (`.variable`, `.className`).
vi.mock('next/font/google', () => ({
  Playfair_Display: () => ({ variable: '--font-playfair', className: 'font-playfair' }),
  Inter: () => ({ variable: '--font-inter', className: 'font-inter' }),
}));

// next/image requires Next's image-optimization request context to do
// anything beyond rendering a plain <img>; since next.config.ts sets
// `images.unoptimized: true` in this project anyway, a plain <img> is exactly
// what production renders too.
vi.mock('next/image', () => ({
  default: ({ src, alt, fill, priority, ...rest }: Record<string, unknown>) =>
    React.createElement('img', { src, alt, ...rest }),
}));

// next/navigation's router hooks throw outside an actual mounted App Router
// tree. redirect()/notFound() are mocked to throw a recognizable, inspectable
// error instead of Next's internal control-flow signals, so tests can assert
// on "did this redirect/404" without needing Next's runtime.
vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
  usePathname: vi.fn(() => '/en'),
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() })),
  useParams: vi.fn(() => ({ locale: 'en' })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

// jsdom has no IntersectionObserver. Several components use it purely as a
// "fade/slide in once visible" trigger. The stub below never fires on its
// own (no real viewport/scrolling in jsdom), but registers every callback so
// tests can opt in to simulating "now visible" via triggerIntersections().
type IntersectionCallback = (entries: Pick<IntersectionObserverEntry, 'isIntersecting'>[]) => void;
const intersectionCallbacks: IntersectionCallback[] = [];

export function triggerIntersections(isIntersecting = true) {
  // The setState calls inside observer callbacks happen outside of any React
  // event handler, so without act() the resulting DOM update isn't flushed
  // before the test's next assertion runs.
  act(() => {
    for (const cb of intersectionCallbacks) cb([{ isIntersecting }]);
  });
}

class MockIntersectionObserver {
  constructor(callback: IntersectionCallback) {
    intersectionCallbacks.push(callback);
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
// @ts-expect-error -- partial stub, sufficient for tests that don't rely on actual intersection
global.IntersectionObserver = MockIntersectionObserver;

afterEach(() => {
  intersectionCallbacks.length = 0;
});

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
