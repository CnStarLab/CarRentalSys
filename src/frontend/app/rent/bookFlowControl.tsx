'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// different stage pages
import StageRequest_st1 from './stageRequest_st1';
import StagePayment_st2 from './stageDuringPayment_st2';
import StageAfterPaid_st3 from './stageAfterPaid_st3';
import StageUsing_st4 from './stageUsing_st4';
import StageEnding_st5 from './stageEnding_st5';
import StageFinish_st6 from './stageFinish_st6';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../hooks/AuthContext';

const steps = [
  'Input Your Basic Request Info.', 
  'Pay for your Booking Request.',
  'Waiting for Using.',
  'During Using.',
  'After Using.',
  'Finish the booking flow.'
];

export default function BookingFlowControl() {

  const searchParams = useSearchParams();
  const bookId = searchParams.get('bookId');
  console.log(bookId)

  //If jump from profile order handler button
  React.useEffect(()=>{
    if(bookId==null){
      return
    }
    fetch(`http://localhost:8080/api/v1/service/info/bookId/${bookId}`)
            .then(response => response.json())
            .then(data => {
                console.log("[BookingFlowControl:getCurrBookInfo:data]", data)
                setCurrBookInfo(data)
                setActiveStep(data.status)
            })
            .catch(error => console.error('Error fetching data:', error));
  }, [bookId])
  
  const [activeStep, setActiveStep] = React.useState(0);
  //const [skipped, setSkipped] = React.useState(new Set<number>());
  const [currBookInfo, setCurrBookInfo] = React.useState([])

  // const isStepOptional = (step: number) => {
  //   return step === 1;
  // };

  // const isStepSkipped = (step: number) => {
  //   return skipped.has(step);
  // };

  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (step: number) => {
    console.log("[BookingFlowControl->renderStepContent->state:currCarInfo]: ",currBookInfo)
    switch (step) {
      case 0:
        return <StageRequest_st1 handleNext={handleNext} setCurrBookInfo={setCurrBookInfo}/>;
      case 1:
        return <StagePayment_st2 handleNext={handleNext} currBookInfo={currBookInfo} />;
      case 2:
        return <StageAfterPaid_st3 handleNext={handleNext}/>;
      case 3:
        return <StageUsing_st4 handleNext={handleNext}/>;
      case 4:
        return <StageEnding_st5 handleNext={handleNext}/>;
      case 5:
        return <StageFinish_st6 handleNext={handleNext}/>;
      default:
        return null;
    }
  };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            // if (isStepSkipped(index)) {
            //   stepProps.completed = false;
            // }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
  
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    );
  }