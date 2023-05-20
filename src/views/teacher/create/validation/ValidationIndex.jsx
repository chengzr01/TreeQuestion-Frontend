import * as React from "react";
import { useState } from "react";
import { Paper, Grid, Button } from "@mui/material";
import KnowledgeGraph from "./KnowledgeGraph";
import EditableText from "./EditableText";
export default function ValidationIndex({ value, setValue, graph, setGraph }) {
  const [treeName, setTreeName] = useState("Name");
  return (
    <Paper sx={{ m: 4, p: 4, width: "100%", height: "80vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <EditableText
            defaultValue={treeName}
            updateDefaultValue={setTreeName}
          />
        </Grid>
        <Grid
          item
          xs={2}
          display="flex"
          justifyContent="right"
          alignContent="right"
        >
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            sx={{ height: 50 }}
            onClick={(event) => {
              event.preventDefault();
              setValue(2);
            }}
          >
            Confirm
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ width: "100%", height: "80vh" }}>
          <KnowledgeGraph graph={graph} setGraph={setGraph} />
        </Grid>
      </Grid>
    </Paper>
  );
}
