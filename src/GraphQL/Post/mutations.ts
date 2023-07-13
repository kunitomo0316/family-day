import { gql } from '@apollo/client';

export const INSERT_POST = gql`
  mutation insertPost($userName: String!, $message: String!, $image: String) {
    insertPost(userName: $userName, message: $message, image: $image) {
      postId
      userName
      message
      image
    }
  }
`;
