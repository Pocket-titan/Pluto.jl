import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider, createGlobalStyle, css } from "styled-components/macro";

import New from "pages/New";
import Notebook from "pages/Notebook";
import Welcome from "pages/Welcome";
import { useDarkMode } from "ts/state";
import { useLayoutEffect } from "react";

const themes = {
  dark: {
    backgroundColor: "hsl(220, 13%, 14%)",
    color: "hsl(0, 0%, 100%)",
  },
  light: {
    backgroundColor: "hsl(0, 0%, 100%)",
    color: "hsl(0, 0%, 0%)",
  },
};

// Since there's another div below which should have the same colors as `body`, we declare
// the colors as CSS variables as well (a bit double-up, but he, that's another cook)
const GlobalStyle = createGlobalStyle`
  :root {
    --transition: background-color 250ms ease-in-out, color 250ms ease-in-out;
      ${({ theme }) =>
        theme.isDark
          ? css`
              --background-color: ${themes.dark.backgroundColor};
              --color: ${themes.dark.color};
            `
          : css`
              --background-color: ${themes.light.backgroundColor};
              --color: ${themes.light.color};
            `}
  }

  body {
    background-color: var(--background-color);
    color: var(--color);
    overflow-y: overlay; /* Cool little trick to make the scrollbar not widen page when it loads */
    overflow-x: hidden;

    ${({ theme }) =>
      theme.isDark
        ? css`
            &::-webkit-scrollbar {
              background-color: hsl(220, 13%, 18%);
            }

            &::-webkit-scrollbar-thumb {
              background-color: hsl(223, 13%, 10%);
            }

            a {
              color: hsla(0, 0%, 100%, 0.87);
            }

            a:visited {
              color: hsla(0, 0%, 100%, 0.87);
            }
          `
        : css`
            &::-webkit-scrollbar {
              background-color: hsl(0, 0%, 95%);
            }

            ::-webkit-scrollbar-thumb {
              background-color: hsl(0, 0%, 60%);
            }

            a {
              color: hsla(0, 0%, 0%, 0.87);
            }

            a:visited {
              color: hsla(0, 0%, 0%, 0.87);
            }
          `}
  }

  .monaco-editor .margin,
  .monaco-editor-background,
  .monaco-editor .inputarea,
  .monaco-editor .line-numbers {
    transition: var(--transition);
  }
`;

const App = () => {
  let { mode, setMode } = useDarkMode();

  // The way dark mode works is adapted from https://markoskon.com/dark-mode-in-react/#dan-abramovs-solution-with-css
  // see `public/index.html` for the relevant code
  useLayoutEffect(() => {
    setMode(window.__theme);
    window.__onThemeChange = (newTheme) => {
      setMode(newTheme);
    };
  }, []);

  return (
    <ThemeProvider theme={{ isDark: mode === "dark" }}>
      <GlobalStyle />
      <div
        style={{
          transition: "var(--transition)",
          backgroundColor: "var(--background-color)",
          color: "var(--color)",
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/new">
              <New />
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
