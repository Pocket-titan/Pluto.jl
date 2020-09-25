import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Notebook from "./pages/Notebook";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <Router>
      <Route path="/" exact>
        <Welcome />
      </Route>
      <Route path="/:id">
        <Notebook />
      </Route>
    </Router>
  );
};

export default App;
