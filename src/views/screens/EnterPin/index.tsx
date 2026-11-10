import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PinDots from '../../components/PinDots';
import PinKeypad from '../../components/PinKeypad';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../../theme/colors';
import { useScreen } from './useScreen';
import { useTranslation } from 'react-i18next';

export default function EnterPinScreen() {
  const { t } = useTranslation();
  const {
  email, pin, pinLength, error, biometricAvailable,
  onDigit, onDelete, onContinue, onBiometric, changeAccount,
} = useScreen();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.top}>
        <View style={styles.iconCircle}>
          <Ionicons name="person-outline" size={24} color={colors.primary} />
        </View>
        <Text style={styles.email}>{email}</Text>
        <Pressable onPress={changeAccount} hitSlop={10}>
          <Text style={styles.change}>{t('pin.changeAccount')}</Text>
        </Pressable>

        <Text style={styles.subtitle}>{t('pin.promptEnter', { length: pinLength })}</Text>
        <View style={styles.dots}>
          <PinDots length={pinLength} filled={pin.length} />
        </View>
        <Text style={styles.error}>{error ?? ' '}</Text>
      </View>

      <View style={styles.keypadWrap}>
        <PinKeypad
            onDigit={onDigit}
            onDelete={onDelete}
            onBiometric={biometricAvailable ? onBiometric : undefined}
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton title={t('common.continue')} onPress={() => onContinue()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  top: { flex: 1, alignItems: 'center', paddingTop: 24 },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: { fontSize: 18, fontWeight: '500', color: colors.text, marginTop: 12 },
  change: { fontSize: 18, color: colors.accent, marginTop: 12 },
  subtitle: { fontSize: 16, color: colors.textSecondary, marginTop: 32 },
  dots: { marginTop: 28 },
  error: { fontSize: 14, color: colors.error, marginTop: 20, minHeight: 20 },
  keypadWrap: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingVertical: 8,
  },
  footer: { padding: 16 },
});