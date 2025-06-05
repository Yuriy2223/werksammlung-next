import { css } from "styled-components";

export const Fonts = css`
  @font-face {
    font-family: "MonaSans";
    src: url("/fonts/MonaSans-ExtraBold.woff2") format("woff2"),
      url("/fonts/MonaSans-ExtraBold.woff") format("woff");
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "MonaSans";
    src: url("/fonts/MonaSans-Bold.woff2") format("woff2"),
      url("/fonts/MonaSans-Bold.woff") format("woff");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "MonaSans";
    src: url("/fonts/MonaSans-SemiBold.woff2") format("woff2"),
      url("/fonts/MonaSans-SemiBold.woff") format("woff");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "MonaSans";
    src: url("/fonts/MonaSans-Medium.woff2") format("woff2"),
      url("/fonts/MonaSans-Medium.woff") format("woff");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "MonaSans";
    src: url("/fonts/MonaSans-Regular.woff2") format("woff2"),
      url("/fonts/MonaSans-Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;
