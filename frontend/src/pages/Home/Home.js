import { useState } from "react";
import { getHighestRatedProfessionals } from "../../services";
import { useCallback } from "react";
import { useEffect } from "react";
import { MediaCard } from "../../components";
import { Grid, Typography } from "@mui/material";

function Home() {
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
    <Grid conteiner m={2}>
      <Grid item mb={1}>
        <Typography variant="h4">Melhor Avaliados</Typography>
      </Grid>
      <Grid conteiner display={"flex"} justifyContent={"space-between"}>
        {professionals.length > 0 &&
          professionals.map((professional, index) => (
            <Grid item key={index}>
              <MediaCard professional={professional} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default Home;
