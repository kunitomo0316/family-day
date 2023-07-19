import { gql, useMutation } from '@apollo/client';

const CREATE_POST = gql`
  mutation createPost($userName: String!, $message: String!, $image: String) {
    createPost(userName: $userName, message: $message, image: $image) {
      postId
      userName
      message
      image
    }
  }
`;

export const useCreatePost = () => {
  return useMutation(CREATE_POST);
};
