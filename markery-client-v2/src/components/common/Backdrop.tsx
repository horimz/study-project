import React from "react";
import styled, { css } from "styled-components";
import { zIndex } from "../../lib/styles";

type BackdropColorType = "transparent" | "dark";

const BackdropBlock = styled.div<{
  open: boolean;
  color: BackdropColorType;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${zIndex.backdrop};
  ${props =>
    !props.open &&
    css`
      display: none;
    `}
  ${props =>
    props.color === "transparent" &&
    css`
      background-color: transparent;
    `}
  ${props =>
    props.color === "dark" &&
    css`
      background-color: rgba(0, 0, 0, 0.3);
    `}
`;

interface BackdropProps {
  open: boolean;
  onClick: () => void;
  color?: BackdropColorType;
}

const Backdrop: React.FC<BackdropProps> = ({
  open,
  onClick,
  color = "transparent"
}) => {
  return <BackdropBlock open={open} onClick={onClick} color={color} />;
};

export { Backdrop };
