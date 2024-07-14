'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from '../login/alert';
import Logo from '../components/Logo';

export default function AddCars() {
    const [modalMessage, setModalMessage] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
    
      // formData 2 json
      const formData = {
        brand: data.get('brand'),
        model: data.get('model'),
        year: parseInt(data.get('year'), 10), 
        price: parseFloat(data.get('price')), 
        available: false,
      };
    
      try {
        const response = await fetch('http://localhost:8080/api/v1/cars/addCar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        // parse response 2 json
        const result = await response.json();
  
        if (!response.ok) {
          console.log(response.body)
          throw new Error(`Register error! INFO: ${result.error}`);
        }
        
        console.log(result)
        setModalMessage(result.message || 'Success!');
      } catch (error) {
        setModalMessage(`Error: ${error.message}`);
      } finally {
        setIsModalOpen(true);
      }
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <Container component="main" maxWidth="xs">
      <Logo/>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.6)', // 半透明白色背景
          backdropFilter: 'blur(10px)', // 磨砂玻璃效果
          borderRadius: '15px', // 圆角
          padding: '20px', // 内边距
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 阴影效果
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <DirectionsCarFilledOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Cars
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="brand"
                label="Car Brand"
                name="brand"
                type='text'
                autoComplete="NaN"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="model"
                label="Car Model"
                name="model"
                autoComplete="NaN"
                type='text'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="year"
                label="Buy Year"
                id="year"
                autoComplete="NaN"
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="price"
                label="price"
                id="price"
                autoComplete="NaN"
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I know and follow the rules of XXXXX"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register This Car.
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/allCar" variant="body2">
                Want More Info? Check All Cars
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Modal open={isModalOpen} message={modalMessage} onClose={closeModal} />
    </Container>
  );
}