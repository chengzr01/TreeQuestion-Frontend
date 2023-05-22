import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";

import IdeationInput from "./input/IdeationInput";
import IdeationOutput from "./output/IdeationOutput";

export default function IdeationIndex({
  value,
  setValue,
  concepts,
  setConcepts,
  field,
  setField,
}) {
  const [update, setUpdate] = useState(false);

  return (
    <Box>
      <IdeationInput
        update={update}
        setUpdate={setUpdate}
        concepts={concepts}
        setConcepts={setConcepts}
        field={field}
        setField={setField}
      />
      <IdeationOutput setValue={setValue} />
    </Box>
  );
}
