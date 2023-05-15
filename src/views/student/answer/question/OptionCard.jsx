import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import palette from "../../../../theme/palette";

export default function OptionCard({ option, choice, setChoice }) {
  const [selected, setSelected] = useState(false);
  const getTextColor = () => {
    if (selected) return palette.primary.main;
    else return palette.common.black;
  };
  return (
    <Card
      sx={{
        p: 1,
        mt: 1,
        mb: 1,
        "&:hover": {
          backgroundColor: "grey.200",
          opacity: [0.75, 0.75, 0.75],
        },
      }}
      onClick={() => {
        var newChoice = choice;
        for (var id in newChoice) {
          if (newChoice[id].choice === option) {
            newChoice[id].result = !selected;
          }
        }
        setChoice(newChoice);
        setSelected(!selected);
      }}
    >
      <Typography variant="body" color={getTextColor()}>
        {option}
      </Typography>
    </Card>
  );
}
