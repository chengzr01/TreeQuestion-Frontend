import * as React from "react";
import { useState } from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper sx={{ width: "100%" }} {...props}>
      <CardHeader title={getPaperHeader()} />
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
