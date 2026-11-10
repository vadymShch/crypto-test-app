import { useState } from 'react';
import { useNavigation, type NavigationProp, type ParamListBase } from '@react-navigation/native';
import { signOut } from '../../../services/session';
import { useProfile } from '../../../hooks/useProfile';

export function useScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { fullName, image } = useProfile();
  const [imageFailed, setImageFailed] = useState(false);

  const imageUri = imageFailed ? null : image;

  const goBack = () => navigation.navigate('Home');
  const goToLanguage = () => navigation.navigate('Language');
  const onLogout = () => signOut();
  const onImageError = () => setImageFailed(true);

  return { fullName, imageUri, onImageError, goBack, goToLanguage, onLogout };
}