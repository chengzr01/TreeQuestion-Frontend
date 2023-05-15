import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import KnowledgeGraph from "./KnowledgeGraph";
import KnowledgeTable from "./KnowledgeTable";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AdjustIcon from "@mui/icons-material/Adjust";

import palette from "../../../../theme/palette";

import axios from "axios";

export default function ValidationIndex({ value, setValue }) {
  const TYPE = { DIAGRAM: 0, LIST: 1 };
  const [changeVisible, setChangeVisible] = useState(false);
  const [treeViewType, setTreeViewType] = useState(TYPE.DIAGRAM);
  const getChangeNote = () => {
    if (changeVisible) {
      return (
        <Typography
          variant="body"
          color="grey.500"
          component="div"
          sx={{ ml: 1, mr: 1 }}
        >
          Change Tree View
        </Typography>
      );
    } else {
      return null;
    }
  };
  const getTreeView = () => {
    if (treeViewType === TYPE.DIAGRAM) {
      return <KnowledgeGraph graphState={graphState}></KnowledgeGraph>;
    } else {
      return <KnowledgeTable graphState={graphState}></KnowledgeTable>;
    }
  };

  const [graphState, setGraphState] = useState({
    nodes: [],
    edges: [],
  });

  const [graphLoad, setGraphLoad] = useState(false);

  const getGraphState = () => {
    setGraphLoad(true);

    var newNodes = [];
    var newNodesSet = [];
    var newEdges = [];
    var newEdgesSet = [];
    axios.get("/knowledge/read_graph_all/").then((res) => {
      for (var edgeIndex in res.data.data) {
        newEdgesSet.push({
          from: res.data.data[edgeIndex].source,
          to: res.data.data[edgeIndex].target,
          label: res.data.data[edgeIndex].relation,
        });
        newNodesSet.push(res.data.data[edgeIndex].source);
        newNodesSet.push(res.data.data[edgeIndex].target);
      }
      newNodes = Array.from(new Set(newNodesSet)).map((name) => {
        return { id: name, label: name, property: name };
      });
      newEdges = newEdgesSet;
      setGraphState({
        nodes: newNodes,
        edges: newEdges,
      });
    });
  };

  useEffect(() => {
    if (!graphLoad) {
      getGraphState();
    }
  });

  return (
    <Paper sx={{ m: 4, p: 4, width: "100%", height: "80vh" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography variant="body" color="grey.500" component="div">
              Tree
            </Typography>
          </Grid>
          <Grid
            item
            xs
            display="flex"
            justifyContent="right"
            alignContent="right"
          >
            {getChangeNote()}
            <AdjustIcon
              onMouseEnter={(event) => {
                event.preventDefault();
                setChangeVisible(true);
                event.target.style.color = palette.grey[500];
              }}
              onMouseLeave={(event) => {
                event.preventDefault();
                setChangeVisible(false);
                event.target.style.color = palette.grey[500];
              }}
              onClick={(event) => {
                event.preventDefault();
                if (treeViewType === TYPE.DIAGRAM) {
                  setTreeViewType(TYPE.LIST);
                } else {
                  setTreeViewType(TYPE.DIAGRAM);
                }
              }}
              sx={{ color: "grey.500" }}
            />
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", height: "80vh" }}>
            {getTreeView()}
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  );
}
