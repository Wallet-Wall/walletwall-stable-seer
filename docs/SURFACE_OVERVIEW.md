# Stable Seer — Surface Overview

Stable Seer is a read-only stablecoin peg monitor. It is one of three surfaces in the WalletWall analytics suite. The other two are [Coinstellation](https://github.com/Wallet-Wall/walletwall-coinstellation) and [Holder Wall](https://github.com/Wallet-Wall/walletwall-holder-wall).

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

## How the Three Surfaces Relate

All three WalletWall surfaces are read-only lenses on the same underlying subject: the safety and exposure profile of stablecoins and the wallets that hold them.

- **Stable Seer** (this repo) examines the stablecoin itself: peg health, liquidity, and pool structure.
- **Coinstellation** examines a wallet: who it transacts with, what it holds, and how value flows.
- **Holder Wall** examines the holder distribution of a stablecoin: concentration, entity type, and holding behavior.

Together they form a read-only analytics picture. Write flows, vault decisions, signing, and execution are intentionally out of scope for all three public repositories.
