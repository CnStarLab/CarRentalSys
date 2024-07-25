'use client'
import * as React from 'react'
import { Box, Container } from "@mui/material";
import CarCards from "./CarCards";

export default function AllCars({ conds}) {
    const [jsonData, setJsonData] = React.useState([])

    React.useEffect(() => {
        fetch('http://localhost:8080/api/v1/cars/all')
            .then(response => response.json())
            .then(data => {
                console.log("[AllCars:firstload:resp:data]", data)
                setJsonData(data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    React.useEffect(() => {
        if (conds) {
            fetch(`http://localhost:8080/api/v1/cars?${conds}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("[AllCars->useEffect:searchParam]", data);
                    setJsonData(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setJsonData([]);
                });
            console.log("[AllCars->useEffect:ChoiceConds]", conds);
        }
    }, [conds]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {
                    jsonData && jsonData.length > 0 ? (
                        jsonData.map((car, index) => <CarCards key={index} car={car} />)
                    ) : (
                        <div>No data available.</div>
                    )}
            </Box>
        </Container>
    )
}