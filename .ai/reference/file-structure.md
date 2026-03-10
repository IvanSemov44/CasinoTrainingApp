# File Structure Reference

Updated: 2026-03-10
Owner: @ivans

## Purpose
Provide a practical map of where to implement and where to document changes.

## App Root
- **src/**: Source code
- **src/components/**: Shared UI components (ChipSelector, PlayingCard, ErrorBoundary, etc.)
- **src/features/**: Self-contained feature modules (blackjack-training, roulette-game, etc.)
- **src/screens/**: Navigation screens/pages (HomeScreen, SettingsScreen, etc.)
- **src/store/**: Redux slices and root store configuration
- **src/hooks/**: Custom hooks for state access and reusable UI logic
- **src/services/**: Business logic (storage.service.ts, logger.service.ts)
- **src/contexts/**: React context providers (SettingsContext, ThemeContext)
- **src/types/**: TypeScript interfaces and type definitions
- **src/constants/**: App constants (difficulty levels, sectors)
- **src/config/**: Configuration data (betConfigs, cashConfigs)
- **src/utils/**: Utility functions and helpers
- **src/styles/**: Theme and global style definitions
- **src/test-utils/**: Test fixtures and helpers
- **src/__tests__/**: Integration and unit tests

## Platform-Specific
- **web/**: Web deployment assets (Expo Web) and manifest
- **assets/**: Images, fonts, and other static assets

## Configuration
- **app.json**: Expo app configuration
- **tsconfig.json**: TypeScript configuration
- **jest.config.js**: Test runner configuration
- **eslint.config.js**: Linting configuration

## AI Documentation
- Canonical docs hub: `.ai/README.md`
- Workflows: `.ai/workflows/`
- Domain rules: `.ai/frontend/`, `.ai/architecture/`
