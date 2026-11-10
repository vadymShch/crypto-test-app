import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { useTranslation } from 'react-i18next';

export default function AdvisorCard() {
    const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t('home.testTask')}</Text>
      <Text style={styles.subtitle}>Lorem ipsum</Text>
      <Pressable style={styles.row}>
        <Text style={styles.link}>{t('home.goToCall')}</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.accent} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    gap: 6,
  },
  title: { fontSize: 16, fontWeight: '500', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textSecondary },
  row: { flexDirection: 'row', alignItems: 'center', gap: 56, marginTop: 16, alignSelf: 'flex-start' },
  link: { fontSize: 16, fontWeight: '500', color: colors.accent },
});