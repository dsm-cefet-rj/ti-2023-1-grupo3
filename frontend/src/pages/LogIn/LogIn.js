import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});

export default function Login() {
  const navigate = useNavigate();
  const { handleSubmit, formState, control } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    try {
      const responseUsers = await axios.get(
        `http://localhost:3000/users?email=${values.email}&password=${values.password}`
      );
      const { token: tokenUsers } = responseUsers.data;

      const responseProfessionals = await axios.get(
        `http://localhost:3000/users?email=${values.email}&password=${values.password}`
      );
      const { token: tokenProfessionals } = responseProfessionals.data;

      if (tokenUsers || tokenProfessionals) {
        const token = tokenUsers || tokenProfessionals;
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        // Caso contrário, exibe uma mensagem de erro
        setError("Email ou senha inválidos");
      }
    } catch (error) {
      console.error(error);
      setError("Ocorreu um erro ao fazer login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="email"
            label="Email"
            margin="normal"
            error={!!errors.email}
            helperText={errors?.email?.message}
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="password"
            label="Senha"
            type="password"
            margin="normal"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" fullWidth>
        Entrar
      </Button>

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </form>
  );
}
