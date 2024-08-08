'use client'
import React, { useState } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';

interface UploadPhotoProps {
  msg: string;
  setAvatar: (urls: string[]) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ msg, setAvatar }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('photo', file);

      const res = await fetch('http://localhost:8080/api/v1/upload/pic', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const photoUrl = `http://localhost:8080/api/v1/upload/pic/${file.name}`;
        return photoUrl;
      } else {
        return null;
      }
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    const filteredUrls = uploadedUrls.filter((url): url is string => url !== null);

    setAvatar(filteredUrls);
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
          <input type="file" multiple hidden onChange={handleFileChange} />
        </Button>

        <Button onClick={handleUpload}>Upload</Button>
      </Box>
    </Container>
  );
};

export default UploadPhoto;
