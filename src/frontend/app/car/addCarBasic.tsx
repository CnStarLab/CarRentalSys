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
import Modal from './alert';
import Logo from '../components/Logo';
import { useAuth } from '../hook/AuthContext';
import { MenuItem } from '@mui/material';

export default function AddCarBasic({handleNext,setCurrCarInfo}) {
    const [modalMessage, setModalMessage] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const {userId, username} = useAuth()
    
    const boolChoice = [
      {
        value: true,
        label: "Yes",
      },
      {
        value: false,
        label: "No",
      },
    ];

    const carType = [
      {
        value: "luxury",
        label: "luxury"
      },
      {
        value: "van",
        label: "van"
      },
      {
        value: "economical",
        label: "economical"
      }
    ];

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
    
      // formData 2 json
      const formData = {
        ownerId: parseInt(`${userId}`, 10),
        brand: data.get('brand'),
        model: data.get('model'),
        year: parseInt(data.get('year'), 10), 
        price: parseFloat(data.get('price')),
        numSeats:parseInt(data.get('numSeats'), 10), 
        basicInfo: data.get('basicInfo'),
        featureInfo: data.get('featureInfo'),
        location: data.get('location'),
        supportDriver: JSON.parse(data.get('supportDriver').toLowerCase()),
        supportDelivery:JSON.parse(data.get('supportDelivery').toLowerCase()),
        carType: data.get('carType'),
        available: false,
      };
    
      try {
        const response = await fetch('http://localhost:8080/api/v1/cars/info/createCarBasic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        // parse response 2 json
        const result = await response.json();
        setCurrCarInfo(result)
  
        if (!response.ok) {
          console.log("[AddCarBasic->handleSubmit->response.body]: ",response.body)
          throw new Error(`Register error! INFO: ${result.error}`);
        }
        
        console.log("[AddCarBasic->handleSubmit->result]: ", result)
        
        setModalMessage(result.message || 'Success!');
        
        
      } catch (error) {
        setModalMessage(`Error: ${error.message}`);
      } finally {
        setIsModalOpen(true);
      }
    };
  
    const closeModal = () => {
      handleNext()
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
                label="Price per day."
                id="price"
                autoComplete="NaN"
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="numSeats"
                label="Seats of your cars.(include driver seats)"
                id="numSeats"
                autoComplete="NaN"
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="location"
                label="Where your car offer to?"
                id="location"
                autoComplete="NaN"
                type='text'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="basicInfo"
                label="Intro basic info for your car."
                id="basicInfo"
                autoComplete="NaN"
                type='text'
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="featureInfo"
                label="Intro feature info for your car."
                id="featureInfo"
                autoComplete="NaN"
                type='text'
                multiline
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-select-currency"
                name="supportDriver"
                select
                label="Support a driver?"
                fullWidth
                defaultValue='false'
                helperText="Please choose"
              >
                {boolChoice.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-select-currency"
                name="supportDelivery"
                select
                label="Do you support delivery?"
                defaultValue="false"
                helperText="Please choose"
                fullWidth
              >
                {boolChoice.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-select-currency"
                name="carType"
                select
                label="Which Type of your car?"
                fullWidth
                defaultValue="economical"
                helperText="Please choose"
              >
                {carType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
            Register Basic Info.
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