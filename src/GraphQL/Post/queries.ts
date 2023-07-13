import { gql } from "@apollo/client";

export const GET_POST = gql`
  query {
    getPost {
      postId
      userName
      message
      image
      createAt
    }
  }
`;