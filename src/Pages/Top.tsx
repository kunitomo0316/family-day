import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import yokohama from "../Photos/yokohama.jpg"
import inko from "../Photos/inko.jpg"
import React from 'react'

function Top() {

  const name1: string = "國友 翔"
  const naiyou1: string = "僕の飼っているアキクサインコです。名前はまだありません。"
  const name2: string = "デゴマ ライアン ジェイ"
  const naiyou2: string = "横浜の写真です。"

  return (
    <>
      <Accordion elevation={0} square sx={{ backgroundColor: 'rgb(29, 155, 240)', borderRadius: '0' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        >
          <Typography sx={{ color: "white", fontWeight: 'bold'}}>投稿</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField label="名前" variant="outlined" size='small' fullWidth sx={{ backgroundColor: 'white', borderRadius: '8px' }}/>
          <Box sx={{ height: 10 }} />
          <TextField label="内容" variant="outlined" size='small' multiline rows={3} fullWidth sx={{ backgroundColor: 'white', borderRadius: '8px' }}/>
          <Box sx={{ height: 10 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" sx={{ backgroundColor: 'white' }}><AddPhotoAlternateIcon sx={{mb: 0.4, mr: 0.3}}/>写真を選択</Button>
          </Box>
          <Box sx={{ height: 10 }} />
          <Button variant="outlined" fullWidth sx={{ backgroundColor: 'white' }}><SendIcon sx={{mb: 0.4, mr: 0.3}}/>投稿</Button>
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>

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
                {name1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {naiyou1}
              </Typography>
            </CardContent>
          </Card>
          <Box sx={{ height: 5 }} />

          <Box sx={{ height: 5 }} />
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
                {name2}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {naiyou2}
              </Typography>
            </CardContent>
          </Card>
          <Box sx={{ height: 5 }} />

        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  )
}

export default Top