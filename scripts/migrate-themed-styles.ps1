param([string]$Root = "c:\Users\ivans\Desktop\Dev\CasinoTrainingApp")

$stylesOnly = @(
  "src/components/ChipSelector/ChipSelector.tsx",
  "src/components/NumberPad/NumberPad.tsx",
  "src/components/shared/DrillScreen/DrillScreen.tsx",
  "src/components/shared/DropdownSelector/DropdownSelector.tsx",
  "src/components/SkeletonLoader/SkeletonLoader.tsx",
  "src/features/call-bets-training/components/ChallengeDisplay/ChallengeDisplay.tsx",
  "src/features/call-bets-training/components/ResultFeedback/ResultFeedback.tsx",
  "src/features/call-bets-training/screens/CallBetsMenuScreen/CallBetsMenuScreen.tsx",
  "src/features/call-bets-training/screens/CallBetsTrainingScreen/CallBetsTrainingScreen.tsx",
  "src/features/cash-conversion-training/components/AnswerInput/AnswerInput.tsx",
  "src/features/cash-conversion-training/components/RequestDisplay/RequestDisplay.tsx",
  "src/features/cash-conversion-training/components/ResultFeedback/ResultFeedback.tsx",
  "src/features/cash-conversion-training/screens/CashConversionMenuScreen/CashConversionMenuScreen.tsx",
  "src/features/cash-conversion-training/screens/CashConversionTrainingScreen/CashConversionTrainingScreen.tsx",
  "src/features/plo-training/components/ActionLog/ActionLog.tsx",
  "src/features/plo-training/components/GameStateDisplay/GameStateDisplay.tsx",
  "src/features/plo-training/components/PlayerPosition/PlayerPosition.tsx",
  "src/features/plo-training/components/PokerTable/PokerTable.tsx",
  "src/features/plo-training/components/PotCalculationInput/PotCalculationInput.tsx",
  "src/features/plo-training/screens/PLOGameTrainingScreen/PLOGameTrainingScreen.tsx",
  "src/features/racetrack/screens/RacetrackScreen/RacetrackScreen.tsx",
  "src/features/roulette-game/screens/RouletteGameScreen/RouletteGameScreen.tsx",
  "src/features/roulette-training/components/ExerciseLayout/ExerciseLayout.tsx",
  "src/features/roulette-training/components/ExerciseStats/ExerciseStats.tsx",
  "src/features/roulette-training/components/HintSection/HintSection.tsx",
  "src/features/roulette-training/screens/menu/RouletteExercisesScreen/RouletteExercisesScreen.tsx",
  "src/features/roulette-training/screens/reference/RouletteLayoutPracticeScreen/RouletteLayoutPracticeScreen.tsx",
  "src/features/roulette-training/screens/reference/RouletteLayoutViewScreen/RouletteLayoutViewScreen.tsx",
  "src/features/roulette-training/screens/reference/RouletteTrainingScreen/RouletteTrainingScreen.tsx",
  "src/screens/ProgressScreen.tsx"
)
# Styles-only but also use useMemo for other things — keep the useMemo import
$stylesOnlyKeepMemo = @(
  "src/features/roulette-training/components/FeedbackCard/FeedbackCard.tsx",
  "src/screens/HomeScreen.tsx"
)
# Use colors directly in JSX — keep useTheme, only swap the useMemo styles line
$needsColors = @(
  "src/components/PlayingCard/PlayingCard.tsx",
  "src/components/Racetrack/Racetrack.tsx",
  "src/components/shared/BaseTrainingModal/BaseTrainingModal.tsx",
  "src/components/shared/DrillMenuScreen/DrillMenuScreen.tsx",
  "src/features/cash-conversion-training/components/CashDisplay/CashDisplay.tsx",
  "src/features/plo-training/screens/PLOMenuScreen/PLOMenuScreen.tsx",
  "src/features/racetrack-position-training/screens/PositionMenuScreen/PositionMenuScreen.tsx",
  "src/features/racetrack-position-training/screens/PositionTrainingScreen/PositionTrainingScreen.tsx",
  "src/features/racetrack-sector-training/screens/SectorMenuScreen/SectorMenuScreen.tsx",
  "src/features/racetrack-sector-training/screens/SectorTrainingScreen/SectorTrainingScreen.tsx",
  "src/features/roulette-training/components/MenuListScreen/MenuListScreen.tsx",
  "src/screens/SettingsScreen.tsx"
)

$themedImport = "import { useThemedStyles } from '@hooks/useThemedStyles';"
$newStylesLine = "  const styles = useThemedStyles(makeStyles);"

function Migrate-StylesOnly([string]$path, [bool]$keepMemo) {
  $abs = Join-Path $Root $path
  $c = [System.IO.File]::ReadAllText($abs)
  # Replace the useMemo styles line
  $c = $c -replace "  const styles = useMemo\(\(\) => makeStyles\(colors\), \[colors\]\);", $newStylesLine
  # Remove the colors = useTheme() line (with trailing newline)
  $c = $c -replace "  const \{ colors \} = useTheme\(\);\r?\n", ""
  if (-not $keepMemo) {
    # Remove useMemo from imports
    $c = $c -replace "import React, \{ useMemo \} from 'react';", "import React from 'react';"
    $c = $c -replace "import \{ useMemo \} from 'react';\r?\n", ""
    $c = $c -replace "import \{ useMemo \} from 'react';\n", ""
  }
  # Swap useTheme import for useThemedStyles import
  $c = $c -replace "import \{ useTheme \} from '@contexts/ThemeContext';", $themedImport
  [System.IO.File]::WriteAllText($abs, $c, [System.Text.UTF8Encoding]::new($false))
  Write-Host "  [SO] $path"
}

function Migrate-NeedsColors([string]$path) {
  $abs = Join-Path $Root $path
  $c = [System.IO.File]::ReadAllText($abs)
  # Replace the useMemo styles line
  $c = $c -replace "  const styles = useMemo\(\(\) => makeStyles\(colors\), \[colors\]\);", $newStylesLine
  # Remove useMemo from React imports
  $c = $c -replace "import React, \{ useMemo \} from 'react';", "import React from 'react';"
  $c = $c -replace "import \{ useMemo \} from 'react';\r?\n", ""
  $c = $c -replace "import \{ useMemo \} from 'react';\n", ""
  # Add useThemedStyles import right after useTheme import
  $c = $c -replace "import \{ useTheme \} from '@contexts/ThemeContext';", "import { useTheme } from '@contexts/ThemeContext';`nimport { useThemedStyles } from '@hooks/useThemedStyles';"
  [System.IO.File]::WriteAllText($abs, $c, [System.Text.UTF8Encoding]::new($false))
  Write-Host "  [NC] $path"
}

Write-Host "Migrating styles-only files..."
foreach ($f in $stylesOnly) { Migrate-StylesOnly $f $false }
foreach ($f in $stylesOnlyKeepMemo) { Migrate-StylesOnly $f $true }
Write-Host "Migrating needs-colors files..."
foreach ($f in $needsColors) { Migrate-NeedsColors $f }
Write-Host "Done. Total: $(($stylesOnly + $stylesOnlyKeepMemo + $needsColors).Count) files"
