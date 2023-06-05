import * as React from "react";
import { useState, useEffect } from "react";
import cookie from "react-cookies";
import axios from "axios";
import {
  Card,
  Box,
  Grid,
  Typography,
  Slider,
  Divider,
  styled,
  Button,
  Tooltip,
  Chip,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import EditableText from "../question/EditableText";

const levels = [
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
];

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function StatePanel({
  tree,
  setTree,
  edited,
  setEdited,
  concepts,
  field,
}) {
  const [expectedWidth, setExpectedWidth] = useState(50);
  const [expectedHeight, setExpectedHeight] = useState(50);
  const [suggestionList, setSuggestionList] = useState([]);
  const [identifier, setIdentifier] = useState("Identifier");
  const [identifierUpdate, setIdentifierUpdate] = useState(true);
  const conceptWeights = concepts.map((cpt) => {
    return { concept: cpt, weight: 1 };
  });
  const levelWeights = [
    { level: "Remember", weight: 4 },
    { level: "Understand", weight: 8 },
    { level: "Apply", weight: 12 },
    { level: "Analyze", weight: 16 },
    { level: "Evaluate", weight: 16 },
    { level: "Create", weight: 12 },
  ];

  const handleUpload = (event) => {
    event.preventDefault();
    var body = {
      name: cookie.load("name"),
      role: cookie.load("role"),
      identifier: identifier,
      description: tree,
    };
    axios
      .post("/tree/create_tree", body)
      .then((res) => {
        console.log(body);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLevelCount = () => {
    var levelCount = [
      { level: "Remember", count: 0 },
      { level: "Understand", count: 0 },
      { level: "Apply", count: 0 },
      { level: "Analyze", count: 0 },
      { level: "Evaluate", count: 0 },
      { level: "Create", count: 0 },
    ];
    for (var nodeIndex in tree.nodes) {
      for (var levelIndex in levelCount) {
        if (tree.nodes[nodeIndex].data.level === levelCount[levelIndex].level) {
          levelCount[levelIndex].count += 1;
        }
      }
    }
    return levelCount;
  };

  const getConceptCount = () => {
    var conceptCount = concepts.map((cpt) => {
      return { concept: cpt, count: 0 };
    });
    for (var nodeIndex in tree.nodes) {
      for (var conceptIndex in conceptCount) {
        if (
          tree.nodes[nodeIndex].data.concept ===
          conceptCount[conceptIndex].concept
        ) {
          conceptCount[conceptIndex].count += 1;
        }
      }
    }
    return conceptCount;
  };

  const getTreeRoot = (unformattedTree) => {
    const inDegree = unformattedTree.nodes.map((node) => {
      return { id: node.id, degree: 0 };
    });
    for (var edgeIndex in unformattedTree.edges) {
      for (var nodeIndex in inDegree) {
        if (
          inDegree[nodeIndex].id === unformattedTree.edges[edgeIndex].target
        ) {
          inDegree[nodeIndex].degree += 1;
        }
      }
    }
    var rootList = [];
    for (nodeIndex in inDegree) {
      if (inDegree[nodeIndex].degree === 0) {
        rootList.push(inDegree[nodeIndex].id);
      }
    }
    return rootList;
  };

  const getFormattedTree = (unformattedTree) => {
    var rootList = getTreeRoot(unformattedTree);
    var root = rootList[0];
    var formattedTree = unformattedTree.nodes.map((node) => {
      return {
        id: node.id,
        pid: 0,
        parent: "",
        children: [],
        concept: node.data.concept,
        level: node.data.level,
      };
    });
    var visitRecord = unformattedTree.nodes.map((node) => {
      return { id: node.id, visit: false };
    });
    var s = [];
    s.push(root);
    while (s.length > 0) {
      var v = s.pop();
      var visitIndex = 0;
      for (var visitRecordIndex in visitRecord) {
        if (visitRecord[visitRecordIndex].id === v) {
          visitIndex = visitRecordIndex;
        }
      }
      if (!visitRecord[visitIndex].visit) {
        var currentIndex = 0;
        for (var formattedTreeIndex in formattedTree) {
          if (formattedTree[formattedTreeIndex].id === v) {
            currentIndex = formattedTreeIndex;
          }
        }
        visitRecord[visitIndex].visit = true;
        for (var edgeIndex in unformattedTree.edges) {
          var value = unformattedTree.edges[edgeIndex];
          if (value.source === v) {
            s.push(value.target);
            for (formattedTreeIndex in formattedTree) {
              var nodeValue = formattedTree[formattedTreeIndex];
              if (nodeValue.id === value.target) {
                nodeValue.parent = v;
                formattedTree[currentIndex].children.push(nodeValue.id);
                nodeValue.pid = formattedTree[currentIndex].pid + 1;
              }
            }
          }
        }
      }
    }
    return formattedTree;
  };

  const getLevelConsistency = (formattedTree) => {
    var levelList = [];
    for (var nodeIndex in formattedTree) {
      for (var levelIndex in levelWeights) {
        if (formattedTree[nodeIndex].level === levelWeights[levelIndex].level) {
          levelList.push(levelWeights[levelIndex].weight);
          break;
        }
      }
    }
    var pidList = [];
    for (nodeIndex in formattedTree) {
      pidList.push(formattedTree[nodeIndex].pid);
    }
    var d = 0;
    var n = levelList.length;
    for (var index in levelList) {
      d +=
        (levelList[index] - pidList[index]) *
        (levelList[index] - pidList[index]);
    }
    var r = 1 - (6 * d) / (n * (n * n - 1));
    return r;
  };

  const getConceptConsistency = (formattedTree) => {
    var conceptList = [];
    for (var nodeIndex in formattedTree) {
      for (var conceptIndex in conceptWeights) {
        if (
          formattedTree[nodeIndex].concept ===
          conceptWeights[conceptIndex].concept
        ) {
          conceptList.push(conceptWeights[conceptIndex].weight);
          break;
        }
      }
    }
    var pidList = [];
    for (nodeIndex in formattedTree) {
      pidList.push(formattedTree[nodeIndex].pid);
    }
    var d = 0;
    var n = conceptList.length;
    for (var index in conceptList) {
      d +=
        (conceptList[index] - pidList[index]) *
        (conceptList[index] - pidList[index]);
    }
    var r = 1 - (6 * d) / (n * (n * n - 1));
    return r;
  };

  const getLevelConsistencyChange = (unformattedTree, node) => {
    var beforeTree = getFormattedTree(unformattedTree);
    var afterTree = getFormattedTree(unformattedTree);
    var maxPid = 0;
    afterTree.forEach(function (value, index, array) {
      if (value.pid > maxPid) {
        maxPid = value.pid;
      }
    });
    var maxConsistencyChange = 0;
    for (var testPid = 0; testPid < maxPid; testPid++) {
      var newTree = getFormattedTree(unformattedTree);
      newTree.push({
        id: "0",
        pid: testPid,
        parent: "",
        children: [],
        concept: node.concept,
        level: node.level,
      });
      var consistencyChange =
        getLevelConsistency(newTree) - getLevelConsistency(beforeTree);
      if (consistencyChange > maxConsistencyChange) {
        maxConsistencyChange = consistencyChange;
      }
    }
    return maxConsistencyChange;
  };

  const getConceptConsistencyChange = (unformattedTree, node) => {
    var beforeTree = getFormattedTree(unformattedTree);
    var afterTree = beforeTree;
    var maxPid = 0;
    afterTree.forEach(function (value, index, array) {
      if (value.pid > maxPid) {
        maxPid = value.pid;
      }
    });
    var maxConsistencyChange = 0;
    for (var testPid = 0; testPid < maxPid; testPid++) {
      afterTree = beforeTree;
      afterTree.push({
        id: "0",
        pid: testPid,
        parent: "",
        children: [],
        concept: node.concept,
        level: node.level,
      });
      var consistencyChange =
        getConceptConsistency(afterTree) - getConceptConsistency(beforeTree);
      if (consistencyChange > maxConsistencyChange) {
        maxConsistencyChange = consistencyChange;
      }
    }
    return maxConsistencyChange;
  };

  const getLocalNodeValue = (node) => {
    var conceptConsistencyChange = getConceptConsistencyChange(tree, node);
    var levelConsistencyChange = getLevelConsistencyChange(tree, node);
    return conceptConsistencyChange + levelConsistencyChange;
  };

  const getLevelDivergency = (levelCount) => {
    var levelWeightsSum = 0;
    levelWeights.forEach(function (val, idx, arr) {
      levelWeightsSum += val.weight;
    }, 0);
    var levelNumberWeightedSum = 0;
    levelCount.forEach(function (val, idx, arr) {
      levelNumberWeightedSum += val.count;
    }, 0);
    var levelNumberWeightedAverage = levelNumberWeightedSum / levelWeightsSum;
    var levelDivergencySquared = 0;
    levelCount.forEach(function (val, idx, arr) {
      var alpha = 0;
      for (var weightIndex in levelWeights) {
        if (val.level === levelWeights[weightIndex].level) {
          alpha = levelWeights[weightIndex].weight;
          break;
        }
      }
      levelDivergencySquared +=
        (val.count - levelNumberWeightedAverage * alpha) *
        (val.count - levelNumberWeightedAverage * alpha);
    }, 0);
    var LevelDivergency = Math.sqrt(levelDivergencySquared);
    return LevelDivergency;
  };

  const getLevelDivergencyChange = (node) => {
    var beforeLevelCount = getLevelCount();
    var afterLevelCount = getLevelCount();
    for (var levelCountIndex in afterLevelCount) {
      if (afterLevelCount[levelCountIndex].level === node.level) {
        afterLevelCount[levelCountIndex].count++;
        break;
      }
    }
    return (
      getLevelDivergency(afterLevelCount) - getLevelDivergency(beforeLevelCount)
    );
  };

  const getConceptDivergency = (conceptCount) => {
    var conceptWeightsSum = 0;
    conceptWeights.forEach(function (val, idx, arr) {
      conceptWeightsSum += val.weight;
    });
    var conceptNumberWeightedSum = 0;
    conceptCount.forEach(function (val, idx, arr) {
      conceptNumberWeightedSum += val.count;
    }, 0);
    var conceptNumberWeightedAverage =
      conceptNumberWeightedSum / conceptWeightsSum;
    var conceptDivergencySquared = 0;
    conceptCount.forEach(function (val, idx, arr) {
      var alpha = 0;
      for (var weightIndex in levelWeights) {
        if (val.level === levelWeights[weightIndex].level) {
          alpha = levelWeights[weightIndex].weight;
          break;
        }
      }
      conceptDivergencySquared +=
        (val.count - conceptNumberWeightedAverage * alpha) *
        (val.count - conceptNumberWeightedAverage * alpha);
    }, 0);
    var conceptDivergency = Math.sqrt(conceptDivergencySquared);
    return conceptDivergency;
  };

  const getConceptDivergencyChange = (node) => {
    var beforeConceptCount = getConceptCount();
    var afterConceptCount = getConceptCount();
    for (var conceptCountIndex in afterConceptCount) {
      if (afterConceptCount[conceptCountIndex].concept === node.concept) {
        afterConceptCount[conceptCountIndex].count++;
        break;
      }
    }
    return (
      getConceptDivergency(afterConceptCount) -
      getConceptDivergency(beforeConceptCount)
    );
  };

  const getGlobalNodeValue = (node) => {
    return getConceptDivergencyChange(node) + getLevelDivergencyChange(node);
  };

  const getNodeValue = (node) => {
    const lambda = 80;
    var globalValue = getGlobalNodeValue(node);
    var localValue = getLocalNodeValue(node);
    var totalValue = -1 * globalValue + lambda * localValue;
    return totalValue;
  };

  const getSuggestionList = () => {
    if (tree.nodes.length < concepts.length) {
      var concept = concepts[Math.floor(Math.random() * concepts.length)];
      var level = "Remeber";
      setSuggestionList([concept + ", " + level]);
    } else {
      var maxNode = { concept: concepts[0], level: levels[0] };
      var maxNodeValue = getNodeValue(maxNode);
      for (var conceptIndex in concepts) {
        for (var levelIndex in levels) {
          var node = {
            concept: concepts[conceptIndex],
            level: levels[levelIndex],
          };
          var nodeValue = getNodeValue(node);
          if (nodeValue > maxNodeValue) {
            maxNode = node;
            maxNodeValue = nodeValue;
          }
        }
        setSuggestionList([maxNode.concept + " " + maxNode.level]);
      }
    }
  };

  useEffect(() => {
    if (edited) {
      getSuggestionList();
      setEdited(false);
    }
  });

  return (
    <Card sx={{ m: 4, p: 4, height: "80vh" }}>
      <Root>
        <Divider sx={{ mt: 1, mb: 1 }}>
          <Chip label="Expectations" />
        </Divider>
      </Root>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="right"
            alignContent="right"
          >
            Width
          </Grid>
          <Grid
            item
            xs={8}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Slider
              aria-label="Volume"
              size="small"
              value={expectedWidth}
              onChange={(event, newWidth) => {
                setExpectedWidth(newWidth);
              }}
            />
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="right"
            alignContent="right"
          >
            {(expectedWidth / 50).toFixed(2)}
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="right"
            alignContent="right"
          >
            Height
          </Grid>
          <Grid
            item
            xs={8}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Slider
              aria-label="Volume"
              size="small"
              value={expectedHeight}
              onChange={(event, newHeight) => {
                setExpectedHeight(newHeight);
              }}
            />
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="right"
            alignContent="right"
          >
            {(expectedHeight / 50).toFixed(2)}
          </Grid>
        </Grid>
      </Box>
      <Root>
        <Divider sx={{ mt: 1, mb: 1 }}>
          <Chip label="Suggestions" />
        </Divider>
      </Root>
      <Box sx={{ pt: 2, pb: 2 }}>
        {suggestionList.map((suggestion) => {
          return (
            <Card sx={{ m: 1, p: 1 }}>
              <Typography variant="body">{suggestion}</Typography>
            </Card>
          );
        })}
      </Box>
      <Root>
        <Divider sx={{ mt: 1, mb: 1 }}>
          <Chip label="Operations" />
        </Divider>
      </Root>
      <Grid container spacing={2}>
        <Grid
          item
          xs={10}
          display={"flex"}
          alignContent={"left"}
          justifyContent={"left"}
        >
          <EditableText
            defaultValue={identifier}
            updateDefaultValue={setIdentifier}
            update={identifierUpdate}
            setUpdate={identifierUpdate}
          ></EditableText>
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Tooltip title="Upload">
            <Button
              onClick={(event) => {
                handleUpload(event);
              }}
            >
              <UploadIcon />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  );
}
