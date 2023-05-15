import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  concept,
  remember,
  understand,
  apply,
  analyze,
  evalute,
  create
) {
  return { concept, remember, understand, apply, analyze, evalute, create };
}

const rows = [
  createData("Hashing", "🟢", "🟡", "🟢", "🔴", "🔴", ""),
  createData("Symmetric Encyption", "🟢", "🟢", "🟢", "🟢", "🟡", "🟢"),
  createData("Message Authentication Code", "🔴", "🔴", "🔴", "", "", ""),
];

export default function ReviewTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Remember</TableCell>
            <TableCell align="right">Understand</TableCell>
            <TableCell align="right">Apply</TableCell>
            <TableCell align="right">Analyze</TableCell>
            <TableCell align="right">Evaluate</TableCell>
            <TableCell align="right">Create</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.concept}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.concept}
              </TableCell>
              <TableCell align="right">{row.remember}</TableCell>
              <TableCell align="right">{row.understand}</TableCell>
              <TableCell align="right">{row.apply}</TableCell>
              <TableCell align="right">{row.analyze}</TableCell>
              <TableCell align="right">{row.evalute}</TableCell>
              <TableCell align="right">{row.create}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
