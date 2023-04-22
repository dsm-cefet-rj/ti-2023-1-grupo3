import * as React from "react";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  Box,
  styled,
  useTheme,
  Button,
  RadioGroup,
  InputLabel,
  FormControlLabel,
  IconButton,
  OutlinedInput,
  FormControl,
  InputAdornment,
  TextField,
  FormLabel,
  Radio,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledForm = styled("form")(() => {
  const theme = useTheme();

  return {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
    padding: 20,
  };
});

function RegisterForm() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    cpf: "",
    phone: "",
    dateOfBirth: "",
    crp: "",
    userType: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
    cpf: yup.string().required("Campo obrigatório"),
    phone: yup.string().required("Campo obrigatório"),
    dateOfBirth: yup.string().required("Campo obrigatório"),
    crp: yup.string().when("userType", {
      is: "psychologist",
      then: yup.string().required("Campo obrigatório"),
      otherwise: yup.string(),
    }),
  });
  const handleSubmit = () => {
    toast.success("Cadastro realizado com sucesso!");
    navigate("/");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleUserTypeChange = (event) => {
    const { value } = event.target;
    if (value === "psychologist") {
      setShowCRP(true);
    } else {
      setShowCRP(false);
    }
  };
  const [showCRP, setShowCRP] = useState(false);
  return (
    <StyledBox>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Box>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de perfil</FormLabel>
                <RadioGroup
                  aria-label="userType"
                  name="userType"
                  value={values.userType}
                  required
                  onChange={(event) => {
                    handleChange(event);
                    handleUserTypeChange(event);
                  }}
                >
                  <FormControlLabel
                    value="patient"
                    control={<Radio />}
                    label="Paciente"
                  />
                  <FormControlLabel
                    value="psychologist"
                    control={<Radio />}
                    label="Psicólogo"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box>
              <TextField
                id="name"
                label="Nome"
                type="name"
                margin="normal"
                required
              />
            </Box>

            <Box>
              <TextField
                id="email"
                type="email"
                label="Email"
                variant="outlined"
                margin="normal"
                required
              />
              <ErrorMessage name="email" />
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Data de Nascimento"
                    margin="normal"
                    format="DD/MM/YYYY"
                    disableFuture
                    required
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <TextField
                id="phone"
                label="Telefone"
                name="phone"
                type="tel"
                margin="normal"
                required
                value={values.phone}
                onChange={handleChange}
                onBlur={(e) => {
                  const phoneRegex = /^(\d{2})?(\d{4,5}\d{4})$/;
                  if (phoneRegex.test(e.target.value)) {
                    e.target.setCustomValidity("");
                  } else {
                    e.target.setCustomValidity(
                      "Insira um número de telefone válido"
                    );
                  }
                }}
              />
            </Box>
            <Box>
              <TextField
                id="cpf"
                label="CPF"
                type="string"
                margin="normal"
                required
                value={values.cpf}
                onChange={handleChange}
                onBlur={(e) => {
                  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
                  if (cpfRegex.test(e.target.value)) {
                    e.target.setCustomValidity("");
                  } else {
                    e.target.setCustomValidity(
                      "Insira um número de CPF válido"
                    );
                  }
                }}
              />

              <ErrorMessage name="cpf" />
            </Box>
            {showCRP && (
              <Box>
                <TextField
                  id="crp"
                  label="CRP"
                  type="crp"
                  margin="normal"
                  required
                />
                <ErrorMessage name="crp" />
              </Box>
            )}

            <Box>
              <FormControl variant="outlined" margin="normal" required>
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
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
                  }
                  label="Password"
                />
              </FormControl>
            </Box>

            <Button type="submit" variant="contained">
              Cadastrar
            </Button>
          </StyledForm>
        )}
      </Formik>
    </StyledBox>
  );
}

export default RegisterForm;
