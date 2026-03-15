# Production Readiness Plan — CasinoTrainingApp

> Audit date: 2026-03-11
> Current state: well-structured codebase, web deployed to Vercel, zero CI/CD, zero error tracking, no mobile build pipeline.
> Goal: a shippable product on web (PWA) and mobile (iOS + Android) with the operational infrastructure to support it.

---

## Priority Tiers

| Tier | Label | Must ship before going live |
|------|-------|----------------------------|
| P0 | Blockers | Yes — breaks production or ships broken code |
| P1 | Critical | Yes — you will regret not doing this within a week |
| P2 | Important | Do within first month after launch |
| P3 | Nice to have | Backlog |

---

## P0 — Blockers (fix before any public release)

### 0.1 Fix broken imports in App.tsx

Three issues in the root file that cause silent failures or incorrect behaviour:

1. **`react-native-gesture-handler` must be the very first import in the entire app** (RN docs requirement).
   Move it to `index.ts` as line 1, before everything else.

2. **`@vercel/speed-insights/react` is a web-only package** imported unconditionally.
   On native it imports dead code at best, throws at worst.
   Replace with conditional import or platform guard:
   ```tsx
   // web.tsx (platform-specific file for web)
   export { SpeedInsights } from '@vercel/speed-insights/react';

   // native.tsx (stub for iOS/Android)
   export const SpeedInsights = () => null;
   ```

3. **CSS injection in `App.tsx`** runs on every hot-reload in dev and appends duplicate `<style>` tags.
   Move it to `web/index.html` as a static `<style>` block. It belongs in HTML, not JS.

---

### 0.2 Add environment variable system

There are no `.env` files and no mechanism to distinguish dev from staging from production. As soon as you add a backend, analytics key, or error tracking DSN, you need this in place.

**Steps:**
1. Add `expo-constants` (already in Expo SDK, no install needed) as the config bridge.
2. Create `app.config.ts` (replace or extend `app.json`) to read `process.env`:
   ```ts
   export default {
     expo: {
       extra: {
         sentryDsn: process.env.SENTRY_DSN ?? '',
         apiBaseUrl: process.env.API_BASE_URL ?? '',
         environment: process.env.APP_ENV ?? 'development',
       },
     },
   };
   ```
3. Create `.env`, `.env.staging`, `.env.production` — add all three to `.gitignore`.
4. Create `src/config/env.ts` as the single import point for typed env access:
   ```ts
   import Constants from 'expo-constants';

   const extra = Constants.expoConfig?.extra ?? {};

   export const ENV = {
     sentryDsn: extra.sentryDsn as string,
     apiBaseUrl: extra.apiBaseUrl as string,
     environment: extra.environment as 'development' | 'staging' | 'production',
   };
   ```
5. Store all secrets in Vercel environment variables (for web) and EAS secrets (for mobile).
   Never commit real values.

---

### 0.3 Set up error tracking (Sentry)

Right now, if the app crashes in production you will never know. `logger.service.ts` only writes to dev console.

**Steps:**
1. `npm install @sentry/react-native`
2. Run `npx @sentry/wizard@latest -i reactNative` — it patches `app.json`, `App.tsx`, and `babel.config.js` automatically.
3. Remove wizard's App.tsx changes and apply them manually to keep the file clean.
4. Initialise early — before the root component renders:
   ```ts
   // index.ts (line 1 already has gesture-handler)
   import * as Sentry from '@sentry/react-native';

   Sentry.init({
     dsn: ENV.sentryDsn,
     environment: ENV.environment,
     enabled: !__DEV__,
     tracesSampleRate: 0.2,
   });
   ```
5. Wrap `App` with `Sentry.wrap(App)` for automatic crash reporting.
6. Update `logger.service.ts` — in production, route `logger.error()` to `Sentry.captureException()`.
7. Add source map upload to the build script so Sentry can deobfuscate stack traces.

**DSN:** stored in `.env.production` → `SENTRY_DSN=...`

---

### 0.4 Enforce test coverage thresholds

143 test files exist but no minimum is enforced. A broken merge could silently drop coverage.

Add to `jest.config.js`:
```js
coverageThreshold: {
  global: {
    branches: 60,
    functions: 70,
    lines: 70,
    statements: 70,
  },
},
```
Start at a level you currently pass. Increase by 5% every quarter.

---

