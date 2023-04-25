import * as React from "react";
import { useState, useEffect, useCallback } from "react";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, CardMedia, styled } from "@mui/material";
import { getUserById } from "../../services";
import { toast } from "react-toastify";

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
  const { location, professional } = appointment || {};

  const [professionalUser, setProfessionalUser] = useState();

  const getProfessionalUserInformation = async () => {
    if (!professional) return;

    await getUserById(Number(professional.userId))
      .then((response) => setProfessionalUser(response.data))
      .catch((error) => {
        toast.error("Ocorreu um erro");
        console.log(error);
      });
  };

  const getProfessionalUserInformationCallback = useCallback(
    () => getProfessionalUserInformation(),
    [professional]
  );

  useEffect(() => {
    getProfessionalUserInformationCallback();
  }, [professional]);

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
          <Typography color={"text.secondary"}>{appointment.hour}</Typography>
          <Button onClick={onClick}>Desmarcar</Button>
        </CardContent>
      </StyledBox>
    </StyledCard>
  );
}

export default AppointmentCard;
