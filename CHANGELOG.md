# Changelog

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [1.4.0] — 2026-03-18

### Added
- `useSessionTracking` hook — shared streak · points · accuracy logic across all training screens
- `src/constants/storageKeys.ts` — centralized AsyncStorage key constants (eliminates scattered magic strings)
- `src/types/drill.types.ts` — `BaseDrillScenario` moved to canonical location; re-exported via `useDrillState`

### Changed
- All 5 drill menu screens now load drills from `constants/drills.ts` (extracted from inline screen code)
- Mode option arrays extracted to `constants/modes.ts` for PLO, Call Bets, Sector, Position training
- `useDrillState` and `usePLOGameState` refactored to use `useSessionTracking`
- `useCallBetsState` wired to real `validateCallBet` function (replaces placeholder that always returned correct)
- `ThemeContext` and `SettingsContext` now log storage errors via `logger.warn` instead of silently swallowing them
- `HomeScreen.handleNavigate` wrapped in `useCallback`
- Duplicate `DrillMenuItem` interface declarations removed from feature drills.ts files

### Fixed
- Stale closure in `useSessionTracking.recordAnswer` — streak now read from `streakRef` instead of closure
- Duplicate `useEffect` in `useDrillState` that ran input-clear logic twice per scenario change

---

## [1.3.0] — 2026-03-15

### Added
- GitHub Actions CI pipeline: `quality` (lint + typecheck) · `test` (coverage) · `build-web` jobs
- Sentry error monitoring with environment-based DSN configuration
- Vercel Speed Insights for Web Vitals tracking
- PWA install prompt (`useInstallPrompt` + `InstallButton`)
- EAS build configuration for mobile distribution
- Environment variable management (`.env.example`, `eas.json`)

---

## [1.2.0] — 2026-03-06

### Added
- **Call Bets Training** — 5 difficulty modes: Tier · Voisins · Orphelins · Zero · Random
  - `CallBetsMenuScreen` with dynamic color badges
  - `CallBetsTrainingScreen` with challenge scoring + accuracy
- **PLO Training** — Pot Limit Omaha dealer procedure
  - `PLOMenuScreen` — Easy / Medium / Advanced
  - `PLOGameTrainingScreen` — state machine with street-by-street pot calculations
  - `ActionLog`, `PotCalculationInput`, `PlayerPosition`, `PokerTable` components
- Component colocation architecture applied to all 21 feature components (328 tests added)
- `useRouletteTrainingSession` base hook for Sector + Position training

### Changed
- Navigation re-enabled for Call Bets and PLO modules
- HomeScreen POKER category updated with 📣 Call Bets and ♠️ PLO entries
- Total test count: 1094 passing across 142 suites

---

## [1.1.0] — 2026-03-05

### Added
- **Dual theme system** — Midnight Black and Casino Green, persisted via AsyncStorage
  - `src/styles/themes.ts` — `AppColors` interface + both theme definitions
  - `ThemeContext` with `useTheme()` hook + theme toggle button on HomeScreen
- **Settings screen** — sound and haptic feedback toggles (persisted)
  - `SettingsContext` with `useSettings()` hook
  - ⚙️ Settings button in HomeScreen header
- **Sector Training screen** — racetrack sector identification with sidebar score display
  - Sound effects via Web Audio API (two-tone success / soft buzz error)
  - Haptic feedback via `expo-haptics`
- **Position Training screen** — Number → racetrack clock position drills
- `useThemedStyles` hook — eliminates `makeStyles(colors)` boilerplate
- `containerStyles` shared module

### Changed
- HomeScreen redesigned: 2-column card grid with category sections
- All components migrated to dynamic `makeStyles(colors)` pattern
- Debounce protection added to prevent lag from rapid taps

---

## [1.0.0] — 2026-02-26

### Added
- **Blackjack Training** — 10 drills: soft-hand announcement · dealer action · hand comparison · 3:2 payout · side bets · insurance timing · surrender · split rules · Super Seven · odd-bet 3:2
- **Three Card Poker Training** — hand recognition · dealer qualification · Pair Plus payout · Ante Bonus (4:1 / 3:1 / 1:1) · full outcome
- **Caribbean Poker Training** — hand recognition · A-K qualification · call bet payout · €1 Bonus · swap procedure · Bonus on fold
- **Texas Hold'em Ultimate Training** — hand recognition · qualification · raise sizing · Blind payout · Trips Plus · no-qualify scenario · blind push · full outcome
- **Roulette Knowledge Training** — outside bet payouts · dozen vs column · zero rule · bet limits · announced bet chip counts and coverage
- Shared `DrillMenuScreen` component — eliminates ~350 lines of duplicate menu code across 5 games
- Shared `DrillScreen` component — eliminates ~900 lines of duplicate drill screen code
- `useDrillState<T>` hook — generic quiz state for all drill screens
- `sevenCardBestHand.ts` — `bestFiveFromSeven` utility (THU hand evaluation)
- Redux Toolkit store with `redux-persist` for offline state persistence
- React Navigation stack navigator with 13 feature route sets

---

## [0.2.0] — 2026-01-29

### Added
- **Roulette Game simulation** — live table with racetrack, chip placement, and announced bet support
- **Racetrack component** — SVG racetrack with neighbor bets and announced bet highlighting
- **Cash Conversion Training** — chip denomination exchange calculations
- `useAnnouncedBets` hook for Voisins · Tiers · Orphelins · Zero chip placement

---

## [0.1.0] — 2026-01-22

### Added
- **Roulette Training** — payout calculations · split bets · street bets · layout recognition · speed drills
- Feature-based colocation architecture (`screens/` + `components/` + `hooks/` + `types/` per feature)
- TypeScript strict mode throughout
- AsyncStorage offline-first persistence
- React Native Testing Library setup
- ESLint + Prettier + Husky pre-commit hooks
