'use client'
import React from 'react';
import {
  Container, Box, Typography, TextField, Button, Switch, Card, CardContent, CardActions, Grid, Avatar, IconButton
} from '@mui/material';
import { Edit, Delete, Details } from '@mui/icons-material';
import { useAuth } from '../hook/AuthContext';
import Modal from '../login/alert';
import UploadPhoto from '../components/userAvatarUpload';
// data.js

var userData = {
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
    const {notifications, cars, favorites, transactions } = userData;
    const {userId} = useAuth()

    const [avatar, setAvatar] = React.useState('');
    const [userProfile, setUserProfile] = React.useState([])
    const [modalMessage, setModalMessage] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    React.useEffect(() => {
        fetch(`http://localhost:8080/api/v1/user/getProfile/${localStorage.getItem("userId")}`)
        .then(response => response.json()) 
        .then(data => {
          console.log("[UserProfil]",data)
          console.log("[Localstorage->UserId] :",localStorage.getItem("userId"))
          setUserProfile(data)
          setAvatar(data.userPic)
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty Array as Listener, make sure only run when the Component mount fist time.


    

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
    
      // formData 2 json
      const formData = {
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        userPic:`${avatar}`
      };

      console.log(formData)
      
      try {
        const response = await fetch(`http://localhost:8080/api/v1/user/updateProfile/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        // parse response 2 json
        const result = await response.json();
  
        if (!response.ok) {
          console.log(response.body)
          throw new Error(`Register error! INFO: ${result.error}`);
        }
    
        setModalMessage(result.message || 'Success!');
      } catch (error) {
        setModalMessage(`Error: ${error.message}`);
      } finally {
        setIsModalOpen(true);
      }

    }

    const closeModal = () => {
      setIsModalOpen(false);
    };
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
      avatar: {
        width: '150px',
        height: '150px',
      },
    };
  
    return (
      <Container style={styles.container}>
        {/* Profile Section */}
        <Box component="form" onSubmit={handleSubmit} my={4}>
          <Typography variant="h4" gutterBottom>Profile</Typography>
          <Box bgcolor="white" p={2} borderRadius="8px" boxShadow={2}>
            <Typography variant="h6" gutterBottom>User Information for {userProfile.username}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Avatar alt="User Avatar" src={avatar} style={styles.avatar} />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <UploadPhoto msg="change avatar" setAvatar={setAvatar}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" name="firstName" variant="outlined" InputLabelProps={{ shrink: true }} defaultValue={userProfile.firstName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Change password" name="password" type="password" variant="outlined" InputLabelProps={{ shrink: true }} defaultValue={userProfile.password} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" name="lastName" variant="outlined" InputLabelProps={{ shrink: true }} defaultValue={userProfile.lastName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Confirm Password" type="password" variant="outlined" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" name="email" type="email" variant="outlined" InputLabelProps={{ shrink: true }} defaultValue={userProfile.email} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<Edit />}>Edit & Save</Button>
              </Grid>
            </Grid>
            <Modal open={isModalOpen} message={modalMessage} onClose={closeModal} />
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