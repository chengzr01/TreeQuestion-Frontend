import * as React from "react";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function TreeBar({ identity }) {
  let navigate = useNavigate();

  const getIdentityDisplay = () => {
    if (identity === "teacher")
      return (
        <Typography variant="h6" color="inherit" noWrap>
          👨‍🏫👩‍🏫 Teacher Mode
        </Typography>
      );
    else {
      return (
        <Typography variant="h6" color="inherit" noWrap>
          👨‍🎓👩‍🎓 Student Mode
        </Typography>
      );
    }
  };

  const handleSignOut = (event) => {
    event.preventDefault();
    navigate("/signin");
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <Grid container spacing={2}>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="left"
            alignItems="left"
          >
            <Typography variant="h6" color="inherit" noWrap>
              Welcome to TreeQuestion!
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6" color="inherit" noWrap>
              {getIdentityDisplay()}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="right"
            alignItems="right"
          >
            <LogoutIcon
              onClick={(event) => {
                handleSignOut(event);
              }}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
