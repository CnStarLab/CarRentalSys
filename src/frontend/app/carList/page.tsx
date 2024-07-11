'use client'
import * as React from 'react'
import { Box, Container } from "@mui/material";
import CarCards from "./CarCards";

export default function AllCars(){
    const [JsonData, SetJsonData] = React.useState([])
    
    React.useEffect(() => {
        fetch('http://localhost:8080/api/v1/cars/getAll')
          .then(response => response.json())
          .then(data => SetJsonData(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []); // Empty Array as Listener, make sure only run when the Component mount fist time.

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {JsonData.map((car, index) => (
                <CarCards key={index} car={car} />
            ))}
            </Box>
        </Container>
    )
}