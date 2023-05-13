import * as React from "react";
import { useState } from "react";

// Material UI
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";

export default function EdgeRow({ from, label, to, statement }) {
  const [editingState, setEditingState] = useState(false);

  function handleStatementEdit(event) {
    setEditingState(!editingState);
  }

  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell align="center">{from}</TableCell>
      <TableCell align="center">{label}</TableCell>
      <TableCell align="center">{to}</TableCell>
      <TableCell align="left">{statement}</TableCell>
      <TableCell align="center">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            bgcolor: "background.paper",
            color: "text.secondary",
            "& svg": {
              m: 1.5,
            },
            "& hr": {
              mx: 0.5,
            },
          }}
        >
          <ChecklistRtlIcon />
          <Divider orientation="vertical" variant="middle" flexItem />
          <EditIcon
            onClick={(event) => {
              handleStatementEdit(event);
            }}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
          <DeleteIcon />
        </Box>
      </TableCell>
    </TableRow>
  );
}
