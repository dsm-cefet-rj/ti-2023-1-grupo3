import * as React from "react";

import Typography from "@mui/material/Typography";
import { Avatar, styled } from "@mui/material";
import { Box } from "@mui/material";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

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
  const user = useSelector(selectUser);

  return (
    <StyledBox>
      <StyledAvatar src={user?.profilePicture} />
      <Typography variant="h2">{user?.name ?? "-"}</Typography>

      <Typography variant="h5">Email: {user?.email ?? "-"}</Typography>
      <Typography variant="h5">Telefone: {user?.cellphone ?? "-"}</Typography>
      <Typography variant="h5">
        Data de Nascimento: {user?.birthDate ?? "-"}
      </Typography>
    </StyledBox>
  );
}

export default Account;
