import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { DropdownSelector } from '../DropdownSelector/DropdownSelector';
import type { StepConfig } from './BaseTrainingModal.types';
import { makeStyles } from './BaseTrainingModal.styles';

interface BaseTrainingModalStepsProps {
  steps: StepConfig[];
}

export default function BaseTrainingModalSteps({ steps }: BaseTrainingModalStepsProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <>
      {steps.map(step => (
        <View key={step.number} style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{step.number}</Text>
            </View>
            <Text style={styles.stepTitle}>
              {step.title}
              {step.optional && <Text style={styles.optionalText}> (Optional)</Text>}
            </Text>
          </View>
          <DropdownSelector
            placeholder={step.placeholder}
            items={step.items}
            selectedKey={step.selectedKey}
            onSelect={step.onSelect}
            showDropdown={step.showDropdown}
            onToggleDropdown={step.onToggleDropdown}
          />
        </View>
      ))}
    </>
  );
}
