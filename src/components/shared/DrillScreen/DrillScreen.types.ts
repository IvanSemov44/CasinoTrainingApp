import { BaseDrillScenario } from '@hooks/useDrillState';

export interface DrillScreenProps<
  TScenario extends BaseDrillScenario = BaseDrillScenario,
  TDrillType = unknown,
> {
  scenarioGenerator: (drillType: TDrillType) => TScenario;
  drillType: TDrillType;
  betChipLabel?: (drillType: TDrillType) => string;
  dealerLabel?: (drillType: TDrillType) => string;
}
