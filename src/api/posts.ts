import { postsApi } from './postsClient';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function fetchLatestPosts() {
  const { data } = await postsApi.get<Post[]>('/posts', { params: { _limit: 3 } });
  return data;
}

export async function fetchPost(id: number) {
  const { data } = await postsApi.get<Post>(`/posts/${id}`);
  return data;
}

export type PostComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export async function fetchPostComments(postId: number) {
  const { data } = await postsApi.get<PostComment[]>(`/posts/${postId}/comments`);
  return data;
};

export async function fetchAllPosts() {
  const { data } = await postsApi.get<Post[]>('/posts');
  return data;
};