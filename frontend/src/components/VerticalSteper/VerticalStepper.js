import * as React from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";

import { Fab } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function VerticalStepper(props) {
  const { children, activeStep, handleNext, handleBack } = props ?? {};

  return (
    <Box display={"flex"} alignItems={"center"}>
      <Box mr={10}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {children &&
            children.length > 0 &&
            children.map((step) => (
              <Step key={step.label} completed={false}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
        </Stepper>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Fab
          color="primary"
          aria-label="previous"
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          <ArrowUpwardIcon />
        </Fab>
        <Fab
          color="primary"
          aria-label="next"
          size="small"
          onClick={handleNext}
          disabled={activeStep === children?.length - 1}
        >
          <ArrowDownwardIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default VerticalStepper;
