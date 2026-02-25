# 🧪 Testing Checklist - First Run

## Pre-Launch Checklist

### Environment Setup
- [ ] Node.js installed (v16+)
- [ ] Dependencies installed (`npm install` completed)
- [ ] Expo CLI working (`npm start` runs successfully)
- [ ] No critical errors in terminal

### Device Setup
- [ ] Expo Go app installed on test device
- [ ] Phone and computer on same WiFi network
- [ ] QR code visible in terminal

---

## Functional Testing

### ✅ Navigation Tests

#### Home Screen
- [ ] App launches successfully
- [ ] Home screen displays with casino theme
- [ ] Title shows "Casino Dealer Training"
- [ ] Four menu buttons visible:
  - [ ] 🎰 Roulette Training (enabled)
  - [ ] 🃏 Card Games (disabled/grayed)
  - [ ] 🎲 Poker Games (disabled/grayed)
  - [ ] 📊 My Progress (enabled)

#### Navigation Flow
- [ ] Tap "Roulette Training" → Goes to Roulette Exercises screen
- [ ] Back button returns to Home
- [ ] Tap "My Progress" → Goes to Progress screen
- [ ] Back button returns to Home

#### Roulette Exercises Screen
- [ ] Six exercise cards display:
  1. [ ] Chip Placement (Easy)
  2. [ ] Payout Calculation (Medium)
  3. [ ] Bet Recognition (Easy)
  4. [ ] Speed Drill (Hard) with time limit
  5. [ ] Neighbor Bets (Medium)
  6. [ ] Sector Bets (Hard)
- [ ] Difficulty badges show correct colors
- [ ] Tap any exercise → Goes to Training screen

#### Roulette Training Screen
- [ ] Exercise title displays at top
- [ ] Chip selector visible
- [ ] Roulette layout renders correctly
- [ ] Racetrack renders below layout
- [ ] Info box displays at bottom

---

### 🎰 Roulette Layout Tests

