import { useState } from "react";
import { getHighestRatedProfessionals } from "../../services";
import { useCallback } from "react";
import { useEffect } from "react";
import { ImageCarousel, MediaCard } from "../../components";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { slides } from "./Home.constants";

function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xl"));

  const [professionals, setProfessionals] = useState([]);

  const getProfessionals = async () => {
    await getHighestRatedProfessionals().then((response) =>
      setProfessionals(response.data)
    );
  };

  const getProfessionalsCallback = useCallback(() => getProfessionals(), []);

  useEffect(() => {
    getProfessionalsCallback();
  }, []);

  return (
    <>
      <ImageCarousel>{slides}</ImageCarousel>
      <Box m={2}>
        <Typography variant="h4" mb={2}>
          Melhor avaliados
        </Typography>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={matches ? "center" : "space-between"}
          gap={2}
        >
          {professionals.length > 0 &&
            professionals.map((professional, index) => (
              <MediaCard professional={professional} key={index} />
            ))}
        </Box>
      </Box>
    </>
  );
}

export default Home;
