'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box, { BoxClassKey } from '@mui/material/Box';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from './alert';
import { useAuth } from '../../hooks/AuthContext';
import { useSearchParams } from 'next/navigation';
import { DateRangePicker } from 'rsuite';
import { BookInfo} from '../interface'

interface StageRequest_st1Props {
    handleNext: () => void;
    setCurrBookInfo: (info: BookInfo) => void;
}

interface DateRange {
  startTime: string;
  endTime: string;
}

export default function StageRequest_st1({handleNext,setCurrBookInfo}:StageRequest_st1Props) {
    const {token} = useAuth()

    // 定义错误状态的类型
    type Errors = {
      brand?: boolean;
      model?: boolean;
      year?: boolean;
      price?: boolean;
      numSeats?: boolean;
      location?: boolean;
      basicInfo?: boolean;
      featureInfo?: boolean;
    };

    // 初始化所有字段的错误状态为 false
    const [errors, setErrors] = React.useState<Errors>({
      brand: false,
      model: false,
      year: false,
      price: false,
      numSeats: false,
      location: false,
      basicInfo: false,
      featureInfo: false,
    });

    const handleBlur = (field: keyof Errors, value: string) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: !value
      }));
    };
    

  
    const closeModal = () => {
      setIsModalOpen(false);
      handleNext()
    };


    const searchParams = useSearchParams();
    const carId = searchParams.get('carId');

    const { isLoggedIn, username, userId} = useAuth();
    const [dateRange, setDateRange]:any = React.useState([null, null]);
    const [modalMessage, setModalMessage] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);    
    const [JsonData, setJsonData] = React.useState<DateRange[] | null>(null);
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      if(!isLoggedIn){
        window.location.href = '/login'
      }
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      console.log(dateRange)
    
      // formData 2 json
      const formData = {
        carId: Number(carId),
        userId: userId,
        startTime: dateRange[0], 
        endTime: dateRange[1], 
        reason: data.get('reason'),
      };
      console.log(JSON.stringify(formData));

      try {
        const response = await fetch('http://localhost:8080/api/v1/service/user/bookCar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(formData),
        });
        
        // parse response 2 json
        const result = await response.json();
  
        if (!response.ok) {
          console.log(response.body)
          throw new Error(`Create this order request failed! INFO: ${result.error}`);
        }
        setCurrBookInfo(result)
        console.log(result)
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
    };
  

    const handleDateRange = (value: Date[] | null) =>{
      if (value && value.length === 2) {
        const [startDate, endDate] = value;
        const startISOString = startDate.toISOString();
        const endISOString = endDate.toISOString();
        // Set the date range using the ISO strings
        console.log(startISOString,endISOString)
        setDateRange([startISOString, endISOString]);
      } else {
        // Reset the date range
        setDateRange(null, null);
      }
    }

    const isDateDisabled = (date: Date): boolean => {
      if (Array.isArray(JsonData) && JsonData != null) {
        return JsonData.some(range => {
          return date >= new Date(range.startTime) && date <= new Date(range.endTime);
        });
      }
      // 如果 JsonData 不是数组或者为 null，返回 false
      return false;
    };    

    React.useEffect(() => {
        fetch(`http://localhost:8080/api/v1/cars/invalidDate/${carId}`)
            .then(response => response.json())
            .then(data => {
                console.log("[StageRequest_st1:useEffect:data]", data)
                setJsonData(data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [carId]);

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.6)', // 半透明白色背景
            backdropFilter: 'blur(10px)', // 磨砂玻璃效果
            borderRadius: '15px', // 圆角
            padding: '20px', // 内边距
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 阴影效果
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <DirectionsCarFilledOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Rent This Car.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="carId"
                  label="carId"
                  name="carId"
                  type="number"
                  value={carId}
                  InputProps={{
                    readOnly: true,
                  }}
                  autoComplete="NaN"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="reason"
                  label="Reason for rent"
                  name="reason"
                  type="text"
                  autoComplete="NaN"
                />
              </Grid>
              <Grid item xs={12}>
                <DateRangePicker 
                size='lg'
                onChange={(value) => handleDateRange(value)}
                shouldDisableDate={isDateDisabled}
                />
              </Grid>
  
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I know and follow the rules of XXXXX"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SEND RENT REQUEST.
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/allCar" variant="body2">
                  Want More Info? Check All Cars
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Modal open={isModalOpen} message={modalMessage} onClose={closeModal} />
        </Container>
    );
}