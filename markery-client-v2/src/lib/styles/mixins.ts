import { css } from "styled-components";

const base = {
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
  `
};

export { base, boxShadow };
