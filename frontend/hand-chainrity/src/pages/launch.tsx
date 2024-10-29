import * as React from 'react';
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material/styles';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import AppAppBar from '../component/AppAppBar';
import getBlogTheme from '../theme/getBlogTheme';
export default function FundraisingPage() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [goal, setGoal] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const blogTheme = createTheme(getBlogTheme(mode));
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !description || !goal) {
      setErrorMessage('请填写所有必填信息');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('goal', goal);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8888/api/fundraising', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('筹款发起成功！');
    } catch (error) {
      console.error(error);
      setErrorMessage('筹款发起失败，请重试');
    }
  };

  return (
    <ThemeProvider theme={blogTheme }>
      <CssBaseline />
      <AppAppBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'background.default',
          padding: 4,
        }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit}
          spacing={3}
          sx={{
            width: '100%',
            maxWidth: 600,
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            发起筹款
          </Typography>

          <FormControl fullWidth>
            <TextField
              label="筹款标题"
              variant="outlined"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="筹款描述"
              variant="outlined"
              required
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="goal">目标金额</InputLabel>
            <OutlinedInput
              id="goal"
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              startAdornment={<InputAdornment position="start">¥</InputAdornment>}
              label="目标金额"
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
            >
              上传图片
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
              />
            </Button>
            {image && <FormHelperText>已选择图片: {image.name}</FormHelperText>}
          </FormControl>

          {errorMessage && (
            <Typography color="error" align="center">
              {errorMessage}
            </Typography>
          )}

          <Button type="submit" variant="contained" size="large">
            发起筹款
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
