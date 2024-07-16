import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Link from 'next/link';

export default function CarCards({ car }) {
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <Grid container>
          <Grid item xs={8}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {car.brand ? car.brand : 'NaN'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Here will add some info in future. WIP
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <Typography
                  fontSize="lg"
                  fontWeight="bold"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Price: 
                  <Box
                    component="span"
                    sx={{
                      color: 'secondary.main', // Price's color 
                      fontWeight: 'bold',
                      ml: 1, // a little margin
                    }}
                  >
                    ${car.price ? car.price : 'NaN'} /Day
                  </Box>
                  </Typography>
                  <Typography
                    fontSize="lg"
                    fontWeight="bold"
                    color="primary"
                  >
                    Available: 
                    <Box
                      component="span"
                      sx={{
                        color: car.available ? 'green' : 'red',
                        fontWeight: 'bold',
                        ml: 1, // a little margin
                      }}
                    >
                      {car.available ? 'Yes' : 'No'}
                    </Box>
                  </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <Typography
                  fontSize="lg"
                  fontWeight="bold"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Support Driver:
                  <Box
                    component="span"
                    sx={{
                      color: car.supportDriver ? 'green' : 'red',
                      fontWeight: 'bold',
                      ml: 1, // a little margin
                    }}
                  >
                    {car.supportDriver ? 'Yes' : 'No'}
                  </Box>
                </Typography>
                <Typography
                  fontSize="lg"
                  fontWeight="bold"
                  color="primary"
                >
                  Available: 
                    <Box
                      component="span"
                      sx={{
                        color: car.supportDelivery ? 'green' : 'red',
                        fontWeight: 'bold',
                        ml: 1, // a little margin
                      }}
                    >
                      {car.supportDelivery ? 'Yes' : 'No'}
                    </Box>
                </Typography>
              </Box>
            </CardContent>
          </Grid>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              height="140"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6oivF0mc5KS1qWhcovRUSkQuG_snSqImMA&s"
              alt="green iguana"
              sx={{ objectFit: 'cover', height: '100%' }}
            />
          </Grid>
        </Grid>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          More Info
        </Button>
        <Button size="small" color="success">
          <Link href={`/rent?carId=${car.ID}`} >
          Rent Now
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}