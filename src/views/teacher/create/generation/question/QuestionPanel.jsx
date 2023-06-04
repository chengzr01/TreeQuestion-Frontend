import * as React from "react";
import { useState, useEffect } from "react";

import {
  Button,
  Card,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Tooltip,
  Divider,
  styled,
  Chip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import BackspaceIconOutlined from "@mui/icons-material/BackspaceOutlined";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import axios from "axios";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function QuestionPanel({
  concepts,
  setConcepts,
  field,
  setField,
  tree,
  setTree,
  update,
  setUpdate,
  keyCandidates,
  setKeyCandidates,
  distractorCandidates,
  setDistractorCandidates,
  candidateUpdate,
  setCandidateUpdate,
  edited,
  setEdited,
}) {
  const [ID, setID] = useState("0");
  const [questionConcepts, setQuestionConcepts] = useState("");
  const [questionLevel, setQuestionLevel] = useState("");
  const [questionType, setQuestionType] = useState("Multi-Choice");
  const [questionStem, setQuestionStem] = useState("");
  const [questionOptions, setQuestionOptions] = useState([]);
  const [questionAnswer, setQuestionAnswer] = useState("");

  const getQuestion = (event) => {
    var maxID = 0;
    for (var index in tree.nodes) {
      if (parseInt(tree.nodes[index].id) >= maxID) {
        maxID = parseInt(tree.nodes[index].id);
      }
    }
    setID((maxID + 1).toString());
    var body = {
      concept: questionConcepts,
      field: field,
      level: questionLevel,
      type: questionType,
      keys: keyCandidates,
      distractors: distractorCandidates,
    };
    axios
      .post("/tree/create_question", body)
      .then((res) => {
        console.log(res.data.data);
        setQuestionStem(res.data.data.stem);
        setQuestionOptions(res.data.data.options);
        setQuestionAnswer(res.data.data.answer);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = () => {
    const newNode = {
      id: ID,
      type: "treenode",
      draggable: true,
      connectable: true,
      position: { x: 0, y: 0 },
      data: {
        id: ID,
        label: ID,
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
    setEdited(true);
  };

  const handleClear = () => {
    setID("");
    setQuestionStem("");
    setQuestionOptions([]);
    setQuestionAnswer("");
  };

  useEffect(() => {
    if (!candidateUpdate) {
      setCandidateUpdate(true);
    }
  });
  return (
    <Card sx={{ m: 4, p: 4 }}>
      <Grid container spacing={2}>
        <Root>
          <Divider sx={{ mt: 1, mb: 1 }}>
            <Chip label="Keys" />
          </Divider>
        </Root>
        {keyCandidates.map((key) => {
          return (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <i>{key}</i>
            </Typography>
          );
        })}
        <Root>
          <Divider sx={{ mt: 1, mb: 1 }}>
            <Chip label="Distractors" />
          </Divider>
        </Root>
        {distractorCandidates.map((distractor) => {
          return (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <i> {distractor}</i>
            </Typography>
          );
        })}
        <Root>
          <Divider sx={{ mt: 1, mb: 1 }}>
            <Chip label="Questions" />
          </Divider>
        </Root>
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
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
          {questionOptions.map((option) => (
            <Typography>{option}</Typography>
          ))}
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
          xs={12}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Tooltip title="Generate">
            <Button>
              <PublishedWithChangesOutlinedIcon
                onClick={(event) => {
                  getQuestion(event);
                }}
              />
            </Button>
          </Tooltip>
          <Tooltip title="Add">
            <Button>
              <AddIcon
                onClick={(event) => {
                  handleAdd(event);
                }}
              />
            </Button>
          </Tooltip>
          <Tooltip title="Clear">
            <Button>
              <BackspaceIconOutlined
                onClick={(event) => {
                  handleClear(event);
                }}
              />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  );
}
