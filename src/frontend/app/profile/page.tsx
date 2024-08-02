'use client'
import React from 'react';
import {
  Container, Box, Typography, TextField, Button, Switch, Card, CardContent, CardActions, Grid, Avatar, IconButton,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { Edit, Delete, Details, ExpandMore, Payment } from '@mui/icons-material';
import { useAuth } from '../hook/AuthContext';
import Modal from '../login/alert';
import UploadPhoto from '../components/userAvatarUpload';
import Link from 'next/link';
import { Car, Order, UserProfile } from '../interface'

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
    const [avatar, setAvatar] = React.useState<string>(''); // 用于保存单个头像 URL

    const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
    const [myCars, SetMyCars] = React.useState([]);
    const [myCarsBookInfo, SetMyCarsBookInfo] = React.useState([])
    const [myOrderInfo, SetMyOrderInfo] = React.useState([])

    const [modalMessage, setModalMessage] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    console.log("[UserProfile->state:myCars]",myCars)
    console.log("[UserProfile->state:myCarsBookInfo]:",myCarsBookInfo)

    const handleSetAvatar = (urls: string[]) => {
      if (urls.length > 0) {
        setAvatar(urls[0]); // 使用第一个 URL 作为头像
      }
    };

    const fetchOwenerBookInfo = async () => {
      try {
        const carResponse = await fetch(`http://localhost:8080/api/v1/service/info/ownerId/${localStorage.getItem("userId")}`);
        const useLogs = await carResponse.json();
        console.log("[UserProfile->Effect->fetchOwenerBookInfo:CarInfo]", useLogs);
        SetMyCarsBookInfo(useLogs)
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    const fetchUserOrders = async ()=>{
      try {
        const carResponse = await fetch(`http://localhost:8080/api/v1/service/info/userId/${localStorage.getItem("userId")}`);
        const orders = await carResponse.json();
        console.log("[UserProfile->Effect->fetchUserOrders:orders]", orders);
        SetMyOrderInfo(orders)
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    React.useEffect(() => {
      //fetch User info
      const fetchUserProfile = async () => {
        try {
          const userResponse = await fetch(`http://localhost:8080/api/v1/user/getProfile/${localStorage.getItem("userId")}`);
          const userData = await userResponse.json();
          console.log("[UserProfile->Effect->resp:userProfile]", userData);
          console.log("[Localstorage->UserId] :", localStorage.getItem("userId"));
          setUserProfile(userData);
          setAvatar(userData.userPic);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      //fetch car info
      const fetchCarInfo = async () => {
        try {
          const carResponse = await fetch(`http://localhost:8080/api/v1/cars/ownerId/${localStorage.getItem("userId")}`);
          const carData = await carResponse.json();
          console.log("[UserProfile->Effect->resp:CarInfo]", carData);
          console.log("[Localstorage->UserId] :", localStorage.getItem("userId"));
          SetMyCars(carData);
        } catch (error) {
          console.error('Error fetching car data:', error);
        }
      };
    
      fetchUserProfile();
      fetchCarInfo();
      fetchOwenerBookInfo()
      fetchUserOrders()
    }, []); // Empty Array as Listener, make sure only run when the Component mount fist time.


    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
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
          throw new Error(`Update profile failed! INFO: ${result.error}`);
        }
    
        setModalMessage(result.message || 'Success!');
      } catch (error) {
        if (error instanceof Error) {
          setModalMessage(`Error: ${error.message}`);
        } else {
          setModalMessage('An unknown error occurred');
        }
      } finally {
        setIsModalOpen(true);
      }

    }

    const handleOwnerApprove = async(event: { currentTarget: { id: any; }; })=>{
      try {
        const response = await fetch(`http://localhost:8080/api/v1/service/status/approve/${event.currentTarget.id}`, {
          method: 'POST',
        });
        
        // parse response 2 json
        const result = await response.json();
        if (!response.ok) {
          console.log(response.body)
          throw new Error(`Approve this request failed! INFO: ${result.error}`);
        }
        
        console.log("[SignIn] response Json:",result)
        setModalMessage(result.message || 'Approved!');

        
      } catch (error) {
        if (error instanceof Error) {
          setModalMessage(`Error: ${error.message}`);
        } else {
          setModalMessage('An unknown error occurred');
        }
      } finally {
        setIsModalOpen(true);
      }
    }

    const handleOwnerDecline = async(event: { currentTarget: { id: any; }; })=>{
      try {
        const response = await fetch(`http://localhost:8080/api/v1/service/status/decline/${event.currentTarget.id}`, {
          method: 'POST',
        });
        
        // parse response 2 json
        const result = await response.json();
        if (!response.ok) {
          console.log(response.body)
          throw new Error(`Decline this request failed! INFO: ${result.error}`);
        }
        
        console.log("[SignIn] response Json:",result)
        setModalMessage(result.message || 'Approved!');

  
      } catch (error) {
        if (error instanceof Error) {
          setModalMessage(`Error: ${error.message}`);
        } else {
          setModalMessage('An unknown error occurred');
        }
      } finally {
        setIsModalOpen(true);
      }
    }

    const handleUserDecline = async(event: { currentTarget: { id: any; }; })=>{
      try {
        const response = await fetch(`http://localhost:8080/api/v1/service/user/status/decline/${event.currentTarget.id}`, {
          method: 'POST',
        });
        
        // parse response 2 json
        const result = await response.json();
        if (!response.ok) {
          console.log(response.body)
          throw new Error(`Cancel this order failed! INFO: ${result.error}`);
        }
        
        console.log("[SignIn] response Json:",result)
        setModalMessage(result.message || 'Approved!');

  
      } catch (error) {
        if (error instanceof Error) {
          setModalMessage(`Error: ${error.message}`);
        } else {
          setModalMessage('An unknown error occurred');
        }
      } finally {
        setIsModalOpen(true);
      }
    }

    const closeModal = () => {
      setIsModalOpen(false);
      //refetch to update the latest bookInfo.
      fetchOwenerBookInfo();
      fetchUserOrders();
      
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
            <Typography variant="h6" gutterBottom>User Information for {userProfile?.username}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Avatar alt="User Avatar" src={avatar} style={styles.avatar} />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <UploadPhoto msg="Change Avatar" setAvatar={handleSetAvatar} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" name="firstName" variant="outlined" InputLabelProps={{ shrink: true }} defaultValue={userProfile?.firstName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Change password" name="password" type="password" variant="outlined" InputLabelProps={{ shrink: true }} defaultValue={userProfile?.password} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" name="lastName" variant="outlined" InputLabelProps={{ shrink: true }} defaultValue={userProfile?.lastName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Confirm Password" type="password" variant="outlined" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" name="email" type="email" variant="outlined" InputLabelProps={{ shrink: true }} defaultValue={userProfile?.email} />
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
              {myCarsBookInfo && myCarsBookInfo.length > 0 ? (
                <Grid container spacing={3}>
                  {myCarsBookInfo.map((car:Car) => (
                    <Grid item xs={12} key={car.carPics[0]?.carId}>
                      <Accordion sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{ backgroundColor: '#f5f5f5' }}
                        >
                          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography variant="h5" sx={{ marginRight: 2 }}>
                              {car.brand} - {car.model} - {car.year}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                              Active Activities: {car.useLogs.length}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 2 }}>
                          {car.useLogs && car.useLogs.length > 0 ? (
                            car.useLogs.map((currCarBookInfo) => (
                              <Card key={currCarBookInfo.ID} sx={{ mb: 2, boxShadow: 1, borderRadius: 2 }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                                  <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h4" sx={{ color: currCarBookInfo.status === 1 ? 'green' : 'orange', mb: 1 }}>
                                      {currCarBookInfo.status === 1 ? "Confirmed" : "Pending"}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" sx={{ mb: 0.5 }}>
                                      Reason: {currCarBookInfo.reason}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary">
                                      Time: {new Date(currCarBookInfo.startTime).toLocaleDateString()} - {new Date(currCarBookInfo.endTime).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                  {car.carPics && car.carPics[0] && (
                                    <CardMedia
                                      component="img"
                                      height="140"
                                      image={car.carPics[0].fileName}
                                      alt="Car image"
                                      sx={{
                                        objectFit: 'cover',
                                        height: '100%',
                                        borderRadius: 2,
                                        boxShadow: 1,
                                        flexShrink: 0,
                                        width: '30%',
                                      }}
                                    />
                                  )}
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between' }}>
                                  <Button startIcon={<Details />}>Details</Button>
                                  {currCarBookInfo.status === 0 && (
                                    <>
                                      <Button id={currCarBookInfo.ID} onClick={handleOwnerDecline}color="secondary" startIcon={<Delete />}>Decline</Button>
                                      <Button id={currCarBookInfo.ID} onClick={handleOwnerApprove} color="primary" variant="contained">Approve</Button>
                                    </>
                                  )}
                                </CardActions>
                              </Card>
                            ))
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              No booking information available.
                            </Typography>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1" color="textSecondary">No alerts yet</Typography>
                    </CardContent>
                </Card>
              </Grid>
            )}
          </Box>
        
        </Box>
            
        {/* My Order Section */}
        <Box my={4}>
          <Typography variant="h4" gutterBottom>My Orders</Typography>
          <Grid container spacing={2}>
              {myOrderInfo && myOrderInfo.length > 0 ? (
                myOrderInfo.map((order:Order) => (
                <Grid item xs={12} key={order.id}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={8}>
                          <Box>
                            <Typography variant="h5">
                              Order ID: {order.ID ? order.ID : "Something Wrong"}  CarId: {order.carId ? order.carId : "Something Wrong"}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                              {order?.reason ? order.reason : "Something Wrong"}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography 
                            variant="h4" 
                            sx={{ color: order.status === 1 ? 'green' : 'orange', textAlign: { xs: 'left', sm: 'right' } }}
                          >
                            {order.status === 1 ? "Owner Approved" : "Pending for Approve"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Link href={`/rent?carId=${encodeURIComponent(order.carId)}&bookId=${encodeURIComponent(order.ID)}`}>
                        <Button color="primary" startIcon={<Payment />}>Pay for your order</Button>
                      </Link>            
                      <Button color="secondary" id={order.ID} onClick={handleUserDecline} startIcon={<Delete />}>Delete</Button>
                      <Box ml="auto" /> {/* Keeps this for potential right-aligned content */}
                    </CardActions>
                  </Card>
                </Grid>)
              )
            )
            :(
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="body1" color="textSecondary">No Orders yet</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>






        {/* My Cars Section */}
        <Box my={4}>
        <Typography variant="h4" gutterBottom>My Cars</Typography>
          <Grid container spacing={2}>
            {myCars && myCars.length > 0 ? (
              myCars.map((car:Car) => (
                <Grid item xs={12} key={car.id}>
                  <Card>
                    <CardContent display="flex" alignItems="center">
                      <Box flexShrink={0} mr={2}>
                        <img src={car?.carPics[0].fileName || "https://via.placeholder.com/150"} alt="Car" style={styles.cardImage} />
                      </Box>
                      <Box>
                        <Typography variant="body1">{car?.brand ? car.brand : "Something Wrong"} {car?.model ? car.model : "Something Wrong"}</Typography>
                        <Typography variant="body2" color="textSecondary">{car?.basicInfo ? car.basicInfo : "Something Wrong"}</Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button color="secondary" startIcon={<Delete />}>Delete</Button>
                      <Button color="primary">Car Detail</Button>
                      <Box ml="auto">
                        <Switch defaultChecked={car.available === true} />
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="body1" color="textSecondary">No Cars yet</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
  
        {/* Favorite Section */}
        {/* <Box my={4}>
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
        </Box> */}
  
        {/* Transaction History */}
        {/* <Box my={4}>
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
        </Box> */}
        <Modal open={isModalOpen} message={modalMessage} onClose={closeModal} />
      </Container>
    );
  };
  
  export default UserPage;