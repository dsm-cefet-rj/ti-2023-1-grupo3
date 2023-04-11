import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, styled } from "@mui/material";

import { ProfessionalCard } from "../../components/ProfessionalCard";
import { professionalsMock } from "./professionals.mock";
import { useMemo } from "react";
import { useState } from "react";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

function ProfessionalsMarketplace() {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => setSearchText(event.target.value);

  const filteredProfessionals = useMemo(
    () =>
      searchText
        ? professionalsMock.filter((professional) => {
            const name = professional.name.toLowerCase();
            const search = searchText.toLowerCase();

            return name.indexOf(search) > -1;
          })
        : professionalsMock,
    [searchText]
  );

  console.log(searchText, filteredProfessionals);

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
        <ProfessionalCard professional={professional} key={index} />
      ))}
    </StyledBox>
  );
}

export default ProfessionalsMarketplace;
