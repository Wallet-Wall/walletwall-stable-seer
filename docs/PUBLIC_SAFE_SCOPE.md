# Public-Safe Scope

This document defines what is included and explicitly excluded from `walletwall-stable-seer`.

## Included

- **Stable Seer** — read-only stablecoin peg monitor (static fixture data only)
- Public-safe UI components and brand styling
- Synthetic, clearly labeled demo fixture data
- Lightweight tests verifying render, fixture display, and absence of forbidden strings

## Explicitly Excluded — Do Not Add

| Category | Excluded Items |
|---|---|
| Secrets | Private API keys, Dune API keys, Alchemy keys, Etherscan keys, Infura project IDs, mnemonics, private keys of any kind |
| Execution | Paid Dune query execution, live data refresh endpoints, backend infrastructure |
| Wallet | Wallet connection (WalletConnect or any provider), signing, transaction construction, authorization flows |
| Vault | Vault write flows, custody, deposit, swap, bridge, or yield execution |
| Data | Real sensitive wallet labels, production user data, annotated entity identities |
| History | Private repository git history |
| Config | Vercel project IDs, private deployment metadata, private org config, `.env` files |
| Claims | Claims of production quantum protection, audited vault safety, mainnet readiness, yield, or custody |

## Contribution Boundary

If you identify an implementation opportunity that falls outside the above scope, document it as a follow-up issue rather than implementing it. The product roadmap is owned by the WalletWall team.

## Permitted Follow-Up Topics (Document Only, Do Not Implement Here)

- Live read-only stablecoin price connectors (requires separate approval and scoping)
- User-owned data source wiring
- Authentication or access control for private deployments
- Additional filtering or sorting capabilities for the peg monitor
