import { useState, useEffect, useCallback } from "react";

import { Box, Pagination, styled } from "@mui/material";

import { AppointmentCard } from "../../components/AppointmentCard";
import {
  deleteAppointment,
  getPaginatedClientAppointments,
  getPaginatedProfessionalAppointments,
} from "../../services";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

function Appointments() {
  const [page, setPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);

  const user = useSelector(selectUser);

  const LIMIT = 10;

  const handleChangePage = (value) => setPage(value);

  const removeAppointment = async (id) => {
    await deleteAppointment(id)
      .then(() => toast.success("Consulta deletada com sucesso"))
      .catch((error) => {
        toast.error("Ocorreu um erro");
        console.log(error);
      });
  };

  const getAppointments = async () => {
    if (!user) return;

    if (user.type === "PROFESSIONAL")
      await getPaginatedProfessionalAppointments(Number(user.id), page, LIMIT)
        .then((response) => {
          setNumOfPages(Number(response.headers["x-total-count"]) / 10);
          setAppointments(response.data);
        })
        .catch((error) => {
          toast.error("Ocorreu um erro");
          console.log(error);
        });

    await getPaginatedClientAppointments(Number(user.id), page, LIMIT)
      .then((response) => {
        setNumOfPages(Number(response.headers["x-total-count"]) / 10);
        setAppointments(response.data);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro");
        console.log(error);
      });
  };

  const getAppointmentsCallback = useCallback(() => getAppointments(), [page]);

  useEffect(() => {
    getAppointmentsCallback();
  }, [page]);

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

export default Appointments;
