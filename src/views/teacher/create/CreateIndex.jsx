import * as React from "react";
import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import IdeationIndex from "./ideation/IdeationIndex";
import ValidationIndex from "./validation/ValidationIndex";
import GenerationIndex from "./generation/GenerationIndex";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CreateIndex() {
  const [value, setValue] = useState(0);
  const [concepts, setConcepts] = useState([]);
  const [field, setField] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [sourceGraph, setSourceGraph] = useState([]);
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [knowledgeList, setKnowledgeList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sx={{ ml: 4, mr: 4, mt: 2 }}>
          <Tabs value={value} variant="fullWidth" onChange={handleChange}>
            <Tab label="Ideation" {...a11yProps(0)} />
            <Tab label="Validation" {...a11yProps(1)} />
            <Tab label="Generation" {...a11yProps(2)} />
          </Tabs>
        </Grid>
      </Grid>
      <Divider sx={{ ml: 4, mr: 4 }} />
      <TabPanel value={value} index={0}>
        <IdeationIndex
          concepts={concepts}
          setConcepts={setConcepts}
          field={field}
          setField={setField}
          knowledgeList={knowledgeList}
          setKnowledgeList={setKnowledgeList}
          sourceGraph={sourceGraph}
          setSourceGraph={setSourceGraph}
          sourceText={sourceText}
          setSourceText={setSourceText}
          value={value}
          setValue={setValue}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ValidationIndex
          concepts={concepts}
          field={field}
          graph={graph}
          setGraph={setGraph}
          knowledgeList={knowledgeList}
          setKnowledgeList={setKnowledgeList}
          sourceGraph={sourceGraph}
          setSourceGraph={setSourceGraph}
          sourceText={sourceText}
          setSourceText={setSourceText}
          value={value}
          setValue={setValue}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GenerationIndex
          concepts={concepts}
          setConcepts={setConcepts}
          field={field}
          setField={setField}
          graph={graph}
          setGraph={setGraph}
          value={value}
          setValue={setValue}
        />
      </TabPanel>
    </Box>
  );
}
