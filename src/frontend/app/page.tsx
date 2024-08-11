'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/browser');
  };

  const ContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    backgroundImage: 'url(homepage1.jpg)', // Replace with your image path
    backgroundSize: 'cover', // Ensure the image covers the entire container
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
    position: 'relative', // Position relative for overlay
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text readability
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const textStyle: React.CSSProperties = {
    color: 'white', // White text color
    textAlign: 'center', // Center-align text
    fontSize: '48px', // Larger font size for main text
    marginBottom: '20px', // Margin at the bottom
    fontWeight: 'bold', // Bold text
    lineHeight: '1.2', // Line height for better readability
  };

  const circleStyle: React.CSSProperties = {
    width: '655px', // Increase circle width
    height: '655px', // Increase circle height
    borderRadius: '50%', // Make the element a circle
    display: 'flex', // Use Flexbox layout
    flexDirection: 'column', // Vertical layout
    justifyContent: 'center', // Center align items on the main axis
    alignItems: 'center', // Center align items on the cross axis
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Use rgba to set the background color with opacity
    padding: '20px', // Add padding for spacing
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
  };

  const subTextStyle: React.CSSProperties = {
    color: 'white', // White text color
    textAlign: 'center', // Center-align text
    fontSize: '24px', // Smaller font size for subtext
    marginBottom: '-10px', // Margin at the bottom
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    marginTop: '20px', // Add margin to separate buttons from text
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'orange', // Button background color
    color: 'white', // Button text color
    fontSize: '18px', // Button font size
    padding: '10px 20px', // Button padding
    borderRadius: '5px', // Button border radius
    textTransform: 'none', // Prevent text capitalization
  };

  const downloadButtonStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent button background
    color: 'white', // Button text color
    fontSize: '18px', // Button font size
    padding: '10px 20px', // Button padding
    borderRadius: '5px', // Button border radius
    textTransform: 'none', // Prevent text capitalization
    border: '1px solid white', // White border
  };

  const adjectiveStyle: React.CSSProperties = {
    color: 'orange', // Highlight color for adjectives
    fontWeight: 'bold', // Bold text
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Text shadow for artistic effect
  };

  return (
    <div style={ContainerStyle}>
      <div style={overlayStyle}>
        <div style={circleStyle}>
          <p style={textStyle}>
            Provide People With <span style={adjectiveStyle}>SAFE</span>,<br />
            <span style={adjectiveStyle}>CONVENIENT</span>,<br />
            And <span style={adjectiveStyle}>COMFORTABLE</span><br />
            Car Rental Travel Solutions
          </p>
          <p style={subTextStyle}>RentRide.mn</p>
          <div style={buttonContainerStyle}>
            <Button
              variant="contained"
              style={buttonStyle}
              endIcon={<SendIcon />}
              onClick={handleClick}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              style={downloadButtonStyle}
              startIcon={<DownloadIcon />}
            >
              Download Apps
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}