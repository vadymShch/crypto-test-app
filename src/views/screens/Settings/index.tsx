import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import SettingsRow from '../../components/SettingsRow';
import { colors } from '../../../theme/colors';
import { useScreen } from './useScreen';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { fullName, imageUri, onImageError, goBack, goToLanguage, onLogout } = useScreen();

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <Pressable onPress={goBack} style={styles.back} hitSlop={10}>
        <Ionicons name="chevron-back" size={28} color={colors.textSecondary} />
      </Pressable>

      <Text style={styles.title}>{t('settings.title')}</Text>

      <View style={styles.userCard}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatar} onError={onImageError} />
        ) : (
          <View style={styles.avatar} />
        )}
        <Text style={styles.userName}>{fullName}</Text>
      </View>

      <Text style={styles.section}>{t('settings.basic')}</Text>
      <SettingsRow icon="globe-outline" label={t('settings.language')} onPress={goToLanguage} />

      <Text style={styles.section}>{t('settings.other')}</Text>
      <SettingsRow icon="log-out-outline" label={t('settings.logout')} onPress={onLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 16 },
  back: { alignSelf: 'flex-start', paddingVertical: 12 },
  title: { fontSize: 28, fontWeight: '700', color: colors.text, marginTop: 8, marginBottom: 24 },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    height: 80,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.circle },
  userName: { fontSize: 18, color: colors.text },
  section: { fontSize: 16, color: colors.textSecondary, marginTop: 32, marginBottom: 12, marginLeft: 16 },
});