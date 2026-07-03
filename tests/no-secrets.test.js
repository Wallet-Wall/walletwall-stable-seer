import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { extname, basename } from 'path';

const ROOT = process.cwd().replace(/[/\\]*$/, '') + '/';

// --- Layer 1: forbidden secret ENV-VAR NAMES -------------------------------
// A committed key line almost always names its variable. Names are assembled
// via .join() so THIS test file never contains the literal strings it bans
// (the file is skipped from scanning anyway; this keeps grep-audits clean too).
const FORBIDDEN_NAMES = [
  ['DUNE', 'API', 'KEY'].join('_'),
  ['ALCHEMY', 'API', 'KEY'].join('_'),
  ['ETHERSCAN', 'API', 'KEY'].join('_'),
  ['PRIVATE', 'KEY'].join('_'),
  ['MNEM', 'ONIC'].join(''),
  ['WALLET', 'CONNECT'].join(''),
  ['VERCEL', 'TOKEN'].join('_'),
  ['SECRET', 'KEY'].join('_'),
  ['INFURA', 'PROJECT', 'ID'].join('_'),
  ['GCP', 'SERVICE', 'ACCOUNT', 'JSON'].join('_'),
];

// --- Layer 2: forbidden VALUE SHAPES + live-backend indicators -------------
// Catches a pasted secret or a re-introduced live backend even when the
// env-var name is absent — this is the layer that would catch a hardcoded
// key or re-introduced provider wiring this fixture-only surface must never
// regain. Calibrated to produce ZERO matches on the current clean tree:
//   - no 0x hex addresses/keys in the fixture (so the 64-hex rule is safe)
//   - "Dune" appears only as prose, never as api.dune.com / dune.com/api
const FORBIDDEN_PATTERNS = [
  { name: 'hex private key (0x + 64 hex)', re: /0x[a-fA-F0-9]{64}\b/ },
  { name: 'OpenAI-style secret token', re: /\bsk-[A-Za-z0-9]{20,}/ },
  { name: 'JWT', re: /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]+/ },
  { name: 'GitHub token', re: /\bgh[posru]_[A-Za-z0-9]{20,}/ },
  { name: 'AWS access key id', re: /\bAKIA[0-9A-Z]{16}\b/ },
  // A fixture-only surface must contain none of the live-backend markers below:
  { name: 'Dune API host', re: /api\.dune\.com|dune\.com\/api/i },
  { name: 'Dune execution primitive', re: /executeAndPoll/ },
  { name: 'BigQuery public dataset', re: /bigquery-public-data/ },
  {
    name: 'live provider host (alchemy/etherscan/infura)',
    re: /g\.alchemy\.com|alchemyapi\.io|api\.etherscan\.io|infura\.io/i,
  },
];

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'coverage', 'build']);
// package-lock.json is machine-generated (integrity hashes) — a false-positive
// source; it never holds real secrets, so exclude it from content scanning.
const SKIP_FILES = new Set(['no-secrets.test.js', 'package-lock.json']);
const SCAN_EXTS = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.css',
  '.md', '.mjs', '.cjs', '.yml', '.yaml', '.txt',
]);

// Raw recursive listing (normalized to forward slashes), minus skipped dirs.
function listAll(rootDir) {
  return readdirSync(rootDir, { recursive: true })
    .filter((entry) => typeof entry === 'string')
    .map((entry) => entry.split(/[/\\]/).join('/'))
    .filter((entry) => !entry.split('/').some((p) => SKIP_DIRS.has(p)));
}

// Content-scannable subset: right extension, not a skipped file.
function scannableFiles(entries) {
  return entries.filter((entry) => {
    if (SKIP_FILES.has(basename(entry))) return false;
    return SCAN_EXTS.has(extname(entry));
  });
}

describe('No secrets committed', () => {
  const allEntries = listAll(ROOT);
  const files = scannableFiles(allEntries);
  const read = (rel) => readFileSync(ROOT + rel, 'utf8');

  it('finds source files to scan', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const forbidden of FORBIDDEN_NAMES) {
    it(`does not contain the "${forbidden}" env var`, () => {
      const hits = files.filter((f) => read(f).includes(forbidden));
      expect(hits).toEqual([]);
    });
  }

  for (const { name, re } of FORBIDDEN_PATTERNS) {
    it(`does not contain ${name}`, () => {
      const hits = files.filter((f) => re.test(read(f)));
      expect(hits).toEqual([]);
    });
  }

  // Fixed: scans the RAW listing (not the extension-filtered subset), so a bare
  // `.env` / `.env.local` is actually detected. `.env.example` stays allowed.
  it('does not include committed .env files', () => {
    const envFiles = allEntries.filter((entry) => {
      const base = basename(entry);
      return (base === '.env' || base.startsWith('.env.')) && base !== '.env.example';
    });
    expect(envFiles).toEqual([]);
  });
});
