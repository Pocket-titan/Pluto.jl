import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components/macro";
import Tweakpane from "tweakpane";

const Container = styled.div`
  box-shadow: 3px 3px 8px hsla(0, 0%, 0%, 0.1), 0px 0px 9px hsla(0, 0%, 0%, 0.3);
  border-radius: 5px;

  & * {
    transition: var(--transition);
  }

  ${({ theme }) =>
    theme.isDark
      ? css``
      : css`
          /* Base colors */
          --tp-base-background-color: hsl(230deg, 5%, 90%);
          --tp-base-shadow-color: hsla(0, 0%, 0%, 0.1);

          /* Button-like control colors */
          --tp-button-background-color: hsl(230deg, 5%, 70%);
          --tp-button-background-color-active: hsl(230deg, 5%, 55%);
          --tp-button-background-color-focus: hsl(230deg, 5%, 60%);
          --tp-button-background-color-hover: hsl(230deg, 5%, 65%);
          --tp-button-foreground-color: hsl(230deg, 5%, 20%);

          /* Folder colors */
          --tp-folder-background-color: hsl(230deg, 5%, 80%);
          --tp-folder-background-color-active: hsl(230deg, 5%, 65%);
          --tp-folder-background-color-focus: hsl(230deg, 5%, 70%);
          --tp-folder-background-color-hover: hsl(230deg, 5%, 75%);
          --tp-folder-foreground-color: var(--tp-input-foreground-color);

          /* Input control colors */
          --tp-input-background-color: hsl(230deg, 5%, 85%);
          --tp-input-background-color-active: hsl(230deg, 5%, 70%);
          --tp-input-background-color-focus: hsl(230deg, 5%, 75%);
          --tp-input-background-color-hover: hsl(230deg, 5%, 80%);
          --tp-input-foreground-color: hsl(230deg, 5%, 30%);
          --tp-input-guide-color: hsla(230deg, 5%, 30%, 10%);

          /* Monitor control colors */
          --tp-monitor-background-color: var(--tp-input-background-color);
          --tp-monitor-foreground-color: hsl(230deg, 5%, 60%);

          /* Misc */
          --tp-label-foreground-color: hsl(230deg, 5%, 50%);
          --tp-separator-color: hsl(230deg, 5%, 85%);
        `};
`;

type Options = {
  [folderName: string]: {
    [optionName: string]: {
      value?: any;
      params?: any;
    };
  };
};

const ReactTweakpane = ({
  options = {},
  expanded = true,
  hidden = false,
  title,
}: {
  options: Options;
  expanded?: boolean;
  hidden?: boolean;
  title?: string;
}) => {
  const containerElement = useRef<HTMLDivElement>();
  const tweakpane = useRef<Tweakpane>();

  useEffect(() => {
    tweakpane.current = new Tweakpane({
      container: containerElement.current,
      expanded,
      title,
    });

    Object.entries(options).forEach(([folderName, option]) => {
      Object.entries(option).forEach(([optionName, config]) => {
        tweakpane.current!.addInput(
          {
            [optionName]: config.value,
          },
          optionName,
          config.params
        );
      });
    });

    return () => {
      tweakpane.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!tweakpane.current) return;
    tweakpane.current.hidden = hidden;
  }, [hidden]);

  return (
    <Container
      ref={(ref) => ref && (containerElement.current = ref)}
      style={{
        height: "100%",
        width: "100%",
      }}
    />
  );
};

export default ReactTweakpane;
