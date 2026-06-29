import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { extname } from 'path';

const ROOT = process.cwd().endsWith('/') ? process.cwd() : process.cwd() + '/';

const FORBIDDEN = [
  ['DUNE',      'API', 'KEY'].join('_'),
  ['ALCHEMY',   'API', 'KEY'].join('_'),
  ['ETHERSCAN', 'API', 'KEY'].join('_'),
  ['PRIVATE',   'KEY'].join('_'),
  ['MNEM',      'ONIC'].join(''),
  ['WALLET',    'CONNECT'].join(''),
  ['VERCEL',    'TOKEN'].join('_'),
  ['SECRET',    'KEY'].join('_'),
  ['INFURA',    'PROJECT', 'ID'].join('_'),
];

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'coverage']);
const SKIP_FILES = new Set(['no-secrets.test.js']);
const SCAN_EXTS = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.css',
]);

function collectFiles(rootDir) {
  const entries = readdirSync(rootDir, { recursive: true });
  return entries
    .filter((entry) => {
      if (typeof entry !== 'string') return false;
      const parts = entry.split(/[/\\]/);
      if (parts.some((p) => SKIP_DIRS.has(p))) return false;
      if (SKIP_FILES.has(parts.at(-1))) return false;
      return SCAN_EXTS.has(extname(entry));
    })
    .map((entry) => `${rootDir}${entry}`);
}

describe('No secrets committed', () => {
  const files = collectFiles(ROOT);

  it('finds source files to scan', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const forbidden of FORBIDDEN) {
    it(`does not contain "${forbidden}"`, () => {
      const matches = [];
      for (const file of files) {
        const content = readFileSync(file, 'utf8');
        if (content.includes(forbidden)) {
          matches.push(file.replace(ROOT, ''));
        }
      }
      expect(matches).toEqual([]);
    });
  }

  it('does not include .env files', () => {
    const envFiles = files.filter((f) => {
      const base = f.split('/').pop();
      return base === '.env' || base.startsWith('.env.');
    });
    expect(envFiles).toEqual([]);
  });
});
