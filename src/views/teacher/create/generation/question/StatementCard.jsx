import * as React from "react";
import { useState } from "react";
import { Typography, Card, alpha } from "@mui/material";

import palette from "../../../../../theme/palette";

export default function StatementCard({
  statement,
  type,
  keyCandidates,
  setKeyCandidates,
  distractorCandidates,
  setDistractorCandidates,
  candidateUpdate,
  setCandidateUpdate,
}) {
  const [color, setColor] = useState("black");
  const handleClick = () => {
    var newKeyCandidates = keyCandidates;
    var newDistractorCandidates = distractorCandidates;
    setCandidateUpdate(false);
    if (type === "key") {
      if (keyCandidates.indexOf(statement) >= 0) {
        newKeyCandidates.splice(keyCandidates.indexOf(statement), 1);
        setKeyCandidates(newKeyCandidates);
        setColor("black");
      } else {
        newKeyCandidates.push(statement);
        setKeyCandidates(newKeyCandidates);
        setColor(palette.primary.main);
      }
    } else {
      if (distractorCandidates.indexOf(statement) >= 0) {
        newDistractorCandidates.splice(
          distractorCandidates.indexOf(statement),
          1
        );
        setDistractorCandidates(newDistractorCandidates);
        setColor("black");
      } else {
        newDistractorCandidates.push(statement);
        setDistractorCandidates(newDistractorCandidates);
        setColor(palette.error.main);
      }
    }
  };

  return (
    <Card
      sx={{
        mt: 1,
        mb: 1,
        p: 2,
        "&:hover": {
          backgroundColor: `${alpha(palette.primary.main, 0.2)}`,
        },
      }}
      onClick={handleClick}
    >
      <Typography color={color}>{statement}</Typography>
    </Card>
  );
}
