import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react'
import { GetPostInfo, PostInfo } from '../Components/GetPostInfo';
import { INSERT_QUERY } from '../Components/InsertPostInfo';
import { useMutation } from '@apollo/client';

function Top() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | undefined>(undefined);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);

  const useInsertPost = () => {
    insertPost({ variables: { name: name, text: text } })
    setName("");
    setText("");
    setSelectedPhoto(undefined);
    setIsPhotoSelected(false);
    window.location.reload();
    window.location.reload();
  }

  const [insertPost, { loading, error }] = useMutation(INSERT_QUERY);

  const yokohama = require('../Photos/yokohama.jpg');
  const inko = require('../Photos/inko.jpg');
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
      <Accordion elevation={0} square sx={{ backgroundColor: 'rgb(29, 155, 240)', borderRadius: '0' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        >
          <Typography sx={{ color: "white", fontWeight: 'bold' }}>投稿</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loading && <Typography sx={{ color: "white" }}>投稿中・・・</Typography>}
          {error && <Typography sx={{ color: "white" }}>エラーが発生しています。{error.message}</Typography>}
          <TextField
            label="名前"
            variant="outlined"
            size='small'
            fullWidth
            sx={{ backgroundColor: 'white', borderRadius: '8px' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          />
          <Box sx={{ height: 10 }} />
          <TextField
            label="内容"
            variant="outlined"
            size='small'
            multiline
            rows={3}
            fullWidth
            sx={{ backgroundColor: 'white', borderRadius: '8px' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)}
          />
          <Box sx={{ height: 10 }} />
          {!isPhotoSelected && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: 'lightgray' } }} onClick={handlePhotoSelect}>
                写真を選択
              </Button>
            </Box>
          )}
          {isPhotoSelected && selectedPhoto && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <CardMedia
                sx={{ width: '100px', height: '100px', objectFit: 'cover' }}
                component="img"
                image={URL.createObjectURL(selectedPhoto)}
              />
              <Button variant="outlined" sx={{ ml: 2, backgroundColor: 'white', '&:hover': { backgroundColor: 'lightgray' } }} onClick={handlePhotoClear}>
                取り消し
              </Button>
            </Box>
          )}
          <Box sx={{ height: 10 }} />
          <Button variant="outlined" fullWidth sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: 'lightgray' }}} onClick={useInsertPost}>
            <SendIcon sx={{ mb: 0.4, mr: 0.3 }} />
            投稿
          </Button>
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>

            {/* <Box sx={{ height: 5 }} />
            <Card sx={{ borderRadius: '8px' }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  sx={{ width: '100%', height: 'auto' }}
                  component="img"
                  image={inko}
                />
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  國友 翔
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  僕が飼っているアキクサインコです。
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ height: 5 }} /> */}

          {
              postInfo.map(v => {
                return (
                  <React.Fragment key={v.postcode}>
                    <Box sx={{ height: 5 }} />
                    <Card sx={{ borderRadius: '8px' }}>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          sx={{ width: '100%', height: 'auto' }}
                          component="img"
                          image={yokohama}
                        />
                      </Box>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {v.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {v.text}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Box sx={{ height: 5 }} />
                  </React.Fragment>
                )
              })
            }
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  )
}

export default Top
