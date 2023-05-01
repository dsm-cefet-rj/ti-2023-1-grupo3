import { useState, useEffect, useMemo } from "react";

import { ImageCarousel, MediaCard, VerticalStepper } from "../../components";
import { slides, steps } from "./Home.constants";

import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { getProfessionals } from "../../store";
import {
  selectAllProfessionals,
  selectProfessionalsThunksStatus,
} from "../../store/slices/professionalSlice";
import { initializeUser } from "../../store/slices/userSlice";

function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const matchesXl = useMediaQuery(theme.breakpoints.down("xl"));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  const professionals = useSelector(selectAllProfessionals);
  const status = useSelector(selectProfessionalsThunksStatus);

  const shouldLoadStatus = ["not_loaded", "saved", "deleted"];
  const shouldLoad = shouldLoadStatus.includes(status);

  useEffect(() => {
    dispatch(initializeUser(21));
  }, []);

  useEffect(() => {
    shouldLoad && dispatch(getProfessionals());
  }, [shouldLoad]);

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () =>
    currentStep < steps.length ? setCurrentStep(currentStep + 1) : null;

  const handlePrevStep = () =>
    currentStep > 0 ? setCurrentStep(currentStep - 1) : null;

  const highestRateProfessionals = useMemo(() => {
    return (professionals ?? [])
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [professionals]);

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
          {highestRateProfessionals.map((professional, index) => (
            <MediaCard
              id={professional.id}
              professional={professional}
              key={index}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Home;
