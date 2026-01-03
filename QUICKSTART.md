# 🚀 Quick Start Guide

## First Time Setup (5 minutes)

### 1. Prerequisites
Make sure you have installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Git** (optional) - [Download here](https://git-scm.com/)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the App
```bash
npm start
```

That's it! A QR code will appear in your terminal.

---

## Running on Your Phone (Easiest Way)

### Android
1. Install **Expo Go** from Google Play Store
2. Open Expo Go app
3. Tap "Scan QR Code"
4. Scan the QR code in your terminal
5. Wait for the app to load (first time may take a minute)

### iOS
1. Install **Expo Go** from App Store
2. Open Camera app
3. Point at the QR code in your terminal
4. Tap the notification to open in Expo Go
5. Wait for the app to load

---

## Running on Simulator/Emulator

### Android Emulator
1. Install Android Studio
2. Create an Android Virtual Device (AVD)
3. Start the emulator
4. In terminal, press `a` or run:
```bash
npm run android
```

### iOS Simulator (macOS only)
1. Install Xcode from Mac App Store
2. In terminal, press `i` or run:
```bash
npm run ios
```

---

## Running on Web (Quick Testing)

```bash
npm run web
```
Or press `w` in the terminal when Expo is running.

**Note**: Some features may not work perfectly on web as it's designed for mobile.

---

## Useful Commands

### Start fresh
```bash
npx expo start -c
```
This clears the cache and starts fresh.

### Install/Update dependencies
```bash
npm install
```

### Fix Expo compatibility issues
```bash
npx expo install --fix
```

### Check for updates
```bash
npx expo upgrade
```

---

## App Navigation Flow

```
Home Screen
    │
    ├─→ Roulette Exercises
    │       │
    │       └─→ Select Exercise
    │               │
    │               └─→ Training Screen (Interactive Table)
    │
    └─→ My Progress (View Statistics)
```

---

## Features to Try

### 1. **Chip Selection**
- Tap on different chip values (1, 5, 10, 25, 100, 500, 1000)
- Selected chip gets highlighted with yellow border

### 2. **Bet Placement**
- Select a chip value
- Tap any number on the roulette layout
- Number gets highlighted in yellow
- Alert shows your bet

### 3. **Racetrack**
- Scroll horizontally through numbers
- Numbers are in wheel order (not numeric order)
- Tap to place neighbor bets

### 4. **Exercise Types**
Try all 6 exercise types from the Roulette Exercises screen:
- Chip Placement
- Payout Calculation
- Bet Recognition
- Speed Drill
- Neighbor Bets
- Sector Bets

---

## Keyboard Shortcuts (in Terminal)

When Expo is running, press:
- `a` - Open on Android
- `i` - Open on iOS
- `w` - Open in web browser
- `r` - Reload the app
- `m` - Toggle developer menu
- `j` - Open debugger
- `c` - Clear terminal
- `?` - Show all commands

---

## Troubleshooting

### App won't start?
```bash
# Clear cache and restart
npx expo start -c
```

### Package errors?
```bash
# Reinstall everything
rm -rf node_modules
npm install
```

### Can't scan QR code?
- Make sure your phone and computer are on the same WiFi network
- Try pressing `t` in terminal to use tunnel connection
- Or use the manual connection option in Expo Go

### App crashes on startup?
- Check terminal for error messages
- Make sure all dependencies installed correctly
- Try clearing cache: `npx expo start -c`

### Slow performance?
- Make sure you're running in development mode
- Close other apps on your device
- Try restarting Expo server

---

## Development Tips

### Hot Reload
- Save any file
- App automatically reloads
- State is preserved (most of the time)

### Debugging
- Shake your device or press `m` in terminal
- Select "Debug Remote JS"
- Open Chrome DevTools

### TypeScript Errors
- VS Code shows errors inline
- Terminal shows compilation errors
- Fix errors before running

---

## Project Structure at a Glance

```
src/
├── components/     ← UI components (Roulette table, etc.)
├── screens/        ← Full screens (Home, Progress, etc.)
├── navigation/     ← App navigation setup
├── store/          ← Redux state management
├── types/          ← TypeScript types
├── constants/      ← Roulette data, colors, numbers
├── utils/          ← Helper functions
└── services/       ← Storage, API (future)
```

---

## Need Help?

### Check Documentation
- `README.md` - Full project documentation
- `DEVELOPMENT.md` - Technical details and roadmap
- `PROJECT_SUMMARY.md` - Complete project overview

### Common Issues
1. **White screen**: Check terminal for errors
2. **Nothing happens when tapping**: Check if gesture handler installed
3. **Numbers look wrong**: Try different device/screen size
4. **QR code not working**: Use manual connection in Expo Go

---

## What to Expect

### Current Features
✅ Navigate through all screens  
✅ Select chip values  
✅ Tap numbers to place bets  
✅ View roulette layout and racetrack  
✅ See exercise options  

### Coming Soon
🚧 Actual exercise validation  
🚧 Payout calculations  
🚧 Score tracking  
🚧 Timer functionality  
🚧 Visual chip placement  

---

## Ready to Develop?

### Next Steps
1. Explore the codebase in `src/`
2. Check `DEVELOPMENT.md` for roadmap
3. Try modifying colors in `constants/`
4. Add new features in `components/`

### Good Places to Start
- Modify chip colors in `constants/roulette.constants.ts`
- Add new exercises in `screens/RouletteExercisesScreen.tsx`
- Improve layout in `components/RouletteLayout.tsx`

---

**Happy Coding! 🎰**

If you get stuck, check the error messages in the terminal - they're usually very helpful!
