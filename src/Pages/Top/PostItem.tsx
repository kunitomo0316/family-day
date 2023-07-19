import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import React from 'react';
import { PostType } from '../../Common/Types/Post';
import { BACKEND_URL } from '../../Common/Constants/backendUrl';

type PostItemProps = {
  post: PostType;
};

export const PostItem = (props: PostItemProps) => {
  const post = props.post;
  // 画像リンク取得
  const imageUrl = post.image
    ? `${BACKEND_URL.FETCH_IMAGE}/${post.image}`
    : undefined;

  return (
    <React.Fragment key={post.postId}>
      <Box sx={{ height: 5 }} />
      <Card sx={{ borderRadius: '8px' }}>
        {/* 画像領域 */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            sx={{ width: '100%', height: 'auto' }}
            component="img"
            image={imageUrl}
          />
        </Box>

        {/* その他の情報 */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.message}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ height: 5 }} />
    </React.Fragment>
  );
};
