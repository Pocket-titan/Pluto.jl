import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

if ((module as any).hot) {
  (module as any).hot.accept();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
