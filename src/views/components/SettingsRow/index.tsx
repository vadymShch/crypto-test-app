import type { ComponentProps, ReactNode } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';

type IconName = ComponentProps<typeof Ionicons>['name'];

type Props = {
  icon: IconName;
  label: string;
  onPress: () => void;
  right?: ReactNode;
};

export default function SettingsRow({ icon, label, onPress, right }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={24} color={colors.accent} />
      <Text style={styles.label}>{label}</Text>
      {right ?? <Ionicons name="chevron-forward" size={22} color={colors.placeholder} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    marginBottom: 12,
  },
  pressed: { opacity: 0.8 },
  label: { flex: 1, fontSize: 18, color: colors.text },
});