'use client'
import React, { useState } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';

const UploadPhoto = ({msg,setAvatar}) => {
  const [file, setFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    const res = await fetch('http://localhost:8080/api/v1/upload/pic', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setPhotoUrl(`http://localhost:8080/api/v1/upload/pic/${file.name}`);
      setAvatar(`http://localhost:8080/api/v1/upload/pic/${file.name}`); // 假设后端返回一个文件路径
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop={4}
      >
        <Typography variant="h4" component="h3" gutterBottom>
         {msg}
        </Typography>

        <Button variant="contained" component="label">
          Select Photo
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {file && (
          <Typography variant="body1" component="p" marginTop={2}>
            {file.name}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file}
          sx={{ marginTop: 2 }}
        >
          Upload
        </Button>

        {/* {photoUrl && (
          <Box marginTop={4}>
            <Typography variant="h6" component="h2">
              Processed Photo:
            </Typography>
            <img src={photoUrl} alt="Processed" style={{ maxWidth: '100%' }} />
          </Box>
        )} */}
      </Box>
    </Container>
  );
};

export default UploadPhoto;