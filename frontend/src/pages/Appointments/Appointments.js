import { useState, useEffect } from "react";
import { Box, Pagination, styled } from "@mui/material";
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
      dispatch(getProfessionalAppointments(user.id));

    dispatch(getClientAppointments(user.id));
  }, [shouldLoad, page, dispatch, user]);

  const filteredAppointments = useMemo(() => {
    const beginSlice = page === 1 ? 0 : (page - 1) * 10;
    const endSlice = page * 10;

    let appointmentsList = appointments ?? [];

    setNumOfPages(Math.ceil(appointmentsList.length / 10));

    const slice = appointmentsList.slice(beginSlice, endSlice);

    return slice;
  }, [appointments, page]);

  return (
    <StyledBox>
      {filteredAppointments.map((appointment) => (
        <div key={appointment._id}>
          <h3>
            {appointment.nome_profissional} {appointment.sobrenome_profissional}
          </h3>
          <p>Lugar: {appointment.lugar}</p>
          <p>Data: {appointment.data}</p>
          <p>Hora: {appointment.hora}</p>
          <img src={appointment.foto_url} alt="Foto" />
          <button onClick={() => removeAppointment(appointment._id)}>
            Deletar
          </button>
        </div>
      ))}

      <Pagination
        defaultPage={1}
        page={page}
        count={numOfPages}
        onChange={(_, value) => handleChangePage(value)}
      />
    </StyledBox>
  );
}

export default Appointments;
