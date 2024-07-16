import React from 'react';
import { Container, Grid, Box, Typography, TextField, Slider, Checkbox, FormControlLabel, Button, Card, CardContent, CardMedia } from '@mui/material';
import AllCars from '../carList/page';

const marks = [
  {
    value: 1000,
    label: '$1K',
  },
  {
    value: 100000,
    label: '$100K',
  },
];

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">RentRide.mn</Typography>
            <Button variant="contained">Add a Car</Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Typography variant="h6">Price</Typography>
              <Slider
                defaultValue={50000}
                step={1000}
                marks={marks}
                min={1000}
                max={100000}
                valueLabelDisplay="auto"
              />
              <Typography variant="h6">Location</Typography>
              <FormControlLabel control={<Checkbox />} label="All Location" />
              <FormControlLabel control={<Checkbox />} label="Ulaanbaatar" />
              <FormControlLabel control={<Checkbox />} label="Darkhan" />
              <FormControlLabel control={<Checkbox />} label="Erdenet" />
              <Typography variant="h6">Vehicle Type</Typography>
              <FormControlLabel control={<Checkbox />} label="All type" />
              <FormControlLabel control={<Checkbox />} label="Luxury" />
              <FormControlLabel control={<Checkbox />} label="Van" />
              <Typography variant="h6">Brand</Typography>
              <FormControlLabel control={<Checkbox />} label="All brand" />
              <FormControlLabel control={<Checkbox />} label="Toyoto" />
              <FormControlLabel control={<Checkbox />} label="Nissan" />
              <Typography variant="h6">With driver</Typography>
              <FormControlLabel control={<Checkbox />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
              <FormControlLabel control={<Checkbox />} label="All" />
              <Typography variant="h6">Delivery</Typography>
              <FormControlLabel control={<Checkbox />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
              <FormControlLabel control={<Checkbox />} label="All" />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Car Model" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField fullWidth label="Choose Vehicle Type" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField fullWidth label="From" variant="outlined" type="date" InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField fullWidth label="To" variant="outlined" type="date" InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Button fullWidth variant="contained">Search</Button>
                </Grid>
              </Grid>
            </Box>
            <Typography variant="h6">VIP Advertisement</Typography>
            <br/>
            <Grid container spacing={2}>
               <AllCars />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;