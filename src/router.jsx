import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Material UI
import { styled } from "@mui/material/styles";

// Components
import TeacherIndex from "./views/teacher/TeacherIndex";
import StudentIndex from "./views/student/StudentIndex";

const drawerWidth = 240;

const APP_BAR_MOBILE = 96;
const APP_BAR_DESKTOP = 96;

const MainStyle = styled("div")(({ theme, open }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  ...(open
    ? {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    : {
        width: `calc(100% - ${theme.spacing(7)})`,
        marginLeft: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: `calc(100% - ${theme.spacing(9)})`,
          marginLeft: theme.spacing(9),
        },
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
}));

export default function TreeQuestionRouter() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/teacher"
          element={
            <MainStyle>
              <TeacherIndex />
            </MainStyle>
          }
        />
        <Route
          exact
          path="/student"
          element={
            <MainStyle>
              <StudentIndex />
            </MainStyle>
          }
        />
      </Routes>
    </Router>
  );
}
