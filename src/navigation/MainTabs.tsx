import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../views/screens/Home';
import PortfolioScreen from '../views/screens/Portfolio';
import SearchScreen from '../views/screens/Search';
import ProfileStack from './ProfileStack';
import { useAllPosts } from '../hooks/usePosts';
import { colors } from '../theme/colors';
import type { MainTabParamList } from './types';

type IconName = ComponentProps<typeof Ionicons>['name'];

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, { active: IconName; inactive: IconName }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Portfolio: { active: 'briefcase', inactive: 'briefcase-outline' },
  Search: { active: 'search', inactive: 'search-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

export default function MainTabs() {
  const { t } = useTranslation();

  // Підвантажуємо всі пости одразу після входу: кеш готовий для пошуку й офлайн
  useAllPosts();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: { fontSize: 11 },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? ICONS[route.name].active : ICONS[route.name].inactive}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t('tabs.home') }} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{ tabBarLabel: t('tabs.portfolio') }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: t('tabs.search') }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarLabel: t('tabs.profile') }} />
    </Tab.Navigator>
  );
}