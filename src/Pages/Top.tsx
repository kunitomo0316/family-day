import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';
import { GetPostInfo, PostInfo } from '../Components/GetPostInfo';
import { INSERT_QUERY } from '../Components/InsertPostInfo';
import { useMutation } from '@apollo/client';
import { uploadImage } from '../api/uploadImage';
import { PostItem } from '../Components/PostItem';

function Top() {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<File | undefined>(
    undefined
  );
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);

  const useInsertPost = async () => {
    // fileNameはany型だが、ファイル名かnullが入る想定
    const fileName = selectedPhoto ? await uploadImage(selectedPhoto) : null;
    insertPost({ variables: { name: name, text: text, path: fileName } });
    // reloadするならこれいらなくね
    // setName('');
    // setText('');
    // setSelectedPhoto(undefined);
    // setIsPhotoSelected(false);
    window.location.reload();
    window.location.reload();
  };

  const [insertPost, { loading, error }] = useMutation(INSERT_QUERY);
  const postInfo: PostInfo[] = GetPostInfo();

  const handlePhotoSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      setSelectedPhoto(file);
      setIsPhotoSelected(true); // 写真が選択されたのでtrueに設定
    };
    input.click();
  };

  const handlePhotoClear = () => {
    setSelectedPhoto(undefined);
    setIsPhotoSelected(false); // 写真がクリアされたのでfalseに設定
  };

  return (
    <>
      <Accordion
        elevation={0}
        square
        sx={{ backgroundColor: 'rgb(29, 155, 240)', borderRadius: '0' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        >
          <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
            投稿
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loading && (
            <Typography sx={{ color: 'white' }}>投稿中・・・</Typography>
          )}
          {error && (
            <Typography sx={{ color: 'white' }}>
              エラーが発生しています。{error.message}
            </Typography>
          )}
          <TextField
            label="名前"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ backgroundColor: 'white', borderRadius: '8px' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <Box sx={{ height: 10 }} />
          <TextField
            label="内容"
            variant="outlined"
            size="small"
            multiline
            rows={3}
            fullWidth
            sx={{ backgroundColor: 'white', borderRadius: '8px' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setText(event.target.value)
            }
          />
          <Box sx={{ height: 10 }} />
          {!isPhotoSelected && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: 'lightgray' },
                }}
                onClick={handlePhotoSelect}
              >
                写真を選択
              </Button>
            </Box>
          )}
          {isPhotoSelected && selectedPhoto && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <CardMedia
                sx={{ width: '100px', height: '100px', objectFit: 'cover' }}
                component="img"
                image={URL.createObjectURL(selectedPhoto)}
              />
              <Button
                variant="outlined"
                sx={{
                  ml: 2,
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: 'lightgray' },
                }}
                onClick={handlePhotoClear}
              >
                取り消し
              </Button>
            </Box>
          )}
          <Box sx={{ height: 10 }} />
          <Button
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: 'white',
              '&:hover': { backgroundColor: 'lightgray' },
            }}
            onClick={useInsertPost}
          >
            <SendIcon sx={{ mb: 0.4, mr: 0.3 }} />
            投稿
          </Button>
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          {postInfo.map((v, idx) => (
            <PostItem key={idx} post={v} />
          ))}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
}

export default Top;
