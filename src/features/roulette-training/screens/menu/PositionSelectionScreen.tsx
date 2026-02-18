import React, { useMemo } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import MenuListScreen, { type MenuItem } from '../../components/MenuListScreen';
import {
  POSITION_EXERCISES,
  POSITION_METADATA,
  CASH_CONFIGS,
  type PositionType,
} from '../../config/exerciseDefinitions';
import type { RouletteTrainingStackParamList } from '../../navigation';
import type { BetConfigKey } from '@config/betConfigs';
import type { CashConfigKey } from '@config/cashConfigs';

type PositionSelectionScreenProps = StackScreenProps<RouletteTrainingStackParamList, 'PositionSelection'>;

interface NavigationParams {
  betConfigKey?: BetConfigKey;
  cashConfigKey?: CashConfigKey;
}

export default function PositionSelectionScreen({ route, navigation }: PositionSelectionScreenProps) {
  const { positionType } = route.params as { positionType: PositionType };

  const menuItems: MenuItem[] = useMemo(() => {
    const templates = POSITION_EXERCISES[positionType];
    if (!templates) return [];

    const result: MenuItem[] = [];
    let exerciseId = 1;

    templates.forEach((template) => {
      // Add payout calculation exercise (no cash handling)
      if (!template.title.includes('%CHIP%')) {
        result.push({
          id: String(exerciseId++),
          title: template.title,
          description: template.description,
          difficulty: template.difficulty,
          onPress: () => {
            const params: NavigationParams = {};
            if (template.betConfigKey) params.betConfigKey = template.betConfigKey;
            if (template.cashConfigKey) params.cashConfigKey = template.cashConfigKey;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            navigation.navigate(template.screen as any, Object.keys(params).length > 0 ? params : undefined);
          },
        });
      } else {
        // Add cash handling exercises for each chip denomination
        CASH_CONFIGS.forEach((cashConfig) => {
          result.push({
            id: String(exerciseId++),
            title: template.title.replace('%CHIP%', `${cashConfig.chipValue} Chips`),
            description: template.description.replace(/%CHIP%/g, cashConfig.chipValue),
            difficulty: cashConfig.difficulty,
            onPress: () => {
              const params: NavigationParams = { cashConfigKey: cashConfig.cashConfigKey };
              if (template.betConfigKey) params.betConfigKey = template.betConfigKey;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              navigation.navigate(template.screen as any, params);
            },
          });
        });
      }
    });

    return result;
  }, [positionType, navigation]);

  const positionTitle = POSITION_METADATA[positionType]?.title || 'Position';

  return (
    <MenuListScreen 
      title={positionTitle}
      subtitle="Choose your training mode"
      items={menuItems}
      theme="dark"
    />
  );
}
