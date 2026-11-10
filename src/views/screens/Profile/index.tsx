import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { useScreen } from './useScreen';

export default function ProfileScreen() {
  const { onLogout } = useScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Pressable onPress={onLogout}>
        <Text style={styles.logout}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: colors.background },
  text: { fontSize: 20, color: colors.textSecondary },
  logout: { fontSize: 18, color: colors.accent },
});