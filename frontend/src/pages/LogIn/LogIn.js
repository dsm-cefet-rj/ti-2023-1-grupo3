import { Box, styled, useTheme } from "@mui/material";
import { LoginForm } from "../../components";

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

export default function Login() {
  return (
    <StyledBox>
      <StyledContentBox>
        <LoginForm />
      </StyledContentBox>
    </StyledBox>
  );
}
