import { ApolloQueryResult, gql, useQuery } from '@apollo/client';
import { PostType } from '../../Common/Types/Post';

const GET_POSTS = gql`
  query getPosts($take: Float!) {
    getPosts(take: $take) {
      postId
      userName
      message
      image
      createAt
    }
  }
`;

type PostRefetchType = {
  posts: PostType[];
  refetch: (
    variables?:
      | Partial<{
          take: number;
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>>;
};

export const useGetPosts = (take: number): PostRefetchType => {
  // データの取得
  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: {
      take: take,
    },
  });

  if (loading) {
    return { posts: [], refetch: refetch };
  }

  if (error) {
    console.log(error);
    return { posts: [], refetch: refetch };
  }

  return {
    posts: data.getPosts.map((post: PostType) => {
      return {
        postId: post.postId,
        userName: post.userName,
        message: post.message,
        image: post.image,
      };
    }),
    refetch: refetch,
  };
};
