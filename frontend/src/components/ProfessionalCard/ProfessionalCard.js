import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Avatar, CardMedia, styled } from "@mui/material";

const StyledCard = styled(Card)(() => ({
  display: "flex",
  alignItems: "center",
  padding: 20,
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: 100,
  height: 100,
}));

function ProfessionalCard() {
  return (
    <StyledCard elevation={2}>
      <CardMedia component={() => <StyledAvatar />} />
      <CardContent>
        <Typography variant="h5">Jorge Silva</Typography>
        <Typography variant="caption" gutterBottom>
          Psicólogo
        </Typography>
        <Typography variant="body1" gutterBottom>
          Gosto de ajudar pessoas. Tenho experiência com tratamento de
          ansiedades e depressões
        </Typography>
        <Typography color={"text.secondary"}>R$ 150 / 50 min</Typography>
      </CardContent>
    </StyledCard>
  );
}

export default ProfessionalCard;
