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

import { createHourList, formatHourList } from "../../helpers";
import { initialValues, validationSchema } from "./validation";

import { useDispatch, useSelector } from "react-redux";
import { selectProfessionalById } from "../../store/slices/professionalSlice";
import { createAppointment } from "../../store";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { getDate, getMonth, getYear, toDate } from "date-fns";
import { updateProfessional } from "../../services";
import { useEffect } from "react";
import {
  selectAppointmentsThunksError,
  selectAppointmentsThunksStatus,
  setStatus,
} from "../../store/slices/appointmentSlice";
import { setStatus as setProfessionalStatus } from "../../store/slices/professionalSlice";
import { selectLoggedUser } from "../../store/slices/userSlice";

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

  const user = useSelector(selectLoggedUser);
  const professional = useSelector((state) =>
    selectProfessionalById(state, id)
  );

  const status = useSelector(selectAppointmentsThunksStatus);
  const error = useSelector(selectAppointmentsThunksError);

  const dispatch = useDispatch();

  const onSubmit = () => {
    const { location, time, date } = values;

    const appointment = {
      locationId: location.id,
      time: time,
      date: date,
      professionalId: Number(id),
      userId: Number(user?.id),
    };

    const timeList = time.split(":");

    const newDate = new Date(date);

    const scheduledTime = toDate(
      new Date(
        getYear(newDate),
        getMonth(newDate),
        getDate(newDate),
        timeList[0],
        timeList[1]
      )
    );

    const hoursList = [...professional.scheduledHours, scheduledTime];

    dispatch(createAppointment(appointment));
    dispatch(updateProfessional(Number(id), { scheduledHours: hoursList }));
  };

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: onSubmit,
    });

  const scheduledHours = useMemo(() => {
    if (!values.date) return [];

    const hiddenHours = formatHourList(
      professional?.scheduledHours ?? [],
      values.date
    );

    return createHourList(hiddenHours);
  }, [professional, professional?.scheduledHours, values.date]);

  useEffect(() => {
    if (status === "saved") {
      toast.success("Seu agendamento foi realizado com sucesso");
      dispatch(setStatus("not_loaded"));
      dispatch(setProfessionalStatus("not_loaded"));
      navigate(-2);
    }

    if (error) {
      console.error(error);
      toast.error("Ocorreu um erro");
    }
  }, [status, error]);

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
            {professional?.locations && professional?.locations.length > 0 ? (
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
            <InputLabel>Data: </InputLabel>
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
              disabled={!values.date}
            >
              {scheduledHours.length > 0 ? (
                scheduledHours.map((hour, index) => (
                  <MenuItem value={hour} key={index}>
                    {hour}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  Não existem horários disponíveis
                </MenuItem>
              )}
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
