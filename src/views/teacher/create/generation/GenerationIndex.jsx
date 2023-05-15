import * as React from "react";

import { Box } from "@mui/material";
import { Grid } from "@mui/material";

import StatementTable from "./StatementTable";
import QuestionPanel from "./QuestionPanel";
import TreePanel from "./TreePanel";
import IssuePanel from "./IssuePanel";

export default function GenerationIndex({ value, setValue }) {
  return (
    <Box>
      <Grid container>
        <Grid item xs={6}>
          <StatementTable />
        </Grid>
        <Grid item xs={6}>
          <QuestionPanel />
        </Grid>
        <Grid item xs={12}>
          <TreePanel />
        </Grid>
        <Grid item xs={12}>
          <IssuePanel />
        </Grid>
      </Grid>
    </Box>
  );
}
