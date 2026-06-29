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
| `ok` | On peg — deviation within normal bounds |
| `watch` | Watch — deviation is elevated, monitor closely |
| `alert` | Depeg — significant deviation detected |

## Replacing the Fixture With Your Own Data

To wire Stable Seer to your own data source:

1. Replace the contents of `src/data/stable-seer.fixture.json` with your data, matching the schema above.
2. Ensure your data source is **read-only** — no write access, no private keys, no paid execution paths in this repo.
3. If connecting to a live price or liquidity API, build a separate server-side proxy that holds credentials outside this repository. Never commit API keys here.
4. Update `_note` and `as_of` to reflect the source and freshness.

## Live Connectors

Live data connectors (e.g., CoinGecko, Chainlink, Dune) are **out of scope** for this repository unless separately approved and scoped. This repository is intentionally fixture-only to remain publicly safe.
