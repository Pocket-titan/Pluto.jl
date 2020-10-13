import React, { useLayoutEffect } from "react";
import { createGlobalStyle, css, ThemeProvider } from "styled-components/macro";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useTheme } from "./ts/theme";
import Notebook from "./pages/Notebook";
import Welcome from "./pages/Welcome";

const GlobalStyles = createGlobalStyle`
  a {
    transition: color 250ms ease-in-out;
  }

  ${({ theme }) =>
    theme.isDark
      ? css`
          a {
            color: hsla(0, 0%, 100%, 0.87);
          }

          a:visited {
            color: hsla(0, 0%, 100%, 0.87);
          }
        `
      : css`
          a {
            color: hsla(0, 0%, 0%, 0.87);
          }

          a:visited {
            color: hsla(0, 0%, 0%, 0.87);
          }
        `}

`;

const App = () => {
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    setTheme(window.__theme);
    window.__onThemeChange = (newTheme) => {
      setTheme(newTheme);
    };
  }, []);

  return (
    <ThemeProvider theme={{ isDark: theme === "dark" }}>
      <GlobalStyles />
      <div
        style={{
          backgroundColor: "var(--background-color)",
          transition: "background-color 250ms ease-in-out",
        }}
      >
        <Router>
          <Switch>
            <Route path="/" exact>
              <Welcome />
            </Route>
            <Route path="/edit">
              <Notebook />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
