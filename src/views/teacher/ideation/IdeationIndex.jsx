import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";

import IdeationInput from "./IdeationInput";
import IdeationOutput from "./IdeationOutput";

export default function IdeationIndex({ value, setValue }) {
  const [update, setUpdate] = useState(false);

  return (
    <Box>
      <IdeationInput update={update} setUpdate={setUpdate} />
      <IdeationOutput
        update={update}
        setUpdate={setUpdate}
        value={value}
        setValue={setValue}
      />
    </Box>
  );
}
