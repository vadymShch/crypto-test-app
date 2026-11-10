import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PinDots from '../../components/PinDots';
import PinKeypad from '../../components/PinKeypad';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../../theme/colors';
import { useScreen } from './useScreen';
import { useTranslation } from 'react-i18next';


export default function CreatePinScreen() {
  const { t } = useTranslation();
  const { title, subtitle, pin, pinLength, error, onDigit, onDelete, onContinue, goBack } =
    useScreen();

  return (
    <SafeAreaView style={styles.screen}>
      <Pressable onPress={goBack} style={styles.back} hitSlop={10}>
        <Ionicons name="chevron-back" size={28} color={colors.textSecondary} />
      </Pressable>

      <View style={styles.top}>
        <View style={styles.iconCircle}>
          <Ionicons name="phone-portrait-outline" size={24} color={colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.dots}>
          <PinDots length={pinLength} filled={pin.length} />
        </View>
        <Text style={styles.error}>{error ?? ' '}</Text>
      </View>

      <View style={styles.keypadWrap}>
        <PinKeypad onDigit={onDigit} onDelete={onDelete} />
      </View>

      <View style={styles.footer}>
        <PrimaryButton title={t('common.continue')} onPress={() => onContinue()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  back: { paddingHorizontal: 16, paddingVertical: 12, alignSelf: 'flex-start' },
  top: { flex: 1, alignItems: 'center', marginTop: -20 },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 18, fontWeight: '500', color: colors.text, marginTop: 12 },
  subtitle: { fontSize: 16, color: colors.textSecondary, marginTop: 48 },
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