import * as React from "react";

// MaterialUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Components

import TreeBar from "../../components/TreeBar";
import { Outlet } from "react-router-dom";
import { Button, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function TeacherIndex({ children }) {
  let navigate = useNavigate();
  return (
    <Box>
      <TreeBar identity="teacher" />
      <Box>
        <Typography variant="h1" align="center" sx={{ mt: 4, mb: 4 }}>
          🌲TreeQuestion
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="right"
            alignItems="right"
          >
            <Button
              variant="outlined"
              sx={{ width: "40%" }}
              onClick={() => {
                navigate("create");
              }}
            >
              <Typography variant="h6">🪴 Create New Trees </Typography>
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="left"
            alignItems="left"
          >
            <Button
              variant="outlined"
              sx={{ width: "40%" }}
              onClick={() => {
                navigate("view");
              }}
            >
              <Typography variant="h6"> 🌳 View Historical Trees</Typography>
            </Button>
          </Grid>
        </Grid>
        <Outlet />
      </Box>
    </Box>
  );
}