## P1 — Critical (required before launch)

### 1.1 GitHub Actions CI pipeline

No automated checks run on PR or merge. Anyone can push broken code.

**Create `.github/workflows/ci.yml`:**

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
      - run: npx tsc --noEmit

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run test:coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  build-web:
    runs-on: ubuntu-latest
    needs: [quality, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build:web
        env:
          APP_ENV: production
          SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
```

**Add GitHub secrets:** `SENTRY_DSN`, `EAS_TOKEN` (for mobile builds in 1.2).

---

### 1.2 Mobile build pipeline (EAS)

No mobile build system exists. Currently requires local machine + Expo CLI.

**Steps:**
1. `npm install -g eas-cli`
2. `eas init` — links project to Expo account.
3. Create `eas.json`:
   ```json
   {
     "cli": { "version": ">= 12.0.0" },
     "build": {
       "development": {
         "distribution": "internal",
         "android": { "buildType": "apk" },
         "ios": { "simulator": true }
       },
       "preview": {
         "distribution": "internal"
       },
       "production": {
         "autoIncrement": true
       }
     },
     "submit": {
       "production": {
         "ios": { "appleId": "YOUR_APPLE_ID", "ascAppId": "YOUR_APP_STORE_ID" },
         "android": { "serviceAccountKeyPath": "./google-service-account.json" }
       }
     }
   }
   ```
4. Add EAS build job to GitHub Actions (runs on tag push):
   ```yaml
   build-mobile:
     runs-on: ubuntu-latest
     needs: [quality, test]
     if: startsWith(github.ref, 'refs/tags/v')
     steps:
       - uses: actions/checkout@v4
       - uses: expo/expo-github-action@v8
         with:
           expo-version: latest
           eas-version: latest
           token: ${{ secrets.EAS_TOKEN }}
       - run: npm ci
       - run: eas build --platform all --non-interactive --profile production
   ```
5. Store all signing certificates and keys in EAS Secrets, not in the repo.

---

### 1.3 Fix Provider ordering in App.tsx

Current order: SafeArea → Error → Theme → Settings → Redux → PersistGate

If `ThemeProvider` or `SettingsProvider` ever needs persisted Redux state, they cannot read it because they sit above the store. This is a time-bomb.

**Correct order:**
```tsx
<SafeAreaProvider>
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <ThemeProvider>
          <SettingsProvider>
            <AppNavigator />
            <StatusBar style="light" />
          </SettingsProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
</SafeAreaProvider>
```

Also replace `loading={null}` with a `<LoadingSpinner />` so users don't see a blank flash.

---

### 1.4 App versioning & release strategy

`package.json` and `app.json` both say `"version": "1.0.0"` but version is never incremented.

**Steps:**
1. Adopt [Semantic Versioning](https://semver.org): `MAJOR.MINOR.PATCH`
2. Create `CHANGELOG.md` using [Keep a Changelog](https://keepachangelog.com) format.
3. Use `standard-version` or `release-please` GitHub Action to automate:
   - Version bump in `package.json` + `app.json`
   - CHANGELOG entry generated from conventional commits
   - Git tag created
   - GitHub Release created
4. The CI mobile build job (1.2) triggers on version tags, ensuring tagged releases build mobile binaries.

---

### 1.5 Security baseline

No security policy, no dependency auditing, no CSP.

**Steps:**

1. **Dependency auditing:** Add to CI:
   ```yaml
   - run: npm audit --audit-level=high
   ```
   Fix any high/critical vulnerabilities before launch.

2. **Content Security Policy (web):** Add to `web/index.html`:
   ```html
   <meta http-equiv="Content-Security-Policy"
     content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">
   ```
   Adjust as needed for Sentry/SpeedInsights endpoints.

3. **Vercel security headers:** Add to `vercel.json`:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Content-Type-Options", "value": "nosniff" },
           { "key": "X-Frame-Options", "value": "DENY" },
           { "key": "X-XSS-Protection", "value": "1; mode=block" },
           { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
         ]
       }
     ]
   }
   ```

4. **Create `SECURITY.md`** with vulnerability disclosure process.

5. **Rotate secrets:** Ensure no API keys, DSNs, or signing passwords are in git history. Run `git log --all -p | grep -E "(secret|key|password|dsn)" -i` to check.

---

## P2 — Important (within first month post-launch)

### 2.1 Structured logging for production

`logger.service.ts` is dev-console only. In production you need queryable logs.

**Options (pick one based on budget):**
- **Free:** Sentry breadcrumbs (if you already have Sentry from 0.3)
- **Low cost:** Logtail / BetterStack (~$25/mo)
- **Full stack:** Datadog (~$15/host/mo)

**Minimum change to `logger.service.ts`:**
```ts
error(message: string, error?: unknown, context?: LogContext): void {
  if (__DEV__) { console.error(message, error, context); return; }
  Sentry.captureException(error ?? new Error(message), { extra: context });
}
```

---

### 2.2 Performance monitoring

Vercel SpeedInsights covers CWV on web but nothing else.

**Steps:**
1. Add custom performance marks for slow operations:
   ```ts
   performance.mark('drill-start');
   // ... drill logic ...
   performance.measure('drill-duration', 'drill-start');
   ```
2. Report measures to Sentry as custom spans (free with existing Sentry).
3. Set `tracesSampleRate: 0.1` in production (10% of sessions).
4. Add web vitals custom reporting for React Navigation screen transitions.

---

### 2.3 Analytics (custom events)

SpeedInsights measures load performance only. You have no visibility into which features users actually use.

**Recommended:** PostHog (open-source, self-hostable, generous free tier)

```ts
// src/services/analytics.service.ts
import PostHog from 'posthog-react-native';

export const analytics = {
  screen: (name: string) => posthog.screen(name),
  event: (name: string, props?: Record<string, unknown>) => posthog.capture(name, props),
};
```

Key events to track from day one:
- `feature_opened` (which game)
- `drill_completed` (score, difficulty, duration)
- `drill_abandoned`
- `theme_changed`
- `settings_toggled`

---

### 2.4 Offline handling & network status

The app is offline-first (AsyncStorage, no API), but there is no user-facing indication of connectivity for future API calls.

**Steps:**
1. Add `@react-native-community/netinfo` for connectivity detection.
2. Create a `useNetworkStatus()` hook.
3. Add a non-blocking toast/banner component for offline state.
4. Ensure service worker (`web/sw.js`) caches all static assets (check current cache strategy).

---

### 2.5 Accessibility audit

No accessibility attributes have been audited.

**Steps:**
1. Add `accessibilityLabel`, `accessibilityRole`, and `accessibilityHint` to all interactive components (buttons, inputs, cards).
2. Run `eslint-plugin-jsx-a11y` (for web) and `eslint-plugin-react-native-a11y` (for RN).
3. Test with:
   - **iOS:** VoiceOver
   - **Android:** TalkBack
   - **Web:** Lighthouse accessibility audit (target ≥90 score)
4. Ensure colour contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text) — especially check the casino-green theme.

