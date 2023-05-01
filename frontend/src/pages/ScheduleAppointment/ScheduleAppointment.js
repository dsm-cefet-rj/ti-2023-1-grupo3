import * as React from "react";
import { useMemo } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  InputLabel,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { createHourList } from "../../helpers";
import { initialValues, validationSchema } from "./validation";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { selectProfessionalById } from "../../store/slices/professionalSlice";
import { createAppointment } from "../../store";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

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

  const theme = useTheme();

  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  const user = useSelector(selectUser);
  const professional = useSelector((state) =>
    selectProfessionalById(state, id)
  );

  const dispatch = useDispatch();

  const onSubmit = () => {
    const appointment = {
      locationId: values.location.id,
      time: values.time,
      date: values.date,
      professionalId: Number(id),
      userId: Number(user?.id),
    };

    dispatch(createAppointment(appointment))
      .then(() => {
        toast.success("Seu agendamento foi realizado com sucesso");
        navigate(-2);
      })
      .catch(() => toast.error("Ocorreu um erro"));
  };

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
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

        <Box
          display={"flex"}
          flexDirection={matchesSm ? "column" : "row"}
          gap={2}
          marginBottom={5}
        >
          <Box flex={1}>
            <InputLabel id="date">Data: </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ paddingTop: 0, flexDirection: "column" }}
              >
                <DesktopDatePicker
                  id="date"
                  format="DD/MM/YYYY"
                  disablePast
                  required
                  value={values.date}
                  onChange={(value) => setFieldValue("date", value)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box flex={1}>
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
        </Box>

        <Button type="submit" variant="contained" fullWidth>
          Marcar
        </Button>
      </StyledForm>
    </StyledBox>
  );
}

export default ScheduleAppointment;
