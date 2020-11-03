import React, { useState } from "react";
import { animated, useTransition } from "react-spring";
import styled, { useTheme } from "styled-components/macro";
import { Settings as SettingsIcon } from "@styled-icons/material";
import { DocumentEvent } from "components/Elements";
import ReactTweakpane from "./ReactTweakpane";

const StyledSettings = styled.div`
  position: relative;
  cursor: pointer;
`;

const Settings = () => {
  const theme = useTheme();
  const [hidden, setHidden] = useState(true);
  const transitions = useTransition(hidden, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 250,
    },
  });

  return (
    <StyledSettings className="Settings">
      <SettingsIcon
        size={24}
        style={{
          transition: "var(--transition)",
          color: theme.isDark ? "hsl(0, 0%, 95%)" : "hsl(245, 15%, 31%)",
        }}
        onClick={() => setHidden(!hidden)}
      />
      {transitions.map(
        ({ item: hidden, key, props }) =>
          !hidden && (
            <animated.div
              key={key}
              style={{
                position: "absolute",
                top: "calc(100% + 7px)",
                right: 0,
                zIndex: 99,
                ...props,
              }}
            >
              <ReactTweakpane hidden={hidden} />
            </animated.div>
          )
      )}
      {!hidden && (
        <DocumentEvent
          passive
          name="mousedown"
          targets={(elements) => {
            return !elements
              .map((tag) => tag.className)
              .filter((className) => !!className && className.length > 0)
              .some(
                (className) =>
                  className.includes("Settings") ||
                  className.includes("ThemeToggle")
              );
          }}
          handler={(event) => {
            // "Main" mousebutton aka left (usually)
            if (event.button === 0) {
              setHidden(true);
            }
          }}
        />
      )}
    </StyledSettings>
  );
};

export default Settings;
