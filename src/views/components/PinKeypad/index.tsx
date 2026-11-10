import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';

type Props = {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onBiometric?: () => void;
};

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'bio', '0', 'del'];

export default function PinKeypad({ onDigit, onDelete, onBiometric }: Props) {
  return (
    <View style={styles.grid}>
      {KEYS.map((key, index) => {
        if (key === 'bio') {
          return onBiometric ? (
            <Pressable key={index} style={styles.cell} onPress={onBiometric}>
              <Ionicons name="scan-outline" size={30} color={colors.accent} />
            </Pressable>
          ) : (
            <View key={index} style={styles.cell} />
          );
        }
        if (key === 'del') {
          return (
            <Pressable key={index} style={styles.cell} onPress={onDelete}>
              <Ionicons name="backspace-outline" size={30} color={colors.text} />
            </Pressable>
          );
        }
        return (
          <Pressable
            key={index}
            style={({ pressed }) => [styles.cell, pressed && styles.cellPressed]}
            onPress={() => onDigit(key)}
          >
            <Text style={styles.digit}>{key}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    width: '33.33%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellPressed: { backgroundColor: colors.background },
  digit: { fontSize: 32, fontWeight: '700', color: colors.text },
});