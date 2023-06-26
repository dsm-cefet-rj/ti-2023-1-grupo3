import { useState, useCallback, useMemo } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, Pagination, styled } from "@mui/material";
import { AppointmentCard } from "../../components/AppointmentCard";
import {
  selectAllAppointments,
  selectAppointmentsThunksStatus,
} from "../../store/slices/appointmentSlice";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientAppointments } from "../../store";
import { selectToken } from "../../store/slices/userSlice";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

function Appointments() {
  const token = useSelector(selectToken);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const setDebouncedSearch = useCallback(
    debounce((nextValue) => setSearchText(nextValue), 800),
    []
  );

  const navigate = useNavigate();

  const handleChange = (event) => setDebouncedSearch(event.target.value);

  const handleChangePage = (event, value) => setPage(value);

  const handleSeeMoreClick = (id) => navigate(`/appointment/${id}`);

  const appointments = useSelector((state) => selectAllAppointments(state));
  const status = useSelector(selectAppointmentsThunksStatus);

  const dispatch = useDispatch();

  const shouldLoadStatus = ["not_loaded", "saved", "deleted"];
  const shouldLoad = shouldLoadStatus.includes(status);

  useEffect(() => {
    shouldLoad && dispatch(getClientAppointments(token));
  }, [shouldLoad]);

  const [numOfPages, setNumOfPages] = useState();

  const filteredAppointments = useMemo(() => {
    const beginSlice = page === 1 ? 0 : (page - 1) * 10;
    const endSlice = page * 10;

    let appointmentsList = appointments ?? [];

    //setNumOfPages(Math.ceil(appointments.length / 10));

    if (searchText && searchText !== "") {
      appointmentsList = appointmentsList.filter((appointment) =>
        (appointment.professional.user.name || "")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );

      setPage(1);
      setNumOfPages(Math.ceil(appointmentsList.length / 10));
    }

    const slice = appointmentsList.slice(beginSlice, endSlice);

    return slice;
  }, [appointments, page, searchText]);

  return (
    <StyledBox>
      <TextField
        placeholder="Encontre um appointment"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        fullWidth
      />

      {filteredAppointments.map((appointment, index) => (
        <AppointmentCard
          appointment={appointment}
          onClick={() => handleSeeMoreClick(appointment.id)}
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
