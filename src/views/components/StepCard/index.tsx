import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  steps: number;
  backgroundColor: string;
  onPress?: () => void;
};

export default function StepCard({ title, steps, backgroundColor, onPress }: Props) {
    const { t } = useTranslation();

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor }]}>
      <View style={styles.top}>
        <View style={styles.iconCircle}>
          <Ionicons name="link-outline" size={24} color={colors.white} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.steps}>{t('home.steps', { n: steps })}</Text>
        <Ionicons name="arrow-forward" size={24} color={colors.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 232,
    height: 152,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, fontSize: 16, color: colors.white },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  steps: { fontSize: 16, color: colors.white },
});