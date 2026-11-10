import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { useTranslation } from 'react-i18next';

export default function PortfolioScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('tabs.portfolio')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  text: { fontSize: 20, color: colors.textSecondary },
});