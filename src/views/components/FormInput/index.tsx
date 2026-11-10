import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';

type Props = TextInputProps & {
  label: string;
  error?: string;
  isPassword?: boolean;
};

export default function FormInput({ label, error, isPassword, ...rest }: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.box, !!error && styles.boxError]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={isPassword && hidden}
          {...rest}
        />
        {isPassword && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              color={colors.primary}
            />
          </Pressable>
        )}
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  label: { fontSize: 16, color: colors.textSecondary, marginBottom: 8, marginLeft: 8 },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  boxError: { borderColor: colors.error },
  input: { flex: 1, fontSize: 18, color: colors.text },
  error: { color: colors.error, fontSize: 12, marginTop: 4, marginLeft: 8 },
});