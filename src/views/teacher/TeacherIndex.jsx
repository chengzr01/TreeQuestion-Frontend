import * as React from "react";
import { useState } from "react";

// MaterialUI
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

// Components

import ValidationIndex from "./validation/ValidationIndex";
import QuestionGenerator from "./generation/QuestionGenerator";
import IdeationIndex from "./ideation/IdeationIndex";

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

export default function TeacherIndex() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [messageList, setMessageList] = useState([]);

  return (
    <Box>
      <Typography variant="h1" align="center">
        🌲TreeQuestion
      </Typography>
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
          <ValidationIndex value={value} setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <QuestionGenerator />
        </TabPanel>
      </Box>
    </Box>
  );
}
