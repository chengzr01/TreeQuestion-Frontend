import * as React from "react";
import { useState } from "react";

import {
  Box,
  Card,
  Paper,
  Grid,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import StatementTable from "./question/StatementTable";
import QuestionPanel from "./question/QuestionPanel";
import TreePanel from "./tree/TreePanel";
import StatePanel from "./tree/StatePanel";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function GenerationIndex({
  concepts,
  setConcepts,
  field,
  setField,
  graph,
  setGraph,
  value,
  setValue,
}) {
  const [tree, setTree] = useState({ nodes: [], edges: [] });
  const [keyCandidates, setKeyCandidates] = useState([]);
  const [distractorCandidates, setDistractorCandidates] = useState([]);
  const [candidateUpdate, setCandidateUpdate] = useState(true);
  const [update, setUpdate] = useState(true);
  const [edited, setEdited] = useState(false);
  return (
    <Box>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={16}>
          <Card sx={{ mr: 4, ml: 4, p: 4 }}>
            <StatementTable
              graph={graph}
              setGraph={setGraph}
              keyCandidates={keyCandidates}
              setKeyCandidates={setKeyCandidates}
              distractorCandidates={distractorCandidates}
              setDistractorCandidates={setDistractorCandidates}
              candidateUpdate={candidateUpdate}
              setCandidateUpdate={setCandidateUpdate}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ ml: 4, p: 4 }}>
            <QuestionPanel
              tree={tree}
              concepts={concepts}
              setConcepts={setConcepts}
              field={field}
              setField={setField}
              setTree={setTree}
              update={update}
              setUpdate={setUpdate}
              keyCandidates={keyCandidates}
              setKeyCandidates={setKeyCandidates}
              distractorCandidates={distractorCandidates}
              setDistractorCandidates={setDistractorCandidates}
              candidateUpdate={candidateUpdate}
              setCandidateUpdate={setCandidateUpdate}
              edited={edited}
              setEdited={setEdited}
            />
          </Card>
        </Grid>
        <Grid item xs={10}>
          <Card sx={{ height: "64vh", mr: 4, mb: 4, p: 4 }}>
            <Paper sx={{ height: "8vh" }}>
              <StatePanel
                tree={tree}
                setTree={setTree}
                edited={edited}
                setEdited={setEdited}
                concepts={concepts}
                field={field}
              />
            </Paper>
            <Paper sx={{ height: "50vh" }}>
              <TreePanel
                tree={tree}
                setTree={setTree}
                update={update}
                setUpdate={setUpdate}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          display={"flex"}
          justifyContent={"right"}
          alignContent={"right"}
        >
          <Button
            disabled={false}
            onClick={() => {
              setValue(1);
            }}
          >
            <Stack direction={"row"} spacing={2}>
              <NavigateBeforeIcon />
              <Typography>Before</Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          display={"flex"}
          justifyContent={"left"}
          alignContent={"left"}
        >
          <Button disabled={true} onClick={() => {}}>
            <Stack direction={"row"} spacing={2}>
              <Typography>Next</Typography>
              <NavigateNextIcon />
            </Stack>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
