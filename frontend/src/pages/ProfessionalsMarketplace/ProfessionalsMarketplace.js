import TextField from "@mui/material/TextField";

import { ProfessionalCard } from "../../components/ProfessionalCard";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

function ProfessionalsMarketplace() {
  return (
    <StyledBox>
      <TextField placeholder="Encontre um profissional" fullWidth />
      <ProfessionalCard />
      <ProfessionalCard />
      <ProfessionalCard />
      <ProfessionalCard />
      <ProfessionalCard />
      <ProfessionalCard />
    </StyledBox>
  );
}

export default ProfessionalsMarketplace;
