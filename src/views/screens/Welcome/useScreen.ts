import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export function useScreen() {
  const navigation = useNavigation<Nav>();

  const goToRegister = () => navigation.navigate('Register');
  const goToLogin = () => navigation.navigate('Login');

  return { goToRegister, goToLogin };
}