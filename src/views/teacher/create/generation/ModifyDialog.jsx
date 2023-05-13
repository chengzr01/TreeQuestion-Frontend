import * as React from "react";

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const heuristics = ["heuristic 1", "heuristic 2", "heuristic 3"];

export default function ModifyDialog({ open, handleClose }) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ m: 2, p: 2 }}>
        <DialogTitle>Import as Distractors</DialogTitle>
        {heuristics.map((heuristic) => {
          return <Typography>heuristic</Typography>;
        })}
        <Grid container>
          <Grid xs={6}>
            {" "}
            <Button onClick={handleClose}> Cancel</Button>{" "}
          </Grid>
          <Grid xs={6}>
            {" "}
            <Button onClick={handleClose}> Confirm</Button>{" "}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
