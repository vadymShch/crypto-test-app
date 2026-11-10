import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CategoryCard from '../../components/CategoryCard';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../../theme/colors';
import { useScreen } from './useScreen';
import { useTranslation } from 'react-i18next';

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const { goToRegister, goToLogin } = useScreen();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.grid}>
        <View style={styles.column}>
          <View style={styles.bitcoinCard}>
            <Ionicons name="logo-bitcoin" size={80} color={colors.white} />
          </View>
          <CategoryCard label="Lorem ipsum" circles={['#A5DDE6', '#5AA9F8', '#9497E0']} />
          <CategoryCard label="Lorem ipsum 3" circles={['#5B6EA8', '#98151B', '#06080B']} />
        </View>

        <View style={[styles.column, styles.columnOffset]}>
          <CategoryCard label="Lorem ipsum 2" circles={['#9BE2D2', '#FA8B36', '#9BE2D2']} />
          <CategoryCard label="Lorem ipsum 4" circles={['#F9E1A2', '#CC9755', '#EEF29A']} />
          <CategoryCard label="Lorem ipsum 5" circles={['#9AA9F0', '#FA8B36', '#8BD6C9']} />
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={goToLogin} hitSlop={10} style={styles.signInWrap}>
          <Text style={styles.signIn}>{t('welcome.signIn')}</Text>
        </Pressable>
        <PrimaryButton title={t('welcome.signUp')} onPress={goToRegister} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  grid: { flexDirection: 'row', gap: 16, paddingHorizontal: 16, paddingTop: 16 },
  column: { flex: 1, gap: 16 },
  columnOffset: { marginTop: 74 },
  bitcoinCard: {
    height: 136,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: { marginTop: 'auto', padding: 16, gap: 24 },
  signInWrap: { alignSelf: 'center' },
  signIn: { fontSize: 18, fontWeight: '500', color: colors.accent },
});