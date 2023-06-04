import * as React from "react";
import { useState, useEffect } from "react";
import cookie from "react-cookies";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Grid,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from "@mui/material";
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

export default function TreeSelector({ setActiveTree, setAnswerList }) {
  const [expanded, setExpanded] = React.useState(false);
  const [treeList, setTreeList] = useState([]);
  const [treeListLoad, setTreeListLoad] = useState(false);

  const getPaperHeader = () => {
    return "Tree";
  };

  const getTreeList = () => {
    setTreeListLoad(true);
    var body = { name: cookie.load("name"), role: cookie.load("role") };
    axios
      .post("/tree/read_tree", body)
      .then((res) => {
        setTreeList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!treeListLoad) {
      getTreeList();
    }
  });

  return (
    <Paper sx={{ width: "100%" }}>
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
                    tree={tree}
                    setActiveTree={setActiveTree}
                    setAnswerList={setAnswerList}
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
