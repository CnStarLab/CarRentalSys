import React from "react";
import { CircularProgress, Typography, Box, Paper } from "@mui/material";

export default function StageDuringPayment_st2({ handleNext, currBookInfo }) {
    const [pendingApprove, setPendingApprove] = React.useState(false);

    React.useEffect(() => {
        fetch(`http://localhost:8080/api/v1/service/info/bookId/${currBookInfo.bookId}`)
            .then(response => response.json())
            .then(data => {
                console.log("[StageDuringPayment_st2:useEffect->data]", data);
                if (data.status === 0) {
                    setPendingApprove(true);
                } else {
                    setPendingApprove(false);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', margin: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                {pendingApprove ? (
                    <>
                        <CircularProgress color="secondary" size={80} thickness={5} sx={{ marginBottom: 2 }} />
                        <Typography variant="h3" color="textSecondary">
                            Pending For Owner Approval...
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            We have noticed the owner of this car,please wait.
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Once approved,we will notice you.
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" color="primary">
                            Request Approved!
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            You can now proceed with the payment.
                        </Typography>
                        <Box mt={2}>
                            <button onClick={handleNext}>Pay Now</button>
                        </Box>
                    </>
                )}
            </Box>
        </Paper>
    );
}