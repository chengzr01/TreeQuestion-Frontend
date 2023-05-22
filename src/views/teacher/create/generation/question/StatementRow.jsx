import * as React from "react";
import { useState } from "react";

import {
  Box,
  Grid,
  Collapse,
  TableCell,
  TableRow,
  IconButton,
  Typography,
  Tooltip,
  Card,
} from "@mui/material";
import { alpha } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";

import HeuristicsSelector from "./HeuristicsSelector";
import palette from "../../../../../theme/palette";

function StatementCard({
  statement,
  type,
  keyCandidates,
  setKeyCandidates,
  distractorCandidates,
  setDistractorCandidates,
}) {
  const [color, setColor] = useState("black");
  const handleClick = () => {
    var newKeyCandidates = keyCandidates;
    var newDistractorCandidates = distractorCandidates;

    if (type === "key") {
      if (keyCandidates.indexOf(statement) >= 0) {
        newKeyCandidates.splice(keyCandidates.indexOf(statement), 1);
        setKeyCandidates(newKeyCandidates);
        setColor("black");
      } else {
        newKeyCandidates.push(statement);
        setKeyCandidates(newKeyCandidates);
        setColor(palette.primary.main);
      }
    } else {
      if (distractorCandidates.indexOf(statement) >= 0) {
        newDistractorCandidates.splice(
          distractorCandidates.indexOf(statement),
          1
        );
        setDistractorCandidates(newDistractorCandidates);
        setColor("black");
      } else {
        newDistractorCandidates.push(statement);
        setDistractorCandidates(newDistractorCandidates);
        setColor(palette.error.main);
      }
    }
  };

  return (
    <Card
      sx={{
        mt: 1,
        mb: 1,
        p: 2,
        "&:hover": {
          backgroundColor: `${alpha(palette.info.main, 0.2)}`,
        },
      }}
      onClick={handleClick}
    >
      <Typography color={color}>{statement}</Typography>
    </Card>
  );
}

export default function StatementRow({
  row,
  keyCandidates,
  setKeyCandidates,
  distractorCandidates,
  setDistractorCandidates,
}) {
  const [open, setOpen] = useState(false);
  const [keyStatement, setKeyStatement] = useState(
    "DES, AES, Blowfish	Belongs to	Symmetric encryption algorithms"
  );
  const [distractorStatements, setDistractorStatements] = useState([
    "SHA-1	Belongs to	Symmetric encryption algorithms",
    "SHA-2	Belongs to	Symmetric encryption algorithms",
  ]);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: open ? `${alpha(palette.grey[300], 0.6)}` : null,
        }}
      >
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
                  <Typography
                    sx={{ fontSize: 14, pt: 1 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <i>Import as Keys</i>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <StatementCard
                    statement={keyStatement}
                    type="key"
                    keyCandidates={keyCandidates}
                    setKeyCandidates={setKeyCandidates}
                    distractorCandidates={distractorCandidates}
                    setDistractorCandidates={setDistractorCandidates}
                  ></StatementCard>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ fontSize: 14, pt: 1 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <i>Import as Distractors</i>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                >
                  <HeuristicsSelector />
                </Grid>
                <Grid
                  item
                  xs={2}
                  display="flex"
                  justifyContent="left"
                  alignContent="left"
                >
                  <Tooltip title="Generate">
                    <PublishedWithChangesOutlinedIcon sx={{ m: 1 }} />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  {distractorStatements.map((distractor) => {
                    return (
                      <StatementCard
                        statement={distractor}
                        type="distractor"
                        keyCandidates={keyCandidates}
                        setKeyCandidates={setKeyCandidates}
                        distractorCandidates={distractorCandidates}
                        setDistractorCandidates={setDistractorCandidates}
                      ></StatementCard>
                    );
                  })}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
