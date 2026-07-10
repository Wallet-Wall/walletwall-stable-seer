import { describe, it, expect } from 'vitest';
import { classifyPegStatus, isSoftPegSymbol, SOFT_PEG_SYMBOLS } from '../src/lib/peg-status.js';
import fixture from '../src/data/stable-seer.fixture.json';

describe('classifyPegStatus (soft-peg tolerance concept)', () => {
  it('classifies a hard-pegged coin "ok" only within a tight (< 0.1%) band', () => {
    expect(classifyPegStatus(0.01, false)).toBe('ok');
    expect(classifyPegStatus(0.09, false)).toBe('ok');
  });

  it('classifies a hard-pegged coin "watch" once deviation reaches 0.1%', () => {
    expect(classifyPegStatus(0.18, false)).toBe('watch');
  });

  it('classifies a soft-pegged coin "ok" within a wider (< 0.5%) band', () => {
    expect(classifyPegStatus(0.24, true)).toBe('ok');
    expect(classifyPegStatus(0.49, true)).toBe('ok');
  });

  it('classifies the SAME deviation as "ok" for soft-pegged but "watch" for hard-pegged', () => {
    const deviation = 0.24;
    expect(classifyPegStatus(deviation, true)).toBe('ok');
    expect(classifyPegStatus(deviation, false)).toBe('watch');
  });

  it('classifies "watch" for a soft-pegged coin once deviation is >= 0.5%', () => {
    expect(classifyPegStatus(0.6, true)).toBe('watch');
  });

  it('classifies "alert" at or above 1% deviation regardless of peg type', () => {
    expect(classifyPegStatus(1.42, false)).toBe('alert');
    expect(classifyPegStatus(1.42, true)).toBe('alert');
  });
});

describe('isSoftPegSymbol', () => {
  it('recognizes the demo soft-peg symbol set', () => {
    expect(isSoftPegSymbol('FRAX')).toBe(true);
    expect(isSoftPegSymbol('frax')).toBe(true);
    expect(SOFT_PEG_SYMBOLS.has('FRAX')).toBe(true);
  });

  it('does not treat hard-pegged symbols as soft-pegged', () => {
    expect(isSoftPegSymbol('USDC')).toBe(false);
    expect(isSoftPegSymbol('USDT')).toBe(false);
  });
});

describe('fixture peg_status stays consistent with classifyPegStatus', () => {
  it('every fixture coin\'s stored peg_status matches its computed classification', () => {
    for (const coin of fixture.coins) {
      const computed = classifyPegStatus(coin.peg_deviation_pct, Boolean(coin.is_soft_peg));
      expect(
        coin.peg_status,
        `${coin.symbol}: fixture peg_status "${coin.peg_status}" should match computed "${computed}" for deviation ${coin.peg_deviation_pct}% (is_soft_peg=${coin.is_soft_peg})`,
      ).toBe(computed);
    }
  });

  it('includes at least one hard-pegged and one soft-pegged example', () => {
    const hardPegCoins = fixture.coins.filter((c) => !c.is_soft_peg);
    const softPegCoins = fixture.coins.filter((c) => c.is_soft_peg);
    expect(hardPegCoins.length).toBeGreaterThan(0);
    expect(softPegCoins.length).toBeGreaterThan(0);
  });

  it('the fixture\'s soft-peg coin (FRAX) reads "ok" at a deviation that would watch a hard-pegged coin', () => {
    const frax = fixture.coins.find((c) => c.symbol === 'FRAX');
    expect(frax.is_soft_peg).toBe(true);
    expect(frax.peg_status).toBe('ok');
    expect(classifyPegStatus(frax.peg_deviation_pct, false)).toBe('watch');
  });
});
