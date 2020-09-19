import React from "react";
import Notebook from "./components/Notebook";

const App = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <nav />
      <main
        style={{
          marginRight: "auto",
          marginLeft: "auto",
          width: "100%",
          display: "flex",
          maxWidth: "65rem",
        }}
      >
        <Notebook />
      </main>
    </div>
  );
};

export default App;
