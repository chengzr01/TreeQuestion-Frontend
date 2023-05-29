import * as React from "react";

// MaterialUI
import TreeBar from "../../components/TreeBar";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";

export default function StudentIndex() {
  let navigate = useNavigate();

  return (
    <Box>
      <TreeBar identity="student" />
      <Box>
        <Typography variant="h1" align="center" sx={{ mt: 4, mb: 4 }}>
          🌲TreeQuestion
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="outlined"
              sx={{ width: "20%" }}
              onClick={() => {
                navigate("answer");
              }}
            >
              <Typography variant="h6"> 🌴 Answer New Trees </Typography>
            </Button>
          </Grid>
        </Grid>
        <Outlet />
      </Box>
    </Box>
  );
}
