import * as React from "react";
import { useState, useEffect, useCallback } from "react";

import Typography from "@mui/material/Typography";
import { Avatar, styled } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";

import { useParams } from "react-router-dom";
import { getProfessionalById } from "../../services";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  gap: "20px",
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: 200,
  height: 200,
}));

function ProfessionalProfile() {
  const { id } = useParams();

  const [professional, setProfessional] = useState();

  const getProfessional = async () => {
    await getProfessionalById(id)
      .then((response) => setProfessional(response.data))
      .catch((error) => console.log(error));
  };

  const getProfessionalCallback = useCallback(() => getProfessional(), []);

  useEffect(() => {
    getProfessionalCallback();
  }, []);

  return (
    <StyledBox>
      <StyledAvatar />
      <Typography variant="h2">{professional?.name ?? "-"}</Typography>

      <Typography variant="body1">
        {professional?.rating ?? "-"} <StarIcon />
      </Typography>

      <Typography variant="h5">
        Área de atuação: {professional?.jobTitle ?? "-"}
      </Typography>

      <Typography variant="h5">CFP Nº {professional?.cfp ?? "-"}</Typography>

      <Typography variant="h5">
        Valor: R$ {professional?.hourRate ?? "-"} / 50 min
      </Typography>

      <Typography variant="h6">{professional?.description ?? "-"}</Typography>

      {professional && professional.specialities.length > 0 && (
        <Box>
          <Typography variant="h6">Especialidades:</Typography>
          <ul>
            {professional.specialities.map((speciality, index) => (
              <li key={index}>
                <Typography>{speciality}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Button variant="contained">Marcar consulta</Button>
    </StyledBox>
  );
}

export default ProfessionalProfile;
