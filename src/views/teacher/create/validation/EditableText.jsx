import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Typography } from "@mui/material";

export default function EditableText({ defaultValue, updateDefaultValue }) {
  const [editState, setEditState] = useState(false);
  const [displayString, setDisplayString] = useState(defaultValue);
  const [changeVisible, setChangeVisible] = useState(false);

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

  const getShowIcon = () => {
    if (changeVisible) {
      return getEditIcon();
    } else {
      return null;
    }
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
      onMouseEnter={(event) => {
        event.preventDefault();
        setChangeVisible(true);
      }}
      onMouseLeave={(event) => {
        event.preventDefault();
        setChangeVisible(false);
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          p: 1,
          pb: 2,
          "&:hover": {
            backgroundColor: "grey.200",
            opacity: [0.75, 0.75, 0.75],
          },
        }}
      >
        <Grid
          item
          xs={10}
          display="flex"
          justifyContent="left"
          alignItems="left"
        >
          {getDisplayString()}
        </Grid>
        <Grid
          item
          xs={2}
          display="flex"
          justifyContent="right"
          alignItems="right"
        >
          {getShowIcon()}
        </Grid>
      </Grid>
    </Box>
  );
}
