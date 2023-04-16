import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box, InputLabel, styled, useTheme } from "@mui/material";

import {
  createAppointment,
  getLocationsByProfessionalId,
} from "../../services";
import { createHourList } from "../../helpers";
import { initialValues, validationSchema } from "./validation";

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

  const [locations, setLocations] = useState([]);
  const [professional, setProfessional] = useState();

  const onSubmit = async () => {
    const appointment = {
      locationId: values.location.id,
      time: values.time,
      professionalId: id,
      clientId: 1, // TO DO => Vai pegar o id no store - Precisa setar o redux
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

  const getLocations = async () => {
    await getLocationsByProfessionalId(id)
      .then((response) => {
        setLocations(response.data);
        setProfessional(response.data?.[0]?.professional ?? undefined);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro");
        console.log(error);
      });
  };

  const getLocationsCallback = useCallback(() => getLocations(), []);

  useEffect(() => {
    getLocationsCallback();
  }, []);

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
            {locations.length > 0 &&
              locations.map((loc, index) => (
                <MenuItem value={loc} key={index}>
                  {loc.label}
                </MenuItem>
              ))}
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
