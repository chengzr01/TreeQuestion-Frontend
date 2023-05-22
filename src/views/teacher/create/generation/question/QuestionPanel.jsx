import * as React from "react";
import { useState } from "react";

import { Card, Grid } from "@mui/material";
import { Typography } from "@mui/material";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import BackspaceIcon from "@mui/icons-material/Backspace";

export default function QuestionPanel({
  concepts,
  setConcepts,
  field,
  setField,
  tree,
  setTree,
  update,
  setUpdate,
}) {
  const [ID, setID] = useState("10");
  const [questionConcepts, setQuestionConcepts] = useState("");
  const [questionLevel, setQuestionLevel] = useState("");
  const [questionType, setQuestionType] = useState("Multi-Choice");
  const [questionStem, setQuestionStem] = useState(
    "What is a potential vulnerability associated with symmetric encryption?"
  );
  const [questionOptions, setQuestionOptions] = useState(
    " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used"
  );
  const [questionAnswer, setQuestionAnswer] = useState("C");

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
        level: questionLevel,
        type: questionType,
        stem: questionStem,
        options: questionOptions,
        answer: questionAnswer,
        concept: questionConcepts,
      },
    };
    var newTree = tree;
    newTree.nodes.push(newNode);
    setTree(newTree);
    setUpdate(true);
  };

  const handleClear = () => {
    setID("");
    setQuestionStem("");
    setQuestionOptions("");
    setQuestionAnswer("");
  };

  return (
    <Card sx={{ m: 4, p: 4 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          display="flex"
          alignContent="left"
          justifyContent="left"
        >
          <Typography variant="h5"> 🔍 Questions</Typography>
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            size="small"
            disablePortal
            options={concepts}
            value={questionConcepts}
            onChange={(event, newQuestionConcepts) => {
              setQuestionConcepts(newQuestionConcepts);
            }}
            renderInput={(params) => <TextField {...params} label="Concepts" />}
          />
        </Grid>
        <Grid item xs={5}>
          <Autocomplete
            size="small"
            disablePortal
            options={[
              "Remember",
              "Understand",
              "Apply",
              "Analyze",
              "Evaluate",
              "Create",
            ]}
            value={questionLevel}
            onChange={(event, newQuestionLevel) => {
              setQuestionLevel(newQuestionLevel);
            }}
            renderInput={(params) => <TextField {...params} label="Level" />}
          />
        </Grid>
        <Grid item xs={5}>
          <Autocomplete
            size="small"
            disablePortal
            options={["Multi-Choice", "True-False"]}
            value={questionType}
            onChange={(event, newQuestionType) => {
              setQuestionType(newQuestionType);
            }}
            renderInput={(params) => <TextField {...params} label="Type" />}
          />
        </Grid>
        <Grid
          item
          xs={2}
          display="flex"
          alignContent="center"
          justifyContent="center"
        >
          <Tooltip title="Confirm">
            <PublishedWithChangesOutlinedIcon sx={{ m: 1 }} />
          </Tooltip>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{ fontSize: 14 }}
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
          {ID}
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{ fontSize: 14 }}
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
          {questionStem}
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{ fontSize: 14 }}
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
          {questionOptions}
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{ fontSize: 14 }}
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
          {questionAnswer}
        </Grid>
        <Grid
          item
          xs={6}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Tooltip title="Add">
            <AddIcon onClick={handleAdd} />
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Tooltip title="Clear">
            <BackspaceIcon onClick={handleClear} />
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  );
}
