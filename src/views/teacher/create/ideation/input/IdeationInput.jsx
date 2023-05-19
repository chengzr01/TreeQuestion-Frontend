import * as React from "react";
import { useState } from "react";

import axios from "axios";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import IdeationLevels from "./IdeationLevels";

export default function IdeationInput({ update, setUpdate }) {
  const [concepts, setConcepts] = useState([]);
  const [field, setField] = useState("");
  const [levels, setLevels] = useState([]);

  const handleInputChange = (event) => {
    event.preventDefault();
    if (event.target.name === "concepts")
      setConcepts(event.target.value.split("/"));
    if (event.target.name === "field") setField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (var conceptIndex in concepts) {
      for (var levelIndex in levels) {
        var body = {
          field: field,
          concept: concepts[conceptIndex],
          level: levels[levelIndex],
        };
        console.log(body);
        axios.post("/knowledge/create_ideation/", body).then((res) => {
          console.log(res);
          setUpdate(false);
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
