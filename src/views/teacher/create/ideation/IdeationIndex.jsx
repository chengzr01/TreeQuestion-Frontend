import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";

import IdeationInput from "./input/IdeationInput";
import IdeationOutput from "./output/IdeationOutput";

export default function IdeationIndex({
  concepts,
  setConcepts,
  field,
  setField,
  knowledgeList,
  setKnowledgeList,
  sourceGraph,
  setSourceGraph,
  value,
  setValue,
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
        knowledgeList={knowledgeList}
        setKnowledgeList={setKnowledgeList}
      />
      <IdeationOutput
        update={update}
        setUpdate={setUpdate}
        concepts={concepts}
        setConcepts={setConcepts}
        field={field}
        setField={setField}
        knowledgeList={knowledgeList}
        setKnowledgeList={setKnowledgeList}
        sourceGraph={sourceGraph}
        setSourceGraph={setSourceGraph}
        value={value}
        setValue={setValue}
      />
    </Box>
  );
}
