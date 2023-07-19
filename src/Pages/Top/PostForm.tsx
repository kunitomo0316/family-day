import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Box,
  Button,
  CardMedia,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import { uploadImage } from '../../Api/uploadImage';
import { useCreatePost } from '../../Utils/Post/createPost';

type PostFormProps = {
  refetch: () => void;
};

export const PostForm = (props: PostFormProps) => {
  // 入力内容
  const [userName, setUserName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [selectedPhoto, setSelectedPhoto] = React.useState<File | undefined>(
    undefined
  );

  // データ更新処理
  const [createPost, { loading, error }] = useCreatePost();

  // 投稿ボタン押下時処理
  const useHandleClick = async () => {
    // fileNameはany型だが、ファイル名かnullが入る想定
    const fileName = selectedPhoto ? await uploadImage(selectedPhoto) : null;
    // 更新処理発動
    await createPost({
      variables: {
        userName: userName,
        message: message,
        image: fileName,
      },
    });
    // 入力内容の初期化
    setUserName('');
    setMessage('');
    setSelectedPhoto(undefined);
    // 一覧の再取得
    props.refetch();
  };

  // 画像選択処理
  const handlePhotoSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      setSelectedPhoto(file);
    };
    input.click();
  };

  // 画像選択解除処理
  const handlePhotoClear = () => {
    setSelectedPhoto(undefined);
  };

  return (
    <React.Fragment>
      <Accordion
        elevation={0}
        square
        sx={{ backgroundColor: 'rgb(29, 155, 240)', borderRadius: '0' }}
      >
        {/* アコーディオンタイトル */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        >
          <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
            投稿
          </Typography>
        </AccordionSummary>

        {/* アコーディオン詳細 */}
        <AccordionDetails>
          {loading && (
            <Typography sx={{ color: 'white' }}>投稿中・・・</Typography>
          )}
          {error && (
            <Typography sx={{ color: 'white' }}>
              エラーが発生しています。{error.message}
            </Typography>
          )}

          {/* 入力フィールド */}
          <TextField
            label="名前"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ backgroundColor: 'white', borderRadius: '8px' }}
            value={userName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserName(event.target.value)
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
            value={message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(event.target.value)
            }
          />
          <Box sx={{ height: 10 }} />

          {/* 画像選択フィールド */}
          {!selectedPhoto && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: 'lightgray' },
                }}
                onClick={handlePhotoSelect}
              >
                <ImageIcon sx={{ mb: 0.4, mr: 0.3 }} />
                写真を選択
              </Button>
            </Box>
          )}
          {/* 画像選択時 */}
          {selectedPhoto && (
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

          {/* 投稿ボタン */}
          <Button
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: 'white',
              '&:hover': { backgroundColor: 'lightgray' },
            }}
            onClick={useHandleClick}
            disabled={!(userName.match(/\S/) && message.match(/\S/))}
          >
            <SendIcon sx={{ mb: 0.4, mr: 0.3 }} />
            投稿
          </Button>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};
