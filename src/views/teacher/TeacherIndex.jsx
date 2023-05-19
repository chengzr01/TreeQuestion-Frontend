import * as React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import TreeBar from "../../components/TreeBar";

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
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="outlined"
              sx={{ width: "20%" }}
              onClick={() => {
                navigate("create");
              }}
            >
              <Typography variant="h6">🪴 Create New Trees </Typography>
            </Button>
          </Grid>
        </Grid>
        <Outlet />
      </Box>
    </Box>
  );
}
