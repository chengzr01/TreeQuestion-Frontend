import * as React from "react";
import { useState } from "react";
import { Paper, Grid } from "@mui/material";

import KnowledgeGraph from "./KnowledgeGraph";
import EditableText from "./EditableText";

export default function ValidationIndex({
  graph,
  setGraph,
  sourceGraph,
  setSourceGraph,
}) {
  const [treeName, setTreeName] = useState("Name");
  return (
    <Paper sx={{ m: 4, p: 4, width: "100%", height: "80vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <EditableText
            defaultValue={treeName}
            updateDefaultValue={setTreeName}
          />
        </Grid>
        <Grid item xs={12} sx={{ width: "100%", height: "80vh" }}>
          <KnowledgeGraph
            graph={graph}
            setGraph={setGraph}
            sourceGraph={sourceGraph}
            setSourceGraph={setSourceGraph}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
