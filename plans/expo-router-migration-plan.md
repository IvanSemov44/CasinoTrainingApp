# Expo Router Migration Plan (Thin Wrapper Architecture)

## 🤖 System Instructions for the AI Assistant

You are migrating an enterprise-grade React Native (Expo) application from React Navigation to Expo Router.

**CRITICAL ARCHITECTURE RULE:**
This project uses a strict Feature-Sliced Design (FSD). You must **NOT** move any business logic, components, or state into the new `app/` directory.
The `app/` directory will act strictly as a **Thin Routing Layer**.

- `app/` files will only extract URL parameters and render components.
- `src/features/` will remain completely intact and completely decoupled from router knowledge.

**EXECUTION RULE:**
Execute this plan strictly phase by phase. Do not proceed to the next phase until the user confirms the current phase is fully implemented and verified.

---

## Phase 1: Foundation & Setup

**Goal:** Install Expo Router, configure the entry point, and set up the global layout with existing providers.

### Steps for AI:

1. **Install Dependencies:**
   - Install `expo-router`, `react-native-safe-area-context`, `react-native-screens`, `expo-linking`, `expo-constants`, `expo-status-bar`.
2. **Update `package.json`:**
   - Change `"main": "index.ts"` (or `App.tsx`) to `"main": "expo-router/entry"`.
3. **Update `app.json`:**
   - Add `"scheme": "casinotrainingapp"` (if not already present).
   - Add the `expo-router` plugin: `"plugins": ["expo-router"]`.
4. **Create Global Layout (`app/_layout.tsx`):**
   - Migrate all global providers from the existing `App.tsx` into `app/_layout.tsx`.
   - Providers to migrate: `SafeAreaProvider`, `ErrorBoundary`, `Provider` (Redux), `PersistGate`, `ThemeProvider`, `SettingsProvider`.
   - Use `<Stack screenOptions={{ headerShown: false }} />` as the core layout inside the providers.
5. **Create Home Route (`app/index.tsx`):**
   - Create a thin wrapper that imports `HomeScreen` from `src/screens/HomeScreen`.
6. **Deprecate App.tsx:**
   - Rename `App.tsx` to `App.backup.tsx` (do not delete yet).

### 🛑 Checkpoint 1

**User Action:** Pause the other AI. Bring the changes for `package.json`, `app.json`, `app/_layout.tsx`, and `app/index.tsx` back to Gemini for review.

- [x] `package.json` updated.
- [x] `app.json` updated.
- [x] `app/_layout.tsx` created with all nested providers.
- [x] `app/index.tsx` created.
- [x] App successfully builds and loads the HomeScreen.

---

## Phase 2: Building the Thin Route Wrappers (Feature by Feature)

**Goal:** Map all existing features in `AppNavigator.tsx` to file-based routes in the `app/` directory.

### Steps for AI:

1. **Examine `AppNavigator.tsx` and `navigation.constants.ts`:**
   - Identify all routes across all feature navigators (Blackjack, TCP, Roulette, etc.).
2. **Create Feature Directories in `app/`:**
   - E.g., `app/blackjack/`, `app/roulette/`, `app/poker/tcp/`.
3. **Create Thin Wrappers:**
   - For menu screens: Create `app/[feature]/index.tsx`.
   - For drill screens: Create `app/[feature]/[drillType].tsx` (dynamic routes).
4. **Map Parameters:**
   - Inside dynamic routes, use `useLocalSearchParams()` to extract params (e.g., `difficulty`, `drillType`).
   - Pass these params strictly as React Props to the underlying feature screen (e.g., `<BJDrillScreen difficulty={difficulty} />`).
5. **Maintain UI:**
   - Apply correct header titles and styles using Expo Router's `<Stack.Screen options={{ title: '...' }} />` inside the wrapper or `_layout.tsx`.

### Example of a Thin Wrapper (`app/blackjack/[difficulty].tsx`):

