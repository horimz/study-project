import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { palette, zIndex, animation } from "../../lib/styles";

const ModalBackdropBlock = styled.div<{
  open: boolean;
  isFirst: boolean;
  close: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${zIndex.backdrop};
  ${props =>
    props.close &&
    css`
      display: none;
    `}
  ${props =>
    props.isFirst
      ? css`
          display: none;
        `
      : props.open
      ? css`
          background-color: ${palette.backdrop};
          animation: ${animation.fadeIn} 0.3s ease-in;
          animation-fill-mode: both;
        `
      : css`
          background-color: ${palette.backdrop};
          animation: ${animation.fadeOut} 0.3s ease-in;
          animation-fill-mode: both;
        `}
`;

interface ModalBackdropProps {
  open: boolean;
  isFirst: boolean;
  onClick: () => void;
}

const ModalBackdrop: React.FC<ModalBackdropProps> = ({
  open,
  isFirst,
  onClick
}) => {
  const [close, setClose] = useState<boolean>(false);

  useEffect(() => {
    if (!isFirst && !open) {
      setTimeout(() => setClose(true), 300);
    }

    if (!isFirst && open) {
      setClose(false);
    }
  }, [isFirst, open]);

  return (
    <ModalBackdropBlock
      open={open}
      onClick={onClick}
      isFirst={isFirst}
      close={close}
    />
  );
};

export { ModalBackdrop };
