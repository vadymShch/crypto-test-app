import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import SettingsRow from '../../components/SettingsRow';
import { colors } from '../../../theme/colors';
import { useScreen } from './useScreen';

export default function LanguageScreen() {
  const { t } = useTranslation();
  const { languages, current, goBack, selectLanguage } = useScreen();

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <Pressable onPress={goBack} style={styles.back} hitSlop={10}>
        <Ionicons name="chevron-back" size={28} color={colors.textSecondary} />
      </Pressable>

      <Text style={styles.title}>{t('language.title')}</Text>

      {languages.map((lang) => {
        const selected = lang.code === current;
        return (
          <SettingsRow
            key={lang.code}
            icon="globe-outline"
            label={lang.label}
            onPress={() => selectLanguage(lang.code)}
            right={
              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected && <Ionicons name="checkmark" size={20} color={colors.white} />}
              </View>
            }
          />
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 16 },
  back: { alignSelf: 'flex-start', paddingVertical: 12 },
  title: { fontSize: 28, fontWeight: '700', color: colors.text, marginTop: 8, marginBottom: 24 },
  radio: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { backgroundColor: colors.accent },
});