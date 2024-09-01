import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box py={4} bgcolor="grey.200" textAlign="center">
      <Typography variant="body2" sx={{ mb: 1 }}>
        © 2024 - <Link href="#">StarLab/RentRide</Link> | <Link href="#">Contact Us</Link>
      </Typography>
      <Typography variant="body2">
        <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
      </Typography>
    </Box>
  );
}
