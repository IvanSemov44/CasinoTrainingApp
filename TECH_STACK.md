# Casino Training App - Tech Stack Details

## Core Technologies

### Frontend Framework
- **React Native** (via Expo SDK)
  - Cross-platform mobile development
  - Fast refresh for development
  - OTA updates support
  - Native performance

### Language
- **TypeScript 5.x**
  - Static type checking
  - Enhanced IDE support
  - Better refactoring
  - Compile-time error detection

### Development Platform
- **Expo SDK**
  - Managed workflow
  - Easy deployment
  - Built-in modules
  - EAS Build support for production

## State Management

### Redux Toolkit
```typescript
store/
├── index.ts           # Store configuration
├── hooks.ts           # Typed useDispatch/useSelector
└── rouletteSlice.ts   # Roulette state slice
```

**Why Redux Toolkit?**
- Simplified Redux setup
- Built-in Immer for immutable updates
- DevTools integration
- TypeScript support out of the box

**Slices Created:**
- `rouletteSlice` - Manages bets, chip selection, exercises

## Navigation

### React Navigation v6
```typescript
Stack Navigator:
├── Home
├── RouletteExercises
├── RouletteTraining
└── Progress
```

**Features Used:**
- Stack Navigator for hierarchical navigation
- Custom headers with casino theme
- Type-safe navigation params
- Deep linking ready

## UI/Graphics

### React Native SVG
- Vector graphics for scalable UI
- Roulette layout rendering
- Custom shapes for table elements
- Performance optimized

### React Native Reanimated v4
- Smooth 60 FPS animations
- Gesture-based interactions
- Layout animations
- Native thread performance

### React Native Gesture Handler
- Touch and pan gestures
- Chip dragging (future)
- Swipe interactions
- Native gesture recognition

## Data Persistence

### AsyncStorage
```typescript
services/storage.service.ts
├── saveProgress()
├── loadProgress()
├── saveExerciseResult()
├── loadExerciseResults()
└── clearAllData()
```

**Storage Strategy:**
- Offline-first approach
- JSON serialization
- Async operations
- Error handling

**Data Stored:**
- User progress
- Exercise results
- App preferences (future)

## Architecture Patterns

### Component Architecture
```
Presentational Components:
├── RouletteLayout.tsx
├── Racetrack.tsx
└── ChipSelector.tsx

Container Components:
├── RouletteTrainingScreen.tsx
└── ProgressScreen.tsx
```

### Folder Structure
```
src/
├── components/     # Reusable UI components
├── screens/        # Screen-level components
├── navigation/     # Navigation setup
├── store/          # Redux state
├── services/       # Business logic
├── types/          # TypeScript types
├── constants/      # Static data
└── utils/          # Helper functions
```

### Design Patterns Used

1. **Container/Presenter Pattern**
   - Screens = Containers (state + logic)
   - Components = Presenters (props + UI)

2. **Redux Toolkit Pattern**
   - Slices for modular state
   - Typed hooks for type safety
   - Actions and reducers combined

3. **Service Pattern**
   - Storage service for data operations
   - Utility functions for calculations
   - Separation of concerns

## Type System

### TypeScript Interfaces

```typescript
types/roulette.types.ts:
├── RouletteNumber
├── BetType (enum)
├── Bet
├── PlacedBet
├── ExerciseResult
├── ExerciseType (enum)
├── Exercise
├── UserProgress
├── ChipValue
└── RouletteState
```

**Type Safety Benefits:**
- Catch errors at compile time
- Better IntelliSense
- Refactoring confidence
- Self-documenting code

## Constants & Configuration

### Roulette Data
```typescript
constants/roulette.constants.ts:
├── WHEEL_ORDER          # Wheel number sequence
├── RED_NUMBERS          # Red number list
├── BLACK_NUMBERS        # Black number list
├── LAYOUT_GRID          # Table layout matrix
├── PAYOUT_RATIOS        # Bet type payouts
├── VOISINS_NUMBERS      # Neighbor zone
├── TIERS_NUMBERS        # Tier zone
├── ORPHELINS_NUMBERS    # Orphan zone
├── ZERO_GAME_NUMBERS    # Zero game zone
├── CHIP_VALUES          # Chip denominations
└── Helper functions
```

