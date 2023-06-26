import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Button, CardMedia, styled } from "@mui/material";

const StyledCard = styled(Card)(() => ({
  width: "100%",
}));

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
          component={() => (
            <img
              src={appointment.picture_url}
              alt={appointment.professional.user.name}
              style={{ width: 100, height: 100 }}
            />
          )}
        />
        <CardContent>
          <Typography variant="h5">
            {appointment.professional.user.name}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {appointment.address}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Data: {appointment.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Hora: {appointment.time}
          </Typography>
          <Button onClick={onClick}>Ver mais</Button>
        </CardContent>
      </StyledBox>
    </StyledCard>
  );
}

export default AppointmentCard;