#### Visual Display
- [ ] Zero (0) displays at top in green
- [ ] All 36 numbers display in correct grid
- [ ] Red numbers are red (#CC0000)
- [ ] Black numbers are black (#000000)
- [ ] Numbers are readable (not too small)
- [ ] Grid layout looks correct (3 rows x 12 columns)

#### Outside Bets Display
- [ ] "1st 12", "2nd 12", "3rd 12" buttons visible
- [ ] "1-18", "EVEN", "RED", "BLACK", "ODD", "19-36" visible
- [ ] RED button has red background
- [ ] BLACK button has black background

#### Touch Interaction
- [ ] Tap on any number → Highlights in yellow
- [ ] Tap again → Toggles highlight off
- [ ] Alert shows when number tapped
- [ ] Alert shows correct chip value and number
- [ ] Multiple numbers can be highlighted
- [ ] All numbers are touchable (test corners and edges)

---

### 🎡 Racetrack Tests

#### Visual Display
- [ ] Title "Racetrack - Neighbor Bets" displays
- [ ] All 37 numbers visible in circular layout
- [ ] Numbers in wheel order (not numeric order)
- [ ] First number is 0 (green)
- [ ] Red numbers are red
- [ ] Black numbers are black
- [ ] Numbers are circular buttons

#### Scrolling
- [ ] Can scroll horizontally left/right
- [ ] Smooth scrolling performance
- [ ] No lag or stutter
- [ ] All numbers accessible via scrolling

#### Special Bets
- [ ] Four special bet buttons visible:
  - [ ] Voisins du Zero
  - [ ] Tiers du Cylindre
  - [ ] Orphelins
  - [ ] Zero Game
- [ ] Buttons have correct styling

#### Touch Interaction
- [ ] Tap any number → Highlights in yellow
- [ ] Alert shows with bet info
- [ ] Works on both ends of scroll

---

### 🎯 Chip Selector Tests

#### Display
- [ ] Title "Select Chip Value" visible
- [ ] 7 chips display in a row
- [ ] Chip values: 1, 5, 10, 25, 100, 500, 1000
- [ ] Each chip has different color:
  - [ ] 1 = White
  - [ ] 5 = Red
  - [ ] 10 = Blue
  - [ ] 25 = Green
  - [ ] 100 = Black
  - [ ] 500 = Purple
  - [ ] 1000 = Orange
- [ ] Default chip (5) is highlighted

#### Interaction
- [ ] Tap any chip → Becomes highlighted
- [ ] Previous selection unhighlights
- [ ] Selected chip has yellow border
- [ ] Selected chip slightly larger
- [ ] Bet amounts update to new chip value

---

### 📊 Progress Screen Tests

#### Initial State (No Data)
- [ ] Screen loads without crash
- [ ] Title "My Progress" displays
- [ ] Three stat cards show:
  - [ ] Exercises Completed: 0
  - [ ] Average Score: 0%
  - [ ] Correct Answers: 0/0
- [ ] "Recent Results" section shows
- [ ] Message: "No exercises completed yet..."

#### With Data (After Exercises)
- [ ] Stats update correctly
- [ ] Results list shows completed exercises
- [ ] Each result shows:
  - [ ] Exercise type
  - [ ] Score (correct/total)
  - [ ] Time spent
  - [ ] Date
- [ ] Most recent results at top

---

## UI/UX Testing

### Color Theme
- [ ] Dark green background (#0a2f1f)
- [ ] Medium green cards (#1a5f3f)
- [ ] Gold accents (#FFD700)
- [ ] Casino aesthetic maintained
- [ ] Good contrast and readability

### Typography
- [ ] All text readable
- [ ] No text cutoff
- [ ] Consistent font sizing
- [ ] Headers clearly distinct

### Layout
- [ ] No UI elements overlap
- [ ] Proper spacing and padding
- [ ] Scrollable content works
- [ ] Safe area handling (notches/corners)

### Responsiveness
- [ ] Test on phone (primary)
- [ ] Test in portrait orientation
- [ ] Test in landscape (if applicable)
- [ ] UI adapts to screen size

---

## Performance Testing

### Load Times
- [ ] App launches in < 3 seconds
- [ ] Screen transitions smooth
- [ ] No noticeable lag when navigating
- [ ] Roulette layout renders quickly

### Interactions
- [ ] Touch responses immediate (< 100ms)
- [ ] No delay when tapping numbers
- [ ] Chip selection instant
- [ ] Scrolling smooth (60 FPS)

### Memory
- [ ] App doesn't crash during testing
- [ ] No memory warnings
- [ ] Stable during extended use

---

## Edge Cases & Error Handling

### Rapid Tapping
- [ ] Tap buttons very quickly
- [ ] No duplicate actions
- [ ] No crashes

### Extreme Actions
- [ ] Tap many numbers rapidly
- [ ] Switch chips rapidly
- [ ] Navigate back/forth quickly
- [ ] Scroll racetrack aggressively

### Offline Mode
- [ ] App works without internet
- [ ] All features accessible
- [ ] Data saves locally

---

## Cross-Device Testing

### Small Screen (< 5")
- [ ] All elements visible
- [ ] Numbers not too small
- [ ] Buttons touchable

### Medium Screen (5-6")
- [ ] Optimal layout
- [ ] All features accessible

### Large Screen (6"+)
- [ ] No wasted space
- [ ] UI scales appropriately

### Tablet (Optional)
- [ ] Layout adapts
- [ ] Takes advantage of space

---

## Platform-Specific Tests

### Android
- [ ] Back button works correctly
- [ ] Material design elements
- [ ] Status bar styling

### iOS
- [ ] Swipe back gesture works
- [ ] Safe area respected
- [ ] Status bar styling

---

## Known Limitations (Current Version)

### Expected Behavior
- [x] Exercise logic not yet implemented (placeholder)
- [x] No actual bet validation
- [x] No payout calculations
- [x] No timer functionality
- [x] No data persistence between sessions
- [x] Alerts used instead of custom modals

### Not Bugs
- Tapping numbers shows alert (temporary)
- Special bet buttons don't work yet
- Outside bets not functional yet
- Progress stats always 0 (no exercises complete)

---

## Bug Reporting Template

If you find a bug, report it with:

```
Device: [iPhone 12 / Samsung Galaxy S21 / etc.]
OS: [iOS 17 / Android 13 / etc.]
Steps to Reproduce:
1. 
2. 
3. 

Expected: 
Actual: 
Screenshot: [attach if possible]
```

---

## Success Criteria

### Must Pass ✅
- [ ] App launches without crashes
- [ ] All screens accessible
- [ ] Numbers can be tapped
- [ ] Chips can be selected
- [ ] Navigation works

### Should Pass ⚠️
- [ ] Smooth performance
- [ ] Good visual quality
- [ ] Intuitive UX

### Nice to Have 🎯
- [ ] Animations smooth
- [ ] No visual glitches
- [ ] Fast load times

---

## Post-Testing

### After First Test
- [ ] Document all bugs found
- [ ] Note UX issues
- [ ] Prioritize fixes
- [ ] Plan next features

### Feedback Collection
- [ ] What works well?
- [ ] What feels confusing?
- [ ] What's missing?
- [ ] Performance issues?

---

**Tested By**: _____________  
**Date**: _____________  
**Device**: _____________  
**OS**: _____________  
**Build Version**: 1.0.0  
**Overall Status**: [ ] Pass [ ] Fail [ ] Conditional Pass

**Notes**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## 🤖 Automated Testing Status

### Unit Test Coverage (Updated: 2026-02-25)

| Metric | Value | Target |
|--------|-------|--------|
| **Overall Coverage** | 77.54% | 80% |
| **Statements** | 77.54% | 80% |
| **Branches** | 66.91% | 70% |
| **Functions** | 69.60% | 75% |
| **Lines** | 77.39% | 80% |
| **Test Suites** | 27 | - |
| **Total Tests** | 457 | - |
| **Passing Tests** | 457 | - |

### Test Files by Feature

#### Components (97.43% coverage)
| File | Tests | Coverage |
|------|-------|----------|
| `ChipSelector.test.tsx` | 18 | 100% |
| `LoadingSpinner.test.tsx` | 15 | 100% |
| `ErrorBoundary.test.tsx` | 14 | 100% |
| `Racetrack.test.tsx` | - | 91.66% |
| `RouletteChip.test.tsx` | 22 | 100% |

#### Roulette Components (43.29% coverage)
| File | Tests | Coverage |
|------|-------|----------|
| `RouletteNumberCell.test.tsx` | 22 | 100% |
| `RouletteLayout.tsx` | - | 72.72% |
| `RouletteNumberGrid.tsx` | - | 83.33% |

#### Shared Components (100% coverage for tested)
| File | Tests | Coverage |
|------|-------|----------|
| `DropdownSelector.test.tsx` | 22 | 100% |
| `useModalAnimation.test.ts` | 8 | 100% |

#### Features

**Call Bets Training (100% coverage for components)**
| File | Tests | Coverage |
|------|-------|----------|
| `ChallengeDisplay.test.tsx` | 12 | 100% |
| `ResultFeedback.test.tsx` | 16 | 100% |
| `CallBetsTrainingScreen.test.tsx` | 16 | 69.69% |
| `validation.test.ts` | 13 | 100% |

**Cash Conversion Training**
| File | Tests | Coverage |
|------|-------|----------|
| `calculations.test.ts` | 35 | 100% |
| `CashConversionMenuScreen.test.tsx` | 13 | 85.71% |

**PLO Training**
| File | Tests | Coverage |
|------|-------|----------|
| `plo.utils.test.ts` | 12 | 98.14% |
| `PLOMenuScreen.test.tsx` | 9 | 100% |

**Racetrack**
| File | Tests | Coverage |
|------|-------|----------|
| `racetrack.utils.test.ts` | 20 | 100% |
| `useAnnouncedBets.test.ts` | 16 | 100% |

**Roulette Training**
| File | Tests | Coverage |
|------|-------|----------|
| `exerciseHelpers.test.ts` | 22 | 100% |
| `betGenerators.test.ts` | 18 | 88.40% |
| `useExerciseState.test.ts` | 16 | 100% |

**Roulette Game**
| File | Tests | Coverage |
|------|-------|----------|
| `RouletteGameScreen.test.tsx` | 7 | 70.58% |

#### Utilities
| File | Tests | Coverage |
|------|-------|----------|
| `randomUtils.test.ts` | 30 | 100% |
| `roulette.utils.test.ts` | 29 | 96.55% |

#### Integration Tests
| File | Tests | Coverage |
|------|-------|----------|
| `navigation.test.tsx` | 8 | - |

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test.test.ts

# Run tests in watch mode
npm test -- --watch
```

### Coverage Improvement Roadmap

1. **Priority 1 - Components with 0% coverage:**
   - `TrainingSelectionModal.tsx` (4.12%)
   - `BaseTrainingModal.tsx` (5.88%)

2. **Priority 2 - Components with low coverage:**
   - `RouletteOutsideBets.tsx` (52.63%)
   - `RouletteColumnBets.tsx` (40%)
   - `RouletteZeroColumn.tsx` (57.14%)

3. **Priority 3 - Improve branch coverage:**
   - Current: 66.91%
   - Target: 70%+
