import * as React from "react";
import { useState } from "react";

import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";

import ValidationRow from "./ValidationRow";
import ModifyDialog from "./ModifyDialog";

export default function StatementTable() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const validatedList = [
    "Symmetric encryption is a type of encryption where the same key is used for both encryption and decryption.",
    "It is also known as shared secret encryption or private key encryption.",
    "The key used in symmetric encryption must be kept secret to maintain the security of the encrypted data.",
    "Symmetric encryption is faster and more efficient than asymmetric encryption, but it requires secure key distribution.",
    "RC4 is a type of symmetric encryption algorithm.",
    "RC5 is a type of symmetric encryption algorithm.",
    "Blowfish is a type of symmetric encryption algorithm.",
    "AES is a type of symmetric encryption algorithm.",
  ];

  return (
    <Card sx={{ m: 4, p: 4 }}>
      <ModifyDialog open={open} handleClose={handleClose} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "80%" }} align="center">
                Statement
              </TableCell>
              <TableCell sx={{ width: "20%" }} align="center">
                Operation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validatedList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((statement) => {
                return (
                  <ValidationRow
                    statement={statement}
                    handleClickOpen={handleClickOpen}
                    setSelectedValue={setSelectedValue}
                  ></ValidationRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={validatedList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
