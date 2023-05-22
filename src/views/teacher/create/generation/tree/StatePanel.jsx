import * as React from "react";
import { useState, useEffect } from "react";

import { Card, Box, Grid, Typography, Slider, Button } from "@mui/material";

export default function StatePanel({
  tree,
  setTree,
  edited,
  setEdited,
  concepts,
  field,
}) {
  const [expectedWidth, setExpectedWidth] = useState(50);
  const [expectedHeight, setExpectedHeight] = useState(50);
  const [suggestionList, setSuggestionList] = useState([]);
  const getSuggestionList = () => {
    // TODO finish value function
    if (tree.nodes.length < concepts.length) {
      var concept = concepts[Math.floor(Math.random() * concepts.length)];
      var level = "Remeber";
      setSuggestionList([concept + ", " + level]);
    } else {
      setSuggestionList([]);
    }
  };

  useEffect(() => {
    if (edited) {
      getSuggestionList();
      setEdited(false);
    }
  });

  return (
    <Card sx={{ m: 4, p: 4, height: "80vh" }}>
      <Typography variant="h5"> 🗒 Expectations</Typography>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="right"
            alignContent="right"
          >
            Width
          </Grid>
          <Grid
            item
            xs={8}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Slider
              aria-label="Volume"
              size="small"
              value={expectedWidth}
              onChange={(event, newWidth) => {
                setExpectedWidth(newWidth);
              }}
            />
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="right"
            alignContent="right"
          >
            {(expectedWidth / 50).toFixed(2)}
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="right"
            alignContent="right"
          >
            Height
          </Grid>
          <Grid
            item
            xs={8}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Slider
              aria-label="Volume"
              size="small"
              value={expectedHeight}
              onChange={(event, newHeight) => {
                setExpectedHeight(newHeight);
              }}
            />
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="right"
            alignContent="right"
          >
            {(expectedHeight / 50).toFixed(2)}
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth>Concept Weights</Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth>Level Weights</Button>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h5"> 💡 Suggestions</Typography>
      <Box sx={{ pt: 2, pb: 2 }}>
        {suggestionList.map((suggestion) => {
          return (
            <Card sx={{ m: 1, p: 1 }}>
              <Typography variant="body">{suggestion}</Typography>
            </Card>
          );
        })}
      </Box>
    </Card>
  );
}
