import * as React from "react";
import { useState } from "react";

// Material UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";

import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";

// Components
import EdgeRow from "./EdgeRow";

export default function KnowledgeTable({ graphState }) {
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
    <Card sx={{ m: 2, width: "100%", height: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "15%" }} align="center">
                From
              </TableCell>
              <TableCell sx={{ width: "10%" }} align="center">
                Label
              </TableCell>
              <TableCell sx={{ width: "15%" }} align="center">
                To
              </TableCell>
              <TableCell sx={{ width: "40%" }} align="center">
                Statement
              </TableCell>
              <TableCell sx={{ width: "20%" }} align="center">
                Operation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {graphState.edges
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((edge) => {
                return (
                  <EdgeRow
                    from={edge.from}
                    label={edge.label}
                    to={edge.to}
                    statement={edge.statement}
                  ></EdgeRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={graphState.edges.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
