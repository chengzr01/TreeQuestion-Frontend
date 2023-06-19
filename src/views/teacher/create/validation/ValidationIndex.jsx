import * as React from "react";
import { useState } from "react";
import {
  Paper,
  Card,
  Grid,
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import KnowledgeGraph from "./KnowledgeGraph";
import ValidationText from "./ValidationText";

export default function ValidationIndex({
  concepts,
  field,
  graph,
  setGraph,
  sourceGraph,
  setSourceGraph,
  sourceText,
  setSourceText,
  value,
  setValue,
}) {
  const [beforeDisabled, setBeforeDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [graphUpdate, setGraphUpdate] = useState(true);

  console.log(sourceText);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Card sx={{ mt: 4, mb: 4, ml: 4, p: 4, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ height: "4vh" }} align="center">
                  <b>
                    <i>Source Text</i>
                  </b>
                </Typography>
              </Grid>
            </Grid>

            <ValidationText
              concepts={concepts}
              field={field}
              sourceGraph={sourceGraph}
              setSourceGraph={setSourceGraph}
              sourceText={sourceText}
              graphUpdate={graphUpdate}
              setGraphUpdate={setGraphUpdate}
            />
          </Card>
        </Grid>
        <Grid
          item
          xs={8}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Card sx={{ mt: 4, mb: 4, mr: 4, p: 4, width: "100%" }}>
            <Typography sx={{ height: "4vh" }} align="center">
              <b>
                <i>Knowledge Graph</i>
              </b>
            </Typography>
            <KnowledgeGraph
              graph={graph}
              setGraph={setGraph}
              sourceGraph={sourceGraph}
              setSourceGraph={setSourceGraph}
              graphUpdate={graphUpdate}
              setGraphUpdate={setGraphUpdate}
            />
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
            disabled={beforeDisabled}
            onClick={() => {
              setValue(0);
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
          <Button
            disabled={nextDisabled}
            onClick={() => {
              setValue(2);
            }}
          >
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
