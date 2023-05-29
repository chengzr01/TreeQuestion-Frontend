import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Paper, Grid, Box, Typography } from "@mui/material";

import { getNodeList, sampleTree } from "./question/Utils";
import TreeSelector from "./tree/TreeSelector";
import QuestionView from "./question/QuestionView";
import CountDown from "./question/CountDown";
import ReportView from "./question/ReportView";

export default function AnswerIndex() {
  const [activeTree, setActiveTree] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState({
    id: "0",
    stem: "",
    options: [],
  });
  const [activeTreeLoad, setActiveTreeLoad] = useState(false);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [answerList, setAnswerList] = useState([]);

  const getActiveTree = () => {
    setActiveTreeLoad(true);
    var tempActiveTree = getNodeList(sampleTree);
    var tempAnswerList = tempActiveTree.map((node) => {
      var optionList = node.options.map((option) => {
        return { option: option, result: false };
      });
      return { id: node.id, options: optionList };
    });
    setActiveTree(tempActiveTree);
    setAnswerList(tempAnswerList);
  };

  const getTreeView = () => {
    if (start) {
      if (!finish) {
        return (
          <QuestionView
            activeQuestion={activeQuestion}
            answerList={answerList}
            setAnswerList={setAnswerList}
          />
        );
      } else {
        return <ReportView activeTree={activeTree} answerList={answerList} />;
      }
    } else {
      return null;
    }
  };

  const handleStart = (event) => {
    setStart(true);
    setActiveQuestion(activeTree[0]);
  };

  const handleEnd = (event) => {
    setFinish(true);
  };

  const handlePrevious = (event) => {
    if (start && !finish) {
      var currentIndex = activeTree.indexOf(activeQuestion);
      if (currentIndex - 1 >= 0 && activeTree.length > 0) {
        setFinish(false);
        setActiveQuestion(activeTree[currentIndex - 1]);
      }
    }
  };

  const handleNext = (event) => {
    if (start && !finish) {
      var currentIndex = activeTree.indexOf(activeQuestion);
      if (currentIndex + 1 < activeTree.length) {
        setFinish(false);
        setActiveQuestion(activeTree[currentIndex + 1]);
      } else {
        setFinish(true);
      }
    }
  };

  useEffect(() => {
    if (!activeTreeLoad) {
      getActiveTree();
    }
  });

  return (
    <Box sx={{ m: 4, p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TreeSelector />
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"left"}
                alignContent={"left"}
              >
                <Typography variant="body" color="grey.500" component="div">
                  Info
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <CountDown start={start} finish={finish} />
              </Grid>
              <Grid
                item
                xs={6}
                display={"flex"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ width: "60%" }}
                  onClick={(event) => {
                    handleStart(event);
                  }}
                >
                  Start
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                display={"flex"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ width: "60%" }}
                  onClick={(event) => {
                    handleEnd(event);
                  }}
                >
                  End
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                display={"flex"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ width: "60%" }}
                  onClick={(event) => {
                    handlePrevious(event);
                  }}
                >
                  Previous
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                display={"flex"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ width: "60%" }}
                  onClick={(event) => {
                    handleNext(event);
                  }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          {getTreeView()}
        </Grid>
      </Grid>
    </Box>
  );
}
