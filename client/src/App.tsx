import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notebook from "./pages/Notebook";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/edit">
          <Notebook />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
