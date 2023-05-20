import * as React from "react";

import { Box } from "@mui/material";
import { Grid } from "@mui/material";

import StatementTable from "./question/StatementTable";
import QuestionPanel from "./question/QuestionPanel";
import TreePanel from "./tree/TreePanel";
import IssuePanel from "./issue/IssuePanel";
import StatePanel from "./tree/StatePanel";

export default function GenerationIndex({ value, setValue, graph, setGraph }) {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <StatementTable graph={graph} setGraph={setGraph} />
        </Grid>
        <Grid item xs={4}>
          <QuestionPanel />
        </Grid>
        <Grid item xs={8}>
          <TreePanel />
        </Grid>
        <Grid item xs={4}>
          <StatePanel />
        </Grid>
        <Grid item xs={12}>
          <IssuePanel />
        </Grid>
      </Grid>
    </Box>
  );
}
