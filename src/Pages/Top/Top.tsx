import React from 'react';
import { PostItem } from './PostItem';
import { PostForm } from './PostForm';
import { Box } from '@mui/material';
import { useGetPosts } from '../../Utils/Post/getPosts';

export const Top = () => {
  // 投稿一覧
  const { posts, refetch } = useGetPosts(50);

  return (
    <React.Fragment>
      <PostForm refetch={refetch} />
      <Box sx={{ mx: '5%' }}>
        {posts.map((post, i) => (
          <PostItem key={`post-item-${i}`} post={post} />
        ))}
      </Box>
    </React.Fragment>
  );
};
