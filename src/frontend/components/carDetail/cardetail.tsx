// pages/car-detail.js
'use client'
import React from 'react';
import { Car } from '../../app/interface'
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Divider, Box, Rating, TextField } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export default function CarDetailComponent(){
    const searchParams = useSearchParams();
    const carId = searchParams.get('carId');
    const [carData, setCarData] = React.useState<Car | null>(null);
    const [selectedImageIndex , setSelectedImageIndex] = React.useState(0);

    React.useEffect(() => {
        if (carId) {
          // 仅在 carId 存在时进行数据获取
          const fetchData = async () => {
            try {
              const response = await fetch(`http://localhost:8080/api/v1/cars/carId/${carId}`,{
                method: 'POST',
              });
              const data = await response.json();
              console.log("[CarDetailComponent->useEffect]: ", data)
              setCarData(data);
            } catch (error) {
              console.error('Error fetching car data:', error);
            }
          };
    
          fetchData();
        }
      }, [carId]);

    const car = {
        brand: carData?.brand || "Owner haven't add car brand yet",
        model: carData?.model || "Owner haven't add car model yet",
        image: carData?.carPics || [],
        basicInfo: carData?.basicInfo || "Owner haven't add basic info yet.",
        price: carData?.price || "Owner haven't add price yet.",
        featureInfo: carData?.featureInfo || "Owner haven't add feature info yet.",
        rentalTerms: "At the heart of the luxury BMW 5 Series lies a commitment to innovation and engineering and a driver-centric approach. Every feature, from the intuitive navigation system to the unparalleled safety configurations, is designed to enhance your driving pleasure.",
        //delay        
        relatedProducts: Array(6).fill({
            image: "https://via.placeholder.com/150",
            titleContent: "Premium Sound",
            price: 34.50
        }),
        //delay
        reviews: Array(3).fill({
            rating: 5,
            titleContent: "Unmatched Luxury and Power in the BMW 5 Series",
            basicInfo: "Experience the epitome of luxury with the BMW 5 Series, offering unparalleled elegance and performance. Unmatched Luxury and Power in the BMW 5 Series. Delighting enthusiasts has been an exhilarating experience. Its state-of-the-art technology and sleek design make this luxury journey unforgettable. From the refined interiors to the powerful engine, this car redefines what luxury and power truly mean.",
            image: "https://via.placeholder.com/100",
            likes: 29
        }),
        fansAlsoBought: Array(6).fill({
            image: "https://via.placeholder.com/150",
            titleContent: "Elegance Lights",
            price: 12.00
        }),
        //delay
        discoverMore: Array(6).fill({
            image: "https://via.placeholder.com/150",
            titleContent: "Ultimate Comfort",
            price: 150.00
        })
        //delay
    };
    
    console.log(car)
    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card onClick={() => setSelectedImageIndex(0)}>
                        <CardMedia
                            component="img"
                            alt={car.brand}
                            height="400"
                            image={car.image[selectedImageIndex]?.fileName}
                        />
                    </Card>
                </Grid>
    
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="div">
                        {car.brand + ' '+ car.model}
                    </Typography>
                    <Rating value={4.5} precision={0.5} readOnly />
                    <Typography variant="h6" component="div" sx={{ marginTop: '10px' }}>
                        ${car.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                        {car.basicInfo}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                        Book now
                    </Button>
                    <Button variant="outlined" color="primary" sx={{ marginTop: '20px', marginLeft: '10px' }}>
                        Save for later
                    </Button>
                    <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                        tags(WIP)
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                {car.image.map((img, index) => (
                    <Grid item xs={6} md={1.5} key={index}>
                        <Card
                            onClick={() => setSelectedImageIndex(index)}
                            sx={{
                                border:
                                    selectedImageIndex === index
                                        ? '2px solid #007bff'
                                        : '1px solid #ccc',
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt="car img"
                                height="100"
                                image={img.fileName}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="h5" component="div">Car featureInfo</Typography>
            <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                {car.featureInfo}
            </Typography>
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="h5" component="div">Rental Terms</Typography>
            <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                {car.rentalTerms}
            </Typography>
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="h5" component="div">Related products</Typography>
            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                {car.relatedProducts.map((product, index) => (
                    <Grid item xs={6} md={2} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={product.titleContent}
                                height="150"
                                image={product.image}
                            />
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    {product.titleContent}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="p">
                                    ${product.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="h5" component="div">Ratings & Reviews</Typography>
            <Rating value={4.5} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                4.5 out of 5 stars (123 reviews)
            </Typography>
            <TextField
                fullWidth
                label="Search reviews"
                variant="outlined"
                sx={{ marginTop: '20px', marginBottom: '20px' }}
            />
            {car.reviews.map((review, index) => (
                <Card key={index} sx={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Rating value={review.rating} readOnly />
                        <Typography variant="h6" component="div">
                            {review.titleContent}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                            {review.basicInfo}
                        </Typography>
                        <CardMedia
                            component="img"
                            alt="Review image"
                            height="100"
                            image={review.image}
                        />
                        <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                            {`${review.likes} people found this helpful`}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="h5" component="div">Fans also bought</Typography>
            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                {car.fansAlsoBought.map((product, index) => (
                    <Grid item xs={6} md={2} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={product.titleContent}
                                height="150"
                                image={product.image}
                            />
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    {product.titleContent}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="p">
                                    ${product.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="h5" component="div">Discover more like this</Typography>
            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                {car.discoverMore.map((product, index) => (
                    <Grid item xs={6} md={2} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={product.titleContent}
                                height="150"
                                image={product.image}
                            />
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    {product.titleContent}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="p">
                                    ${product.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );    
};
