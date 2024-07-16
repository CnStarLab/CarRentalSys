import React from 'react';
import { Container, Grid, Box, Typography, TextField, Slider, Checkbox, FormControlLabel, Button, Card, CardContent, CardMedia, Stack, Radio, ToggleButtonGroup, ToggleButton, RadioGroup } from '@mui/material';
import AllCars from '../carList/page';

const marks = [
  {
    value: 50,
    label: '$50',
  },
  {
    value: 500,
    label: '$500',
  },
];

export default function BroserPage() {
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
                defaultValue={100}
                step={20}
                marks={marks}
                min={50}
                max={500}
                valueLabelDisplay="auto"
              />
              <Typography variant="h6">Location</Typography>
              <Stack direction="column" spacing={1}>
                <FormControlLabel control={<Checkbox />} label="All Location" />
                <FormControlLabel control={<Checkbox />} label="Ulaanbaatar" />
                <FormControlLabel control={<Checkbox />} label="Darkhan" />
                <FormControlLabel control={<Checkbox />} label="Erdenet" />
                <FormControlLabel control={<Checkbox />} label="...." />
              </Stack>

              <Typography variant="h6">Vehicle Type</Typography>
              <Stack direction="column" spacing={1}>
                <FormControlLabel control={<Checkbox />} label="All type" />
                <FormControlLabel control={<Checkbox />} label="Luxury" />
                <FormControlLabel control={<Checkbox />} label="Van" />
              </Stack>

              <Typography variant="h6">Brand</Typography>
              <Stack direction="column" spacing={1}>
                <FormControlLabel control={<Checkbox />} label="All brand" />
                <FormControlLabel control={<Checkbox />} label="Toyoto" />
                <FormControlLabel control={<Checkbox />} label="Nissan" />
              </Stack>
              <Typography variant="h6">With driver</Typography>
              <RadioGroup row>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="all" control={<Radio />} label="All" />
              </RadioGroup>

              <Typography variant="h6">Delivery</Typography>
              <RadioGroup row>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="all" control={<Radio />} label="All" />
              </RadioGroup>
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
