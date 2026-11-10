import { View, Text, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../components/SearchInput';
import SearchResultCard from '../../components/SearchResultCard';
import { colors } from '../../../theme/colors';
import { useScreen } from './useScreen';

export default function SearchScreen() {
  const { t } = useTranslation();
  const { query, setQuery, results, isPending, isError, isOffline, refetch, openPost } =
    useScreen();

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <Text style={styles.title}>{t('search.title')}</Text>

      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder={t('search.placeholder')}
      />

      {isPending && !isOffline && <ActivityIndicator color={colors.accent} />}

      {(isError || isOffline) && (
        <View style={styles.centered}>
          <Text style={styles.error}>
            {isOffline ? t('search.offline') : t('search.error')}
          </Text>
          <Pressable onPress={() => refetch()}>
            <Text style={styles.retry}>{t('search.retry')}</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SearchResultCard id={item.id} title={item.title} onPress={() => openPost(item.id)} />
        )}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
            !isPending && !isError ? <Text style={styles.empty}>{t('search.empty')}</Text> : undefined
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 },
  title: { fontSize: 28, fontWeight: '700', color: colors.text, marginTop: 16, marginBottom: 16 },
  list: { paddingBottom: 16 },
  centered: { alignItems: 'center', gap: 8, marginVertical: 16 },
  error: { color: colors.error, fontSize: 16 },
  retry: { color: colors.accent, fontSize: 16, fontWeight: '500' },
  empty: { textAlign: 'center', color: colors.textSecondary, fontSize: 16, marginTop: 24 },
});