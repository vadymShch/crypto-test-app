import { Controller } from 'react-hook-form';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../../theme/colors';
import { useScreen } from './useScreen';
import { useTranslation } from 'react-i18next';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { control, errors, rules, onSubmit, goBack } = useScreen();

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable onPress={goBack} style={styles.back} hitSlop={10}>
          <Ionicons name="chevron-back" size={28} color={colors.text} />
        </Pressable>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-add-outline" size={28} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.title}>{t('register.title')}</Text>
              <Text style={styles.subtitle}>{t('register.subtitle')}</Text>
            </View>
          </View>

          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.form}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Controller
              control={control}
              name="name"
              rules={rules.name}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormInput
                  label={t('register.name')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                  autoCapitalize="words"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={rules.email}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormInput
                  label={t('register.email')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={rules.password}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormInput
                  label={t('register.password')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  autoCapitalize="none"
                  isPassword
                />
              )}
            />
          </ScrollView>

          <View style={styles.footer}>
            <PrimaryButton title={t('common.continue')} onPress={() => onSubmit()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: colors.background },
  back: { paddingHorizontal: 16, paddingVertical: 12, alignSelf: 'flex-start' },
  card: {
    flex: 1,
    marginTop: 60,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 20, fontWeight: '500', color: colors.text },
  subtitle: { fontSize: 18, color: colors.textSecondary },
  form: { padding: 24 },
  footer: { padding: 24 },
});