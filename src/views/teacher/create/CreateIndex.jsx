import * as React from "react";

// MaterialUI
import { Box, Tabs, Tab, Typography } from "@mui/material";

// Components
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
  const [value, setValue] = React.useState(0);
  const [graph, setGraph] = React.useState({ nodes: [], edges: [] });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ m: 4, p: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} variant="fullWidth" onChange={handleChange}>
          <Tab label="Ideation" {...a11yProps(0)} />
          <Tab label="Validation" {...a11yProps(1)} />
          <Tab label="Generation" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <IdeationIndex value={value} setValue={setValue} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ValidationIndex
          value={value}
          setValue={setValue}
          graph={graph}
          setGraph={setGraph}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GenerationIndex
          value={value}
          setValue={setValue}
          graph={graph}
          setGraph={setGraph}
        />
      </TabPanel>
    </Box>
  );
}
