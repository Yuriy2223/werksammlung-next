import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    hover: string;
    svg: string;
    err: string;
    gradient: string;
    linear: string;
  }
}

export type ThemeType = "dark" | "grey" | "blue" | "green";

export const greenTheme: DefaultTheme = {
  bgPrimary: "var(--bgPrimary)",
  bgSecondary: "var(--bgSecondary)",
  textPrimary: "var(--textPrimary)",
  hover: "var(--hover)",
  svg: "var(--svg)",
  err: "var(--err)",
  gradient: "var(--gradient)",
  linear: "var(--linear)",
};

export const blueTheme: DefaultTheme = {
  bgPrimary: "var(--bgPrimary2)",
  bgSecondary: "var(--bgSecondary2)",
  textPrimary: "var(--textPrimary2)",
  hover: "var(--hover2)",
  svg: "var(--svg2)",
  err: "var(--err)",
  gradient: "var(--gradient)",
  linear: "var(--linear)",
};

export const greyTheme: DefaultTheme = {
  bgPrimary: "var(--bgPrimary3)",
  bgSecondary: "var(--bgSecondary3)",
  textPrimary: "var(--textPrimary3)",
  hover: "var(--hover3)",
  svg: "var(--svg3)",
  err: "var(--err)",
  gradient: "var(--gradient)",
  linear: "var(--linear)",
};

export const darkTheme: DefaultTheme = {
  bgPrimary: "var(--bgPrimary4)",
  bgSecondary: "var(--bgSecondary4)",
  textPrimary: "var(--textPrimary4)",
  hover: "var(--hover4)",
  svg: "var(--svg4)",
  err: "var(--err)",
  gradient: "var(--gradient)",
  linear: "var(--linear)",
};

export const themes = {
  dark: darkTheme,
  grey: greyTheme,
  blue: blueTheme,
  green: greenTheme,
};
