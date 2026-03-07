# Casino Dealer Training App

A React Native mobile application built with Expo for training casino dealers. Focus on roulette, card games, and poker games.

## 🎰 Features

### Roulette Training
- **Interactive Roulette Layout**: Full European roulette table with all inside and outside bets
- **Racetrack Component**: Neighbor bets and special sectors (Voisins, Tiers, Orphelins)
- **Multiple Exercise Types**:
  - Chip Placement Practice
  - Payout Calculations
  - Bet Recognition
  - Speed Drills with Timer
  - Neighbor Bets Memorization
  - Sector Bets Training

### Progress Tracking
- Offline-first with AsyncStorage
- Exercise results history
- Score statistics and analytics
- Ready for future backend integration with ASP.NET REST API

## 🚀 Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation (Stack Navigator)
- **Storage**: AsyncStorage (offline-first)
- **Graphics**: React Native SVG
- **Animations**: React Native Reanimated

## 📁 Project Structure

The app uses a **feature-based architecture** with collocated screen modules:

```
src/
├── components/              # Shared UI components
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   └── PlayingCard.tsx
├── features/                # Feature modules (main structure)
│   ├── roulette-training/
│   │   ├── screens/         # Screen components
│   │   │   ├── exercises/
│   │   │   │   └── CalculationScreen/
│   │   │   │       ├── CalculationScreen.tsx
│   │   │   │       ├── index.ts
│   │   │   │       ├── useCalculationQuestion.ts
│   │   │   │       └── useExerciseState.ts
│   │   │   ├── menu/
│   │   │   └── reference/
│   │   ├── components/      # Feature-specific components
│   │   ├── hooks/           # Feature-level hooks (shared across screens)
│   │   ├── utils/           # Feature utilities
│   │   ├── types/           # Feature types
│   │   ├── constants/       # Feature constants
│   │   ├── navigation.tsx   # Feature navigation
│   │   └── index.ts         # Feature exports
│   ├── plo-training/
│   ├── racetrack/
│   ├── roulette-game/
│   └── [8+ other features]
├── navigation/              # App-level navigation config
├── store/                   # Redux store (if needed)
├── styles/                  # Global styles
├── types/                   # Global types
└── utils/                   # Global utilities
```

### Architecture Pattern

**Feature-based with Screen Colocation:**
- Each feature is self-contained with its own dependencies
- Screens are organized in subfolders (e.g., `screens/exercises/CalculationScreen/`)
- Hooks and styles are colocated with their screens when used by a single screen
- Feature-level `index.ts` exports the public API
- Shared cross-feature code stays at the app level

This pattern maximizes:
- **Encapsulation**: Feature changes don't leak into other features
- **Discoverability**: Related code lives together
- **Scalability**: Easy to add/remove features
- **Testability**: Isolated feature-level testing

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd CasinoTrainingApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Android: Press `a` or run `npm run android`
   - iOS: Press `i` or run `npm run ios` (macOS only)
   - Web: Press `w` or run `npm run web`

## 📱 Running the App

### Android
```bash
npm run android
```

### iOS (macOS required)
```bash
npm run ios
```

### Expo Go
1. Install Expo Go app on your mobile device
2. Scan the QR code from the terminal

## 🎮 Usage

1. **Select Exercise Type**: Choose from various roulette training exercises
2. **Practice**: Use the interactive roulette layout and racetrack
3. **Place Bets**: Select chip values and tap on numbers
4. **Track Progress**: View your statistics and improvement over time

## 🔮 Future Enhancements

- [ ] Backend integration with ASP.NET REST API
- [ ] User authentication and cloud sync
- [ ] Card games training modules
- [ ] Poker games (Texas Hold'em, Omaha)
- [ ] Multiplayer practice mode
- [ ] Advanced analytics dashboard
- [ ] Video tutorials and guides

## 📝 Development Guidelines

### Architecture Principles
- **Feature-First**: Organize code around features, not layers
- **Colocation**: Keep related code together (component + hook + styles + tests in one folder)
- **Module Exports**: Each feature exports a clean public API via `index.ts`
- **Single Responsibility**: Hooks handle state, components handle UI
- **Testing**: Tests live alongside the code they test

### Code Organization
```
MyFeature/
├── screens/
│   └── MyScreen/
│       ├── MyScreen.tsx          # Main component
│       ├── MyScreen.test.tsx      # Component tests
│       ├── useMyScreenLogic.ts    # Screen-specific hook
│       ├── useMyScreenLogic.test.ts
│       ├── MyScreen.styles.ts     # Styles (optional)
│       └── index.ts               # Module export
├── components/                   # Feature-level shared components
├── hooks/                        # Feature-level shared hooks
├── types/                        # Feature-specific types
├── utils/                        # Feature utilities
├── constants/                    # Feature constants
├── navigation.tsx                # Navigation config
└── index.ts                      # Feature public API
```

### Key Rules
1. **Colocate single-use code**: If a hook is only used by one screen, put it in that screen's folder
2. **Share at feature level**: Hooks used by multiple screens go in `features/YourFeature/hooks/`
3. **Avoid cross-feature dependencies**: Features should be independent; use props drilling if needed
4. **Type everything**: Add types for all props, state, and function parameters
5. **Test utilities & hooks**: At minimum, hook behavior should be tested

- **TypeScript**: Strongly typed code for better maintainability
- **Component-Based**: Reusable, modular components
- **State Management**: Redux Toolkit for predictable state (if needed)
- **Offline-First**: Local storage with future cloud sync
- **Clean Code**: Follow React Native and TypeScript best practices

## 🐛 Known Issues

- Racetrack scrolling may need optimization for smaller devices
- SVG rendering performance to be improved for complex layouts

## 📄 License

This project is proprietary and confidential.

## 👥 Contributors

- Developer Team

## 🤝 Contributing

This is a private project. For contributions, please contact the project owner.

---

**Happy Training! 🎰🎲🃏**
