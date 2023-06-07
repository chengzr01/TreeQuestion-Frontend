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
  Tooltip,
  Button,
  alpha,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";

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

  const getDistractingStatment = (event) => {
    for (var index in heuristicValueList) {
      var body = {
        source: row.source,
        label: row.label,
        target: row.target,
        template: heuristicValueList[index].content,
        cache: cookie.load("cache"),
      };
      axios
        .post("/tree/create_distractor_statement", body)
        .then((res) => {
          console.log(res.data.data);
          var newStatementList = distractorStatements;
          res.data.data.distractors.forEach((element) => {
            newStatementList.push(element);
          });
          setDistractorStatements(newStatementList);
          setDistractorUpdate(false);
        })
        .catch((err) => {
          console.log(err);
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
    axios
      .post("/tree/create_key_statement", body)
      .then((res) => {
        console.log(res.data.data);
        setKeyStatement(res.data.data.key);
        setKeyUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
                  <Typography
                    sx={{ fontSize: 14, pt: 1 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <i>Import as Keys</i>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  display="flex"
                  justifyContent="right"
                  alignContent="right"
                >
                  <Tooltip title="Generate">
                    <Button
                      onClick={(event) => {
                        getKeyStatement(event);
                      }}
                    >
                      <PublishedWithChangesOutlinedIcon sx={{ m: 1 }} />
                    </Button>
                  </Tooltip>
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
                  <Typography
                    sx={{ fontSize: 14, pt: 1 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <i>Import as Distractors</i>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  display="flex"
                  justifyContent="right"
                  alignContent="right"
                >
                  <Tooltip title="Generate">
                    <Button
                      onClick={(event) => {
                        getDistractingStatment(event);
                      }}
                    >
                      <PublishedWithChangesOutlinedIcon sx={{ m: 1 }} />
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                >
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
