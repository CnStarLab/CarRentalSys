import React from 'react';
import {
  Container, Box, Typography, TextField, Button, Switch, Card, CardContent, CardActions, Grid, Avatar, IconButton
} from '@mui/material';
import { Edit, Delete, Details } from '@mui/icons-material';
// data.js

export const userData = {
    profile: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "",
      confirmPassword: "",
    },
    notifications: {
      sendAlerts: true,
      emailAlerts: true,
      alerts: [
        {
          id: 1,
          type: "Rent Request",
          details: "Car: Model XYZ",
          icon: "/path/to/icon.jpg",
        },
        {
          id: 2,
          type: "Payment Received",
          amount: "$500",
          icon: "/path/to/icon.jpg",
        },
        {
          id: 3,
          type: "Rent Ended",
          details: "Car: Model ABC",
          icon: "/path/to/icon.jpg",
        },
      ],
    },
    cars: [
      {
        id: 1,
        model: "Car Model XYZ",
        owner: "Owner Name",
        image: "/path/to/car.jpg",
        description: "Some description about the car...",
        status: "Active",
      },
      {
        id: 2,
        model: "Car Model ABC",
        owner: "Owner Name",
        image: "/path/to/car.jpg",
        description: "Some description about the car...",
        status: "Inactive",
      },
    ],
    favorites: [
      {
        id: 1,
        model: "Car Model XYZ",
        owner: "Owner Name",
        image: "/path/to/car.jpg",
        description: "Some description about the car...",
      },
      {
        id: 2,
        model: "Car Model ABC",
        owner: "Owner Name",
        image: "/path/to/car.jpg",
        description: "Some description about the car...",
      },
    ],
    transactions: [
      {
        id: 1,
        type: "Payment Received",
        amount: "$500",
        icon: "/path/to/icon.jpg",
      },
      {
        id: 2,
        type: "Payment Sent",
        amount: "$300",
        icon: "/path/to/icon.jpg",
      },
    ],
  };

  const UserPage = () => {
    const { profile, notifications, cars, favorites, transactions } = userData;
  
    const styles = {
      container: {
        maxWidth: '800px',
        margin: '0 auto',
      },
      cardImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
      },
    };
  
    return (
      <Container style={styles.container}>
        {/* Profile Section */}
        <Box my={4}>
          <Typography variant="h4" gutterBottom>Profile</Typography>
          <Box bgcolor="white" p={2} borderRadius="8px" boxShadow={2}>
            <Typography variant="h6" gutterBottom>User Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" variant="outlined" defaultValue={profile.firstName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Password" type="password" variant="outlined" defaultValue={profile.password} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" variant="outlined" defaultValue={profile.lastName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Confirm Password" type="password" variant="outlined" defaultValue={profile.confirmPassword} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" type="email" variant="outlined" defaultValue={profile.email} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" color="primary" startIcon={<Edit />}>Edit & Save</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
  
        {/* Notification Section */}
        <Box my={4}>
          <Typography variant="h4" gutterBottom>Notification</Typography>
          <Box bgcolor="white" p={2} borderRadius="8px" boxShadow={2}>
            <Typography variant="h6" gutterBottom>Notification Settings</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>Send Alerts</Typography>
              <Switch defaultChecked={notifications.sendAlerts} />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>Email Alerts</Typography>
              <Switch defaultChecked={notifications.emailAlerts} />
            </Box>
          </Box>
  
          {/* Alerts */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>Profile Alerts</Typography>
            <Grid container spacing={2}>
              {notifications.alerts.map(alert => (
                <Grid item xs={12} key={alert.id}>
                  <Card>
                    <CardContent display="flex">
                      <Avatar alt="Alert Icon" src={alert.icon} />
                      <Box ml={2}>
                        <Typography variant="body1">{alert.type}</Typography>
                        <Typography variant="body2" color="textSecondary">{alert.details || `Amount: ${alert.amount}`}</Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button startIcon={<Details />}>Details</Button>
                      {alert.type === "Rent Request" && (
                        <>
                          <Button color="secondary" startIcon={<Delete />}>Decline</Button>
                          <Button color="primary">Confirm</Button>
                        </>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
  
        {/* My Cars Section */}
        <Box my={4}>
          <Typography variant="h4" gutterBottom>My Cars</Typography>
          <Grid container spacing={2}>
            {cars.map(car => (
              <Grid item xs={12} key={car.id}>
                <Card>
                  <CardContent display="flex" alignItems="center">
                    <Box flexShrink={0} mr={2}>
                      <img src={car.image} alt="Car" style={styles.cardImage} />
                    </Box>
                    <Box>
                      <Typography variant="body1">{car.model}</Typography>
                      <Typography variant="body2" color="textSecondary">{car.description}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button color="secondary" startIcon={<Delete />}>Delete</Button>
                    <Button color="primary">Car Detail</Button>
                    <Box ml="auto">
                      <Switch defaultChecked={car.status === "Active"} />
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
  
        {/* Favorite Section */}
        <Box my={4}>
          <Typography variant="h4" gutterBottom>Favorite</Typography>
          <Grid container spacing={2}>
            {favorites.map(car => (
              <Grid item xs={12} key={car.id}>
                <Card>
                  <CardContent display="flex" alignItems="center">
                    <Box flexShrink={0} mr={2}>
                      <img src={car.image} alt="Car" style={styles.cardImage} />
                    </Box>
                    <Box>
                      <Typography variant="body1">{car.model}</Typography>
                      <Typography variant="body2" color="textSecondary">{car.description}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button color="primary">Car Detail</Button>
                    <Button color="primary">Book Now</Button>
                    <Box ml="auto">
                      <IconButton>
                        <Details />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
  
        {/* Transaction History */}
        <Box my={4}>
          <Typography variant="h4" gutterBottom>Transaction History</Typography>
          <Grid container spacing={2}>
            {transactions.map(transaction => (
              <Grid item xs={12} key={transaction.id}>
                <Card>
                  <CardContent display="flex" alignItems="center">
                    <Avatar alt="Transaction Icon" src={transaction.icon} />
                    <Box ml={2}>
                      <Typography variant="body1">{transaction.type}</Typography>
                      <Typography variant="body2" color="textSecondary">Amount: {transaction.amount}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button startIcon={<Details />}>Detail</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  };
  
  export default UserPage;