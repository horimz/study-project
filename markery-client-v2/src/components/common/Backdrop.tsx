import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { zIndex } from '../../lib/styles';

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

const backdropElement = document.getElementById('backdrop');

const Backdrop: React.FC<BackdropProps> = ({ open, onClick }) => {
  const backdrop = <BackdropBlock open={open} onClick={onClick} />;

  if (!backdropElement)
    throw new Error('Cannot find element with id "backdrop"');

  return ReactDOM.createPortal(backdrop, backdropElement);
};

export { Backdrop };
