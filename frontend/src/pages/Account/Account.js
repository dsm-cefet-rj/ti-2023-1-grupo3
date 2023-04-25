import * as React from "react";
import { useState, useEffect, useCallback } from "react";

import Typography from "@mui/material/Typography";
import { Avatar, Rating, styled } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services";
import { toast } from "react-toastify";

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

function Account() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState();

  const getUser = async () => {
    await getUserById(id)
      .then((response) => setUser(response.data))
      .catch((error) => {
        toast("Ocorreu um erro");
        console.log(error);
      });
  };

  const getUserCallback = useCallback(() => getUser(), []);

  useEffect(() => {
    getUserCallback();
  }, []);

  const handleAppointmentButtonClick = () =>
    navigate(`/appointments/`);

  return (
    <StyledBox>
      <StyledAvatar src={user?.profilePicture} />
      <Typography variant="h2">{user?.name ?? "-"}</Typography>

      <Typography variant="h5">Email: {user?.email ?? "-"}</Typography>
      <Typography variant="h5">Telefone: {user?.cellphone ?? "-"}</Typography>
      <Typography variant="h5">Data de Nascimento: {user?.birthDate ?? "-"}</Typography>


      <Button variant="contained" onClick={handleAppointmentButtonClick}>
        Consultas Marcadas
      </Button>
    </StyledBox>
  );
}

export default Account;
