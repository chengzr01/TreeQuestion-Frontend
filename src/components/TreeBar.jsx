import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function TreeBar({ identity }) {
  let navigate = useNavigate();
  const [user, setUser] = useState("Zirui Cheng");

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
    setUser("");
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
              Welcome, {user}!
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
