import React, { useEffect, useRef } from "react";
import _ from "lodash";
import * as monaco from "monaco-editor";
import styled, { css } from "styled-components/macro";
import Tweakpane from "tweakpane";
import { useConfig, typedEntries, useEditorRefs } from "../../ts";
import type { Config } from "../../ts";

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

/** Tweakpane Params for inputs, see: https://cocopon.github.io/tweakpane/input.html */
type Params<T> = {
  index?: number;
  label?: string;
  options?: {
    text: string;
    value: T;
  };
  presetKey?: string;
} & (T extends number
  ? {
      min?: number;
      max?: number;
      step?: number;
      input?: "color" | "color.rgb" | "color.rgba";
    }
  : T extends string
  ? {}
  : T extends boolean
  ? {}
  : {});

type ConfigMap = {
  [K1 in keyof Config]: {
    [K2 in keyof Config[K1]]: {
      params: Params<Config[K1][K2]>;
      onChange?: (value: any) => void;
    };
  };
};

const configMap: ConfigMap = {
  editor: {
    font_size: {
      params: {
        // min: 8,
        // max: 24,
        step: 1,
        label: "font size",
      },
      onChange: (value: number) => {
        console.log("value", value);
        Object.values(useEditorRefs.getState().editors).forEach((editor) => {
          editor.updateOptions({
            fontSize: value,
          });
        });
      },
    },
  },
};

const ReactTweakpane = ({
  expanded = true,
  hidden = false,
  title,
}: {
  expanded?: boolean;
  hidden?: boolean;
  title?: string;
}) => {
  const containerElement = useRef<HTMLDivElement>();
  const tweakpane = useRef<Tweakpane>();

  useEffect(() => {
    let { config, saveConfig, updateConfig } = useConfig.getState();

    tweakpane.current = new Tweakpane({
      container: containerElement.current,
      expanded,
      title,
    });

    typedEntries(config).forEach(([folderName, option]) => {
      let folder = tweakpane.current!.addFolder({
        title: _.capitalize(_.words(folderName.toLowerCase()).join(" ")),
      });

      typedEntries(option).forEach(([optionName, value]) => {
        const { params, onChange } = configMap[folderName][optionName];

        let input = folder.addInput(
          {
            [optionName]: value,
          },
          optionName,
          params
        );

        input.on("change", (value: any) => {
          updateConfig(folderName, {
            [optionName]: value,
          });
          onChange && onChange(value);
          saveConfig();
        });
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
        width: 275,
        // width: "100%",
      }}
    />
  );
};

export default ReactTweakpane;
