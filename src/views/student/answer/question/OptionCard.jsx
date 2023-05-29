import * as React from "react";
import { useState, useEffect } from "react";
import { Typography, Card } from "@mui/material";
import palette from "../../../../theme/palette";

export default function OptionCard({
  questionIndex,
  option,
  optionIndex,
  answerList,
  setAnswerList,
}) {
  const [optionColor, setOptionColor] = useState(palette.common.black);
  const handleClick = () => {
    var newAnswerList = answerList;
    for (var answerListIndex in newAnswerList) {
      if (newAnswerList[answerListIndex].id === questionIndex) {
        for (var optionIndex in newAnswerList[answerListIndex].options) {
          if (
            newAnswerList[answerListIndex].options[optionIndex].option ===
            option
          ) {
            if (newAnswerList[answerListIndex].options[optionIndex].result) {
              setOptionColor(palette.common.black);
            } else {
              setOptionColor(palette.primary.main);
            }
            newAnswerList[answerListIndex].options[optionIndex].result =
              !newAnswerList[answerListIndex].options[optionIndex].result;
            break;
          }
        }
        break;
      }
    }
    setAnswerList(newAnswerList);
  };

  useEffect(() => {
    var newAnswerList = answerList;
    for (var answerListIndex in newAnswerList) {
      if (newAnswerList[answerListIndex].id === questionIndex) {
        for (var optionIndex in newAnswerList[answerListIndex].options) {
          if (
            newAnswerList[answerListIndex].options[optionIndex].option ===
            option
          ) {
            if (!newAnswerList[answerListIndex].options[optionIndex].result) {
              setOptionColor(palette.common.black);
            } else {
              setOptionColor(palette.primary.main);
            }
            break;
          }
        }
        break;
      }
    }
  }, [answerList, option, questionIndex]);

  return (
    <Card
      sx={{
        p: 1,
        mt: 1,
        mb: 1,
        "&:hover": {
          backgroundColor: palette.grey[300],
          opacity: [0.75, 0.75, 0.75],
        },
      }}
      onClick={() => {
        handleClick();
      }}
    >
      <Typography variant="body" color={optionColor}>
        {option}
      </Typography>
    </Card>
  );
}
