import { View, Text, Pressable, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AdvisorCard from '../../components/AdvisorCard';
import StepCard from '../../components/StepCard';
import PostCard from '../../components/PostCard';
import { colors } from '../../../theme/colors';
import { useScreen } from './useScreen';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { fullName, posts, isPending, isError, isOffline, refetch, openPost } = useScreen();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.header, { paddingTop: insets.top + 48 }]}>
        <Text style={styles.headerLabel}>{t('home.yourName')}</Text>
        <Text style={styles.headerName}>{fullName}</Text>
      </View>

      <View style={styles.padded}>
        <AdvisorCard />
      </View>

      <Text style={styles.sectionTitle}>{t('home.beforeYouStart')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.steps}
      >
        <StepCard title={t('home.linkBank')} steps={2} backgroundColor={colors.stepGray} />
        <StepCard title={t('home.addWallet')} steps={3} backgroundColor={colors.stepPink} />
      </ScrollView>

      <Text style={styles.sectionTitle}>{t('home.posts')}</Text>
      <View style={styles.padded}>
        {isPending && !isOffline && <ActivityIndicator color={colors.accent} />}

    {(isError || isOffline) && (
      <View style={styles.errorBox}>
        <Text style={styles.error}>
          {isOffline ? t('home.noInternet') : t('home.loadError')}
        </Text>
        <Pressable onPress={() => refetch()}>
          <Text style={styles.retry}>{t('common.retry')}</Text>
        </Pressable>
      </View>
    )}

        {posts?.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            onPress={() => openPost(post.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 24 },
  header: {
    backgroundColor: colors.headerBg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 56,
    alignItems: 'center',
  },
  headerLabel: { fontSize: 14, color: 'rgba(255,255,255,0.85)' },
  headerName: { fontSize: 28, fontWeight: '700', color: colors.white, marginTop: 8 },
  padded: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 16,
    marginTop: 32,
    marginBottom: 12,
  },
  steps: { paddingHorizontal: 16, gap: 16 },
  errorBox: { alignItems: 'center', gap: 8, marginVertical: 16 },
  error: { color: colors.error, fontSize: 16 },
  retry: { color: colors.accent, fontSize: 16, fontWeight: '500' },
});