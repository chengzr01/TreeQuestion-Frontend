import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import TeacherIndex from "./views/teacher/TeacherIndex";
import StudentIndex from "./views/student/StudentIndex";
import SignInPage from "./views/SignInPage";
import SignUpPage from "./views/SignUpPage";
import CreateIndex from "./views/teacher/create/CreateIndex";
import ViewIndex from "./views/teacher/view/ViewIndex";
import AnswerIndex from "./views/student/answer/AnswerIndex";
import ReviewIndex from "./views/student/view/ReviewIndex";

export default function TreeQuestionRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signin" element={<SignInPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/teacher" element={<TeacherIndex />}>
          <Route exact path="create" element={<CreateIndex />}></Route>
          <Route exact path="view" element={<ViewIndex />}></Route>
        </Route>
        <Route exact path="/student" element={<StudentIndex />}>
          <Route exact path="answer" element={<AnswerIndex />}></Route>
          <Route exact path="review" element={<ReviewIndex />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
