import * as React from "react";
import { useMemo } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box, InputLabel, styled, useTheme } from "@mui/material";

import { createAppointment } from "../../services";
import { createHourList } from "../../helpers";
import { initialValues, validationSchema } from "./validation";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { selectProfessionalById } from "../../store/slices/professionalSlice";

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
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
    padding: 20,
  };
});

function ScheduleAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const professional = useSelector((state) =>
    selectProfessionalById(state, id)
  );

  const onSubmit = async () => {
    const appointment = {
      locationId: values.location.id,
      time: values.time,
      professionalId: Number(id),
      userId: Number(user?.id),
    };

    await createAppointment(appointment)
      .then(() => {
        toast.success("Seu agendamento foi realizado com sucesso");
        navigate(-2);
      })
      .catch(() => toast.error("Ocorreu um erro"));
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const scheduledHours = useMemo(
    () => createHourList(professional?.scheduledHours ?? []),
    [professional, professional?.scheduledHours]
  );

  return (
    <StyledBox>
      <Typography variant="h3">Agendamento</Typography>

      <StyledForm onSubmit={handleSubmit}>
        <Box marginBottom={2}>
          <InputLabel id="local">Local:</InputLabel>
          <Select
            value={values.location}
            onChange={handleChange("location")}
            onBlur={handleBlur("location")}
            name="local"
            id="local"
            fullWidth
          >
            <MenuItem value="" disabled />
            {professional?.locations.length > 0 ? (
              professional?.locations.map((loc, index) => (
                <MenuItem value={loc} key={index}>
                  {loc.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Não existem localidades disponíveis no momento
              </MenuItem>
            )}
          </Select>
        </Box>

        <Box marginBottom={5}>
          <InputLabel id="time">Horário: </InputLabel>
          <Select
            value={values.time}
            onChange={handleChange("time")}
            onBlur={handleBlur("time")}
            name="time"
            id="time"
            fullWidth
          >
            {scheduledHours.map((hour, index) => (
              <MenuItem value={hour} key={index}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Button type="submit" variant="contained" fullWidth>
          Marcar
        </Button>
      </StyledForm>
    </StyledBox>
  );
}

export default ScheduleAppointment;
