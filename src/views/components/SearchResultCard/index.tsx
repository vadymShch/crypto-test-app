import { Pressable, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../theme/colors';

type Props = {
  id: number;
  title: string;
  onPress: () => void;
};

export default function SearchResultCard({ id, title, onPress }: Props) {
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Text style={styles.id}>{t('search.id', { id })}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {t('search.name', { name: title })}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 8,
    gap: 6,
  },
  pressed: { opacity: 0.8 },
  id: { fontSize: 18, color: colors.text },
  name: { fontSize: 16, color: colors.textSecondary },
});