import "./App.js";
import React from "react";
import "./index.css";
import TreeQuestionRouter from "./router.jsx";
import ThemeConfig from "./theme";

function App() {
  return (
    <ThemeConfig>
      <TreeQuestionRouter />
    </ThemeConfig>
  );
}

export default App;
