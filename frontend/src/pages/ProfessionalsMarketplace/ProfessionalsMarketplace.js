import { useState, useEffect, useCallback } from "react";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, Pagination, styled } from "@mui/material";

import { ProfessionalCard } from "../../components/ProfessionalCard";
import { getPaginatedProfessionals } from "../../services";

import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [professionals, setProfessionals] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);

  const setDebouncedSearch = useCallback(
    debounce((nextValue) => setSearchText(nextValue), 800),
    []
  );

  const LIMIT = 10;

  const navigate = useNavigate();

  const handleChange = (event) => setDebouncedSearch(event.target.value);

  const handleChangePage = (event, value) => setPage(value);

  const handleSeeMoreClick = (id) => navigate(`/profile/${id}`);

  const getProfessionals = async () => {
    await getPaginatedProfessionals(searchText, page, LIMIT)
      .then((response) => {
        setNumOfPages(Number(response.headers["x-total-count"]) / 10);
        setProfessionals(response.data);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro");
        console.log(error);
      });
  };

  const getProfessionalsCallback = useCallback(
    () => getProfessionals(),
    [page, searchText]
  );

  useEffect(() => {
    getProfessionalsCallback();
  }, [page, searchText]);

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

      {professionals.length > 0 &&
        professionals.map((professional, index) => (
          <ProfessionalCard
            professional={professional}
            onClick={() => handleSeeMoreClick(professional.id)}
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

export default ProfessionalsMarketplace;
