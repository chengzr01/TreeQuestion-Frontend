import * as React from "react";
import { Autocomplete, TextField, Typography, Grid } from "@mui/material";

export default function HeuristicsSelector() {
  return (
    <Autocomplete
      fullWidth
      multiple
      size="small"
      options={heuristics}
      getOptionLabel={(option) => {
        return (
          <Grid container spacing={2} columns={10}>
            <Grid item xs={10}>
              <Typography
                sx={{ fontSize: 10, pt: 1 }}
                color="text.secondary"
                gutterBottom
              >
                {option.level.toUpperCase()} {option.content}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
      defaultValue={[]}
      filterSelectedOptions
      renderInput={(params) => {
        return <TextField {...params} label="Heuristics" />;
      }}
    />
  );
}

const heuristics = [
  {
    content:
      "[object]+is+[concept]. For example, [object]+is+[example1]+[example 2]+[example 3].",
    level: "remember",
  },
];
