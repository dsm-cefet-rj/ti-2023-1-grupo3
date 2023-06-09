import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import { ClientForm } from "../../components/ClientForm";
import styled from "styled-components";
import ProfessionalForm from "../../components/ProfessionalForm/ProfessionalForm";

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

function SignUp() {
  const [userType, setUserType] = useState("CLIENT");

  const handleUserTypeChange = (event) => setUserType(event.target.value ?? "");

  return (
    <StyledBox>
      <StyledContentBox>
        <FormControl>
          <FormLabel>Tipo de perfil</FormLabel>
          <RadioGroup value={userType} onChange={handleUserTypeChange}>
            <FormControlLabel
              value="CLIENT"
              control={<Radio />}
              label="Paciente"
            />
            <FormControlLabel
              value="PROFESSIONAL"
              control={<Radio />}
              label="Psicólogo"
            />
          </RadioGroup>
        </FormControl>

        {userType === "CLIENT" && <ClientForm />}
        {userType === "PROFESSIONAL" && <ProfessionalForm />}
      </StyledContentBox>
      {/* <Controller
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
      /> */}
    </StyledBox>
  );
}

export default SignUp;
