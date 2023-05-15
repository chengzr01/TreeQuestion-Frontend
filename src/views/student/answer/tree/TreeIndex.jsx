import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import AdjustIcon from "@mui/icons-material/Adjust";
import Grid from "@mui/material/Grid";

import palette from "../../../../theme/palette";

import CountDown from "./CountDown";
import ListTreeView from "./ListTreeView";
import DiagramTreeView from "./DiagramTreeView";

export default function TreeIndex({
  id,
  initialNodes,
  initialEdges,
  nodeTypes,
}) {
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
      return (
        <DiagramTreeView
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          nodeTypes={nodeTypes}
        />
      );
    } else {
      return <ListTreeView />;
    }
  };
  return (
    <Paper sx={{ width: "100%", p: 2, height: "60vh" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body" color="grey.500" component="div">
              Tree ID: {id}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <CountDown />
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="right"
            alignContent="right"
          >
            {getChangeNote()}
            <AdjustIcon
              onMouseOver={(event) => {
                event.preventDefault();
                setChangeVisible(true);
                event.target.style.color = palette.grey[500];
              }}
              onMouseOut={(event) => {
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
        </Grid>
      </CardContent>
      {getTreeView()}
    </Paper>
  );
}
