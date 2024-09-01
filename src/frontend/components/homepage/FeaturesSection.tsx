import { Box, Typography, Grid, Paper } from '@mui/material';
import Image from 'next/image';

export default function FeaturesSection() {
  const features = [
    { title: 'Personalized Rating', description: 'Easily find personal and company ratings.', image: '/rate.png' },
    { title: 'Easy Payment Options', description: 'Manage your payments with ease.', image: '/feat-payment.png' },
    { title: 'Electronic System', description: 'Handle all operations through the electronic system.', image: '/feat-sys.png' },
  ];

  return (
    <Box py={10} textAlign="center" sx={{ px: 5 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Redesigning Car Rentals
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper elevation={3} sx={{ padding: 4, height: '100%' }}>
              <Image src={feature.image} alt={feature.title} layout="responsive" width={300} height={200} style={{ marginBottom: 16 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
