import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";
import {
  Box,
  Grid,
  Collapse,
  TableCell,
  TableRow,
  IconButton,
  Typography,
  CircularProgress,
  Button,
  alpha,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import StatementCard from "./StatementCard";
import HeuristicsSelector from "./HeuristicsSelector";
import palette from "../../../../../theme/palette";

export default function StatementRow({
  row,
  keyCandidates,
  setKeyCandidates,
  distractorCandidates,
  setDistractorCandidates,
  candidateUpdate,
  setCandidateUpdate,
}) {
  const [open, setOpen] = useState(false);
  const [keyUpdate, setKeyUpdate] = useState(true);
  const [distractorUpdate, setDistractorUpdate] = useState(true);
  const [keyStatement, setKeyStatement] = useState("");
  const [distractorStatements, setDistractorStatements] = useState([]);
  const [heuristicValueList, setHeuristicValueList] = useState([]);
  const [keyState, setKeyState] = useState("");
  const [distractorState, setDistractorState] = useState("");

  const getDistractingStatment = (event) => {
    for (var index in heuristicValueList) {
      var body = {
        source: row.source,
        label: row.label,
        target: row.target,
        template: heuristicValueList[index].content,
        cache: cookie.load("cache"),
      };
      setDistractorState("waiting");
      axios
        .post("/tree/create_distractor_statement", body)
        .then((res) => {
          setDistractorState("success");
          var newStatementList = [];
          res.data.data.distractors.forEach((element) => {
            newStatementList.push(element);
          });
          setDistractorStatements(newStatementList);
          setDistractorUpdate(false);
        })
        .catch((err) => {
          setDistractorState("failure");
        });
    }
    return;
  };

  const getKeyStatement = () => {
    var body = {
      source: row.source,
      target: row.target,
      label: row.label,
      cache: cookie.load("cache"),
    };
    setKeyState("waiting");
    axios
      .post("/tree/create_key_statement", body)
      .then((res) => {
        setKeyState("success");
        setKeyStatement(res.data.data.key);
        setKeyUpdate(false);
      })
      .catch((err) => {
        setKeyState("failure");
      });
  };

  const getKeyGenerateStateComponent = () => {
    if (keyState === "waiting") return <CircularProgress size="2vw" />;
    else if (keyState === "success")
      return (
        <CheckCircleOutlineIcon
          sx={{ fontSize: "2vw", color: "primary.main" }}
        />
      );
    else if (keyState === "failure")
      return <ErrorOutlineIcon sx={{ fontSize: "2vw", color: "error.main" }} />;
    else
      return (
        <RadioButtonCheckedIcon
          sx={{ fontSize: "2vw", color: "primary.main" }}
        />
      );
  };

  const getDistractorGenerateStateComponent = () => {
    if (distractorState === "waiting") return <CircularProgress size="2vw" />;
    else if (distractorState === "success")
      return (
        <CheckCircleOutlineIcon
          sx={{ fontSize: "2vw", color: "primary.main" }}
        />
      );
    else if (distractorState === "failure")
      return <ErrorOutlineIcon sx={{ fontSize: "2vw", color: "error.main" }} />;
    else
      return (
        <RadioButtonCheckedIcon
          sx={{ fontSize: "2vw", color: "primary.main" }}
        />
      );
  };

  useEffect(() => {
    if (!distractorUpdate) {
      setDistractorUpdate(true);
    }
    if (!keyUpdate) {
      setKeyUpdate(true);
    }
  }, [keyUpdate, distractorUpdate]);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: open ? `${alpha(palette.grey[300], 0.6)}` : null,
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.source}</TableCell>
        <TableCell align="center">{row.label}</TableCell>
        <TableCell align="left">{row.target}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ pt: 1, pb: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Button
                    onClick={(event) => {
                      getKeyStatement(event);
                    }}
                  >
                    <i>Generate Key</i>
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={2}
                  display={"flex"}
                  alignContent={"right"}
                  justifyContent={"right"}
                >
                  {getKeyGenerateStateComponent()}
                </Grid>
                <Grid item xs={12}>
                  {keyStatement === "" ? null : (
                    <StatementCard
                      statement={keyStatement}
                      type="key"
                      keyCandidates={keyCandidates}
                      setKeyCandidates={setKeyCandidates}
                      distractorCandidates={distractorCandidates}
                      setDistractorCandidates={setDistractorCandidates}
                      candidateUpdate={candidateUpdate}
                      setCandidateUpdate={setCandidateUpdate}
                    ></StatementCard>
                  )}
                </Grid>
                <Grid item xs={10}>
                  <Button
                    onClick={(event) => {
                      getDistractingStatment(event);
                    }}
                  >
                    <i> Generate Distractors </i>
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={2}
                  display={"flex"}
                  alignContent={"right"}
                  justifyContent={"right"}
                >
                  {getDistractorGenerateStateComponent()}
                </Grid>

                <Grid item xs={12}>
                  <HeuristicsSelector
                    heuristicValue={heuristicValueList}
                    setHeuristicValue={setHeuristicValueList}
                  />
                </Grid>

                <Grid item xs={12}>
                  {distractorStatements.map((distractor) => {
                    return (
                      <StatementCard
                        statement={distractor}
                        type="distractor"
                        keyCandidates={keyCandidates}
                        setKeyCandidates={setKeyCandidates}
                        distractorCandidates={distractorCandidates}
                        setDistractorCandidates={setDistractorCandidates}
                        candidateUpdate={candidateUpdate}
                        setCandidateUpdate={setCandidateUpdate}
                      ></StatementCard>
                    );
                  })}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
