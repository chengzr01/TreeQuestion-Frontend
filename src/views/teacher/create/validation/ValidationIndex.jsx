import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import KnowledgeGraph from "./KnowledgeGraph";
import KnowledgeTable from "./KnowledgeTable";
import axios from "axios";

export default function ValidationIndex({ value, setValue }) {
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
    axios.get("knowledge/read_graph_all/").then((res) => {
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
    <Box>
      <KnowledgeTable graphState={graphState} />
      <KnowledgeGraph graphState={graphState} />
    </Box>
  );
}
