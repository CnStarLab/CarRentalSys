import { Box, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';

export default function MainSection() {
  return (
    <Box textAlign="center" py={10} bgcolor="grey.100" sx={{ px: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
      Provide People With <span>SAFE</span>,<span >CONVENIENT</span>,And <span> COMFORTABLE</span><br />
            Car Rental Travel Solutions in Mongolia.
      </Typography>
      <Typography variant="subtitle1" mb={4} sx={{ color: 'text.secondary' }}>
        All types of car rental services
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 600, margin: '0 auto' }}>
        <Grid item xs={12} sm={4}>
          <TextField label="Category" select variant="outlined" size="small" fullWidth>
            <MenuItem value="all">All Cars</MenuItem>
            <MenuItem value="special">Special Cars</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Color" variant="outlined" size="small" fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Other Type" variant="outlined" size="small" fullWidth />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" sx={{ mt: 3, px: 5 }}>
        Search
      </Button>
    </Box>
  );
}
