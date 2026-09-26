import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const indexHtmlPath = path.join(rootDir, 'index.html');

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('\n--- Testing Favicon and Logo in Ink Portal ---\n');

assert(fs.existsSync(indexHtmlPath), 'index.html exists');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const hasFaviconLink = /<link\s+rel="icon"\s+type="image\/svg\+xml"\s+href="\/ink-icon\.svg"\s*\/?>/i.test(
  indexHtml
);
assert(hasFaviconLink, 'index.html contains <link rel="icon" ... href="/ink-icon.svg" />');

const hasLogoLink = /<link\s+rel="apple-touch-icon"\s+href="\/ink-logo\.png"\s*\/?>/i.test(
  indexHtml
);
assert(hasLogoLink, 'index.html contains <link rel="apple-touch-icon" href="/ink-logo.png" />');

const faviconPath = path.join(publicDir, 'ink-icon.svg');
assert(fs.existsSync(faviconPath), 'public/ink-icon.svg exists');
if (fs.existsSync(faviconPath)) {
  const svg = fs.readFileSync(faviconPath, 'utf-8');
  assert(svg.includes('<svg') && svg.includes('</svg>'), 'ink-icon.svg has valid SVG markup');
}

const logoPath = path.join(publicDir, 'ink-logo.png');
assert(fs.existsSync(logoPath), 'public/ink-logo.png exists');
if (fs.existsSync(logoPath)) {
  const buf = fs.readFileSync(logoPath);
  assert(
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47,
    'ink-logo.png starts with PNG magic bytes'
  );
}

console.log(`\nResults: ${failures === 0 ? 'ALL PASSED' : `${failures} test(s) failed.`}\n`);

if (failures > 0) {
  process.exit(1);
}
