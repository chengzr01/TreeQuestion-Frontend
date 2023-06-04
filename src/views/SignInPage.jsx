import * as React from "react";
import { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoleMenu from "../components/RoleMenu";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide({ content, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogContent>
          <DialogTitle>{content}</DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function SignInPage() {
  let navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    var body = { name: name, password: password, role: role };
    axios
      .post("/user/sign_in", body)
      .then((res) => {
        if (res.data.code === 200) {
          setDialogOpen(true);
          setDialogContent("Succeed");
          if (role === "student") navigate("/student");
          else navigate("/teacher");
          let cookieSetup = {
            path: "/",
            domain: window.location.hostname,
          };
          cookie.save("name", name, cookieSetup);
          cookie.save("role", role, cookieSetup);
        } else {
          setDialogOpen(true);
          setDialogContent("Fail");
        }
      })
      .catch((err) => {
        setDialogOpen(true);
        setDialogContent("Fail");
      });
  };

  return (
    <Box>
      <AlertDialogSlide
        content={dialogContent}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: `url(${"/static/Zug.jpg"})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />

        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 16,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h1">
              🌲
            </Typography>
            <Typography component="h2" variant="h2">
              TreeQuestion
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="User"
                name="user"
                autoComplete="user"
                autoFocus
                onChange={(event) => {
                  handleNameChange(event);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  handlePasswordChange(event);
                }}
              />
              <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
                <Grid item xs={6}>
                  <RoleMenu setRole={setRole} />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={(event) => {
                      handleSignIn(event);
                    }}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 4, mb: 2 }}>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
