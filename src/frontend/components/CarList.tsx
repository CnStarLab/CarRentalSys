import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image';

export default function CarList() {
  const cars = [
    { title: 'Volkswagen HG3', price: '$50,000', image: '/placeholder-image.png', vip: true },
    { title: 'Rx 450', price: '$60,000', image: '/placeholder-image.png', vip: true },
    { title: 'Crown', price: '$40,000', image: '/placeholder-image.png', vip: false },
    { title: 'Benz S class 550 long', price: '$100,000', image: '/placeholder-image.png', vip: false },
    { title: 'Lexus 600h', price: '$80,000', image: '/placeholder-image.png', vip: false },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        232 Cars Found
      </Typography>
      <Grid container spacing={3}>
        {cars.map((car, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ padding: 2, position: 'relative' }}>
              {car.vip && (
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    backgroundColor: 'gold',
                    padding: '2px 8px',
                    borderRadius: 1,
                    fontWeight: 'bold',
                  }}
                >
                  VIP
                </Typography>
              )}
              <Image src={car.image} alt={car.title} width={300} height={200} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                {car.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                {car.price}
              </Typography>
              <IconButton color="secondary" sx={{ position: 'absolute', top: 10, right: 10 }}>
                <FavoriteBorderIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
