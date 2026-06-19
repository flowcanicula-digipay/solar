import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, sep } from 'node:path';
import { listHtmlFiles, hashInlineScripts, patchCsp, run } from '../../scripts/inject-csp-hashes.mjs';

describe('hashInlineScripts', () => {
  it('hashes inline script bodies', () => {
    const html = `<script>console.log('hi')</script>`;
    expect(hashInlineScripts(html)).toHaveLength(1);
  });

  it('ignores external scripts (with a src attribute)', () => {
    const html = `<script src="/_next/static/chunks/main.js"></script>`;
    expect(hashInlineScripts(html)).toHaveLength(0);
  });

  it('ignores empty inline scripts', () => {
    const html = `<script></script>`;
    expect(hashInlineScripts(html)).toHaveLength(0);
  });

  it('dedupes identical inline scripts', () => {
    const html = `<script>same()</script><script>same()</script>`;
    expect(hashInlineScripts(html)).toHaveLength(1);
  });

  it('matches uppercase tags and closing tags with trailing whitespace', () => {
    const html = `<SCRIPT>upper()</SCRIPT  >`;
    expect(hashInlineScripts(html)).toHaveLength(1);
  });

  it('produces a stable sha256/base64 hash', () => {
    const html = `<script>fixed()</script>`;
    const [hash] = hashInlineScripts(html);
    expect(hash).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });
});

describe('patchCsp', () => {
  function metaWith(scriptSrc: string) {
    return (
      `<html><head><meta http-equiv="Content-Security-Policy" content="default-src &#x27;none&#x27;; ` +
      `${scriptSrc}; style-src &#x27;self&#x27; &#x27;unsafe-inline&#x27;"></head>` +
      `<body><script>hello()</script></body></html>`
    );
  }

  it('leaves HTML without a CSP meta tag untouched', () => {
    const html = '<html><body>no csp here</body></html>';
    expect(patchCsp(html)).toBe(html);
  });

  it('replaces the placeholder script-src with real hashes', () => {
    const html = metaWith("script-src &#x27;self&#x27;");
    const patched = patchCsp(html);
    expect(patched).toMatch(/script-src &#x27;self&#x27; &#x27;sha256-[^&]+&#x27;/);
  });

  it('does not leave a stray fragment between script-src and style-src', () => {
    // Regression test: a naive /script-src[^;]*/ regex stops at the literal
    // ';' inside the &#x27; HTML entity, truncating the match and leaving a
    // dangling "self&#x27;" right before "; style-src" — which made browsers
    // see an invalid directive name (`'self''`).
    const html = metaWith("script-src &#x27;self&#x27;");
    const patched = patchCsp(html);
    expect(patched).not.toMatch(/&#x27;;self&#x27;;/);
    expect(patched).toContain('; style-src');
  });

  it('is idempotent-safe to run twice in a row', () => {
    const html = metaWith("script-src &#x27;self&#x27;");
    const once = patchCsp(html);
    const twice = patchCsp(once);
    expect(twice).toMatch(/script-src &#x27;self&#x27; &#x27;sha256-[^&]+&#x27;/);
    expect(twice).not.toMatch(/&#x27;;self&#x27;;/);
  });
});

describe('listHtmlFiles', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'inject-csp-test-'));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('finds HTML files recursively and ignores other extensions', () => {
    writeFileSync(join(dir, 'index.html'), '<html></html>');
    mkdirSync(join(dir, 'en'));
    writeFileSync(join(dir, 'en', 'index.html'), '<html></html>');
    writeFileSync(join(dir, 'data.json'), '{}');

    const found = listHtmlFiles(dir).sort();
    expect(found).toHaveLength(2);
    expect(found.some((f) => f.endsWith(`en${sep}index.html`))).toBe(true);
  });
});

describe('run', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'inject-csp-run-test-'));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('patches every HTML file containing a CSP meta tag and reports the count', () => {
    const withCsp =
      '<html><head><meta http-equiv="Content-Security-Policy" content="default-src &#x27;none&#x27;; script-src &#x27;self&#x27;; style-src &#x27;self&#x27;"></head><body><script>x()</script></body></html>';
    const withoutCsp = '<html><body>plain</body></html>';

    writeFileSync(join(dir, 'a.html'), withCsp);
    writeFileSync(join(dir, 'b.html'), withoutCsp);

    const count = run(dir);
    expect(count).toBe(1);
  });
});
