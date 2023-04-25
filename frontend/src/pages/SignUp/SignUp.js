import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const initialValues = {
  name: "",
  email: "",
  password: "",
  cpf: "",
  cellphone: "",
  birthDate: null,
  crp: "",
  userType: "",
  complement: "",
  specialities: "",
  locations: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
  cellphone: yup.string().required("Campo obrigatório"),
  birthDate: yup.date().required("Campo obrigatório"),
});

export default function Formulario() {
  const navigate = useNavigate();
  const { handleSubmit, formState, control, watch } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const userType = watch("userType");
  console.log(userType);
  const onSubmit = async (values) => {
    console.log(values);
    if (!values) {
      return;
    }
    try {
      await axios.post(`http://localhost:3000/${userType}`, values);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro ao salvar seus dados. Tente novamente mais tarde."
      );
    }
  };

  const { errors } = formState;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="userType"
        control={control}
        render={({ field }) => (
          <FormControl component="fieldset">
            <FormLabel component="legend">Tipo de perfil</FormLabel>
            <RadioGroup
              aria-label="userType"
              name="userType"
              {...field}
              required
            >
              <FormControlLabel
                value="users"
                control={<Radio />}
                label="Paciente"
              />
              <FormControlLabel
                value="professionals"
                control={<Radio />}
                label="Psicólogo"
              />
            </RadioGroup>
          </FormControl>
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="name"
            label="Nome"
            error={!!errors.name}
            helperText={errors?.name?.message}
            variant="outlined"
            autoFocus
            fullWidth
            required
          />
        )}
      />
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
            autoFocus
            fullWidth
            required
          />
        )}
      />
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                {...field}
                label="Data de Nascimento"
                margin="normal"
                format="DD/MM/YYYY"
                disableFuture
                fullWidth
                required
              />
            </DemoContainer>
          </LocalizationProvider>
        )}
      />
      <Controller
        name="cellphone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="cellphone"
            label="Telefone"
            margin="normal"
            error={!!errors.cellphone}
            helperText="Ex: 21 12345-1234"
            variant="outlined"
            autoFocus
            fullWidth
            required
            onBlur={(e) => {
              const cellphoneRegex = /^(\d{2} )?(\d{4,5}-\d{4})$/;
              if (cellphoneRegex.test(e.target.value)) {
                e.target.setCustomValidity("");
              } else {
                e.target.setCustomValidity(
                  "Insira um número de telefone válido"
                );
              }
            }}
          />
        )}
      />
      <Controller
        name="cpf"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="cpf"
            label="CPF"
            margin="normal"
            error={!!errors.cpf}
            helperText="Ex: 123.456.789-10"
            variant="outlined"
            autoFocus
            fullWidth
            required
            onBlur={(e) => {
              const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
              if (cpfRegex.test(e.target.value)) {
                e.target.setCustomValidity("");
              } else {
                e.target.setCustomValidity("Insira um número de CPF válido");
              }
            }}
          />
        )}
      />
      {userType == "professionals" && (
        <Controller
          name="crp"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="crp"
              label="CRP"
              margin="normal"
              error={!!errors.crp}
              helperText={errors?.crp?.message}
              variant="outlined"
              autoFocus
              fullWidth
              required
            />
          )}
        />
      )}
      {userType == "professionals" && (
        <Controller
          name="complement"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="complement"
              label="Descrição"
              margin="normal"
              error={!!errors.complement}
              helperText={errors?.complement?.message}
              rows={4}
              variant="outlined"
              autoFocus
              fullWidth
              required
            />
          )}
        />
      )}
      {userType == "professionals" && (
        <Controller
          name="specialities"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="specialities"
              label="Especialidades"
              type="string"
              margin="normal"
              variant="outlined"
              autoFocus
              fullWidth
              required
            />
          )}
        />
      )}

      {userType == "professionals" && (
        <Controller
          name="locations"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="locations"
              label="Local(is)"
              type="string"
              margin="normal"
              variant="outlined"
              fullWidth
              helperText="Caso haja mais de um, separe por vírgula"
              required
            />
          )}
        />
      )}
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
            required
            fullWidth
          />
        )}
      />
      <Button type="submit" variant="contained" fullWidth>
        Cadastrar
      </Button>
    </form>
  );
}
