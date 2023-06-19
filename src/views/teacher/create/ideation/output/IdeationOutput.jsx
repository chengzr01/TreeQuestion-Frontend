import * as React from "react";
import axios from "axios";
import cookie from "react-cookies";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Card,
  Typography,
  Button,
  Tooltip,
  Stack,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StartIcon from "@mui/icons-material/Start";

import ExpandableCard from "./ExpandableCard";

export default function IdeationOutput({
  update,
  setUpdate,
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
  generateState,
  setGenerateState,
  sourceText,
  setSourceText,
}) {
  const [selectedKnowledge, setSelectedKnowledge] = useState([]);
  const [nextDisabled, setNextDisabled] = useState(true);

  const handleNext = () => {
    var newSourceText = "";
    for (var index in selectedKnowledge) {
      newSourceText += knowledgeList[selectedKnowledge[index]].content + "\n";
    }
    setSourceText(newSourceText);
  };

  useEffect(() => {
    if (!update) {
      setUpdate(true);
    }
  });

  return (
    <Box>
      <Card sx={{ ml: 4, mr: 4, mt: 2, mb: 2, p: 4 }}>
        <Grid container spacing={2}>
          {knowledgeList.map((knowledge, index) => {
            return (
              <Grid item xs={4}>
                <ExpandableCard
                  title={knowledge.concept.toUpperCase()}
                  subheader={knowledge.level.toUpperCase()}
                  content={knowledge.content}
                  index={index}
                  selectedKnowledge={selectedKnowledge}
                  setSelectedKnowledge={setSelectedKnowledge}
                  nextDisabled={nextDisabled}
                  setNextDisabled={setNextDisabled}
                />
              </Grid>
            );
          })}
        </Grid>
      </Card>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          display={"flex"}
          justifyContent={"right"}
          alignContent={"right"}
        >
          <Button
            disabled={true}
            onClick={() => {
              setValue(0);
            }}
          >
            <Stack direction={"row"} spacing={2}>
              <NavigateBeforeIcon />
              <Typography>Before </Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          display={"flex"}
          justifyContent={"left"}
          alignContent={"left"}
        >
          <Button
            disabled={false}
            onClick={() => {
              handleNext();
              setValue(1);
            }}
          >
            <Stack direction={"row"} spacing={2}>
              <Typography>Next</Typography>
              <NavigateNextIcon />
            </Stack>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
