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
  `,
  serviceRightSideMenu: css`
    box-shadow: 0 12px 48px 0 rgba(96, 101, 123, 0.24);
  `,
  sideMenuToggler: css`
    box-shadow: 0 4px 8px 0 rgba(96, 101, 123, 0.2);
  `,
  serviceAssistant: css`
    box-shadow: 0 12px 48px 0 rgba(96, 101, 123, 0.24);
  `,
  dropdown: css`
    box-shadow: 0 12px 48px 0 rgba(96, 101, 123, 0.24);
  `,
  folder: css`
    box-shadow: 0 0.625rem 3.5rem 0 rgba(198, 203, 222, 0.45);
  `
};

export { mixin, boxShadow };
