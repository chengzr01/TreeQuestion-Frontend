import * as React from "react";
import { useCallback, useState, useEffect } from "react";

// Material UI
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import ClickableNode from "../../../student/answer/tree/diagram/ClickableNode";
import EditableText from "./EditableText";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
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

const nodeTypes = { clickable: ClickableNode };

export default function KnowledgeGraph({ graphState }) {
  var newNodes = graphState.nodes.map((node) => {
    return {
      id: graphState.nodes.indexOf(node).toString(),
      type: "clickable",
      draggable: true,
      connectable: true,
      position: { x: 0, y: 0 },
      data: { label: node.label },
    };
  });

  var newEdges = graphState.edges.map((edge) => {
    var sourceIndex;
    var targetIndex;
    for (var index in graphState.nodes) {
      if (edge.from === graphState.nodes[index].id) {
        sourceIndex = index.toString();
      }
      if (edge.to === graphState.nodes[index].id) {
        targetIndex = index.toString();
      }
    }
    return {
      id: `e${sourceIndex}-${targetIndex}`,
      source: `${sourceIndex}`,
      target: `${targetIndex}`,
      label: `${edge.label}`,
    };
  });

  var layoutResult = getLayoutedElements(newNodes, newEdges);

  const [nodes, setNodes] = useState(layoutResult.nodes);
  const [edges, setEdges] = useState(layoutResult.edges);
  const [defaultValue, setDefaultValue] = useState("Test");
  const [initialize, setInitialize] = useState(false);

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

  useEffect(() => {
    if (!initialize) {
      setInitialize(true);
    }
  });

  const updateDefaultValue = (value) => {
    setDefaultValue(value);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
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
      </ReactFlow>
    </div>
  );
}
