import * as React from "react";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, CardMedia, styled } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const StyledCard = styled(Card)(() => ({
  width: "100%",
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: 100,
  height: 100,
}));

const StyledBox = styled(Box)(() => ({
  padding: 20,
  display: "flex",
  alignItems: "center",
}));

function ProfessionalCard(props) {
  const { professional, onClick } = props;

  return (
    <StyledCard elevation={2}>
      <StyledBox>
        <CardMedia
          component={() => <StyledAvatar src={professional.profilePicture} />}
        />
        <CardContent>
          <Typography variant="h5">{professional.name}</Typography>
          <Typography variant="caption" gutterBottom>
            {professional.jobTitle}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {professional.description}
          </Typography>
          <Typography color={"text.secondary"}>
            R$ {professional.hourRate} / 50 min
          </Typography>
          <Typography color={"text.secondary"}>
            {professional.rating} <StarIcon />
          </Typography>
          <Button onClick={onClick}>Ver mais</Button>
        </CardContent>
      </StyledBox>
    </StyledCard>
  );
}

export default ProfessionalCard;
