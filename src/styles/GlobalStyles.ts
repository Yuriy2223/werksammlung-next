import { createGlobalStyle } from "styled-components";
import { Fonts } from "./Fonts";
import { Variables } from "./Variables";
import { Reset } from "./Reset";

export const GlobalStyles = createGlobalStyle`
${Fonts}
${Variables}
${Reset}
`;
