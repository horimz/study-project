import { createGlobalStyle } from "styled-components";
import { TagColorMap } from "./lib/styles";

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  height: 100%;
  font-size: 62.5%; // 1rem = 10px
}

body {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3d556b;
  font-size: 14px;
  box-sizing: border-box;
}

code {
  font-family: 'Fira Code', monospace;
}

input, button, textarea {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

svg {
  overflow: hidden;
}

/* Custom classnames */
.service-side-menu__active {
  div {
    color: ${TagColorMap.blue.color};
    background-color: ${TagColorMap.blue.backgroundColor};
  }
}
`;
