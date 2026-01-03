# Casino Training App - Development Notes

## Current Implementation Status

### ✅ Completed
- [x] Project initialization with Expo + TypeScript
- [x] Redux Toolkit store configuration
- [x] React Navigation setup (Stack Navigator)
- [x] Roulette data types and constants
- [x] AsyncStorage service for offline data
- [x] Basic UI screens (Home, Exercises, Progress, Training)
- [x] RouletteLayout component (European layout)
- [x] Racetrack component for neighbor bets
- [x] ChipSelector component
- [x] Utility functions for calculations

### 🚧 In Progress / Next Steps

#### Phase 1: Core Roulette Functionality
1. **Enhanced Bet Placement System**
   - [ ] Split bet detection (between two numbers)
   - [ ] Street bet detection (row of 3)
   - [ ] Corner bet detection (4 numbers)
   - [ ] Line bet detection (6 numbers)
   - [ ] Outside bets handling (dozens, columns, red/black, etc.)

2. **Racetrack Enhancements**
   - [ ] Neighbor bet implementation (number + 2 neighbors on each side)
   - [ ] Voisins du Zero placement logic
   - [ ] Tiers du Cylindre placement logic
   - [ ] Orphelins placement logic
   - [ ] Zero Game implementation

3. **Visual Chip Representation**
   - [ ] Display chips on bet positions
   - [ ] Stack multiple chips on same position
   - [ ] Remove chips functionality
   - [ ] Visual chip animations

#### Phase 2: Exercise Implementation
1. **Chip Placement Exercise**
   - [ ] Random bet request generation
   - [ ] Validation of correct placement
   - [ ] Scoring system
   - [ ] Time tracking

2. **Payout Calculation Exercise**
   - [ ] Display winning number and placed bets
   - [ ] User input for payout amount
   - [ ] Validation and feedback
   - [ ] Progressive difficulty

3. **Bet Recognition Exercise**
   - [ ] Show bet configuration
   - [ ] Multiple choice bet type
   - [ ] Speed challenges

4. **Speed Drills**
   - [ ] Countdown timer
   - [ ] Rapid-fire questions
   - [ ] Score multiplier
   - [ ] Leaderboard preparation

#### Phase 3: Data Persistence & Sync
1. **Local Storage Enhancement**
   - [ ] Load exercise results on app start
   - [ ] Sync Redux state with AsyncStorage
   - [ ] Data migration strategy

2. **Backend Preparation**
   - [ ] API service structure
   - [ ] Authentication flow design
   - [ ] Data sync mechanism
   - [ ] Conflict resolution strategy

#### Phase 4: Card Games (Future)
- [ ] Blackjack training module
- [ ] Baccarat training module
- [ ] Other card games

#### Phase 5: Poker Games (Future)
- [ ] Texas Hold'em dealer training
- [ ] Omaha dealer training
- [ ] Poker hand recognition

## Technical Debt & Optimizations

### Performance
- [ ] Optimize RouletteLayout rendering (use React.memo)
- [ ] Optimize Racetrack scrolling performance
- [ ] Image assets optimization
- [ ] Lazy loading for screens

### UX/UI
- [ ] Add haptic feedback on bet placement
- [ ] Improved animations (Reanimated)
- [ ] Better error messages
- [ ] Loading states
- [ ] Empty states

### Code Quality
- [ ] Add unit tests (Jest)
- [ ] Add integration tests
- [ ] Add E2E tests (Detox)
- [ ] Component documentation
- [ ] API documentation

## Known Issues & Bugs
1. Cell size calculation may not work perfectly on all devices
2. Racetrack horizontal scroll needs better UX
3. No validation for incorrect bet placements yet
4. Alert dialogs should be replaced with custom modals

## Dependencies to Monitor
- `@reduxjs/toolkit` - State management
- `react-navigation` - Navigation
- `react-native-svg` - Graphics rendering
- `react-native-reanimated` - Animations
- `@react-native-async-storage/async-storage` - Storage

## Environment Setup Notes

### iOS
- Requires macOS
- Xcode installation
- iOS Simulator or physical device

### Android
- Android Studio recommended
- Android SDK setup
- Android Emulator or physical device

### Testing Devices
- Minimum: iPhone SE, Android with 5" screen
- Recommended: iPhone 12+, Android with 6" screen
- Tablets support to be added later

## Performance Targets
- App launch: < 3 seconds
- Screen navigation: < 200ms
- Bet placement response: < 100ms
- 60 FPS animations

## Next Development Session Priorities
1. Implement bet placement validation
2. Add chip visual representation on table
3. Complete chip placement exercise logic
4. Improve Racetrack UX
5. Add undo/clear bets functionality

---

**Last Updated**: January 3, 2026
