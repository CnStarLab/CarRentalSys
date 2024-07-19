// pages/car-detail.js
'use client'
import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Divider, Box, Rating, TextField } from '@mui/material';
import { Star } from '@mui/icons-material';


export default function CarDetailComponent(){

    const car = {
        model: "Luxury BMW 5 Series",
        image: "https://via.placeholder.com/600x400",
        description: "Experience the epitome of luxury with the BMW 5 Series, offering unparalleled elegance and performance.",
        price: 240,
        features: [
            "Exhilarating elegance and performance.",
            "Premium driving experience.",
            "Outstanding craftsmanship.",
            "Innovative technology.",
            "High-quality materials."
        ],
        rentalTerms: "At the heart of the luxury BMW 5 Series lies a commitment to innovation and engineering and a driver-centric approach. Every feature, from the intuitive navigation system to the unparalleled safety configurations, is designed to enhance your driving pleasure.",
        relatedProducts: Array(6).fill({
            image: "https://via.placeholder.com/150",
            title: "Premium Sound",
            price: 34.50
        }),
        reviews: Array(3).fill({
            rating: 5,
            title: "Unmatched Luxury and Power in the BMW 5 Series",
            description: "Experience the epitome of luxury with the BMW 5 Series, offering unparalleled elegance and performance. Unmatched Luxury and Power in the BMW 5 Series. Delighting enthusiasts has been an exhilarating experience. Its state-of-the-art technology and sleek design make this luxury journey unforgettable. From the refined interiors to the powerful engine, this car redefines what luxury and power truly mean.",
            image: "https://via.placeholder.com/100",
            helpful: 29
        }),
        fansAlsoBought: Array(6).fill({
            image: "https://via.placeholder.com/150",
            title: "Elegance Lights",
            price: 12.00
        }),
        discoverMore: Array(6).fill({
            image: "https://via.placeholder.com/150",
            title: "Ultimate Comfort",
            price: 150.00
        })
    };
    
    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <CardMedia
                        component="img"
                        alt={car.model}
                        height="400"
                        image={car.image}
                        title={car.model}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="div">
                        {car.model}
                    </Typography>
                    <Rating value={4.5} precision={0.5} readOnly />
                    <Typography variant="h6" component="div" sx={{ marginTop: '10px' }}>
                        ${car.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                        {car.description}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                        Book now
                    </Button>
                    <Button variant="outlined" color="primary" sx={{ marginTop: '20px', marginLeft: '10px' }}>
                        Save for later
                    </Button>
                    <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                        Premium Leather | High-quality Aluminum | Carbon Fiber
                    </Typography>
                </Grid>
            </Grid>
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="h5" component="div">Car Features</Typography>
            <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                {car.features.join(' ')}
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
                                alt={product.title}
                                height="150"
                                image={product.image}
                                title={product.title}
                            />
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    {product.title}
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
                            {review.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                            {review.description}
                        </Typography>
                        <CardMedia
                            component="img"
                            alt="Review image"
                            height="100"
                            image={review.image}
                            title="Review image"
                            sx={{ marginTop: '10px' }}
                        />
                        <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: '10px' }}>
                            {`${review.helpful} people found this helpful`}
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
                                alt={product.title}
                                height="150"
                                image={product.image}
                                title={product.title}
                            />
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    {product.title}
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
                                alt={product.title}
                                height="150"
                                image={product.image}
                                title={product.title}
                            />
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    {product.title}
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
