/**
 * Soft-peg tolerance concept (public-demo, simplified)
 * -----------------------------------------------------
 * Fully-reserved, "hard-pegged" stablecoins (e.g. USDC, USDT) are expected to
 * trade extremely close to $1.00, so even a small deviation is worth flagging.
 * Algorithmic / partially-collateralized "soft-pegged" stablecoins (e.g. FRAX)
 * are designed around a wider natural trading band — the same deviation that
 * would flag a hard-pegged coin is still normal, on-peg behavior for one of
 * these.
 *
 * This module reproduces that CONCEPT at demo scale only: a two-row threshold
 * table and a single illustrative soft-peg example already present in this
 * repo's fixture. It is intentionally simplified and is NOT WalletWall's
 * production threshold table or symbol list.
 *
 * Every classification produced here is derived from one static snapshot
 * value in `src/data/stable-seer.fixture.json` — it demonstrates how the
 * concept works on that snapshot, not a live depeg risk signal.
 */

// "ok" tolerance: how close to the $1.00 target a coin must trade to be
// considered on-peg.
export const HARD_PEG_OK_THRESHOLD_PCT = 0.1; // e.g. USDC, USDT, DAI
export const SOFT_PEG_OK_THRESHOLD_PCT = 0.5; // e.g. FRAX — wider natural band

// At or above this (regardless of peg type), classify as a depeg alert.
export const WATCH_CEILING_PCT = 1;

// Demo-scoped example set — just the soft-pegged coin used in this fixture.
// A production system would maintain its own broader, actively-curated list.
export const SOFT_PEG_SYMBOLS = new Set(['FRAX']);

export function isSoftPegSymbol(symbol) {
  return typeof symbol === 'string' && SOFT_PEG_SYMBOLS.has(symbol.toUpperCase());
}

/**
 * Classifies peg health from an unsigned deviation percentage.
 * @param {number} deviationPct - absolute % deviation from the $1.00 target
 * @param {boolean} isSoftPeg - true for algorithmic/soft-pegged coins
 * @returns {'ok'|'watch'|'alert'}
 */
export function classifyPegStatus(deviationPct, isSoftPeg) {
  const okThreshold = isSoftPeg ? SOFT_PEG_OK_THRESHOLD_PCT : HARD_PEG_OK_THRESHOLD_PCT;
  if (deviationPct < okThreshold) return 'ok';
  if (deviationPct < WATCH_CEILING_PCT) return 'watch';
  return 'alert';
}
