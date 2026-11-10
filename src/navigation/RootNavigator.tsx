import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../views/screens/Login';
import MainTabs from './MainTabs';
import RegisterScreen from '../views/screens/Register';
import WelcomeScreen from '../views/screens/Welcome';
import CreatePinScreen from '../views/screens/CreatePin';
import EnterPinScreen from '../views/screens/EnterPin';
import { useAuthStore } from '../store/authStore';
import { useBootstrap } from './useBootstrap';
import type { RootStackParamList } from './types';
import PostScreen from '../views/screens/Post';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  useBootstrap();
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    if (status !== 'loading') {
      SplashScreen.hideAsync();
    }
  }, [status]);

  if (status === 'loading') return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {status === 'signedOut' && (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
      {status === 'needsPin' && (
        <Stack.Screen
          name="CreatePin"
          component={CreatePinScreen}
          options={{ gestureEnabled: false }}
        />
      )}
      {status === 'locked' && (
        <Stack.Screen
          name="EnterPin"
          component={EnterPinScreen}
          options={{ gestureEnabled: false }}
        />
      )}
      {status === 'unlocked' && (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="Post"
            component={PostScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}