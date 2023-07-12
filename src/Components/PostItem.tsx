import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import React from 'react';
import { PostInfo } from './GetPostInfo';
import { endPoint } from '../common/const/endPoint';

export const PostItem = (props: { post: PostInfo }) => {
  const post = props.post;
  const imageUrl = post.photopath
    ? `${endPoint.images}/${post.photopath}`
    : undefined;

  return (
    <React.Fragment key={post.postcode}>
      <Box sx={{ height: 5 }} />
      <Card sx={{ borderRadius: '8px' }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            sx={{ width: '100%', height: 'auto' }}
            component="img"
            image={imageUrl}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.text}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ height: 5 }} />
    </React.Fragment>
  );
};
