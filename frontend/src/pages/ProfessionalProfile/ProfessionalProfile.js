import * as React from "react";
import Typography from "@mui/material/Typography";
import { Avatar, styled } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: 200,
  height: 200,
}));

function ProfessionalProfile() {
  return (
    <StyledBox>
      <StyledAvatar></StyledAvatar>
        <Typography variant="h2">Jorge Silva</Typography>
        <Typography variant="h8">4.87☆</Typography>
        <Typography variant="h5"> Área de atuação: Psicólogo </Typography>
        <Typography variant="h5"> CFP Nº XX/XXX </Typography>
        <Typography variant="h5"> Valor: R$ 150 / 50 min </Typography>
        <Typography variant="h6"> 
          Formado em Psicologia pela UFRJ desde 2004, atuo como psicólogo no
        intuito de ajudar pacientes no processo de autoconhecimento e superar
        suas angústias. Especializado no tratamento de pacientes com depressão
        ou ansiedade.
      </Typography>
      <Button variant="contained">Marcar consulta</Button>
    </StyledBox>
  );
}

export default ProfessionalProfile;
