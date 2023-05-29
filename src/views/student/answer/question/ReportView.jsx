import * as React from "react";
import {
  Paper,
  Grid,
  Typography,
  ListItem,
  ListItemButton,
  List,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { alpha, styled } from "@mui/material/styles";
import { alphabet } from "./Utils";

export const getAnswerFromList = (answerList) => {
  var result = "";
  for (var resultIndex in answerList) {
    if (answerList[resultIndex].result) {
      result += alphabet[resultIndex];
    }
  }
  return result;
};

const levels = [
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: `${alpha(theme.palette.primary.darker, 0.6)}`,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function QuestionRow({ id, answer, result, grade }) {
  return (
    <ListItem key={id} component="div" disablePadding>
      <ListItemButton>
        <Stack direction="row" spacing={2}>
          <Typography>{answer === result ? "🟢" : "🔴"}</Typography>
          <Typography>
            <b>
              Question {id}: {grade}
            </b>
          </Typography>
          <Typography> Key: {answer} </Typography>
          <Typography>Answer: {result}</Typography>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}

export default function ReportView({ activeTree, answerList }) {
  var questionGrade = activeTree.map((node) => {
    return {
      id: node.id,
      level: node.level,
      answer: node.answer,
      concept: node.concept,
      result: "",
      grade: 0,
    };
  });

  var concepts = Array.from(
    new Set(
      activeTree.map((node) => {
        return node.concept;
      })
    )
  );

  for (var questionIndex in questionGrade) {
    for (var answerIndex in answerList) {
      if (questionGrade[questionIndex].id === answerList[answerIndex].id) {
        questionGrade[questionIndex].result = getAnswerFromList(
          answerList[answerIndex].options
        );
        if (
          questionGrade[questionIndex].result ===
          questionGrade[questionIndex].answer
        ) {
          questionGrade[questionIndex].grade = 1;
        } else {
          questionGrade[questionIndex].grade = 0;
        }
      }
    }
  }

  const getTableCount = (concept, level) => {
    var total = 0;
    var correct = 0;
    for (var i in questionGrade) {
      if (
        questionGrade[i].concept === concept &&
        questionGrade[i].level === level
      ) {
        total += 1;
        if (questionGrade[i].answer === questionGrade[i].result) {
          correct += 1;
        }
      }
    }
    if (total !== 0) {
      return correct + "/" + total;
    }
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
            Report
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"left"}
          alignContent={"left"}
        >
          <List sx={{ width: "100%", overflow: "auto", maxHeight: "30vh" }}>
            {questionGrade.map((questionItem) => {
              return (
                <QuestionRow
                  id={questionItem.id}
                  answer={questionItem.answer}
                  result={questionItem.result}
                  grade={questionItem.grade}
                />
              );
            })}
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"left"}
          alignContent={"left"}
        >
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  {levels.map((level) => (
                    <StyledTableCell align="center" width={"12.5%"}>
                      {level}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {concepts.map((concept) => {
                  return (
                    <StyledTableRow key={concept}>
                      <StyledTableCell component="th" scope="row">
                        {concept}
                      </StyledTableCell>
                      {levels.map((level) => {
                        return (
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {getTableCount(concept, level)}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}
