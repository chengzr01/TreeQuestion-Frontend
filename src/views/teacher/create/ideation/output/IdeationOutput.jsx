import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";

import ExpandableCard from "./ExpandableCard";

export default function IdeationOutput({ setValue }) {
  const [knowledgeLoad, setKnowledgeLoad] = useState(false);
  const [knowledgeList, setKnowledgeList] = useState([]);

  const getKnowledgeList = () => {
    setKnowledgeLoad(true);
    axios.get("/knowledge/read_knowledge_all/").then((res) => {
      setKnowledgeList(res.data.data);
    });
  };

  const handleKnowledgeConfirm = (event) => {
    event.preventDefault();
    setValue(1);
  };

  useEffect(() => {
    if (!knowledgeLoad) {
      getKnowledgeList();
    }
  });

  return (
    <Box>
      <Paper sx={{ m: 4, p: 4 }}>
        <Typography variant="h3" align="center">
          Knowledge
        </Typography>
        <Grid container spacing={2}>
          {knowledgeList.map((knowledge) => {
            return (
              <Grid item xs={4}>
                <ExpandableCard
                  title={knowledge.concept.toUpperCase()}
                  subheader={knowledge.level.toUpperCase()}
                  content={knowledge.knowledge}
                ></ExpandableCard>
              </Grid>
            );
          })}
        </Grid>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              type="submit"
              variant="outlined"
              sx={{ height: 50 }}
              onClick={(event) => {
                handleKnowledgeConfirm(event);
              }}
            >
              Confirm
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
