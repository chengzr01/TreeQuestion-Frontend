import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function IdeationLevels({ setLevels }) {
  const [value, setValue] = React.useState([]);

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setLevels(newValue);
      }}
      options={levels}
      renderInput={(params) => <TextField {...params} label="Levels" />}
    />
  );
}

const levels = [
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
];
