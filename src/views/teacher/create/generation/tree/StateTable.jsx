import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  concept,
  remember,
  understand,
  apply,
  analyze,
  evaluate,
  create
) {
  return { concept, remember, understand, apply, analyze, evaluate, create };
}

const rows = [
  createData("Hashing", 0, 0, 1, 0, 1, 0),
  createData("Symmetric Encryption", 1, 0, 1, 0, 0, 0),
];

export default function StateTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">Remember</StyledTableCell>
            <StyledTableCell align="right">Understand</StyledTableCell>
            <StyledTableCell align="right">Apply</StyledTableCell>
            <StyledTableCell align="right">Analyze</StyledTableCell>
            <StyledTableCell align="right">Evaluate</StyledTableCell>
            <StyledTableCell align="right">Create</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.concept}>
              <StyledTableCell component="th" scope="row">
                {row.concept}
              </StyledTableCell>
              <StyledTableCell align="right">{row.remember}</StyledTableCell>
              <StyledTableCell align="right">{row.understand}</StyledTableCell>
              <StyledTableCell align="right">{row.apply}</StyledTableCell>
              <StyledTableCell align="right">{row.analyze}</StyledTableCell>
              <StyledTableCell align="right">{row.evaluate}</StyledTableCell>
              <StyledTableCell align="right">{row.create}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
