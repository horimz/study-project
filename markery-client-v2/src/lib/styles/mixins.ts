import { css } from "styled-components";

const mixin = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  gridCenter: css`
    display: grid;
    justify-items: center;
    align-items: center;
  `
};

const boxShadow = {
  segmentBox: css`
    box-shadow: rgba(12, 52, 75, 0.05) 0px 3px 3px;
  `,
  button: css`
    box-shadow: rgba(12, 52, 75, 0.051) 0px 3px 3px;
  `,
  inputFocus: css`
    box-shadow: rgb(15, 122, 216) 0px 0px 0px 2px inset;
  `
};

export { mixin, boxShadow };
