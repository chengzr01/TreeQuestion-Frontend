import * as React from "react";
import { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import {
  Button,
  Card,
  Grid,
  TextField,
  CircularProgress,
  Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import IdeationLevels from "./IdeationLevels";

export default function IdeationInput({
  update,
  setUpdate,
  concepts,
  setConcepts,
  field,
  setField,
  knowledgeList,
  setKnowledgeList,
  generateState,
  setGenerateState,
}) {
  const [levels, setLevels] = useState("");
  const [currentConcepts, setCurrentConcepts] = useState("");
  const [currentField, setCurrentField] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    if (event.target.name === "concepts")
      setCurrentConcepts(event.target.value);
    if (event.target.name === "field") setCurrentField(event.target.value);
  };

  const handleSubmit = (event) => {
    setGenerateState("waiting");
    var body = {
      field: currentField,
      concept: currentConcepts,
      level: levels,
      cache: cookie.load("cache"),
    };
    console.log(body);
    axios
      .post("/tree/create_knowledge_component", body)
      .then((res) => {
        console.log(res.data.data);
        var newKnowledgeList = knowledgeList;
        newKnowledgeList.push({
          field: currentField,
          concept: currentConcepts,
          level: levels,
          content: res.data.data.knowledge,
        });
        setKnowledgeList(newKnowledgeList);
        setUpdate(false);
        var newConcepts = concepts;
        if (newConcepts.indexOf(currentConcepts) < 0) {
          newConcepts.push(currentConcepts);
        }
        setConcepts(newConcepts);
        setField(currentField);
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
    <Card sx={{ ml: 4, mr: 4, mt: 2, mb: 2, p: 4 }}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            required
            name="concepts"
            label="Concepts"
            size="small"
            sx={{ height: 40 }}
            onChange={(event) => handleInputChange(event)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            required
            name="field"
            label="Field"
            size="small"
            sx={{ height: 40 }}
            onChange={(event) => handleInputChange(event)}
          />
        </Grid>
        <Grid item xs={3}>
          <IdeationLevels setLevels={setLevels} />
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          alignContent={"left"}
          justifyContent={"left"}
        >
          <Button fullWidth onClick={(event) => handleSubmit(event)}>
            <i>Generate Knowledge</i>
          </Button>
        </Grid>
        <Grid
          item
          xs={1}
          display={"flex"}
          alignContent={"left"}
          justifyContent={"left"}
        >
          {getGenerateStateComponent()}
        </Grid>
      </Grid>
    </Card>
  );
}
