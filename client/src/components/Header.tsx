import React from "react";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <header>
      <nav
        style={{
          display: "flex",
          width: "100vw",
          height: 60,
          backgroundColor: "hsla(0, 0%, 0%, 0.25)",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            padding: "0.5em",
            boxSizing: "border-box",
            filter: "invert(1) contrast(0.6) hue-rotate(90deg) saturate(1.3)",
          }}
        >
          <a href="./">
            <img
              src={logo}
              style={{
                width: "auto",
                height: "100%",
              }}
            />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
