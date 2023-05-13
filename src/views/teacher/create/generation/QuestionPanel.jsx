import * as React from "react";

import { Card } from "@mui/material";
import { Typography } from "@mui/material";

import StateTable from "./StateTable";

export default function QuestionPanel() {
  return (
    <Card sx={{ m: 4, p: 4 }}>
      <Typography variant="h4"> Questions </Typography>
      <StateTable />
    </Card>
  );
}
