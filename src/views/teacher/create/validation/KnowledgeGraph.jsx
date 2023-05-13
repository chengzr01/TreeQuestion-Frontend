import * as React from "react";

// Material UI
import { Box } from "@mui/material";
import { Card } from "@mui/material";

// Graph
import Graph from "react-graph-vis";

export default function KnowledgeGraph({ graphState }) {
  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
    height: "640",
  };

  return (
    <Card sx={{ m: 4, p: 4 }}>
      <h1> Knowledge Graph </h1>
      <Box>
        <Graph graph={graphState} options={options} />
      </Box>
    </Card>
  );
}
