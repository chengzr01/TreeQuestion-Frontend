import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Grid,
  Paper,
  Typography,
  Dialog,
  Tooltip,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function IssueDialog({ open, setOpen, tree }) {
  const [studentList, setStudentList] = useState([]);
  const [studentListUpdate, setStudentListUpdate] = useState(true);
  const [searchStudentName, setSearchStudentName] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleStudentNameChange = (event) => {
    setSearchStudentName(event.target.value);
  };

  const handleAddStudent = (event) => {
    var body = { name: searchStudentName, role: "student" };
    axios
      .post("/user/read_user", body)
      .then((res) => {
        console.log(res);
        var newStudentList = studentList;
        if (newStudentList.indexOf(res.data.data.name) < 0)
          newStudentList.push(res.data.data.name);
        setStudentList(newStudentList);
        setStudentListUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIssueTree = (event) => {
    for (var studentIndex in studentList) {
      var body = {
        name: studentList[studentIndex],
        role: "student",
        identifier: tree.identifier,
        description: tree.description,
      };
      axios
        .post("/tree/create_tree", body)
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (!studentListUpdate) {
      setStudentListUpdate(true);
    }
  }, [studentListUpdate]);

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"left"}
                alignContent={"left"}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" sx={{ p: 1 }}>
                  Issue
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Paper sx={{ m: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                size="medium"
                fullWidth
                label="Name"
                variant="standard"
                onChange={(event) => {
                  handleStudentNameChange(event);
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              display={"flex"}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <Button>
                <Tooltip title="Add">
                  <AddIcon
                    onClick={(event) => {
                      handleAddStudent(event);
                    }}
                  />
                </Tooltip>
              </Button>
              <Button>
                <Tooltip title="Add">
                  <CheckIcon
                    onClick={(event) => {
                      handleIssueTree(event);
                    }}
                  />
                </Tooltip>
              </Button>
            </Grid>
            {studentList.map((student) => {
              return (
                <Grid item xs={4}>
                  <Card
                    fullWidth
                    sx={{
                      p: 2,
                    }}
                  >
                    <Typography variant="h5"> {student}</Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Dialog>
    </div>
  );
}
