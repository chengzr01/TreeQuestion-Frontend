import * as React from "react";
import { useCallback, useState, useEffect, useRef } from "react";

import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
  Panel,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import dagre from "dagre";

import { Grid, Tooltip } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SaveIcon from "@mui/icons-material/Save";

import "./editable-node.css";
import EditableEdge from "./EditableEdge";
import EditableNode from "./EditableNode";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 800;
const nodeHeight = 200;

const getLayoutedElements = (nodes, edges, direction = "RL") => {
  const isHorizontal = direction === "RL";
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
const edgeTypes = { editable: EditableEdge };

function AddNodeOnEdgeDrop({ graph, setGraph, sourceGraph, setSourceGraph }) {
  const { project } = useReactFlow();
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [graphLoad, setGraphLoad] = useState(false);

  const updateNode = (id, name) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label: name,
          };
        }
        return node;
      })
    );
  };

  const updateEdge = (id, name) => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === id) {
          edge.data = {
            ...edge.data,
            label: name,
          };
        }
        return edge;
      })
    );
  };

  const getGraphState = () => {
    setGraphLoad(true);
    var newNodesSet = [];
    var newEdgesSet = [];
    for (var edgeIndex in sourceGraph) {
      newEdgesSet.push({
        from: sourceGraph[edgeIndex].source,
        to: sourceGraph[edgeIndex].target,
        label: sourceGraph[edgeIndex].relation,
      });
      newNodesSet.push(sourceGraph[edgeIndex].source);
      newNodesSet.push(sourceGraph[edgeIndex].target);
    }
    var newNodesArray = Array.from(new Set(newNodesSet));
    var newEdgesArray = Array.from(new Set(newEdgesSet));
    var newNodes = newNodesArray.map((node) => {
      return {
        id: newNodesArray.indexOf(node).toString(),
        type: "editable",
        draggable: true,
        connectable: true,
        position: { x: 0, y: 0 },
        data: { label: node, update: updateNode },
      };
    });
    var newEdges = newEdgesArray.map((edge) => {
      var sourceIndex;
      var targetIndex;
      for (var index in newNodesArray) {
        if (edge.from === newNodesArray[index]) {
          sourceIndex = index.toString();
        }
        if (edge.to === newNodesArray[index]) {
          targetIndex = index.toString();
        }
      }
      return {
        id: `e${sourceIndex}-${targetIndex}`,
        source: `${sourceIndex}`,
        target: `${targetIndex}`,
        data: {
          label: `${edge.label}`,
          update: updateEdge,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
        type: "editable",
        style: {
          strokeWidth: 1,
        },
      };
    });
    var layoutResult = getLayoutedElements(newNodes, newEdges);
    setNodes(layoutResult.nodes);
    setEdges(layoutResult.edges);
    setGraph({ nodes: layoutResult.nodes, edges: layoutResult.edges });
  };

  const onSave = useCallback(() => {
    setGraph({ nodes: nodes, edges: edges });
  }, [nodes, edges, setGraph]);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        id: `e${params.source}-${params.target}`,
        source: `${params.source}`,
        target: `${params.target}`,
        data: {
          label: "Edge",
          update: updateEdge,
        },
        method: { update: updateEdge },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
        type: "editable",
        style: {
          strokeWidth: 1,
        },
      };
      setEdges((eds) => eds.concat(newEdge));
    },
    [setEdges]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane =
        event.target.classList.length === 1 &&
        event.target.classList.contains("react-flow__pane");
      if (targetIsPane) {
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = (parseInt(nodes[nodes.length - 1].id) + 1).toString();
        const newNode = {
          id: id,
          type: "editable",
          draggable: true,
          connectable: true,
          position: project({
            x: event.clientX - left - 75,
            y: event.clientY - top,
          }),
          data: { label: "Node", update: updateNode },
        };
        const newEdge = {
          id: `e${connectingNodeId.current}-${id}`,
          source: `${id}`,
          target: `${connectingNodeId.current}`,
          data: {
            label: "Edge",
            update: updateEdge,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
          },
          type: "editable",
          style: {
            strokeWidth: 1,
          },
        };
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat(newEdge));
      }
    },
    [project, nodes]
  );

  useEffect(() => {
    if (!graphLoad) {
      getGraphState();
    }
  });

  return (
    <div style={{ width: "100%", height: "80%" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineComponent={EditableEdge}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
      >
        <Controls />
        <MiniMap />
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
                  onClick={() => onLayout("RL")}
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
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default function KnowledgeGraph({
  graph,
  setGraph,
  sourceGraph,
  setSourceGraph,
}) {
  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop
        graph={graph}
        setGraph={setGraph}
        sourceGraph={sourceGraph}
        setSourceGraph={setSourceGraph}
      />
    </ReactFlowProvider>
  );
}
