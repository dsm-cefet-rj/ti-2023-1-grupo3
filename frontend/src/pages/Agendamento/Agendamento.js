import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, InputLabel, styled } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Navbar } from "../../components";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

function Agendamento() {
  const [local, setLocal] = useState("");
  const [horario, setHorario] = useState("");

  const handleSubmit = () => {
    console.log(local);
    console.log(horario);
    window.alert(`Sua consulta foi marcada!`);
  };

  return (
    <>
      <Navbar></Navbar>
      <StyledBox>
        <Typography variant="h2">Agendamento</Typography>
        <StyledBox>
          <InputLabel id="local">Local: </InputLabel>
          <Select
            value={local}
            onChange={({ target }) => setLocal(target.value)}
            name="horario"
            id="horario"
          >
            <MenuItem value="" disabled></MenuItem>
            <MenuItem value="Local1">Local 1</MenuItem>
            <MenuItem value="Local2">Local 2</MenuItem>
          </Select>
        </StyledBox>

        <StyledBox>
          <InputLabel id="horario">Horário: </InputLabel>
          <Select
            value={horario}
            onChange={({ target }) => setHorario(target.value)}
            name="horario"
            id="horario"
          >
            <MenuItem value="9">09:00</MenuItem>
            <MenuItem value="10">10:00</MenuItem>
            <MenuItem value="11">11:00</MenuItem>
            <MenuItem value="12">12:00</MenuItem>
            <MenuItem value="13">13:00</MenuItem>
            <MenuItem value="14">14:00</MenuItem>
            <MenuItem value="15">15:00</MenuItem>
            <MenuItem value="16">16:00</MenuItem>
            <MenuItem value="17">17:00</MenuItem>
          </Select>
        </StyledBox>

        <StyledBox>
          <Button onClick={handleSubmit}>Marcar</Button>
        </StyledBox>
      </StyledBox>
    </>
  );
}

export default Agendamento;
