import { gql } from '@apollo/client';

export const INSERT_QUERY = gql`
  mutation insertPostInfo($name: String!, $text: String!, $path: String) {
    insertPostInfo(name: $name, text: $text, path: $path) {
      name
    }
  }
`;
