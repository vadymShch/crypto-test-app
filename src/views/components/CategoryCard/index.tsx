import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

type Props = {
  label: string;
  circles: [string, string, string];
};

export default function CategoryCard({ label, circles }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.circles}>
        <View style={[styles.circle, { backgroundColor: circles[0] }]} />
        <View style={[styles.circle, styles.center, { backgroundColor: circles[1] }]} />
        <View style={[styles.circle, { backgroundColor: circles[2] }]} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 136,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  circles: { flexDirection: 'row', alignItems: 'center' },
  circle: { width: 44, height: 44, borderRadius: 22 },
  center: { width: 48, height: 48, borderRadius: 24, marginHorizontal: -10, zIndex: 1 },
  label: { fontSize: 16, color: colors.textSecondary },
});