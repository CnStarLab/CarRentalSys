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
import { DateRangePicker } from 'rsuite';

export default function RentCar() {
    const [dateRange, setDateRange]:any = React.useState([null, null]);
    const [modalMessage, setModalMessage] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      console.log(dateRange)
    
      // formData 2 json
      const formData = {
        carId: Number(data.get('carId')),
        username: "111",
        startTime: dateRange[0], 
        endTime: dateRange[1], 
      };
      console.log(JSON.stringify(formData));

      try {
        const response = await fetch('http://localhost:8080/api/v1/service/bookCar', {
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

    const handleDateRange = (value) =>{
      if (value && value.length === 2) {
        const [startDate, endDate] = value;
        const startISOString = startDate.toISOString();
        const endISOString = endDate.toISOString();
        // Set the date range using the ISO strings
        console.log(startISOString,endISOString)
        setDateRange([startISOString, endISOString]);
      } else {
        // Reset the date range
        setDateRange(null, null);
      }
    }

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
          Rent This Car.
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="carId"
                label="carId"
                name="carId"
                type='number'
                autoComplete="NaN"
              />
            </Grid>

            <Grid item xs={12}>
              <DateRangePicker 
              size='lg'
              onChange={(value) => handleDateRange(value)}
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