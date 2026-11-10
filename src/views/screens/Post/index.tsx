import { View, Text, Image, Pressable, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CommentCard from '../../components/CommentCard';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../../theme/colors';
import { useScreen } from './useScreen';
import { useTranslation } from 'react-i18next';

export default function PostScreen() {
    const { t } = useTranslation();

  const {
    post,
    postPending,
    postError,
    refetchPost,
    comments,
    commentsPending,
    commentsError,
    refetchComments,
    goBack,
  } = useScreen();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SafeAreaView edges={['top']} style={styles.hero}>
          <Pressable onPress={goBack} style={styles.back} hitSlop={10}>
            <Ionicons name="chevron-back" size={28} color={colors.textSecondary} />
          </Pressable>

          {!!post && <Text style={styles.title}>{post.title}</Text>}

          <Image
            source={require('../../../../assets/post-illustration.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </SafeAreaView>

        <Text style={styles.sectionTitle}>{t('post.about')}</Text>
        <View style={styles.aboutCard}>
          {postPending && <ActivityIndicator color={colors.accent} />}
          {postError && (
            <Pressable onPress={() => refetchPost()}>
              <Text style={styles.retry}>{t('post.postError')}</Text>
            </Pressable>
          )}
          {!!post && <Text style={styles.aboutText}>{post.body}</Text>}
        </View>

        <Text style={styles.sectionTitle}>{t('post.comments')}</Text>
        {commentsPending && <ActivityIndicator color={colors.accent} />}
        {commentsError && (
          <Pressable onPress={() => refetchComments()} style={styles.centered}>
            <Text style={styles.retry}>{t('post.commentsError')}</Text>
          </Pressable>
        )}
        {comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            name={comment.name}
            email={comment.email}
            body={comment.body}
          />
        ))}
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <PrimaryButton title={t('common.back')} onPress={goBack} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 16 },
  hero: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 24,
    alignItems: 'center',
  },
  back: { alignSelf: 'flex-start', padding: 16 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
  },
  illustration: { width: '90%', height: 220, marginTop: 24 },
  sectionTitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 16,
    marginTop: 28,
    marginBottom: 12,
  },
  aboutCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
  },
  aboutText: { fontSize: 16, lineHeight: 28, color: colors.text },
  centered: { alignItems: 'center', marginVertical: 12 },
  retry: { color: colors.accent, fontSize: 16, fontWeight: '500' },
  footer: { backgroundColor: colors.white, paddingHorizontal: 16, paddingTop: 12 },
});