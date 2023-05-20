import * as React from "react";
import { useState } from "react";

import { Card, Box, Grid, Button } from "@mui/material";
import { Typography } from "@mui/material";
import EditableText from "../../validation/EditableText";

export default function QuestionPanel({ tree, setTree, update, setUpdate }) {
  const [ID, setID] = useState(10);
  const [stem, setStem] = useState(
    "What is a potential vulnerability associated with symmetric encryption?"
  );
  const [options, setOptions] = useState(
    " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used"
  );
  const [answer, setAnswer] = useState("C");

  const handleAdd = () => {
    const id =
      tree.nodes.length > 0
        ? (parseInt(tree.nodes[tree.nodes.length - 1].id) + 1).toString()
        : "0";
    const newNode = {
      id: id,
      type: "treenode",
      draggable: true,
      connectable: true,
      position: { x: 0, y: 0 },
      data: {
        id: id,
        label: id,
        level: "remember",
        type: "multi-choice",
        stem: "question stem",
        options: "question options",
        answer: "answer",
        concept: "Hashing",
      },
    };
    var newTree = tree;
    newTree.nodes.push(newNode);
    setTree(newTree);
    setUpdate(true);
  };

  return (
    <Card sx={{ m: 4, p: 4 }}>
      <Typography variant="h5"> 🔍 Questions</Typography>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography
              sx={{ fontSize: 14, pt: 1 }}
              color="text.secondary"
              gutterBottom
              display="flex"
              justifyContent="right"
              alignContent="right"
            >
              ID
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <EditableText
              defaultValue={ID}
              updateDefaultValue={setID}
            ></EditableText>
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={{ fontSize: 14, pt: 1 }}
              color="text.secondary"
              gutterBottom
              display="flex"
              justifyContent="right"
              alignContent="right"
            >
              Stem
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <EditableText defaultValue={stem} updateDefaultValue={setStem} />
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={{ fontSize: 14, pt: 1 }}
              color="text.secondary"
              gutterBottom
              display="flex"
              justifyContent="right"
              alignContent="right"
            >
              Options
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <EditableText
              defaultValue={options}
              updateDefaultValue={setOptions}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={{ fontSize: 14, pt: 1 }}
              color="text.secondary"
              gutterBottom
              display="flex"
              justifyContent="right"
              alignContent="right"
            >
              Answer
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <EditableText
              defaultValue={answer}
              updateDefaultValue={setAnswer}
            />
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Button variant="outlined" onClick={handleAdd}>
              Add
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Button variant="outlined">Clear</Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
