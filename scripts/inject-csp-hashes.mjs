// Runs after `next build` (static export). For each generated HTML file, hashes
// every inline <script> (JSON-LD, plus Next's per-page RSC hydration payloads —
// their content differs per route and can't be known at component-render time)
// and rewrites that file's CSP meta tag to allowlist exactly those hashes.
// Static export has no server to issue per-request nonces, so per-file hashing
// is the only way to keep `script-src` strict (no 'unsafe-inline') while still
// allowing the inline scripts Next.js itself emits.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function listHtmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...listHtmlFiles(full));
    } else if (entry.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

export function hashInlineScripts(html) {
  const scriptRe = /<script([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  const hashes = new Set();
  let match;
  while ((match = scriptRe.exec(html))) {
    const [, attrs, body] = match;
    if (/\bsrc=/.test(attrs)) continue; // external script — governed by 'self', no hash needed
    if (!body.trim()) continue;
    hashes.add(createHash('sha256').update(body, 'utf8').digest('base64'));
  }
  return [...hashes];
}

export function patchCsp(html) {
  if (!html.includes('Content-Security-Policy')) return html;

  const hashes = hashInlineScripts(html);
  const scriptSrcValue = `script-src &#x27;self&#x27; ${hashes
    .map((h) => `&#x27;sha256-${h}&#x27;`)
    .join(' ')}`.trim();

  return html.replace(
    /(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")/,
    (_full, pre, content, post) =>
      // The content here is HTML-entity-encoded (' -> &#x27;), and &#x27; itself
      // contains a literal ';' — a naive `[^;]*` stops at that entity-internal
      // semicolon instead of the real directive separator, truncating the
      // match. Stop at the next directive ('; style-src') instead, since
      // buildCsp() always places style-src immediately after script-src.
      `${pre}${content.replace(/script-src[\s\S]*?(?=; style-src)/, scriptSrcValue)}${post}`
  );
}

export function run(outDir) {
  let filesPatched = 0;

  for (const file of listHtmlFiles(outDir)) {
    const html = readFileSync(file, 'utf8');
    const patched = patchCsp(html);

    if (patched !== html) {
      writeFileSync(file, patched, 'utf8');
      filesPatched++;
    }
  }

  return filesPatched;
}

// Only run the CLI side effect when this file is executed directly (`node
// scripts/inject-csp-hashes.mjs`), not when imported by tests.
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const filesPatched = run(join(process.cwd(), 'out'));
  console.log(`[inject-csp-hashes] patched ${filesPatched} HTML file(s) in out/`);
}
