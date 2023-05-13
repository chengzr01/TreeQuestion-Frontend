import * as React from "react";
import { useState, useEffect } from "react";

// Material UI
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

import axios from "axios";

import ReactMarkdown from "react-markdown";

export default function IdeationOutput({ update, setUpdate, value, setValue }) {
  const [load, setLoad] = useState(false);
  const [knowledgeLoad, setKnowledgeLoad] = useState(false);
  const [ideationList, setIdeationList] = useState([]);
  const [knowledgeList, setKnowledgeList] = useState([]);

  const getIdeationList = () => {
    setLoad(true);
    setUpdate(true);
    axios.get("knowledge/read_ideation_all/").then((res) => {
      setIdeationList(res.data.data);
    });
  };

  const getKnowledgeList = () => {
    setKnowledgeLoad(true);
    axios.get("knowledge/read_knowledge_all/").then((res) => {
      setKnowledgeList(res.data.data);
    });
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    axios.post("knowledge/create_knowledge_all/").then((res) => {
      console.log(res);
      getKnowledgeList();
    });
  };

  const handleKnowledgeConfirm = (event) => {
    event.preventDefault();
    setValue(1);
  };

  useEffect(() => {
    if (!load || !update) {
      getIdeationList();
    }
    if (!knowledgeLoad) {
      getKnowledgeList();
    }
  });

  return (
    <Box>
      <Paper sx={{ m: 4, p: 4 }}>
        <Typography variant="h3" align="center">
          Ideation
        </Typography>
        <Grid container>
          {ideationList.map((ideation) => {
            return (
              <Grid item xs={6} spacing={6}>
                <Paper
                  sx={{
                    m: 2,
                    p: 2,
                    border: 1,
                    borderColor: "grey.400",
                    "&:hover": {
                      backgroundColor: "grey.200",
                      opacity: [0.75, 0.75, 0.75],
                    },
                  }}
                >
                  <Typography variant="h4" align="center">
                    {ideation.concept.toUpperCase()}
                  </Typography>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        sx={{ fontStyle: "italic" }}
                        align="center"
                      >
                        {ideation.level.toUpperCase()} LEVEL
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body2" sx={{ color: "grey.500" }}>
                    <ReactMarkdown>{ideation.ideation}</ReactMarkdown>
                  </Typography>
                </Paper>
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
                handleConfirm(event);
              }}
            >
              Confirm
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>
      <Paper sx={{ m: 4, p: 4 }}>
        <Typography variant="h3" align="center">
          Knowledge
        </Typography>
        <Grid container>
          {knowledgeList.map((knowledge) => {
            return (
              <Grid item xs={6} spacing={6}>
                <Paper
                  sx={{
                    m: 2,
                    p: 2,
                    border: 1,
                    borderColor: "grey.400",
                    "&:hover": {
                      backgroundColor: "grey.200",
                      opacity: [0.75, 0.75, 0.75],
                    },
                  }}
                >
                  <Typography variant="h4" align="center">
                    {knowledge.concept.toUpperCase()}
                  </Typography>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        sx={{ fontStyle: "italic" }}
                        align="center"
                      >
                        {knowledge.level.toUpperCase()} LEVEL
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body2" sx={{ color: "grey.500" }}>
                    <ReactMarkdown>{knowledge.knowledge}</ReactMarkdown>
                  </Typography>
                </Paper>
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
