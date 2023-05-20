import * as React from "react";

import { Card, Box } from "@mui/material";
import { Typography } from "@mui/material";
import StateTable from "./StateTable";

export default function StatePanel() {
  return (
    <Card sx={{ m: 4, p: 4, height: "80vh" }}>
      <Typography variant="h5"> 🗒 Statistics</Typography>
      <Box sx={{ pt: 2, pb: 2 }}>
        <StateTable />
      </Box>
      <Typography variant="h5"> 💡 Suggestions</Typography>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Card
          sx={{
            m: 1,
            p: 1,
          }}
        >
          <Typography variant="body">Hashing, Understand Level</Typography>
        </Card>
        <Card
          sx={{
            m: 1,
            p: 1,
          }}
        >
          <Typography variant="body">
            Symmectric Encryption, Evaluate Level
          </Typography>
        </Card>
      </Box>
    </Card>
  );
}
