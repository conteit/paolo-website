# Major Dependency Upgrades & Automated Maintenance

> Created: 2026-04-24

## Goal

Close the major version dependency gap before expanding the website, then replace the existing manual Dependabot setup with Renovate for zero-touch ongoing maintenance and proactive CVE alerting.

## Scope

- Upgrade 5 deferred major-version packages across 3 PRs ordered by risk
- Replace `.github/dependabot.yml` with `renovate.json`
- Claude Code GitHub Action deferred to a future milestone

## Out of Scope

- Claude Code GitHub Action (deferred)
- Minor/patch updates (already handled in PR #46)
- Remaining unfixable MODERATE CVEs (`@vercel/react-router→ajv`, `resend→svix→uuid`)

---

## Part 1: Major Version Upgrades

Three PRs, each independently verifiable through the existing CI (typecheck + build).

### PR A — Low-risk UI packages

**Packages:**
- `lucide-react` `^0.556.0` → `^1.0.0`
- `@vercel/analytics` `^1.6.1` → `^2.0.0`

**Exposure:**
- `lucide-react`: 15 icons used across 6 files (`ArrowRight`, `Check`, `Loader2`, `Mail`, `Send`, `X`, `Gem`, `IterationCwIcon`, `Shapes`, `Sparkles`, `ExternalLink`, `Github`, `Folder`, `ChevronDown`, `ArrowLeft`). All names are preserved in v1.
- `@vercel/analytics`: single `<Analytics />` component in `app/components/AnalyticsProvider.tsx`. The v2 API is compatible; main change is a smaller bundle.

**Gate:** `npm run typecheck` passes + visual spot-check of homepage and projects page.

### PR B — Build toolchain

**Packages:**
- `vite` `^7.2.6` → `^8.0.0`
- `vite-tsconfig-paths` `^5.1.4` → `^6.0.0`

**Must go together:** `vite-tsconfig-paths` v6 requires Vite 8 as a peer dependency.

**Exposure:** `vite.config.ts` uses only three plugins — `tailwindcss()`, `reactRouter()`, `tsconfigPaths()` — all confirmed compatible with Vite 8.

**Gate:** `npm run build` produces clean output and `npm run dev` starts without errors.

### PR C — TypeScript 6

**Packages:**
- `typescript` `^5.9.3` → `^6.0.0`

**Exposure:** The codebase uses `strict: true`, `isolatedModules: true`, `moduleResolution: Bundler` — all forward-compatible with TypeScript 6. No deprecated flags in use. Known TypeScript 6 changes (`--erasableSyntaxOnly`, stricter decorator handling) don't apply here.

**Gate:** `npm run typecheck` passes with zero errors. Any new type errors must be fixed in the same PR, not suppressed.

**Order dependency:** PR C should be merged after PR B since TypeScript 6 may surface additional errors in Vite-generated types.

---

## Part 2: Renovate Configuration

### What changes

| File | Action |
|------|--------|
| `.github/dependabot.yml` | Deleted |
| `renovate.json` | Created at repo root |
| `.github/workflows/security.yml` | Unchanged — Renovate doesn't replace security scanning |

### `renovate.json`

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:recommended"],
  "schedule": ["before 9am on Monday"],
  "labels": ["dependencies"],
  "packageRules": [
    {
      "groupName": "react-router",
      "matchPackageNames": ["react-router", "@react-router/**"]
    },
    {
      "groupName": "tailwindcss",
      "matchPackageNames": ["tailwindcss", "@tailwindcss/**"]
    },
    {
      "groupName": "react",
      "matchPackageNames": ["react", "react-dom", "@types/react", "@types/react-dom"]
    },
    {
      "groupName": "vite",
      "matchPackageNames": ["vite", "vite-tsconfig-paths", "@vitejs/**"]
    },
    {
      "matchUpdateTypes": ["patch", "minor"],
      "automerge": true,
      "automergeType": "pr",
      "requiredStatusChecks": ["typecheck", "build"]
    },
    {
      "matchUpdateTypes": ["major"],
      "automerge": false
    }
  ],
  "vulnerabilityAlerts": {
    "enabled": true,
    "labels": ["security"],
    "automerge": true
  },
  "dependencyDashboard": true
}
```

### Key behaviours

- **Grouping** — `@react-router/*` (5 packages) arrives as one PR; same for tailwindcss, react, vite families
- **Auto-merge** — patch and minor PRs merge automatically once `typecheck` and `build` CI jobs pass; you never see them unless CI breaks
- **Major updates** — always open a PR for human review, never auto-merged
- **CVE alerts** — `vulnerabilityAlerts` opens a dedicated PR immediately when a CVE is detected in any direct or transitive dep; auto-merged if CI passes
- **Dependency Dashboard** — a pinned GitHub issue gives a live view of all pending, scheduled, and ignored updates

### Activation

Renovate is activated by installing the [Renovate GitHub App](https://github.com/apps/renovate) on the repository. Once installed, it detects `renovate.json` on the default branch and begins scheduling.

The blocked React versions from the old Dependabot config (CVE-2025-55182, affects `react` 19.0.0–19.2.0) are no longer needed as an explicit ignore rule — the current installed version (19.2.5) is already safe, and Renovate's `vulnerabilityAlerts` will catch any future CVEs automatically.

---

## Success Criteria

- [ ] All 5 major packages upgraded with no suppressed type errors
- [ ] `npm run typecheck` and `npm run build` pass on main after each PR
- [ ] `dependabot.yml` removed, `renovate.json` present and valid
- [ ] Renovate App installed on the repo
- [ ] Dependency Dashboard issue appears on GitHub after first Renovate run
- [ ] First Renovate auto-merge PR successfully merges a patch update through CI
