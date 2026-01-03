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

```
src/
├── components/          # Reusable UI components
│   ├── RouletteLayout.tsx
│   ├── Racetrack.tsx
│   └── ChipSelector.tsx
├── screens/            # App screens
│   ├── HomeScreen.tsx
│   ├── RouletteExercisesScreen.tsx
│   ├── RouletteTrainingScreen.tsx
│   └── ProgressScreen.tsx
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── store/             # Redux store and slices
│   ├── index.ts
│   ├── hooks.ts
│   └── rouletteSlice.ts
├── services/          # Business logic and services
│   └── storage.service.ts
├── types/             # TypeScript type definitions
│   └── roulette.types.ts
├── constants/         # App constants and configurations
│   └── roulette.constants.ts
└── utils/             # Helper functions
    └── roulette.utils.ts
```

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

- **TypeScript**: Strongly typed code for better maintainability
- **Component-Based**: Reusable, modular components
- **State Management**: Redux Toolkit for predictable state
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
