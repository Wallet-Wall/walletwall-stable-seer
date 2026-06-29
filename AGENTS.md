# AGENTS.md

Rules for AI coding agents (Codex, Claude Code, Copilot, etc.) working on this repository.

## Branch Model

- Never commit directly to `main`
- Create a feature branch for all changes
- Open a draft PR and do not merge your own PRs
- Final merge must be approved by a human maintainer

## Change Scope

- Keep changes narrow and reviewable — one issue or feature per PR
- Do not perform broad refactors or style changes unless that is the explicit task
- Prefer small commits with descriptive messages
- Do not commit `dist/`, `node_modules/`, coverage output, or other generated artifacts

## Secret Handling

- Never print, copy, summarize, or commit real API keys, tokens, or credentials
- `.env`, `.env.local`, `.env.txt`, and any service account JSON files are local-only
- Use `.env.example` placeholders only
- If a secret appears in review output, stop and ask the human for guidance

## Required Checks

Before marking a PR ready, confirm these pass:

```
npm run test
npm run build
npm run security:audit
```

## Product Scope

I decide product scope. Do not independently expand this into vault write flows, wallet connections, custody, deposits, swaps, trading, signing, execution, marketplace work, MCP/server work, OAuth, paid Dune execution, or backend infrastructure. If you identify an implementation opportunity, document it as a follow-up issue rather than implementing it.

## Wallet Data Copy

When writing UI text that references an address:

- Use: `this address`, `this wallet`, `the wallet`
- Avoid: `your wallet`, `you moved`, `your strategy`

Stable Seer displays read-only fixture data. It must not imply ownership, control, or financial advice.

## Brand

UI changes must preserve the cream (`#FAF8F3`) and terracotta (`#BF4E32`) palette. Do not introduce purple/violet accents or generic circular green dots.
