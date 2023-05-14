import * as React from "react";
import { useState } from "react";

// MaterialUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import TreeSelector from "./tree/TreeSelector";
import FullTreeView from "./tree/FullTreeView";
import QuestionView from "./question/QuestionView";
import ConsoleIndex from "./console/ConsoleIndex";

export default function AnswerIndex() {
  const [activeQuestion, setActiveQuestion] = useState({
    id: 0,
    stem: "What is the process of implementing symmetric encryption to protect sensitive data?",
    options: [
      "A. Selecting a different key for encryption and decryption",
      "B. Sharing the key with unauthorized parties",
      "C. Choosing an appropriate algorithm and key size",
      "D. Storing the key in a public location",
    ],
  });
  return (
    <Box sx={{ m: 4, p: 4 }}>
      <Grid container spacing={4} sx={{ mt: 2, mb: 2 }}>
        <Grid item xs={12}>
          <TreeSelector />
        </Grid>
        <Grid item xs={8}>
          <FullTreeView />
        </Grid>
        <Grid item xs={4}>
          <QuestionView
            id={activeQuestion.id}
            stem={activeQuestion.stem}
            options={activeQuestion.options}
          />
        </Grid>
        <Grid item xs={12}>
          <ConsoleIndex />
        </Grid>
      </Grid>
    </Box>
  );
}
