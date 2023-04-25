import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { Box, Pagination, styled } from "@mui/material";

import { AppointmentCard } from "../../components/AppointmentCard";
import { getPaginatedAppointments } from "../../services";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

function Schedules() {
  const [searchText] = useState("");
  const [page, setPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);

  const LIMIT = 10;

  const navigate = useNavigate();

  const handleChangePage = (value) => setPage(value);

  const removeAppointment = (id) => {
    axios.delete('http://localhost:3000/appointments/' + id)
      .then(function(response) {
        this.setState({
          filtered: response
        })
      }).catch(function(error) {
        console.log(error)
      })
  }

  const getAppointments = async () => {
    await getPaginatedAppointments(searchText, page, LIMIT)
      .then((response) => {
        setNumOfPages(Number(response.headers["x-total-count"]) / 10);
        setAppointments(response.data);
      })
      .catch((error) => {
        toast("Ocorreu um erro");
        console.log(error);
      });
  };

  const getAppointmentsCallback = useCallback(
    () => getAppointments(),
    [page, searchText]
  );

  useEffect(() => {
    getAppointmentsCallback();
  }, [page, searchText]);

  return (
    <StyledBox>
      {appointments.length > 0 &&
        appointments.map((appointment, index) => (
          <AppointmentCard
            appointment={appointment}
            onClick={() => removeAppointment(appointment.id)}
            key={index}
          />
        ))}

      <Pagination
        defaultPage={1}
        count={numOfPages}
        onChange={handleChangePage}
      />
    </StyledBox>
  );
}

export default Schedules;
