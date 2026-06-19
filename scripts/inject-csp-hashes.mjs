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

const outDir = join(process.cwd(), 'out');

function listHtmlFiles(dir) {
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

function hashInlineScripts(html) {
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

let filesPatched = 0;

for (const file of listHtmlFiles(outDir)) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes('Content-Security-Policy')) continue;

  const hashes = hashInlineScripts(html);
  const scriptSrcValue = `script-src &#x27;self&#x27; ${hashes
    .map((h) => `&#x27;sha256-${h}&#x27;`)
    .join(' ')}`.trim();

  const patched = html.replace(
    /(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")/,
    (_full, pre, content, post) =>
      // The content here is HTML-entity-encoded (' -> &#x27;), and &#x27; itself
      // contains a literal ';' — a naive `[^;]*` stops at that entity-internal
      // semicolon instead of the real directive separator, truncating the
      // match. Stop at the next directive ('; style-src') instead, since
      // buildCsp() always places style-src immediately after script-src.
      `${pre}${content.replace(/script-src[\s\S]*?(?=; style-src)/, scriptSrcValue)}${post}`
  );

  if (patched !== html) {
    writeFileSync(file, patched, 'utf8');
    filesPatched++;
  }
}

console.log(`[inject-csp-hashes] patched ${filesPatched} HTML file(s) in out/`);
