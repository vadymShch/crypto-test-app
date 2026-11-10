import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';
import { usePost, usePostComments } from '../../../hooks/usePosts';

type PostRoute = RouteProp<RootStackParamList, 'Post'>;
type Nav = NativeStackNavigationProp<RootStackParamList, 'Post'>;

export function useScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<PostRoute>();
  const { postId } = route.params;

  const postQuery = usePost(postId);
  const commentsQuery = usePostComments(postId);

  const goBack = () => navigation.goBack();

  return {
    post: postQuery.data,
    postPending: postQuery.isPending,
    postError: postQuery.isError,
    refetchPost: postQuery.refetch,
    comments: commentsQuery.data,
    commentsPending: commentsQuery.isPending,
    commentsError: commentsQuery.isError,
    refetchComments: commentsQuery.refetch,
    goBack,
  };
}