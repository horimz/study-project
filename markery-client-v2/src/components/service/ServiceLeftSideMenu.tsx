import React from 'react';
import styled, { css } from 'styled-components';
import { Backdrop } from '../common/Backdrop';
import {
  boxShadow,
  TagColorMap,
  palette,
  zIndex,
  media
} from '../../lib/styles';
import { AiOutlineClose } from 'react-icons/ai';
import { GoHome } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { TiFolderDelete } from 'react-icons/ti';
import { FiLink } from 'react-icons/fi';

const ServiceLeftSideMenuBlock = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: -260px;
  width: 260px;
  height: 100vh;
  ${boxShadow.serviceLeftSideMenu}
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: ${zIndex.service};
  transition: transform 0.5s;
  ${props =>
    props.open &&
    css`
      transform: translateX(260px);
    `}
  ${media.small} {
    width: 180px;
  }
`;

const ServiceLeftSideMenuCloseBlock = styled.div`
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

const Seperator = styled.div`
  height: 1px;
  margin: 0 2rem;
  background-color: ${palette.divider};
`;

const ServiceLeftSideMenuHomeBlock = styled(ServiceLeftSideMenuCloseBlock)``;
const ServiceLeftSideMenuFoldersBlock = styled(ServiceLeftSideMenuCloseBlock)`
  margin: 2rem 0 0.5rem;
  .service__add-folder {
    flex: 1 0;
    display: flex;
    justify-content: flex-end;
    margin-right: 2rem;
  }
`;
const ServiceLeftSideMenuUrlsBlock = styled(ServiceLeftSideMenuCloseBlock)`
  margin: 0;
  margin-bottom: 2rem;
  .service__add-url {
    flex: 1 0;
    display: flex;
    justify-content: flex-end;
    margin-right: 2rem;
  }
`;

interface ServiceLeftSideMenuProps {
  open: boolean;
  onToggle: () => void;
}

const ServiceLeftSideMenu: React.FC<ServiceLeftSideMenuProps> = ({
  open,
  onToggle
}) => {
  return (
    <>
      <Backdrop open={open} onClick={onToggle} />
      <ServiceLeftSideMenuBlock open={open}>
        <ServiceLeftSideMenuCloseBlock>
          <div onClick={() => onToggle()}>
            <AiOutlineClose />
            <span>Close</span>
          </div>
        </ServiceLeftSideMenuCloseBlock>
        <Seperator />
        <ServiceLeftSideMenuHomeBlock>
          <NavLink
            to='/service'
            activeClassName='service-side-menu__active'
            exact
          >
            <div>
              <GoHome />
              <span>Home</span>
            </div>
          </NavLink>
        </ServiceLeftSideMenuHomeBlock>
        <Seperator />
        <ServiceLeftSideMenuFoldersBlock>
          <NavLink
            to='/service/folders'
            activeClassName='service-side-menu__active'
            exact
          >
            <div>
              <TiFolderDelete />
              <span>Folders</span>
            </div>
          </NavLink>
        </ServiceLeftSideMenuFoldersBlock>
        <ServiceLeftSideMenuUrlsBlock>
          <NavLink
            to='/service/urls'
            activeClassName='service-side-menu__active'
            exact
          >
            <div>
              <FiLink />
              <span>Urls</span>
            </div>
          </NavLink>
        </ServiceLeftSideMenuUrlsBlock>
        <Seperator />
      </ServiceLeftSideMenuBlock>
    </>
  );
};

export { ServiceLeftSideMenu };
