import { useQuery } from '@apollo/client';
import React from 'react';
import { PostItem } from './PostItem';
import { PostForm } from './PostForm';
import { PostType } from '../../Common/Types/Post';
import { GET_POST } from '../../GraphQL/Post/queries';

export const Top = () => {
  // 投稿一覧
  const [posts, setPosts] = React.useState<PostType[]>([]);
  // データの取得
  const { data: responseData, refetch } = useQuery(GET_POST);

  // 一覧の再取得
  const refetchPosts = () => {
    refetch();
  };

  // データが取得されたら、useStateを使ってデータを更新
  React.useEffect(() => {
    if (responseData) {
      setPosts(
        responseData.getPost.map((post: PostType) => {
          return {
            postId: post.postId,
            userName: post.userName,
            message: post.message,
            image: post.image,
          };
        })
      );
    }
  }, [responseData]);

  return (
    <React.Fragment>
      <PostForm refetchPosts={refetchPosts} />
      {posts.map((post, i) => (
        <PostItem key={`post-item-${i}`} post={post} />
      ))}
    </React.Fragment>
  );
};
