import * as React from "react";
import { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Button, Card, Grid, TextField, Snackbar } from "@mui/material";
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
}) {
  const [levels, setLevels] = useState([]);
  const [currentConcepts, setCurrentConcepts] = useState([]);
  const [currentField, setCurrentField] = useState("");
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const [message, setMessage] = useState("");

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    if (event.target.name === "concepts")
      setCurrentConcepts(event.target.value.split("/"));
    if (event.target.name === "field") setCurrentField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (var conceptIndex in currentConcepts) {
      for (var levelIndex in levels) {
        var body = {
          field: currentField,
          concept: currentConcepts[conceptIndex],
          level: levels[levelIndex],
          cache: cookie.load("cache"),
        };
        console.log(body);
        axios
          .post("/tree/create_knowledge_component", body)
          .then((res) => {
            console.log(res.data.data);
            setMessage("Succeed");
            handleClick({
              vertical: "top",
              horizontal: "center",
            });
            var newKnowledgeList = knowledgeList;
            newKnowledgeList.push({
              field: currentField,
              concept: currentConcepts[conceptIndex],
              level: levels[levelIndex],
              content: res.data.data.knowledge,
            });
            setKnowledgeList(newKnowledgeList);
            setUpdate(false);
            var newConcepts = concepts;
            for (var currentConceptsIndex in currentConcepts) {
              if (
                newConcepts.indexOf(currentConcepts[currentConceptsIndex]) < 0
              ) {
                newConcepts.push(currentConcepts[currentConceptsIndex]);
              }
            }
            setConcepts(newConcepts);
            setField(currentField);
          })
          .catch((err) => {
            setMessage("Fail");
            handleClick({
              vertical: "center",
              horizontal: "center",
            });
          });
      }
    }
  };

  return (
    <Card sx={{ m: 4, p: 4 }}>
      <Grid container direction="row" spacing={6}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            required
            name="concepts"
            label="Concepts"
            sx={{ height: 40 }}
            onChange={(event) => handleInputChange(event)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="field"
            label="Field"
            sx={{ height: 40 }}
            onChange={(event) => handleInputChange(event)}
          />
        </Grid>
        <Grid item xs={8}>
          <IdeationLevels setLevels={setLevels} />
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            sx={{ height: 50 }}
            onClick={(event) => handleSubmit(event)}
          >
            Generate
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
