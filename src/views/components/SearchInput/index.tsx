import { View, TextInput, StyleSheet, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';

export default function SearchInput(props: TextInputProps) {
  return (
    <View style={styles.box}>
      <Ionicons name="search-outline" size={24} color={colors.textSecondary} />
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    marginBottom: 16,
  },
  input: { flex: 1, fontSize: 18, color: colors.text },
});