import * as React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import OptionCard from "./OptionCard";

export default function QuestionView({
  activeQuestion,
  answerList,
  setAnswerList,
}) {
  const getOptionCard = () => {
    return activeQuestion.options.map((option, index) => {
      return (
        <OptionCard
          questionIndex={activeQuestion.id}
          option={option}
          optionIndex={index}
          answerList={answerList}
          setAnswerList={setAnswerList}
        />
      );
    });
  };
  return (
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
            Question {activeQuestion.id}
          </Typography>
        </Grid>
      </Grid>
      <Typography sx={{ fontSize: 18 }} component="div">
        <b>{activeQuestion.stem}</b>
      </Typography>
      {getOptionCard()}
    </Paper>
  );
}
