import * as React from "react";
import { useCallback, useState } from "react";
import { Card } from "@mui/material";

import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Controls,
  Background,
} from "reactflow";
import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 172;
const nodeHeight = 36;

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

const newNodes = [
  {
    id: "1",
    type: "clickable",
    draggable: true,
    connectable: true,
    position: { x: 0, y: 0 },
    data: { label: "Question ID.1" },
  },
  {
    id: "2",
    type: "clickable",
    draggable: true,
    connectable: true,
    position: { x: 0, y: 0 },
    data: { label: "Question ID.2" },
  },
  {
    id: "3",
    type: "clickable",
    draggable: true,
    connectable: true,
    position: { x: 0, y: 0 },
    data: { label: "Question ID.3" },
  },
  {
    id: "4",
    type: "clickable",
    draggable: true,
    connectable: true,
    position: { x: 0, y: 0 },
    data: { label: "Question ID.4" },
  },
  {
    id: "5",
    type: "clickable",
    draggable: true,
    connectable: true,
    position: { x: 0, y: 0 },
    data: { label: "Question ID.5" },
  },
  {
    id: "6",
    type: "clickable",
    draggable: true,
    connectable: true,
    position: { x: 0, y: 0 },
    data: { label: "Question ID. 6" },
  },
  {
    id: "7",
    type: "clickable",
    draggable: true,
    connectable: true,
    position: { x: 0, y: 0 },
    data: { label: "Question ID. 7" },
  },
  {
    id: "8",
    type: "clickable",
    draggable: true,
    connectable: true,
    position: { x: 0, y: 0 },
    data: { label: "Question ID. 8" },
  },
  {
    id: "9",
    type: "clickable",
    draggable: true,
    connectable: true,
    position: { x: 0, y: 0 },
    data: { label: "Question ID. 9" },
  },
  {
    id: "10",
    type: "clickable",
    draggable: true,
    connectable: true,
    position: { x: 0, y: 0 },
    data: { label: "Question ID. 10" },
  },
];
const newEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e1-5", source: "1", target: "5" },
  { id: "e5-9", source: "5", target: "9" },
  { id: "e4-6", source: "4", target: "6" },
  { id: "e6-7", source: "6", target: "7" },
  { id: "e6-7", source: "6", target: "8" },
];

export default function TreePanel() {
  var layoutResult = getLayoutedElements(newNodes, newEdges);

  const [nodes, setNodes] = useState(layoutResult.nodes);
  const [edges, setEdges] = useState(layoutResult.edges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Card sx={{ width: "100%", height: "80vh", m: 4, p: 4 }}>
      <div style={{ p: 1, width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </Card>
  );
}
