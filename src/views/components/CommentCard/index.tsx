import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

type Props = {
  name: string;
  email: string;
  body: string;
};

export default function CommentCard({ name, email, body }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 6,
  },
  name: { fontSize: 20, color: colors.text },
  email: { fontSize: 16, fontWeight: '500', color: colors.text },
  body: { fontSize: 16, lineHeight: 24, color: colors.text, marginTop: 8 },
});