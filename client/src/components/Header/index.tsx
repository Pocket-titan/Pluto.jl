import React from "react";
import { useTheme } from "styled-components/macro";
import { Nav, LogoContainer } from "./styled";
import ThemeToggle from "./ThemeToggle";
import logo from "../../assets/logo.svg";
import Settings from "./Settings";

const Header = () => {
  const theme = useTheme();

  return (
    <header>
      <Nav>
        <LogoContainer>
          <a href="./">
            <img
              src={logo}
              alt="Pluto.jl logo"
              style={{
                width: "auto",
                height: "100%",
              }}
            />
          </a>
        </LogoContainer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyItems: "center",
          }}
        >
          {theme && (
            <>
              <ThemeToggle />
              <Settings />
            </>
          )}
        </div>
      </Nav>
    </header>
  );
};

export default Header;
