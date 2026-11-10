import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

type Props = {
  title: string;
  body: string;
  onPress: () => void;
};

export default function PostCard({ title, body, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.body} numberOfLines={3}>
        {body}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    gap: 6,
  },
  pressed: { opacity: 0.8 },
  title: { fontSize: 20, color: colors.text },
  body: { fontSize: 16, color: '#4B4F58' },
});