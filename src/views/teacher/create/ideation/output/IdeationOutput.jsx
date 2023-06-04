import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";

import ExpandableCard from "./ExpandableCard";

export default function IdeationOutput({
  value,
  setValue,
  update,
  setUpdate,
  concepts,
  setConcepts,
  field,
  setField,
  knowledgeList,
  setKnowledgeList,
  sourceGraph,
  setSourceGraph,
}) {
  const [selectedKnowledge, setSelectedKnowledge] = useState([]);
  const handleGraph = (event) => {
    var knowledgeContent = [];
    for (var selectedIndex in selectedKnowledge) {
      knowledgeContent.push(
        knowledgeList[selectedKnowledge[selectedIndex]].content
      );
    }
    var body = {
      concepts: concepts,
      field: field,
      knowledge: knowledgeContent,
    };
    axios
      .post("/tree/create_knowledge_graph", body)
      .then((res) => {
        console.log(res.data.data);
        setSourceGraph(res.data.data.graph);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!update) {
      setUpdate(true);
    }
  });

  return (
    <Box>
      <Paper sx={{ m: 4, p: 4 }}>
        <Typography variant="h3" align="center">
          Knowledge
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={8}
            display="flex"
            justifyContent="left"
            alignContent="left"
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Concepts:
              {concepts.map((concept, index) => {
                var spacing = index === concepts.length - 1 ? " " : ", ";
                return concept + spacing;
              })}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="left"
            alignContent="left"
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Field: {field}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {knowledgeList.map((knowledge, index) => {
            return (
              <Grid item xs={4}>
                <ExpandableCard
                  title={knowledge.concept.toUpperCase()}
                  subheader={knowledge.level.toUpperCase()}
                  content={knowledge.content}
                  index={index}
                  selectedKnowledge={selectedKnowledge}
                  setSelectedKnowledge={setSelectedKnowledge}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ height: 50 }}
              onClick={(event) => {
                handleGraph(event);
              }}
            >
              Graph
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
