import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Typography } from "@mui/material";

const ariaLabel = { "aria-label": "description" };

export default function EditableText({ defaultValue, updateDefaultValue }) {
  const [editState, setEditState] = useState(false);
  const [displayString, setDisplayString] = useState(defaultValue);

  const handleEditIconClick = (event) => {
    event.preventDefault();
    setEditState(!editState);
  };

  const handleSaveIconClick = (event) => {
    event.preventDefault();
    setEditState(!editState);
    updateDefaultValue(displayString);
  };

  const handleInputValueChange = (event) => {
    event.preventDefault();
    setDisplayString(event.target.value);
  };

  const getEditIcon = () => {
    if (editState) {
      return (
        <SaveIcon
          onClick={(event) => {
            handleSaveIconClick(event);
          }}
        />
      );
    } else {
      return (
        <EditIcon
          onClick={(event) => {
            handleEditIconClick(event);
          }}
        />
      );
    }
  };

  const getDisplayString = () => {
    if (editState) {
      return (
        <Input
          value={displayString}
          inputProps={ariaLabel}
          onChange={(event) => {
            handleInputValueChange(event);
          }}
          fullWidth
        />
      );
    } else {
      return <Typography variant="body"> {displayString} </Typography>;
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item xs={10}>
          {getDisplayString()}
        </Grid>
        <Grid item xs={2}>
          {getEditIcon()}
        </Grid>
      </Grid>
    </Box>
  );
}
