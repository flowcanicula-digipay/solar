// Global CSS must be imported here, in the actual root layout — not in
// `not-found.tsx` or `[locale]/layout.tsx` alone. Next's per-route CSS
// chunking for the special `_not-found` route only reliably includes CSS
// reachable from the root layout's own import graph; importing it solely
// as a sibling of `not-found.tsx` silently drops the Tailwind-processed
// output from that route's bundle (font-loader CSS is unaffected since it's
// injected through a separate mechanism), leaving the page unstyled.
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
