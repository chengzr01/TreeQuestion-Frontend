import * as React from "react";
import { useState } from "react";
// MaterialUI
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import TreeCard from "./TreeCard";

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

function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [treeList, setTreeList] = useState([
    {
      name: "Cybersecurity",
      teacher: "Qi Li",
      field: "Cybersecurity",
      concepts: [
        "Symmetric Encryption",
        "Asymmetric Encryption",
        "Hashing",
        "Message Authentication Code",
      ],
    },
  ]);
  const [selectedName, setSelectedName] = useState("None");

  const getPaperHeader = () => {
    if (selectedName === "None") return "🔴 No Tree Selected Now";
    else return '🟢 Tree "' + selectedName + '" Selected Now';
  };

  const getPaperContent = () => {
    if (selectedName === "None") return "Select an tree below!";
    else return "Answer the tree below!";
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper sx={{ width: "100%" }} {...props}>
      <CardHeader title={getPaperHeader()} subheader={getPaperContent()} />
      <CardActions disableSpacing>
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
        <CardContent>
          <Grid container spacing={2}>
            {treeList.map((tree) => {
              return (
                <Grid item xs={4}>
                  <TreeCard
                    name={tree.name}
                    teacher={tree.teacher}
                    field={tree.field}
                    concepts={tree.concepts}
                    setSelectedName={setSelectedName}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Collapse>
    </Paper>
  );
}

export default function TreeSelector(props) {
  return <RecipeReviewCard {...props} />;
}
