import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
import { Box, Rating, styled, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectProfessionalById } from "../../store/slices/professionalSlice";

const StyledCard = styled(Card)(() => {
  const theme = useTheme();

  return {
    width: 345,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    marginBottom: 10,
  };
});

function MediaCard(props) {
  const { id } = props ?? {};

  const professional = useSelector((state) =>
    selectProfessionalById(state, id)
  );

  const navigate = useNavigate();

  const handleSeeMoreClick = () => navigate(`/profile/${id}`);

  const handleScheduleAppointmentClick = () =>
    navigate(`/schedule-appointment/${id}`);

  return (
    <StyledCard>
      <CardMedia
        sx={{ minHeight: 140 }}
        image={professional?.user?.profilePicture}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {professional?.user?.name}
        </Typography>
        <Box display={"flex"} gap={1} mb={1}>
          <Rating
            name="size-small"
            defaultValue={professional.rating ?? 0}
            size="small"
            readOnly
          />
          <Typography variant="body2">({professional.rating})</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {professional?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSeeMoreClick}>
          Ver mais
        </Button>
        <Button size="small" onClick={handleScheduleAppointmentClick}>
          Marcar uma consulta
        </Button>
      </CardActions>
    </StyledCard>
  );
}

export default MediaCard;
