import { useState, useEffect } from "react";

import { Box, Pagination, styled } from "@mui/material";

import { AppointmentCard } from "../../components/AppointmentCard";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../store/slices/userSlice";
import {
  deleteAppointment,
  getClientAppointments,
  getProfessionalAppointments,
} from "../../store";
import {
  selectAllAppointments,
  selectAppointmentsThunksStatus,
} from "../../store/slices/appointmentSlice";
import { useMemo } from "react";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

function Appointments() {
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  const user = useSelector(selectLoggedUser);
  const appointments = useSelector(selectAllAppointments);
  const status = useSelector(selectAppointmentsThunksStatus);

  const handleChangePage = (value) => setPage(value);

  const shouldLoadStatus = ["not_loaded", "saved", "deleted"];
  const shouldLoad = shouldLoadStatus.includes(status);

  const dispatch = useDispatch();

  const removeAppointment = (id) => {
    dispatch(deleteAppointment(id))
      .then(() => toast.success("Consulta deletada com sucesso"))
      .catch((error) => {
        toast.error("Ocorreu um erro");
        console.log(error);
      });
  };

  useEffect(() => {
    if (!user || !shouldLoad) return;

    if (user.type === "PROFESSIONAL")
      dispatch(getProfessionalAppointments(Number(user.id)));

    dispatch(getClientAppointments(Number(user.id)));
  }, [shouldLoad, page]);

  const filteredAppointments = useMemo(() => {
    const beginSlice = page === 1 ? 0 : (page - 1) * 10;
    const endSlice = page * 10;

    let appointmentsList = appointments ?? [];

    setNumOfPages(Math.ceil(appointments.length / 10));

    const slice = appointmentsList.slice(beginSlice, endSlice);

    return slice;
  }, [appointments, page]);

  return (
    <StyledBox>
      {filteredAppointments.map((appointment, index) => (
        <AppointmentCard
          appointment={appointment}
          onClick={() => removeAppointment(appointment.id)}
          key={index}
        />
      ))}

      <Pagination
        defaultPage={1}
        page={page}
        count={numOfPages}
        onChange={handleChangePage}
      />
    </StyledBox>
  );
}

export default Appointments;
