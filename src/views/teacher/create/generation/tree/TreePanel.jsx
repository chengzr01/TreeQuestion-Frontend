import * as React from "react";
import { useCallback, useState, useEffect } from "react";
import cookie from "react-cookies";

import { Card, Grid, Tooltip } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SaveIcon from "@mui/icons-material/Save";

import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Controls,
  Background,
  Panel,
} from "reactflow";
import dagre from "dagre";

import "./tree-node.css";
import "reactflow/dist/style.css";
import TreeNode from "./TreeNode";

const nodeTypes = { treenode: TreeNode };

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 200;
const nodeHeight = 50;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export default function TreePanel({ tree, setTree, update, setUpdate }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onSave = useCallback(() => {
    setTree({ nodes: nodes, edges: edges });
    let cookieSetup = {
      path: "/",
      domain: window.location.hostname,
    };
    cookie.save("tree", { nodes: nodes, edges: edges }, cookieSetup);
  }, [nodes, edges, setTree]);

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      onSave();
    },
    [setNodes, onSave]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
      onSave();
    },
    [setEdges, onSave]
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
      onSave();
    },
    [setEdges, onSave]
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(tree.nodes, tree.edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [tree.nodes, tree.edges]
  );

  useEffect(() => {
    if (update) {
      onLayout();
      setUpdate(false);
    }
  });

  return (
    <Card sx={{ width: "100%", height: "80vh", m: 4, p: 4 }}>
      <div style={{ p: 1, width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
          <Panel position="top-left">
            <Grid container spacing={2} sx={{ p: 1 }}>
              <Grid
                item
                xs={12}
                display="flex"
                alignContent="left"
                justifyContent="left"
              >
                <Tooltip title="Auto Layout">
                  <AccountTreeIcon
                    fontSize="small"
                    sx={{ color: "text.secondary" }}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                    onClick={() => onLayout("TB")}
                  />
                </Tooltip>
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                alignContent="left"
                justifyContent="left"
              >
                <Tooltip title="Save">
                  <SaveIcon
                    fontSize="small"
                    sx={{ color: "text.secondary" }}
                    onClick={() => onSave()}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Panel>
        </ReactFlow>
      </div>
    </Card>
  );
}
