# Security Policy

## Scope

`walletwall-stable-seer` is a public-safe, read-only demo repository. It contains no live API integrations, no wallet connections, no transaction logic, and no production secrets.

## Reporting a Vulnerability

If you discover a security issue in this repository, please report it privately rather than opening a public issue.

**Contact:** security@walletwall.org (or open a GitHub Security Advisory on this repository)

Please include:
- A description of the issue
- Steps to reproduce
- Your assessment of impact

We will acknowledge reports within 72 hours and aim to resolve confirmed issues within 14 days.

## Secret Handling

**Never commit secrets to this repository.**

This includes but is not limited to:

- API keys of any kind (Dune, Alchemy, Etherscan, Infura, etc.)
- Private keys or mnemonics
- WalletConnect project IDs
- Vercel tokens or project configuration
- `.env` files or files containing environment variable assignments for sensitive values
- Production database URLs or credentials

If you accidentally commit a secret:
1. Rotate the secret immediately — assume it is compromised.
2. Remove it from history using `git filter-repo` or GitHub's secret scanning remediation tools.
3. Report the exposure per the process above if it affects a shared system.

## What This Repository Does NOT Contain

- Wallet connection logic
- Transaction or signing logic
- Custody, deposit, swap, bridge, or yield execution flows
- Paid Dune execution or live query paths
- Production API routes
- Real user data or sensitive wallet annotations
- Private repository git history

## Automated Scanning

The `tests/no-secrets.test.js` suite scans committed source files for known forbidden string patterns (API key names, mnemonics, etc.) on every test run.
