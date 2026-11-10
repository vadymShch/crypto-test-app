import { View, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

type Props = {
  length: number;
  filled: number;
};

export default function PinDots({ length, filled }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length }).map((_, i) => (
        <View key={i} style={[styles.dot, i < filled && styles.dotFilled]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.dotEmpty,
  },
  dotFilled: { backgroundColor: colors.accent },
});