## Performance Optimizations

### Current
- React.memo for pure components (ready to implement)
- FlatList for scrollable lists (ready for large data)
- Image optimization (assets ready)
- Minimal re-renders with Redux

### Planned
- Lazy loading screens
- Code splitting
- Image caching
- Bundle size optimization

## Testing Strategy (Planned)

### Unit Tests
```
__tests__/
├── utils/
│   └── roulette.utils.test.ts
├── store/
│   └── rouletteSlice.test.ts
└── services/
    └── storage.service.test.ts
```

### Integration Tests
- Screen rendering
- Navigation flows
- Redux state changes
- AsyncStorage operations

### E2E Tests (Detox)
- Complete user flows
- Exercise completion
- Data persistence

## Build & Deployment

### Development
```bash
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run web            # Run on web
```

### Production (Future)
```bash
eas build --platform android
eas build --platform ios
eas submit
```

## Dependencies

### Production
```json
{
  "expo": "~53.0.0",
  "react": "18.x",
  "react-native": "0.76.x",
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x",
  "@react-navigation/native": "^6.x",
  "@react-navigation/stack": "^6.x",
  "react-native-svg": "^15.x",
  "react-native-reanimated": "^4.x",
  "@react-native-async-storage/async-storage": "^2.x"
}
```

### DevDependencies
```json
{
  "typescript": "~5.x",
  "@types/react": "~18.x",
  "@babel/core": "^7.x"
}
```

## Code Quality Tools (Ready to Add)

### ESLint
- Code linting
- Style enforcement
- Best practices

### Prettier
- Code formatting
- Consistent style
- Auto-formatting

### Husky
- Pre-commit hooks
- Run tests before commit
- Lint staged files

## API Integration (Planned)

### Structure
```typescript
services/
├── storage.service.ts     # Local storage ✅
├── api.service.ts         # HTTP client 🔜
├── auth.service.ts        # Authentication 🔜
└── sync.service.ts        # Data sync 🔜
```

### Backend (ASP.NET)
```
Endpoints needed:
POST   /api/auth/register
POST   /api/auth/login
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/exercises
POST   /api/exercises/results
GET    /api/leaderboard
```

## Security Considerations

### Current
- No sensitive data stored
- Offline-first (no network exposure)
- AsyncStorage for local data

### Future (with Backend)
- JWT authentication
- Secure token storage (SecureStore)
- HTTPS only
- Input validation
- Rate limiting

## Accessibility

### Current Support
- Touchable components
- Clear visual feedback
- High contrast colors

### Planned
- Screen reader support
- Voice navigation
- Haptic feedback
- Larger text options

## Internationalization (Future)

### Structure
```typescript
locales/
├── en.json     # English
├── es.json     # Spanish
├── fr.json     # French
└── de.json     # German
```

### Libraries to Add
- `react-i18next`
- `i18next`
- `expo-localization`

## Analytics (Future)

### Planned Tracking
- Screen views
- Exercise completions
- Error tracking
- Performance metrics

### Tools to Integrate
- Firebase Analytics
- Sentry (error tracking)
- Custom analytics service

## Development Environment

### Required
- Node.js 16+
- npm or yarn
- VS Code (recommended)
- Git

### Optional
- Android Studio (for Android dev)
- Xcode (for iOS dev, macOS only)
- React DevTools
- Redux DevTools

## VS Code Extensions (Recommended)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "msjsdiag.vscode-react-native",
    "VisualStudioExptTeam.vscodeintellicode"
  ]
}
```

---

**Last Updated**: January 3, 2026  
**Version**: 1.0.0  
**Status**: Foundation Complete ✅
