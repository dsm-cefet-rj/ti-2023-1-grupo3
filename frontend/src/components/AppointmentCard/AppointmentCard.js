import * as React from "react";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Button, CardMedia, styled } from "@mui/material";

const StyledCard = styled(Card)(() => ({
  width: "100%",
}));

// const StyledAvatar = styled(Avatar)(() => ({
//   width: 100,
//   height: 100,
// }));

const StyledBox = styled(Box)(() => ({
  padding: 20,
  display: "flex",
  alignItems: "center",
}));

function AppointmentCard(props) {
  const { appointment, onClick } = props;

  return (
    <StyledCard elevation={2}>
      <StyledBox>
        <CardMedia
        //component={() => <StyledAvatar src={professional.profilePicture} />}
        />
        <CardContent>
          <Typography variant="h5">Consulta com: {appointment.name}</Typography>
          <Typography variant="body1" gutterBottom>
            {appointment.location}
          </Typography>
          <Typography color={"text.secondary"}>{appointment.hour}</Typography>
          <Button onClick={onClick}>Cancelar</Button>
        </CardContent>
      </StyledBox>
    </StyledCard>
  );
}

export default AppointmentCard;
