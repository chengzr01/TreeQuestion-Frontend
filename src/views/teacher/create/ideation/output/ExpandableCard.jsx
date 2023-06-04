import * as React from "react";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Paper,
  Grid,
  Typography,
  CardActions,
  Collapse,
  IconButton,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import palette from "../../../../../theme/palette";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ExpandableCard({
  title,
  subheader,
  content,
  index,
  selectedKnowledge,
  setSelectedKnowledge,
}) {
  const [expanded, setExpanded] = useState(false);
  const handleCheckBoxChange = (event) => {
    var newSelectedKnowledge = selectedKnowledge;
    if (event.target.checked) {
      if (newSelectedKnowledge.indexOf(index) < 0) {
        newSelectedKnowledge.push(index);
      }
    } else {
      if (newSelectedKnowledge.indexOf(index) >= 0) {
        newSelectedKnowledge.splice(newSelectedKnowledge.indexOf(index), 1);
      }
    }
    setSelectedKnowledge(newSelectedKnowledge);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper
      sx={{
        m: 2,
        p: 2,
        border: 1,
        borderColor: "grey.400",
        "&:hover": {
          backgroundColor: "grey.200",
          opacity: [0.75, 0.75, 0.75],
        },
      }}
    >
      <Typography variant="h4" align="center">
        {title.toUpperCase()}
      </Typography>
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            {subheader.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
      <CardActions disableSpacing>
        <Checkbox
          {...label}
          onChange={handleCheckBoxChange}
          sx={{ color: palette.primary.main }}
        />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography variant="body2" sx={{ color: "grey.500" }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Typography>
      </Collapse>
    </Paper>
  );
}
