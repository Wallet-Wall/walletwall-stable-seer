# Data Fixtures

Stable Seer ships with synthetic, clearly labeled demo data located in `src/data/stable-seer.fixture.json`.

## Fixture File

| File | Purpose |
|---|---|
| `stable-seer.fixture.json` | Stablecoin list with peg status, deviation, liquidity, pools, and chains |

## Fixture Schema

```jsonc
{
  "_note": "DEMO DATA ONLY — synthetic fixture, not real market data.",
  "as_of": "<ISO timestamp>",
  "coins": [
    {
      "id": "demo-usdc",
      "symbol": "USDC",
      "name": "USD Coin (demo)",
      "peg_status": "ok" | "watch" | "alert",
      "is_soft_peg": false,
      "peg_deviation_pct": 0.01,
      "peg_price_usd": 1.0001,
      "liquidity_usd": 420000000,
      "issuer": "Demo Issuer A",
      "chains": ["Ethereum (demo)", "Polygon (demo)"],
      "pools": [
        {
          "id": "pool-demo-1",
          "name": "USDC/USDT demo pool",
          "dex": "DemoSwap",
          "chain": "Ethereum (demo)",
          "type": "stable-stable" | "stable-volatile",
          "liquidity_usd": 210000000,
          "peg_deviation_pct": 0.01
        }
      ]
    }
  ]
}
```

### Peg Status Values

| Value | Meaning |
|---|---|
| `ok` | On peg — deviation within normal bounds for this coin's peg type |
| `watch` | Watch — deviation is elevated, monitor closely |
| `alert` | Depeg — significant deviation detected |

### Soft-Peg Tolerance (Simplified Demo Concept)

`is_soft_peg` marks stablecoins that target $1.00 through algorithmic or
partially-collateralized mechanisms (this fixture uses FRAX as the one example)
rather than full 1:1 fiat reserves (e.g. USDC, USDT). Coins like these normally
trade in a slightly wider band around $1.00, so the app classifies their
`peg_status` with a looser "ok" tolerance than fully-reserved, hard-pegged
coins:

| Peg type | `is_soft_peg` | "ok" tolerance | "watch" ceiling |
|---|---|---|---|
| Hard-pegged (e.g. USDC, USDT, DAI) | `false` | < 0.1% deviation | < 1% deviation |
| Soft-pegged (e.g. FRAX) | `true` | < 0.5% deviation | < 1% deviation |

The app computes `peg_status` from `peg_deviation_pct` and `is_soft_peg` via
`classifyPegStatus()` in `src/lib/peg-status.js` — the value stored in the
fixture is kept consistent with that function (and checked by a test) rather
than being an independent, hand-set label. This is a small, publicly-safe
illustration of a soft-peg tolerance concept, **not** WalletWall's production
threshold table or soft-peg symbol list, and the classification reflects only
this fixture's single static snapshot value — it is not a live depeg risk
signal.

## Replacing the Fixture With Your Own Data

To wire Stable Seer to your own data source:

1. Replace the contents of `src/data/stable-seer.fixture.json` with your data, matching the schema above.
2. Ensure your data source is **read-only** — no write access, no private keys, no paid execution paths in this repo.
3. If connecting to a live price or liquidity API, build a separate server-side proxy that holds credentials outside this repository. Never commit API keys here.
4. Update `_note` and `as_of` to reflect the source and freshness.

## Live Connectors

Live data connectors (e.g., CoinGecko, Chainlink, Dune) are **out of scope** for this repository unless separately approved and scoped. This repository is intentionally fixture-only to remain publicly safe.
