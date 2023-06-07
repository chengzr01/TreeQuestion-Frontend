import * as React from "react";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  Stack,
  Switch,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

export default function TreeBar({ identity }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cacheOn, setCacheOn] = React.useState(true);
  cookie.save("cache", cacheOn);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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

  const handleSignOut = () => {
    navigate("/signin");
  };

  const handleDeleteCache = () => {
    axios
      .post("/tree/delete_cache")
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
              sx={{ color: "white" }}
            >
              <SettingsIcon></SettingsIcon>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  var newCacheOn = !cacheOn;
                  setCacheOn(newCacheOn);
                  cookie.save("cache", newCacheOn);
                }}
              >
                <Stack spacing={2} direction={"row"}>
                  <BookmarkAddedIcon
                    sx={{ color: cacheOn ? "primary.main" : "text.secondary" }}
                  />
                  <Typography>
                    {cacheOn ? "Disable Cache" : "Enable Cache"}
                  </Typography>
                </Stack>
              </MenuItem>
              {/* <MenuItem
                onClick={() => {
                  handleDeleteCache();
                }}
              >
                <Stack spacing={2} direction={"row"}>
                  <ClearAllIcon />
                  <Typography>Delete Cache</Typography>
                </Stack>
              </MenuItem> */}
              <MenuItem
                onClick={() => {
                  handleSignOut();
                }}
              >
                <Stack spacing={2} direction={"row"}>
                  <LogoutIcon />
                  <Typography>Sign Out</Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