---

### 2.6 Code splitting & bundle optimisation (web)

The web build exports a `single` output bundle. With 14 features and 528 TypeScript files this will grow.

**Steps:**
1. Change `app.json` web output from `"single"` to `"static"` or use dynamic imports:
   ```ts
   const BlackjackDrillScreen = React.lazy(() => import('@features/blackjack-training/...'));
   ```
2. Wrap lazy screens in `<Suspense fallback={<LoadingSpinner />}>` in `AppNavigator`.
3. Measure with `expo export --analyze` to find large chunks.
4. Target: initial JS bundle ≤ 500 KB gzipped.

---

### 2.7 PWA update strategy

`web/sw.js` exists but its update strategy is unknown. Users may run stale code for weeks.

**Steps:**
1. Implement a "New version available" toast that prompts users to reload.
2. Use `workbox` (already in Expo web pipeline) with a proper cache strategy:
   - `NetworkFirst` for JS/CSS assets
   - `CacheFirst` for images/icons
3. Set a `Cache-Control: no-cache` header for `sw.js` itself in `vercel.json` so browsers always fetch the latest service worker.

---

## P3 — Nice to Have (backlog)

### 3.1 Backend / API layer

The app is currently 100% client-side. For multi-user features (leaderboards, progress sync across devices, admin training management) you need a backend.

**Considerations:**
- Supabase (PostgreSQL + Auth + Realtime, generous free tier) — lowest friction
- Firebase (NoSQL, excellent RN SDK) — if you prefer Google ecosystem
- Custom Node/Express API with PostgreSQL

