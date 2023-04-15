import * as React from "react";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box, InputLabel, styled } from "@mui/material";

import { Navbar } from "../../components";
import { getLocationsByProfessionalId } from "../../services";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";
import { createHourList } from "../../helpers";
import { useMemo } from "react";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

function ScheduleAppointment() {
  const [locations, setLocations] = useState([]);
  const [professional, setProfessional] = useState();

  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    console.log(location);
    console.log(time);
    window.alert(`Sua consulta foi marcada!`);
  };

  const { id } = useParams();

  const getLocations = async () => {
    await getLocationsByProfessionalId(id)
      .then((response) => {
        setLocations(response.data);
        setProfessional(response.data?.[0]?.professional ?? undefined);
      })
      .catch((error) => console.log(error));
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
    <>
      <Navbar />
      <StyledBox>
        <Typography variant="h2">Agendamento</Typography>
        <StyledBox>
          <InputLabel id="local">Local: </InputLabel>
          <Select
            value={location}
            onChange={({ target }) => setLocation(target.value)}
            name="local"
            id="local"
          >
            <MenuItem value="" disabled />
            {locations.length > 0 &&
              locations.map((loc, index) => (
                <MenuItem value={loc.label} key={index}>
                  {loc.label}
                </MenuItem>
              ))}
          </Select>
        </StyledBox>

        <StyledBox>
          <InputLabel id="time">Horário: </InputLabel>
          <Select
            value={time}
            onChange={({ target }) => setTime(target.value)}
            name="time"
            id="time"
          >
            {scheduledHours.map((hour, index) => (
              <MenuItem value={hour} key={index}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        </StyledBox>

        <StyledBox>
          <Button onClick={handleSubmit}>Marcar</Button>
        </StyledBox>
      </StyledBox>
    </>
  );
}

export default ScheduleAppointment;
