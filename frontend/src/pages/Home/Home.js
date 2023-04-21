import { useState, useEffect, useCallback } from "react";

import { ImageCarousel, MediaCard, VerticalStepper } from "../../components";
import { getHighestRatedProfessionals } from "../../services";
import { slides, steps } from "./Home.constants";

import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function Home() {
  const theme = useTheme();
  const matchesXl = useMediaQuery(theme.breakpoints.down("xl"));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

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

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () =>
    currentStep < steps.length ? setCurrentStep(currentStep + 1) : null;

  const handlePrevStep = () =>
    currentStep > 0 ? setCurrentStep(currentStep - 1) : null;

  return (
    <>
      <ImageCarousel>{slides}</ImageCarousel>
      <Box
        m={2}
        mt={2}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography variant={"h6"} textAlign={"center"} mb={2}>
          Descubra um mundo de possibilidades enquanto nossos psicólogos
          especializados fornecem as ferramentas e orientações necessárias para
          aprimorar seu bem-estar mental, desbloquear suas forças ocultas e
          construir relacionamentos saudáveis. De aconselhamento personalizado a
          técnicas com base em evidências, nossa plataforma oferece uma riqueza
          de recursos para ajudá-lo a prosperar. Junte-se a nós hoje mesmo e dê
          o primeiro passo em direção a um você mais feliz e saudável!
        </Typography>

        <Divider flexItem sx={{ mb: 3 }} />

        <Box
          mb={5}
          display={"flex"}
          flexDirection={matchesMd ? "column" : "row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box mb={matchesMd ? 3 : 0} sx={{ maxWidth: 500 }}>
            <Typography variant="h3" mr={10}>
              Veja algumas de nossas avaliações
            </Typography>
          </Box>

          <VerticalStepper
            activeStep={currentStep}
            handleNext={handleNextStep}
            handleBack={handlePrevStep}
          >
            {steps}
          </VerticalStepper>
        </Box>

        <Divider flexItem sx={{ mb: 3 }} />

        <Typography variant="h4" mb={3}>
          Conheça nossos especialistas
        </Typography>

        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={matchesXl ? "center" : "space-between"}
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