If you add a backend, create `src/services/api.service.ts` as the abstraction layer before writing any screen code that fetches data.

---

### 3.2 User authentication

No auth system exists. Required for:
- Cross-device progress sync
- Admin content management
- Leaderboards

**Recommendation:** Supabase Auth (magic link + OAuth) or Clerk (best DX for RN).

---

### 3.3 Push notifications

For re-engagement: "You haven't practiced in 3 days."

**Steps:**
1. `expo install expo-notifications`
2. Configure APNs (iOS) and FCM (Android) credentials in EAS.
3. Create a simple notification scheduling service.
4. Gate behind a permission prompt — never ask before user has seen value.

---

### 3.4 E2E testing

Unit/component tests cover logic. You have no tests for critical user journeys.

**Recommended:** Maestro (simplest setup for React Native)

Key flows to cover:
- Home → Blackjack menu → Start drill → Complete drill → See score
- Home → Roulette sector training → Tap a number → Correct/incorrect feedback
- Settings → Toggle theme → Verify dark/light switch persists

---

### 3.5 Internationalisation (i18n)

Currently English-only. Casino dealers often operate in multilingual environments.

**Steps:**
1. `npm install i18next react-i18next`
2. Extract all user-facing strings to `src/locales/en.json`
3. Add languages as needed (no need to do this before initial launch)

---

### 3.6 Rate limiting & abuse prevention (web)

If a backend is added, rate-limit all endpoints. For the current pure-PWA deployment there is nothing to rate-limit, but document this for when the backend lands.

---

## Implementation Order

This is the recommended order if you are working alone or as a small team:

```
Week 1:  0.1 (App.tsx fixes) → 0.3 (Sentry) → 1.3 (Provider order)
Week 2:  0.2 (env vars) → 0.4 (coverage thresholds) → 1.1 (CI pipeline)
Week 3:  1.2 (EAS mobile builds) → 1.4 (versioning + CHANGELOG)
Week 4:  1.5 (security baseline) → 2.1 (structured logging)
Month 2: 2.2–2.7 (analytics, offline, a11y, PWA, code splitting)
Backlog: 3.x (backend, auth, notifications, E2E, i18n)
```

---

## Definition of "Production Ready" for This App

The app is production-ready when all of the following are true:

- [ ] App.tsx has no wrong-platform imports or misplaced imports
- [ ] `react-native-gesture-handler` is first import in `index.ts`
- [ ] Sentry is capturing errors in production builds
- [ ] All secrets are in environment variables, none committed to git
- [ ] GitHub Actions CI runs on every PR (lint + type-check + test)
- [ ] Test coverage thresholds are enforced in CI
- [ ] EAS produces signed iOS and Android builds without manual steps
- [ ] Mobile app passes App Store / Play Store review checklist
- [ ] Web app scores ≥ 90 on Lighthouse (Performance, Accessibility, Best Practices, SEO)
- [ ] `npm audit` reports zero high/critical vulnerabilities
- [ ] Security headers are set on Vercel
- [ ] CHANGELOG.md exists and is up to date
- [ ] Version is correctly set in `package.json` and `app.json`
- [ ] `loading={null}` is replaced with a real loading screen in PersistGate

---

## Files to Create / Modify Summary

| File | Action | Priority |
|------|--------|----------|
| `index.ts` | Move `gesture-handler` import here as line 1 | P0 |
| `App.tsx` | Remove SpeedInsights, CSS injection; fix provider order | P0 |
| `web/index.html` | Add CSS fix as static `<style>` block | P0 |
| `app.config.ts` | Replace `app.json`, read from `process.env` | P0 |
| `src/config/env.ts` | Typed env access module | P0 |
| `.env` / `.env.production` | Env var files (gitignored) | P0 |
| `src/services/logger.service.ts` | Route errors to Sentry in production | P0 |
| `.github/workflows/ci.yml` | CI pipeline | P1 |
| `eas.json` | EAS build profiles | P1 |
| `CHANGELOG.md` | Release history | P1 |
| `SECURITY.md` | Vulnerability disclosure | P1 |
| `vercel.json` | Add security headers | P1 |
| `jest.config.js` | Add coverage thresholds | P0 |
| `src/services/analytics.service.ts` | PostHog event tracking | P2 |
| `src/hooks/useNetworkStatus.ts` | Connectivity hook | P2 |
