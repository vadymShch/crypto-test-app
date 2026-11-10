import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../views/screens/Settings';
import LanguageScreen from '../views/screens/Language';
import type { ProfileStackParamList } from './types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
    </Stack.Navigator>
  );
}