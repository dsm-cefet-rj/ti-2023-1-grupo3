import { useState, useCallback, useMemo } from "react";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, Pagination, styled } from "@mui/material";

import { ProfessionalCard } from "../../components/ProfessionalCard";
import {
  selectAllProfessionals,
  selectProfessionalsThunksStatus,
} from "../../store/slices/professionalSlice";

import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfessionals } from "../../store";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

function ProfessionalsMarketplace() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const setDebouncedSearch = useCallback(
    debounce((nextValue) => setSearchText(nextValue), 800),
    []
  );

  const navigate = useNavigate();

  const handleChange = (event) => setDebouncedSearch(event.target.value);

  const handleChangePage = (event, value) => setPage(value);

  const handleSeeMoreClick = (id) => navigate(`/profile/${id}`);

  const professionals = useSelector(selectAllProfessionals);
  const status = useSelector(selectProfessionalsThunksStatus);

  const dispatch = useDispatch();

  const shouldLoadStatus = ["not_loaded", "saved", "deleted"];
  const shouldLoad = shouldLoadStatus.includes(status);

  useEffect(() => {
    shouldLoad && dispatch(getProfessionals());
  }, [shouldLoad]);

  const [numOfPages, setNumOfPages] = useState();

  const filteredProfessionals = useMemo(() => {
    const beginSlice = page === 1 ? 0 : (page - 1) * 10;
    const endSlice = page * 10;

    let professionalsList = professionals ?? [];

    setNumOfPages(Math.ceil(professionals.length / 10));

    if (searchText && searchText !== "") {
      professionalsList = professionalsList.filter((prof) =>
        (prof.user.name || "").toLowerCase().includes(searchText.toLowerCase())
      );

      setPage(1);
      setNumOfPages(Math.ceil(professionalsList.length / 10));
    }

    const slice = professionalsList.slice(beginSlice, endSlice);

    return slice;
  }, [professionals, page, searchText]);

  return (
    <StyledBox>
      <TextField
        placeholder="Encontre um profissional"
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

      {filteredProfessionals.map((professional, index) => (
        <ProfessionalCard
          professional={professional}
          onClick={() => handleSeeMoreClick(professional.id)}
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

export default ProfessionalsMarketplace;
