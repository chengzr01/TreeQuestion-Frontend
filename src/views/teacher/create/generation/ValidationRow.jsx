import * as React from "react";

// Material UI
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function ValidationRow({
  statement,
  handleClickOpen,
  setSelectedValue,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox">
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
          <CheckIcon />
          <Divider orientation="vertical" variant="middle" flexItem />
          <CloseIcon
            onClick={(event) => {
              handleClickOpen(event);
              setSelectedValue(statement);
            }}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
}
