import { StyleSheet } from 'react-native';
import type { AppColors } from '@styles/themes';
import { createTextStyles } from '@styles';

export function makeStyles(colors: AppColors) {
  const textStyles = createTextStyles(colors);
  
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary },
    content: { padding: 20, paddingBottom: 40 },

    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    statPill: {
      backgroundColor: colors.background.secondary,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    statPillText: textStyles.statBadge,
    statPillSub: { color: colors.text.muted, fontSize: 11, marginTop: 2 },
    streakPill: {
      backgroundColor: colors.background.secondary,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.status.streak,
    },
    streakText: { fontSize: 15, fontWeight: '800', color: colors.status.streak },

    handBlock: { marginBottom: 16 },
    handLabel: {
      ...textStyles.mutedLabel,
      fontSize: 11,
      marginBottom: 8,
    },
    cardRow: { flexDirection: 'row', gap: 8 },

    betChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.background.secondary,
      alignSelf: 'flex-start',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginBottom: 16,
    },
    betChipLabel: { fontSize: 11, fontWeight: '700', color: colors.text.muted, letterSpacing: 0.8 },
    betChipValue: { fontSize: 16, fontWeight: '700', color: colors.text.gold },

    questionBox: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 18,
      marginBottom: 16,
    },
    questionText: { fontSize: 17, color: colors.text.primary, fontWeight: '600', lineHeight: 25 },

    twoOptionRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
    twoOptionBtn: {
      flex: 1,
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: colors.border.primary,
      paddingVertical: 22,
      alignItems: 'center',
    },
    twoOptionText: { fontSize: 20, fontWeight: '700', color: colors.text.primary },

    optionList: { gap: 8, marginBottom: 12 },
    optionBtn: {
      backgroundColor: colors.background.secondary,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.border.primary,
      padding: 14,
    },
    optionBtnSelected: { borderColor: colors.text.gold, backgroundColor: colors.background.hint },
    optionText: {
      color: colors.text.primary,
      fontSize: 15,
      fontWeight: '500',
      textAlign: 'center',
    },
    optionTextSelected: { color: colors.text.gold, fontWeight: '700' },

    numericBlock: { marginBottom: 12 },
    amountDisplay: {
      backgroundColor: colors.background.darkGray,
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      alignItems: 'center',
    },
    amountLabel: { fontSize: 12, color: colors.text.muted, marginBottom: 4 },
    amountValue: { fontSize: 38, fontWeight: '700', color: colors.text.primary },

    submitBtn: {
      backgroundColor: colors.status.success,
      borderRadius: 12,
      padding: 18,
      alignItems: 'center',
      marginTop: 4,
    },
    submitBtnDisabled: { backgroundColor: colors.background.tertiary, opacity: 0.5 },
    submitBtnText: { fontSize: 17, fontWeight: '700', color: colors.text.primary },

    resultCard: { borderRadius: 14, padding: 20, marginTop: 4 },
    resultCorrect: {
      backgroundColor: colors.status.successAlt,
      borderWidth: 1.5,
      borderColor: colors.status.success,
    },
    resultIncorrect: {
      backgroundColor: colors.status.errorAlt,
      borderWidth: 1.5,
      borderColor: colors.status.error,
    },
    resultHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
    resultIcon: { fontSize: 22, fontWeight: '800', color: colors.text.primary },
    resultTitle: { fontSize: 22, fontWeight: '700', color: colors.text.primary, flex: 1 },
    pointsEarned: { fontSize: 18, fontWeight: '800', color: colors.text.gold },

    answerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primaryDark,
    },
    answerLabel: { fontSize: 14, color: colors.text.secondary },
    answerValue: { fontSize: 16, color: colors.text.primary, fontWeight: '700' },
    correctHL: { color: colors.status.success },

    explanationBox: {
      marginTop: 14,
      backgroundColor: colors.background.darkGray,
      borderRadius: 8,
      padding: 14,
    },
    explanationText: { fontSize: 13, color: colors.text.secondary, lineHeight: 20 },
    streakNote: {
      marginTop: 12,
      textAlign: 'center',
      color: colors.status.streak,
      fontSize: 13,
      fontWeight: '700',
    },

    continueBtn: {
      backgroundColor: colors.text.gold,
      borderRadius: 12,
      padding: 18,
      alignItems: 'center',
      marginTop: 14,
    },
    continueBtnText: { fontSize: 17, fontWeight: '700', color: colors.background.dark },
  });
}
