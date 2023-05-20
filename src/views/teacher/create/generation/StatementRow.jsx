import * as React from "react";

import {
  Box,
  Grid,
  Collapse,
  TableCell,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import HeuristicsSelector from "./HeuristicsSelector";

export default function StatementRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.source}</TableCell>
        <TableCell align="center">{row.label}</TableCell>
        <TableCell align="left">{row.target}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ pt: 1, pb: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body">
                    <b>Import as Keys</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body">
                    <b>Import as Distractors</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <HeuristicsSelector />
                </Grid>
                <Grid
                  item
                  xs={6}
                  display="flex"
                  alignContent="right"
                  justifyContent="right"
                ></Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
