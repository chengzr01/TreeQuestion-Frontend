import * as React from "react";
import { useState } from "react";

import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TablePagination,
  TableHead,
} from "@mui/material";

import StatementRow from "./StatementRow";

export default function StatementTable({
  graph,
  setGraph,
  keyCandidates,
  setKeyCandidates,
  distractorCandidates,
  setDistractorCandidates,
  candidateUpdate,
  setCandidateUpdate,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ m: 4, p: 4, width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "5%" }} align="center"></TableCell>
              <TableCell sx={{ width: "35%" }} align="right">
                Source
              </TableCell>
              <TableCell sx={{ width: "25%" }} align="center">
                Label
              </TableCell>
              <TableCell sx={{ width: "35%" }} align="left">
                Target
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? graph.edges.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : graph.edges
            ).map((edge) => {
              var row = {
                source: graph.nodes[parseInt(edge.source)].data.label,
                label: edge.data.label,
                target: graph.nodes[parseInt(edge.target)].data.label,
              };
              return (
                <StatementRow
                  key={edge.id}
                  row={row}
                  keyCandidates={keyCandidates}
                  setKeyCandidates={setKeyCandidates}
                  distractorCandidates={distractorCandidates}
                  setDistractorCandidates={setDistractorCandidates}
                  candidateUpdate={candidateUpdate}
                  setCandidateUpdate={setCandidateUpdate}
                ></StatementRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={graph.edges.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
