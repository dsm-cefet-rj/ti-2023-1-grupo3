import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import { ClientForm } from "../../components/ClientForm";
import styled from "styled-components";
import ProfessionalForm from "../../components/ProfessionalForm/ProfessionalForm";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledContentBox = styled(Box)(() => {
  const theme = useTheme();

  return {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
    padding: 20,
  };
});

function SignUp() {
  const [userType, setUserType] = useState("CLIENT");

  const handleUserTypeChange = (event) => setUserType(event.target.value ?? "");

  return (
    <StyledBox>
      <StyledContentBox>
        <FormControl>
          <FormLabel>Tipo de perfil</FormLabel>
          <RadioGroup value={userType} onChange={handleUserTypeChange}>
            <FormControlLabel
              value="CLIENT"
              control={<Radio />}
              label="Paciente"
            />
            <FormControlLabel
              value="PROFESSIONAL"
              control={<Radio />}
              label="Psicólogo"
            />
          </RadioGroup>
        </FormControl>

        {userType === "CLIENT" && <ClientForm />}
        {userType === "PROFESSIONAL" && <ProfessionalForm />}
      </StyledContentBox>
    </StyledBox>
  );
}

export default SignUp;
