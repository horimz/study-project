import React from "react";
import styled, { css } from "styled-components";
import { palette, boxShadow, mixin } from "../../lib/styles";
import { AiOutlineMenuUnfold, AiFillRightCircle } from "react-icons/ai";

const ServiceSideMenuTogglerBlock = styled.div`
  position: absolute;
  top: 17px;
  left: 20px;
`;

const ServiceTogglerBlock = styled.div<{ open: boolean }>`
  ${mixin.flexCenter}
  font-size: 2.5rem;
  height: 4.5rem;
  color: ${palette.label};
  background: white;
  cursor: pointer;
  padding: 0 1.2rem;
  text-transform: uppercase;
  border-radius: 50px;
  border: none;
  outline: none;
  ${boxShadow.sideMenuToggler}
  margin-bottom: 1rem;
  margin-right: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s, width 0.3s,
    -webkit-transform 0.2s;
  &:hover {
    box-shadow: 0 4px 12px 0 rgba(96, 101, 123, 0.2);
    transform: scale(1.075);
  }
  &:active {
    transform: translate3d(0px, 1px, 0px);
  }
  svg {
    &:first-child {
      fill: #15bd76;
      margin-right: 0.25rem;
    }
  }
  ${props =>
    props.open &&
    css`
      opacity: 0;
    `}
`;

interface ServiceSideMenuTogglerProps {
  open: boolean;
  openSideMenu: () => void;
}

const ServiceSideMenuToggler: React.FC<ServiceSideMenuTogglerProps> = ({
  open,
  openSideMenu
}) => {
  return (
    <ServiceSideMenuTogglerBlock onClick={() => openSideMenu()}>
      <ServiceTogglerBlock open={open}>
        <AiFillRightCircle />
        <AiOutlineMenuUnfold />
      </ServiceTogglerBlock>
    </ServiceSideMenuTogglerBlock>
  );
};

export { ServiceSideMenuToggler };
