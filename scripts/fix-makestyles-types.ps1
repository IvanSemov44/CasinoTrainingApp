param([string]$Root = "c:\Users\ivans\Desktop\Dev\CasinoTrainingApp")
Set-Location $Root

# Files that had useTheme removed — makeStyles needs AppColors type now
$stylesOnlyFiles = @(
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
  "src/features/roulette-training/components/FeedbackCard/FeedbackCard.tsx",
  "src/features/roulette-training/components/HintSection/HintSection.tsx",
  "src/features/roulette-training/screens/menu/RouletteExercisesScreen/RouletteExercisesScreen.tsx",
  "src/features/roulette-training/screens/reference/RouletteLayoutPracticeScreen/RouletteLayoutPracticeScreen.tsx",
  "src/features/roulette-training/screens/reference/RouletteLayoutViewScreen/RouletteLayoutViewScreen.tsx",
  "src/features/roulette-training/screens/reference/RouletteTrainingScreen/RouletteTrainingScreen.tsx",
  "src/screens/HomeScreen.tsx",
  "src/screens/ProgressScreen.tsx"
)

$appColorsImport = "import type { AppColors } from '@styles/themes';"
$oldType = "ReturnType<typeof useTheme>['colors']"

foreach ($relPath in $stylesOnlyFiles) {
  $abs = Join-Path $Root $relPath
  $c = [System.IO.File]::ReadAllText($abs)
  if ($c.Contains($oldType)) {
    # Replace the type annotation
    $c = $c.Replace($oldType, "AppColors")
    # Add AppColors import after the useThemedStyles import line
    if (-not $c.Contains($appColorsImport)) {
      $c = $c -replace "(import \{ useThemedStyles \} from '@hooks/useThemedStyles';)", "`$1`n$appColorsImport"
    }
    [System.IO.File]::WriteAllText($abs, $c, [System.Text.UTF8Encoding]::new($false))
    Write-Host "  Fixed type in: $(Split-Path $relPath -Leaf)"
  } else {
    Write-Host "  Skipped (no match): $(Split-Path $relPath -Leaf)"
  }
}

# Special fix for PlayingCard.tsx — uses 'dynamicStyles' not 'styles'
$pcPath = Join-Path $Root "src/components/PlayingCard/PlayingCard.tsx"
$c = [System.IO.File]::ReadAllText($pcPath)
# The dynamicStyles = useMemo line was NOT replaced by first script
$c = $c -replace "  const dynamicStyles = useMemo\(\(\) => makeStyles\(colors\), \[colors\]\);", "  const dynamicStyles = useThemedStyles(makeStyles);"
[System.IO.File]::WriteAllText($pcPath, $c, [System.Text.UTF8Encoding]::new($false))
Write-Host "  Fixed dynamicStyles in PlayingCard.tsx"

Write-Host "`nAll fixes applied."
