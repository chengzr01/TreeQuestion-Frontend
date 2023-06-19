import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Divider,
  styled,
  Chip,
  Menu,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import EditableText from "./EditableText";
import EditableOptions from "./EditableOptions";

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
  const [questionConcepts, setQuestionConcepts] = useState(null);
  const [questionLevel, setQuestionLevel] = useState(null);
  const [questionType, setQuestionType] = useState("Multi-Choice");
  const [questionStem, setQuestionStem] = useState("");
  const [questionStemUpdate, setQuestionStemUpdate] = useState(true);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [questionOptionsUpdate, setQuestionOptionsUpdate] = useState(true);
  const [questionAnswer, setQuestionAnswer] = useState("");
  const [questionAnswerUpdate, setQuestionAnswerUpdate] = useState(true);
  const [questionGenerateState, setQuestionGenerateState] = useState("");
  const [keyAnchorEl, setKeyAnchorEl] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const keyOpen = Boolean(keyAnchorEl);

  const handleKeyClick = (event) => {
    setKeyAnchorEl(event.currentTarget);
  };

  const handleKeyClose = (event) => {
    setKeyAnchorEl(null);
  };

  const handleKeyDelete = (event) => {
    var newKeyCandidates = keyCandidates;
    if (newKeyCandidates.indexOf(activeKey) >= 0) {
      newKeyCandidates.splice(keyCandidates.indexOf(activeKey), 1);
    }
    setKeyCandidates(newKeyCandidates);
  };

  const handleKeyClear = (event) => {
    setKeyCandidates([]);
  };

  const [distractorAnchorEl, setDistractorAnchorEl] = useState(null);
  const [activeDistractor, setActiveDistractor] = useState(null);
  const distractorOpen = Boolean(distractorAnchorEl);
  const handleDistractorClick = (event) => {
    setDistractorAnchorEl(event.currentTarget);
  };
  const handleDistractorClose = (event) => {
    setDistractorAnchorEl(null);
  };
  const handleDistractorDelete = (event) => {
    var newDistractorCandidates = distractorCandidates;
    if (newDistractorCandidates.indexOf(activeDistractor) >= 0) {
      newDistractorCandidates.splice(
        newDistractorCandidates.indexOf(activeDistractor),
        1
      );
    }
    setDistractorCandidates(newDistractorCandidates);
  };

  const handleDistractorClear = (event) => {
    setDistractorCandidates([]);
  };

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
      cache: cookie.load("cache"),
    };
    setQuestionGenerateState("waiting");
    axios
      .post("/tree/create_question", body)
      .then((res) => {
        setQuestionStem(res.data.data.stem);
        setQuestionOptions(res.data.data.options);
        setQuestionAnswer(res.data.data.answer);
        setQuestionStemUpdate(false);
        setQuestionOptionsUpdate(false);
        setQuestionAnswerUpdate(false);
        setQuestionGenerateState("suceess");
      })
      .catch((err) => {
        setQuestionGenerateState("false");
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
    setQuestionStem("");
    setQuestionOptions([]);
    setQuestionAnswer("");
    setQuestionStemUpdate(false);
    setQuestionOptionsUpdate(false);
    setQuestionAnswerUpdate(false);
  };

  const getQuestionGenerateStateComponent = () => {
    if (questionGenerateState === "waiting")
      return <CircularProgress size="2vw" />;
    else if (questionGenerateState === "success")
      return (
        <CheckCircleOutlineIcon
          sx={{ fontSize: "2vw", color: "primary.main" }}
        />
      );
    else if (questionGenerateState === "failure")
      return <ErrorOutlineIcon sx={{ fontSize: "2vw", color: "error.main" }} />;
    else
      return (
        <RadioButtonCheckedIcon
          sx={{ fontSize: "2vw", color: "primary.main" }}
        />
      );
  };

  useEffect(() => {
    if (!candidateUpdate) {
      setCandidateUpdate(true);
    }
  });

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography
            sx={{ fontSize: 14, pt: 1, pb: 1 }}
            color="text.secondary"
          >
            <i>Keys</i>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth onClick={(event) => handleKeyClear(event)}>
            <i>Clear</i>
          </Button>
        </Grid>

        {keyCandidates.map((key) => {
          return (
            <Grid item xs={12}>
              <Typography
                onClick={(event) => {
                  setActiveKey(key);
                  handleKeyClick(event);
                }}
              >
                {key}
              </Typography>
              <Menu
                id="basic-menu"
                anchorEl={keyAnchorEl}
                open={keyOpen}
                onClose={handleKeyClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={(event) => {
                    handleKeyDelete(event);
                    handleKeyClose(event);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </Grid>
          );
        })}

        <Grid item xs={10}>
          <Typography
            sx={{ fontSize: 14, pt: 1, pb: 1 }}
            color="text.secondary"
          >
            <i>Distractors</i>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth onClick={(event) => handleDistractorClear(event)}>
            <i>Clear</i>
          </Button>
        </Grid>

        {distractorCandidates.map((distractor) => {
          return (
            <Grid item xs={12}>
              <Typography
                onClick={(event) => {
                  setActiveDistractor(distractor);
                  handleDistractorClick(event);
                }}
              >
                {distractor}
              </Typography>
              <Menu
                id="basic-menu"
                anchorEl={distractorAnchorEl}
                open={distractorOpen}
                onClose={handleDistractorClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={(event) => {
                    handleDistractorDelete(event);
                    handleDistractorClose(event);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </Grid>
          );
        })}
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
        <Grid item xs={5}>
          <Button
            fullWidth
            onClick={(event) => {
              getQuestion(event);
            }}
          >
            <i>Generate Question</i>
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          {getQuestionGenerateStateComponent()}
        </Grid>
        <Grid item xs={5}>
          <Button
            fullWidth
            onClick={(event) => {
              handleAdd(event);
              handleClear(event);
            }}
          >
            <i>Add to Tree</i>
          </Button>
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
            <i>Stem</i>
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <EditableText
            defaultValue={questionStem}
            updateDefaultValue={setQuestionStem}
            update={questionStemUpdate}
            setUpdate={setQuestionStemUpdate}
          ></EditableText>
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
            <i>Options</i>
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <EditableOptions
            defaultValue={questionOptions}
            updateDefaultValue={setQuestionOptions}
            update={questionOptionsUpdate}
            setUpdate={setQuestionOptionsUpdate}
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
            <i>Answer</i>
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <EditableText
            defaultValue={questionAnswer}
            updateDefaultValue={setQuestionAnswer}
            update={questionAnswerUpdate}
            setUpdate={setQuestionAnswerUpdate}
          ></EditableText>
        </Grid>
      </Grid>
    </Box>
  );
}
