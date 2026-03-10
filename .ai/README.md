# AI Assistant Docs - CasinoTrainingApp (React Native)

Updated: 2026-03-10
Owner: @ivans

## Purpose
This is the canonical AI documentation for this React Native repository. All assistant-specific entry files should point here first.

## Read Order
1. Read `.ai/README.md` (this file).
2. Read `.ai/workflows/adding-feature.md` for implementation flow.
3. Read `.ai/workflows/testing-strategy.md` before deciding test scope.
4. Read `.ai/workflows/deployment.md` for Expo/release changes.
5. Read `.ai/workflows/troubleshooting.md` when investigating failures.
6. Read `.ai/reference/common-mistakes.md` before writing code.

## By Task
- Understand architecture decisions and boundaries:
  - `.ai/architecture/overview.md`
  - `.ai/architecture/clean-architecture.md`
  - `.ai/architecture/patterns.md`
  - `.ai/architecture/feature-structure.md` (colocation & folder organization)
- Add a new feature/training module:
  - `.ai/workflows/adding-feature.md`
  - `.ai/architecture/feature-structure.md`
- Review coding standards and merge gate:
  - `.ai/standards/coding-guide.md`
- Plan tests for a change:
  - `.ai/workflows/testing-strategy.md`
- Deploy or update Expo release:
  - `.ai/workflows/deployment.md`
- Debug failures quickly:
  - `.ai/workflows/troubleshooting.md`
- Implement/modify app state or local storage:
  - `.ai/frontend/overview.md`
  - `.ai/frontend/redux.md`
  - `.ai/frontend/type-safety.md`
- Build or refactor React Native UI components:
  - `.ai/frontend/components.md`
  - `.ai/frontend/hooks.md`
  - `.ai/frontend/routing.md`
  - `.ai/frontend/styling.md`
- Avoid known pitfalls:
  - `.ai/reference/common-mistakes.md`
- Look up structure/examples/terms quickly:
  - `.ai/reference/file-structure.md`
  - `.ai/reference/technologies.md`

## Tool Adapters (Must Exist)
- GitHub Copilot: `.github/copilot-instructions.md`
- VS Code / Copilot: This `.ai/` folder

## Scope Rules
- Keep one topic per file.
- Keep docs concise, but complete.
- Prefer links to canonical docs instead of duplicating rules.

## Maintenance Contract
- If a PR changes an established pattern, update docs in the same PR.
- If code and docs conflict, code is source of truth; fix docs immediately.
- No "update docs later" for pattern changes.
