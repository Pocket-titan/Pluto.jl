import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notebook from "./pages/Notebook";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/edit">
          <Notebook />
        </Route>
        {/* <Route path="/:id">
          <Notebook />
        </Route> */}
      </Switch>
    </Router>
  );
};

export default App;
