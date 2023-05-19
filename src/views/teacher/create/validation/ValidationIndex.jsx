import * as React from "react";
import { Paper, Grid, Typography } from "@mui/material";
import KnowledgeGraph from "./KnowledgeGraph";

export default function ValidationIndex({ value, setValue }) {
  return (
    <Paper sx={{ m: 4, p: 4, width: "100%", height: "80vh" }}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Typography variant="body" color="grey.500" component="div">
            Tree Name
          </Typography>
        </Grid>
        <Grid
          item
          xs
          display="flex"
          justifyContent="right"
          alignContent="right"
        ></Grid>
        <Grid item xs={12} sx={{ width: "100%", height: "80vh" }}>
          <KnowledgeGraph />
        </Grid>
      </Grid>
    </Paper>
  );
}
