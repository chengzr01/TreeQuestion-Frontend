import * as React from "react";
import { useState } from "react";

import { Box } from "@mui/material";
import { Grid } from "@mui/material";

import StatementTable from "./question/StatementTable";
import QuestionPanel from "./question/QuestionPanel";
import TreePanel from "./tree/TreePanel";
import IssuePanel from "./issue/IssuePanel";
import StatePanel from "./tree/StatePanel";

export default function GenerationIndex({
  value,
  setValue,
  concepts,
  setConcepts,
  field,
  setField,
  graph,
  setGraph,
}) {
  const [tree, setTree] = useState({ nodes: [], edges: [] });
  const [keyCandidates, setKeyCandidates] = useState([]);
  const [distractorCandidates, setDistractorCandidates] = useState([]);
  const [candidateUpdate, setCandidateUpdate] = useState(true);
  const [update, setUpdate] = useState(true);
  const [edited, setEdited] = useState(false);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
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
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
        <Grid item xs={8}>
          <TreePanel
            tree={tree}
            setTree={setTree}
            update={update}
            setUpdate={setUpdate}
          />
        </Grid>
        <Grid item xs={4}>
          <StatePanel
            tree={tree}
            setTree={setTree}
            edited={edited}
            setEdited={setEdited}
            concepts={concepts}
            field={field}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
