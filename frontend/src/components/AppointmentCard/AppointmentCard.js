import * as React from "react";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, CardMedia, styled } from "@mui/material";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUserById } from "../../store/slices/userSlice";

const StyledCard = styled(Card)(() => ({
  width: "100%",
}));

const StyledBox = styled(Box)(() => ({
  padding: 20,
  display: "flex",
  alignItems: "center",
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: 100,
  height: 100,
}));

function AppointmentCard(props) {
  const { appointment, onClick } = props;
  const { location, professional, date, time } = appointment || {};

  const professionalUser = useSelector((state) =>
    selectUserById(state, professional.userId)
  );

  return (
    <StyledCard elevation={2}>
      <StyledBox>
        <CardMedia
          component={() => (
            <StyledAvatar src={professionalUser?.profilePicture} />
          )}
        />
        <CardContent>
          <Typography variant="h5">
            Consulta com: {professionalUser?.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {location?.label}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {format(new Date(date), "dd/MM/yyyy")} - {time}h
          </Typography>
          <Typography color={"text.secondary"}>{appointment?.hour}</Typography>
          <Button onClick={onClick}>Desmarcar</Button>
        </CardContent>
      </StyledBox>
    </StyledCard>
  );
}

export default AppointmentCard;
