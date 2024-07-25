'use client'
import React from 'react';
import { Container, Grid, Box, Typography, TextField, Slider, FormControlLabel, Button, Card, CardContent, CardMedia, Stack, Radio, ToggleButtonGroup, ToggleButton, RadioGroup } from '@mui/material';
import AllCars from '../carList/page';
import Link from 'next/link';

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
  const [choiceConds, setChoiceConds] = React.useState({
    minPrice: 50,
    maxPrice: 500,
    brand: null,
    location: null,
    carType: null,
    supportDriver: null,
    supportDelivery: null,
    startTime: null,
    endTime: null
  });

  const [searchParam, setSearchParam] = React.useState('');

  const handleCondsChange = (e) => {
    const { name, value } = e.target;
    console.log("[BrowserPage->handleCondsChange:name,value]:", name, value);
    
    setChoiceConds((prevChoiceConds) => ({
      ...prevChoiceConds,
      [name]: value
    }));
  };

  React.useEffect(() => {
    const param = toQueryString(choiceConds);
    setSearchParam(param);
  }, [choiceConds]);

  const toQueryString = (obj) => {
    return Object.entries(obj)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">RentRide.mn</Typography>
            <Link href="/car"><Button variant="contained">ADD A CAR</Button></Link>
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
                onChange={(e, max) => handleCondsChange({ target: { name: 'maxPrice', value: max } })}
              />
              <Typography variant="h6">Location</Typography>
              <RadioGroup row name="location" onChange={handleCondsChange}>
                <FormControlLabel control={<Radio />} value="" label="All Location" />
                <FormControlLabel control={<Radio />} value="UB" label="Ulaanbaatar" />
                <FormControlLabel control={<Radio />} value="Darkhan" label="Darkhan" />
                <FormControlLabel control={<Radio />} value="Erdenet" label="Erdenet" />
                <FormControlLabel control={<Radio />} value="..." label="...." />
              </RadioGroup>

              <Typography variant="h6">Vehicle Type</Typography>
              <RadioGroup row name="carType" onChange={handleCondsChange}>
                <FormControlLabel control={<Radio />} value="" label="All type" />
                <FormControlLabel control={<Radio />} value="luxury" label="Luxury" />
                <FormControlLabel control={<Radio />} value="van" label="Van" />
              </RadioGroup>

              <Typography variant="h6">Brand</Typography>
              <RadioGroup row name="brand" onChange={handleCondsChange}>
                <FormControlLabel control={<Radio />} value="" label="All brand" />
                <FormControlLabel control={<Radio />} value="toyota" label="Toyota" />
                <FormControlLabel control={<Radio />} value="nissan" label="Nissan" />
                <FormControlLabel control={<Radio />} value="BMW" label="BMW" />
              </RadioGroup>

              <Typography variant="h6">With driver</Typography>
              <RadioGroup row name="supportDriver" onChange={handleCondsChange}>
                <FormControlLabel control={<Radio />} value="yes" label="Yes" />
                <FormControlLabel control={<Radio />} value="no" label="No" />
                <FormControlLabel control={<Radio />} value="all" label="All" />
              </RadioGroup>

              <Typography variant="h6">Delivery</Typography>
              <RadioGroup row name="supportDelivery" onChange={handleCondsChange}>
                <FormControlLabel control={<Radio />} value="yes" label="Yes" />
                <FormControlLabel control={<Radio />} value="no" label="No" />
                <FormControlLabel control={<Radio />} value="all" label="All" />
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
            <br />
            <Grid container spacing={2}>
              <AllCars conds={searchParam} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}