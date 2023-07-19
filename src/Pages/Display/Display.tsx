import React from 'react';
import { useGetPosts } from '../../Utils/Post/getPosts';
import { Box, Grid } from '@mui/material';
import { PostItem } from '../Top/PostItem';

function Display() {
  // 投稿一覧
  const { posts } = useGetPosts(120);

  return (
    <React.Fragment>
      <Box sx={{ mx: '5%' }}>
        <Grid container spacing={1}>
          {posts.map((post, i) => (
            <Grid key={`post-item-${i}`} item xs={12} sm={6} md={4}>
              <PostItem post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default Display;
