import { gql, useQuery } from '@apollo/client'
import React from 'react'

export type PostInfo = {
  postcode: number;
  name: string;
  text: string;
  create_at: Date | string;
}

export const GetPostInfo = (): PostInfo[] => {
  const QUERY = gql`
    query{
      getPostInfo {
        postcode
        name
        text
        create_at
      }
    }
  `;

  const { data, loading, error } = useQuery(QUERY);

  if (loading) { return [{ postcode: -1, name: "読み込み中", text: "読み込み中", create_at: "読み込み中" }]}
  if (error) { return [{ postcode: -1, name: "エラーが発生しています。", text: "エラーが発生しています。", create_at: "エラーが発生しています。" }]}

  return data.getPostInfo;
}
