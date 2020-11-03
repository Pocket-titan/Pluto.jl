import _ from "lodash";
import create from "zustand";
import immer from "./immer";
import type { DeepPartial } from "../";

type Config = {
  editor: {
    font_size: 16;
  };
};

const defaultConfig: Config = {
  editor: {
    font_size: 16,
  },
};

const useConfig = create<{
  config: Config;
  updateConfig: <K extends keyof Config>(
    key: K,
    value: DeepPartial<Config[K]>
  ) => void;
  saveConfig: () => void;
}>(
  immer((set, get) => ({
    config: (() => {
      let storedConfig = localStorage.getItem("config");

      if (storedConfig) {
        try {
          return JSON.parse(storedConfig);
        } catch {}
      }

      return defaultConfig;
    })(),
    updateConfig: (key, value) => {
      set(({ config }) => {
        _.merge(config[key], value);
      });
    },
    saveConfig: () => {
      localStorage.setItem("config", JSON.stringify(get().config));
    },
  }))
);

export default useConfig;

export { useConfig, defaultConfig };

export type { Config };
