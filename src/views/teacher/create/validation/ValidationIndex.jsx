import * as React from "react";
import { Paper } from "@mui/material";

import KnowledgeGraph from "./KnowledgeGraph";

export default function ValidationIndex({
  graph,
  setGraph,
  sourceGraph,
  setSourceGraph,
}) {
  return (
    <Paper sx={{ m: 4, p: 4, width: "80vw", height: "80vh" }}>
      <KnowledgeGraph
        graph={graph}
        setGraph={setGraph}
        sourceGraph={sourceGraph}
        setSourceGraph={setSourceGraph}
      />
    </Paper>
  );
}
