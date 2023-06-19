import * as React from "react";
import { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import {
  Card,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";

export default function ValidationText({
  concepts,
  field,
  sourceText,
  sourceGraph,
  setSourceGraph,
  graphUpdate,
  setGraphUpdate,
}) {
  const [generateState, setGenerateState] = useState(false);
  const [graphText, setGraphText] = useState(sourceText);

  const handleGraph = (event) => {
    var body = {
      concepts: concepts,
      field: field,
      knowledge: graphText,
      cache: cookie.load("cache"),
    };
    setGenerateState("waiting");
    axios
      .post("/tree/create_knowledge_graph", body)
      .then((res) => {
        var newSourceGraph = sourceGraph;
        for (var index in res.data.data.graph) {
          newSourceGraph.push(res.data.data.graph[index]);
        }
        setSourceGraph(newSourceGraph);
        setGraphUpdate(false);
        setGenerateState("success");
      })
      .catch((err) => {
        setGenerateState("failure");
      });
  };

  const getGenerateStateComponent = () => {
    if (generateState === "waiting") return <CircularProgress size="2vw" />;
    else if (generateState === "success")
      return (
        <CheckCircleOutlineIcon
          sx={{ fontSize: "2vw", color: "primary.main" }}
        />
      );
    else if (generateState === "failure")
      return <ErrorOutlineIcon sx={{ fontSize: "2vw", color: "error.main" }} />;
    else
      return (
        <RadioButtonCheckedIcon
          sx={{ fontSize: "2vw", color: "primary.main" }}
        />
      );
  };

  return (
    <Paper sx={{ height: "56vh" }}>
      <Box sx={{ height: "48vh" }}>
        <OutlinedInput
          multiline
          value={graphText}
          onChange={(event) => {
            setGraphText(event.target.value);
          }}
          rows={15}
          fullWidth
        />
      </Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={8}
          display={"flex"}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Button
            fullWidth
            onClick={(event) => {
              handleGraph(event);
            }}
          >
            <i>Generate Graph</i>
          </Button>
        </Grid>
        <Grid
          item
          xs={4}
          display={"flex"}
          alignContent={"center"}
          justifyContent={"center"}
        >
          {getGenerateStateComponent()}
        </Grid>
      </Grid>
    </Paper>
  );
}
