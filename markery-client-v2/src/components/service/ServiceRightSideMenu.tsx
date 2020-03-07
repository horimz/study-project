import React from "react";
import styled, { css } from "styled-components";
import { boxShadow, TagColorMap, palette } from "../../lib/styles";
import { AiOutlineClose } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { TiFolderDelete } from "react-icons/ti";
import { FiLink } from "react-icons/fi";

const ServiceRightSideMenuBlock = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  left: -350px;
  width: 350px;
  height: 100vh;
  ${boxShadow.serviceRightSideMenu}
  display: flex;
  flex-direction: column;
  background-color: white;
  transition: transform 0.5s, -webkit-transform 0.5s;
  ${props =>
    props.open &&
    css`
      transform: translateX(350px);
    `}
`;

const ServiceRightSideMenuCloseBlock = styled.div`
  margin: 2rem 0;
  div {
    color: #6d758d;
    transition: background-color 0.7s;
    text-align: left;
    font-weight: 400;
    line-height: 2rem;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    padding: 1rem 0;
    cursor: pointer;
    &:hover {
      color: ${TagColorMap.blue.color};
      background-color: ${TagColorMap.blue.backgroundColor};
    }
  }
  svg {
    margin-left: 1.75rem;
    font-size: 2rem;
  }
  span {
    margin-left: 2rem;
  }
`;

const Serperator = styled.div`
  height: 1px;
  margin: 0 2rem;
  background-color: ${palette.divider};
`;

const ServiceRightSideMenuHomeBlock = styled(ServiceRightSideMenuCloseBlock)``;
const ServiceRightSideMenuFoldersBlock = styled(ServiceRightSideMenuCloseBlock)`
  margin: 2rem 0 0.5rem;
`;
const ServiceRightSideMenuUrlsBlock = styled(ServiceRightSideMenuCloseBlock)`
  margin: 0;
`;

interface ServiceRightSideMenuProps {
  open: boolean;
  closeSideMenu: () => void;
}

const ServiceRightSideMenu: React.FC<ServiceRightSideMenuProps> = ({
  open,
  closeSideMenu
}) => {
  return (
    <ServiceRightSideMenuBlock open={open}>
      <ServiceRightSideMenuCloseBlock>
        <div onClick={() => closeSideMenu()}>
          <AiOutlineClose />
          <span>Close</span>
        </div>
      </ServiceRightSideMenuCloseBlock>
      <Serperator />
      <ServiceRightSideMenuHomeBlock>
        <Link to='/service'>
          <div>
            <GoHome />
            <span>Home</span>
          </div>
        </Link>
      </ServiceRightSideMenuHomeBlock>
      <Serperator />
      <ServiceRightSideMenuFoldersBlock>
        <div>
          <TiFolderDelete />
          <span>Folders</span>
        </div>
      </ServiceRightSideMenuFoldersBlock>
      <ServiceRightSideMenuUrlsBlock>
        <div>
          <FiLink />
          <span>Urls</span>
        </div>
      </ServiceRightSideMenuUrlsBlock>
    </ServiceRightSideMenuBlock>
  );
};

export { ServiceRightSideMenu };
