import * as React from "react";
import { useState } from "react";
import { Box, Tabs, Tab, Typography, Button, Grid } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
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
  const [sourceGraph, setSourceGraph] = useState([]);
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [knowledgeList, setKnowledgeList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ m: 4, p: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Grid container>
          <Grid
            item
            xs={1}
            display={"flex"}
            alignContent={"left"}
            justifyContent={"left"}
          >
            <Button
              variant="text"
              onClick={(event) => {
                if (value - 1 > 0) {
                  setValue(value - 1);
                } else {
                  setValue(0);
                }
              }}
            >
              <NavigateBeforeIcon />
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Tabs value={value} variant="fullWidth" onChange={handleChange}>
              <Tab label="Ideation" {...a11yProps(0)} />
              <Tab label="Validation" {...a11yProps(1)} />
              <Tab label="Generation" {...a11yProps(2)} />
            </Tabs>
          </Grid>
          <Grid
            item
            xs={1}
            display={"flex"}
            alignContent={"right"}
            justifyContent={"right"}
          >
            <Button
              variant="text"
              onClick={(event) => {
                if (value + 1 < 3) {
                  setValue(value + 1);
                } else {
                  setValue(2);
                }
              }}
            >
              <NavigateNextIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
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
          value={value}
          setValue={setValue}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ValidationIndex
          graph={graph}
          setGraph={setGraph}
          sourceGraph={sourceGraph}
          setSourceGraph={setSourceGraph}
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
        />
      </TabPanel>
    </Box>
  );
}
