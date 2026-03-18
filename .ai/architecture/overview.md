# Architecture Overview

Updated: 2026-03-18
Owner: @ivans

## Purpose

Summarize system architecture and where to find implementation rules. For coding standards and merge gate see `.ai/standards/coding-guide.md`.

---

## System Shape

- **Platform**: React Native (Expo) + TypeScript strict
- **State**: Redux slices for feature state + selectors; Context for app-wide settings and theme
- **Persistence**: AsyncStorage (local) via `src/services/storage.service.ts` + `src/constants/storageKeys.ts`
- **Theming**: Custom dual-theme system — `midnightTheme` and `casinoGreenTheme`, toggled via `ThemeContext`
- **Testing**: Jest 30 + React Native Testing Library (1094 tests, 142 suites)

---

## Layer Organization

```mermaid
graph LR
    subgraph Presentation
        SC[screens/]
        FC["features/**/screens/"]
    end
    subgraph "Feature Modules"
        FM["features/**/components/"]
        FH["features/**/hooks/"]
        FU["features/**/utils/"]
    end
    subgraph "Shared Application"
        SH[src/hooks/]
        SC2[src/components/shared/]
        ST[src/styles/themes.ts]
        CTX[src/contexts/]
    end
    subgraph Infrastructure
        RX[store/ Redux Toolkit]
        SV["services/ storage · logger"]
        AS[AsyncStorage]
    end

    SC --> FC
    FC --> FM
    FC --> FH
    FH --> SH
    FM --> SC2
    SH --> CTX
    SH --> RX
    SV --> AS
    RX --> SV
```

**Cross-feature imports are prohibited.** Features communicate only through top-level shared modules (`src/hooks/`, `src/components/shared/`, `src/utils/`, `src/types/`).

---

## Theme System

```mermaid
graph TD
    A["AsyncStorage @app_theme"] -->|hydrate on mount| B[ThemeContext]
    B --> C{themeId}
    C -->|midnight| D[midnightTheme: AppColors]
    C -->|casino-green| E[casinoGreenTheme: AppColors]
    D --> F["useTheme() → { colors }"]
    E --> F
    F --> G["useThemedStyles(makeStyles)\nStyleSheet memoized on colors"]
    G --> H[Component renders]
    H -->|toggleTheme| B
```

All components must use `colors.*` from `useTheme()`. Hardcoded hex values are a P0 violation.

Pattern:
```typescript
const { colors } = useTheme();
const styles = useThemedStyles(makeStyles);
// Outside the component:
function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({ ... });
}
```

---

## Drill Training Data Flow

All five poker-game drill screens (BJ · TCP · CP · THU · RK) share this flow through two generic hooks.

```mermaid
sequenceDiagram
    participant U as User
    participant DS as DrillScreen (shared)
    participant USD as useDrillState<T>
    participant UST as useSessionTracking
    participant GEN as ScenarioGenerator

    U->>DS: open drill screen
    DS->>GEN: generateScenario(drillType)
    GEN-->>USD: scenario: TScenario
    USD-->>DS: phase="asking"
    U->>DS: submit answer
    DS->>USD: handleSubmit()
    USD->>UST: recordAnswer(isCorrect)
    UST-->>DS: streak · sessionPoints · accuracy
    USD-->>DS: phase="feedback"
    U->>DS: press Next
    DS->>GEN: generateScenario() [new]
```

- `DrillScreen` renders UI phases — resides at `src/components/shared/DrillScreen/`
- `DrillMenuScreen` renders drill selection — resides at `src/components/shared/DrillMenuScreen/`
- Both are generic; feature-specific logic lives entirely in the `ScenarioGenerator`

---

## Hook Hierarchy

| Hook | Location | Used by |
|---|---|---|
| `useDrillState<T>` | `src/hooks/useDrillState.ts` | All 5 poker-game drill screens |
| `useSessionTracking` | `src/hooks/useSessionTracking.ts` | All drill screens + PLO training |
| `useThemedStyles` | `src/hooks/useThemedStyles.ts` | 44+ components |
| `useRouletteTrainingSession` | `src/hooks/` | Sector + Position training screens |
| `useModalState` | `src/hooks/` | Modal-bearing screens |

---

## Real Code References

| Concept | File |
|---|---|
| Redux store root | `src/store/index.ts` |
| Feature example (BJ) | `src/features/blackjack-training/` |
| Shared drill menu | `src/components/shared/DrillMenuScreen/` |
| Shared drill runner | `src/components/shared/DrillScreen/` |
| Storage service | `src/services/storage.service.ts` |
| Storage keys | `src/constants/storageKeys.ts` |
| App navigation | `src/navigation/AppNavigator.tsx` |
| Theme definitions | `src/styles/themes.ts` |
| BaseDrillScenario type | `src/types/drill.types.ts` |

---

## Read Next

1. `.ai/architecture/clean-architecture.md`
2. `.ai/architecture/patterns.md`
3. `.ai/architecture/feature-structure.md`
4. `.ai/workflows/adding-feature.md`
5. `CONTRIBUTING.md` — step-by-step: add a new training module
