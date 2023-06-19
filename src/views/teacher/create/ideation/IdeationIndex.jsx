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
  sourceText,
  setSourceText,
  value,
  setValue,
}) {
  const [update, setUpdate] = useState(false);
  const [generateState, setGenerateState] = useState("initalize");
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
        generateState={generateState}
        setGenerateState={setGenerateState}
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
        generateState={generateState}
        setGenerateState={setGenerateState}
        sourceText={sourceText}
        setSourceText={setSourceText}
      />
    </Box>
  );
}
