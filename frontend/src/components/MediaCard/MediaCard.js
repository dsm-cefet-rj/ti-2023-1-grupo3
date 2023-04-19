import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

import { useNavigate } from "react-router-dom";

function MediaCard(props) {
  const { professional } = props ?? {};

  const navigate = useNavigate();

  const handleSeeMoreClick = () => navigate(`/profile/${professional.id}`);

  const handleScheduleAppointmentClick = () =>
    navigate(`/schedule-appointment/${professional.id}`);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={professional?.profilePicture} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {professional?.name}
        </Typography>
        <Typography color={"text.secondary"}>
          {professional.rating} <StarIcon />
        </Typography>
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
    </Card>
  );
}

export default MediaCard;
