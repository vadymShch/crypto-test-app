import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
};

export default function PrimaryButton({ title, onPress, loading }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [styles.button, (pressed || loading) && styles.pressed]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.8 },
  text: { color: colors.white, fontSize: 18, fontWeight: '500' },
});