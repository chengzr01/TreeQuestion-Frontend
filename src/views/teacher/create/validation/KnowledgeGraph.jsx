import * as React from "react";
import { useCallback, useState, useEffect } from "react";

import EditableNode from "./EditableNode";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import dagre from "dagre";

import "./editable-node.css";

import CustomEdge from "./CustomEdge";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 400;
const nodeHeight = 200;

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

const nodeTypes = { editable: EditableNode };
const edgeTypes = {
  editable: CustomEdge,
};

export default function KnowledgeGraph({ graphState }) {
  var newNodes = graphState.nodes.map((node) => {
    return {
      id: graphState.nodes.indexOf(node).toString(),
      type: "editable",
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
      data: {
        label: `${edge.label}`,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      type: "editable",
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
    <div style={{ width: "100%", height: "80%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