```tsx
import { useLocalSearchParams, Stack } from 'expo-router';
import { BJDrillScreen } from '../../src/features/blackjack-training/screens/BJDrillScreen';

export default function BlackjackDrillRoute() {
  const { difficulty } = useLocalSearchParams<{ difficulty: 'easy' | 'medium' | 'advanced' }>();
  return (
    <>
      <Stack.Screen options={{ title: 'Blackjack Drill' }} />
      <BJDrillScreen difficulty={difficulty} />
    </>
  );
}
```

### 🛑 Checkpoint 2

**User Action:** Pause the other AI. Bring a sample of 2-3 generated wrappers (e.g., Blackjack and Roulette) back to Gemini to verify the "Thin Wrapper" architecture is respected.

- [x] All feature routes mapped to `app/`.
- [x] `useLocalSearchParams()` implemented correctly.
- [x] Feature screens modified to accept standard React props instead of React Navigation `route.params`.

---

## Phase 3: Decoupling Navigation Logic from Features

**Goal:** Remove React Navigation dependencies (`useNavigation`, `navigation.navigate`) from the `src/features/` folder.

### Steps for AI:

1. **Search and Replace Routing:**
   - Search the entire `src/` directory for `useNavigation` and `navigation.navigate`.
   - Replace them with `import { router } from 'expo-router'`.
   - Convert `navigation.navigate('BJDrill', { difficulty: 'easy' })` to `router.push('/blackjack/easy')`.
2. **Fix `navigation.constants.ts` (Home Screen Navigation):**
   - Update the `Route` strings in the `CATEGORIES` array to match the new Expo Router absolute paths (e.g., `'/blackjack'` instead of `'BJMenu'`).
3. **Clean up Feature Screens:**
   - Remove `@react-navigation/native` and `@react-navigation/native-stack` imports from all `.tsx` and `.types.ts` files inside `src/features/`.
   - Remove `navigation` and `route` props from all component interfaces.

### 🛑 Checkpoint 3

**User Action:** Pause the other AI. Run a global search for `useNavigation` in your IDE. If any remain in `src/`, report it to Gemini.

- [x] `navigation.navigate` replaced with `router.push` app-wide.
- [x] Feature screens no longer depend on React Navigation types.
- [x] Home screen cards correctly navigate to the new absolute URL paths.

---

## Phase 4: Cleanup & Type Safety

**Goal:** Delete legacy React Navigation files, generate typed routes, and uninstall old dependencies.

### Steps for AI:

1. **Delete Legacy Navigators:**
   - Delete `src/navigation/AppNavigator.tsx`.
   - Delete `src/navigation/AppNavigator.test.tsx`.
   - Delete every `navigation.tsx` file inside `src/features/`.
2. **Uninstall React Navigation:**
   - Run `npm uninstall @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs`.
3. **Delete Backup:**
   - Delete `App.backup.tsx`.
4. **Enforce Typed Routes:**
   - Ensure `expo-router` is configured to generate typed routes. (Create `app-env.d.ts` with `/// <reference types="expo-router/types" />`).
5. **Final Quality Check:**
   - Run `npx tsc --noEmit`.
   - Fix any broken paths or missing types caused by the removal of the old `RootStackParamList`.

### 🛑 Checkpoint 4

**User Action:** Run `npx tsc --noEmit` locally. Bring any TypeScript errors back to Gemini for final resolution.

- [x] All legacy navigation files deleted.
- [x] React Navigation dependencies removed from `package.json`.
- [x] TypeScript compiles with zero errors.
- [x] Deep linking works automatically in development (`npx uri-scheme open casinotrainingapp://blackjack/easy --android`).

---

## Final Verification Checklist (For User & Gemini)

- [x] **FSD Intact:** `src/features/` contains pure business logic and UI, knowing nothing about Expo Router.
- [x] **Web Performance:** Building for web correctly splits chunks by route automatically.
- [x] **Deep Linking:** Navigating via URL works natively without manual linking configuration.
