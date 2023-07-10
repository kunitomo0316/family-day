import React from 'react';
import { gql } from '@apollo/client';

export const INSERT_QUERY = gql`
  mutation insertPostInfo(
    $name: String!
    $text: String!
  ) {
    insertPostInfo(
      name: $name
      text: $text
    ){
      name
    }
  }
`;
