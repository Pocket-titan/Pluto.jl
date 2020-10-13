import React from "react";
import styled, { css } from "styled-components/macro";
import Toggle from "react-toggle";
import { Moon, Sunny } from "@styled-icons/ionicons-solid";
import { useTheme } from "../ts/theme";
import logo from "../assets/logo.svg";
import "react-toggle/style.css";

const StyledToggle = styled(Toggle)`
  ${({ checked: dark }) =>
    dark
      ? css`
          .react-toggle-track {
            background-color: hsl(245, 15%, 31%);
          }

          &:hover .react-toggle-track {
            background-color: hsl(245, 15%, 31%) !important;
          }

          .react-toggle-thumb {
            border-color: hsl(245, 15%, 31%);
          }
        `
      : css`
          .react-toggle-track {
            background-color: hsl(0, 0%, 100%);
          }

          &:hover .react-toggle-track {
            background-color: hsl(0, 0%, 100%) !important;
          }

          .react-toggle-thumb {
            border-color: hsl(0, 0%, 95%);
            background-color: hsl(245, 15%, 31%);
          }
        `}

  &.react-toggle--focus .react-toggle-thumb,
  &.react-toggle:active .react-toggle-thumb {
    box-shadow: none !important;
  }
`;

const LogoContainer = styled.div`
  grid-column: 2;
  height: 60px;
  padding: 0.5em;
  box-sizing: border-box;
  transition: filter 250ms ease-in-out;

  ${({ theme }) =>
    theme.isDark &&
    css`
      filter: invert(1) contrast(0.6) hue-rotate(90deg) saturate(1.3);
      /* filter: invert(1) hue-rotate(180deg) brightness(0.75) saturate(1.2); */
    `}
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  transition: all 250ms ease-in-out;

  ${({ theme }) =>
    theme.isDark
      ? css`
          background-color: hsl(223, 13%, 10%);
          border-bottom: 1px solid hsl(223, 13%, 10%);
        `
      : css`
          background-color: hsl(290, 3%, 90%);
          border-bottom: 1px solid hsl(0, 0%, 65%);
          /* box-shadow: inset 0 1px 1px black; */
        `}
`;

const Header = () => {
  const { theme } = useTheme();

  return (
    <header>
      <Nav>
        <LogoContainer>
          <a href="./">
            <img
              src={logo}
              style={{
                width: "auto",
                height: "100%",
              }}
            />
          </a>
        </LogoContainer>
        <div>
          {theme && (
            <StyledToggle
              onChange={({ target: { checked } }) => {
                window.__setPreferredTheme(checked ? "dark" : "light");
              }}
              checked={theme === "dark"}
              icons={{
                checked: (
                  <Moon
                    style={{
                      marginTop: -1,
                      color: "hsl(0, 0%, 95%)",
                    }}
                  />
                ),
                unchecked: (
                  <Sunny
                    size={15}
                    style={{
                      marginTop: -2,
                      color: "hsl(245, 15%, 31%)",
                    }}
                  />
                ),
              }}
            />
          )}
        </div>
      </Nav>
    </header>
  );
};

export default Header;
