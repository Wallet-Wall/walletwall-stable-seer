# Stable Seer — Surface Overview

Stable Seer is a read-only stablecoin peg monitor. It is one of the surfaces in the WalletWall analytics suite. Sibling surfaces include [Coinstellation](https://github.com/Wallet-Wall/walletwall-coinstellation), [Holder Wall](https://github.com/Wallet-Wall/walletwall-holder-wall), and [Whale Watcher](https://github.com/Wallet-Wall/walletwall-whale-watcher).

---

## What Stable Seer Shows

- **Stablecoin list** with symbol, name, peg status (On Peg / Watch / Depeg), and deviation from $1.00
- **Total liquidity** aggregated across pools
- **Per-coin detail:** peg price, deviation, issuer, chains, and individual pool breakdown
- **Pool classification:** Stable·Stable vs Stable·Volatile

## What Stable Seer Does Not Do

- No live market data
- No wallet connection
- No transactions or swaps
- No vault write flows or custody claims
- No paid Dune execution

## Design Intent

Surfaces the peg health signal layer so a reader can assess stablecoin exposure at a glance. In the full product, this feeds into vault-readiness decisions — but that upstream logic is not present here.

---

## How the Surfaces Relate

These WalletWall surfaces are read-only lenses on the same underlying subject: the safety and exposure profile of stablecoins and the wallets that hold them.

- **Stable Seer** (this repo) examines the stablecoin itself: peg health, liquidity, and pool structure.
- **Coinstellation** examines a wallet: who it transacts with, what it holds, and how value flows.
- **Holder Wall** examines the holder distribution of a stablecoin: concentration, entity type, and holding behavior.
- **Whale Watcher** examines large-wallet activity: balances, transfer cadence, and accumulation/distribution trends.

Together they form a read-only analytics picture. Write flows, vault decisions, signing, and execution are intentionally out of scope for all of these public repositories.
