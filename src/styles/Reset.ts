import { css } from "styled-components";

export const Reset = css`
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: var(--font-family);
    font-size: 14px;
    line-height: 1.4;
    font-weight: 400;

    @media (min-width: 768px) and (max-width: 1279px) {
      font-size: 16px;
      line-height: 1.5;
    }

    @media (min-width: 1280px) {
      font-size: 18px;
      line-height: 1.6;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
  }

  ul,
  ol {
    list-style: none;
  }

  a {
    font-family: inherit;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  button {
    font-family: inherit;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  input,
  textarea {
    font-family: inherit;
    outline: none;
    transition: all 0.3s ease;
  }
`;
