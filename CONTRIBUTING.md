# Contributing

Thank you for your interest in `walletwall-stable-seer`.

## Before Contributing

Read `docs/PUBLIC_SAFE_SCOPE.md` carefully. This repository has a strict public-safe boundary. Contributions that introduce private API keys, wallet connection logic, transaction flows, paid execution paths, or production secrets will not be accepted.

## Getting Started

```bash
npm install
npm run dev      # start local dev server
npm test         # run test suite
npm run build    # verify production build
```

## Contribution Types That Are Welcome

- Bug fixes in the Stable Seer surface
- UI/styling improvements aligned with the WalletWall brand system
- Fixture data improvements (must remain synthetic and clearly labeled)
- Documentation improvements
- Test coverage improvements
- Accessibility improvements

## Contribution Types That Are Out of Scope

See `docs/PUBLIC_SAFE_SCOPE.md` for the full exclusion list. In summary: no secrets, no live data connectors, no wallet connections, no signing or transaction logic, no vault write flows.

## Pull Request Checklist

- [ ] `npm test` passes
- [ ] `npm run build` succeeds
- [ ] No `.env` files or secret strings introduced
- [ ] Fixture data is clearly labeled as synthetic/demo
- [ ] Disclaimer is visible on the surface
- [ ] Changes stay within the scope defined in `docs/PUBLIC_SAFE_SCOPE.md`

## Branch Model

- Never commit directly to `main`
- Create a feature branch for all changes: `git checkout -b feature/your-feature-name`
- Open a pull request against `main`

## Code Style

- React functional components with hooks
- Plain CSS — no external style dependencies
- No wallet SDKs, no Web3 libraries, no live-data clients
- No backend code
- No comments explaining what code does — well-named identifiers do that
- Add a comment only when the **why** is non-obvious

## UI Guidelines

- Use the existing cream (`#FAF8F3`) and terracotta (`#BF4E32`) palette
- Do not introduce purple/violet accents or generic circular green dots
