# Workflow: Deployment

Updated: 2026-03-10
Owner: @ivans

## Purpose
Release CasinoTrainingApp to iOS and Android via Expo with proper versioning and secret management.

## Prerequisites
- Expo account (https://expo.dev).
- EAS account or local build capability.
- App Store Connect and Google Play Console access.
- GitHub Actions or local environment for builds.

## Security-First Rules
- Never commit `.env` files or secrets to git.
- Use Expo Secrets for sensitive values (API keys, etc.).
- Keep `eas.json` configuration version-controlled; secrets in `.env`.

## Release Versioning
- Update version in [app.json](app.json): `expo.version`.
- Update `expo.plugins[*].version` for any custom plugins.
- Bump build number: `expo.ios.buildNumber` and `expo.android.versionCode`.
- Commit version bump before build.

## Deploy Steps (Expo Web + EAS Build)

### Build and Submit to App Stores
1. Update version and build numbers in [app.json](app.json).
2. Create a GitHub release or tag.
3. Run EAS build (local or via GitHub Actions):
```bash
eas build --platform ios
eas build --platform android
```
4. Once builds succeed, submit to App Store/Play Store:
```bash
eas submit --platform ios
eas submit --platform android
```

### Web Deployment (Expo Web)
1. Build:
```bash
{npm | yarn} run web:build
```
2. Deploy to Vercel (configured in [vercel.json](vercel.json)):
```bash
vercel deploy --prod
```

## Environment Setup
- Create `.env` (git-ignored) with runtime secrets if needed.
- Secrets stored in Expo Secrets dashboard for EAS builds.
- Example secrets: API endpoints, logging tokens, feature flags.

## Real Code References
- App config: [app.json](app.json)
- Build config: `eas.json` (if exists)
- Web deployment config: [vercel.json](vercel.json)
- Version tracking: See [QUICKSTART.md](../QUICKSTART.md)

## Common Failure Modes
- Version not bumped before build (builds fail to upload).
- Secrets committed in `.env` or hardcoded.
- Build fails due to TypeScript errors (fix before submitting).
- Mismatch between local build and EAS build environment (test locally first).
