import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./validation";
import {
  selectUserThunksError,
  selectUserThunksStatus,
} from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../store";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const status = useSelector(selectUserThunksStatus);
  const error = useSelector(selectUserThunksError);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    if (!values) return;

    const loginData = {
      username: values.email,
      password: values.password,
    };

    dispatch(login(loginData));
  };

  const {
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const handleEmailChange = (event) =>
    setFieldValue("email", event.target.value ?? "");

  const handleEmailBlur = () => setFieldTouched("email", true);

  const handlePasswordChange = (event) =>
    setFieldValue("password", event.target.value ?? "");

  const handlePasswordBlur = () => setFieldTouched("password", true);

  const handleClickCreateNewAccount = () => navigate("/signup");

  useEffect(() => {
    if (status === "success") {
      toast.success("Login realizado com sucesso");
      navigate("/");
    } else if (error) {
      console.error(error);
      toast.error("Ocorreu um erro");
    }
  }, [status, error]);

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" fontWeight={"bold"} my={2}>
        Faça login
      </Typography>

      <Box mb={2}>
        <TextField
          label="Email"
          value={values.email}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          fullWidth
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={values.password}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          fullWidth
        />
      </Box>

      <Button
        type="button"
        variant="outlined"
        onClick={handleClickCreateNewAccount}
        sx={{
          mb: 1,
        }}
        fullWidth
      >
        Criar nova conta
      </Button>

      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
