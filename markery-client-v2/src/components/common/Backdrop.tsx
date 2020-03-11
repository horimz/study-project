import React from "react";
import styled, { css } from "styled-components";
import { zIndex } from "../../lib/styles";

const BackdropBlock = styled.div<{
  open: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${zIndex.backdrop};
  background-color: transparent;
  ${props =>
    !props.open &&
    css`
      display: none;
    `}
`;

interface BackdropProps {
  open: boolean;
  onClick: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ open, onClick }) => {
  return <BackdropBlock open={open} onClick={onClick} />;
};

export { Backdrop };
