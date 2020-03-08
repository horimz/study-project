import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdArrowDropDown } from "react-icons/md";
import { StyledSegmentBox } from "../common/SegmentBox";
import { Backdrop } from "../common/Backdrop";
import {
  palette,
  buttonColorMap,
  TagColorMap,
  animation,
  zIndex
} from "../../lib/styles";
import { Link } from "react-router-dom";

const ServiceHeaderBlock = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  border-radius: 50px;
  padding: 0.5rem 0.75rem 0.5rem 1.25rem;
  transition: all 0.25s ease;
  background-color: ${buttonColorMap.lightGrey.hoverBackgroundColor};
  &:hover {
    background-color: ${buttonColorMap.lightGrey.backgroundColor};
  }
  &:hover svg {
    color: ${palette.grey8};
    transform: scale(1.1);
  }
  .service__header-toggler {
    h3 {
      cursor: pointer;
      display: flex;
      align-items: center;
      svg {
        color: ${palette.grey5};
        transition: all 0.25s ease;
      }
    }
  }
`;

const ServiceHeaderDropdownBlock = styled.div<{
  open: boolean;
  isFirst: boolean;
}>`
  position: absolute;
  top: 55px;
  right: 10px;
  z-index: ${zIndex.service};
  transform-origin: 85% 0%;
  ${props =>
    props.isFirst
      ? css`
          display: none;
        `
      : props.open
      ? css`
          display: flex;
          animation: ${animation.scaleUp} 0.3s ease;
          animation-fill-mode: forwards;
        `
      : css`
          animation: ${animation.scaleDown} 0.3s ease;
          animation-fill-mode: forwards;
        `}
`;

const ServiceHeaderDropdown = styled(StyledSegmentBox)`
  position: relative;
  height: 200px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
    background-color: white;
    transform: translate(-30px, -10px) rotate(45deg);
  }
  .service__header {
    height: 100%;
    margin: 2rem 0;
  }
  .service__header-username {
    background-color: ${palette.grey2};
    cursor: pointer;
    padding: 1rem 1.5rem;
    margin: 0 1rem;
    border-radius: 6px;
    font-weight: 700;
    font-size: 1.5rem;
    span {
      display: block;
      font-weight: 400;
      font-size: 1.25rem;
    }
  }
  .service__header-link {
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    transition: all 0.7s;
    &:first-child {
      margin-bottom: 1rem;
    }
    &:hover {
      background-color: ${TagColorMap.blue.backgroundColor};
      color: ${TagColorMap.blue.color};
    }
  }
`;

const Serperator = styled.div`
  height: 1px;
  margin: 1rem 1.5rem;
  background-color: ${palette.divider};
`;

interface ServiceHeaderProps {
  open: boolean;
  onToggle: () => void;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({ open, onToggle }) => {
  const [isFirst, setIsFirst] = useState<boolean>(true);

  return (
    <ServiceHeaderBlock>
      <Backdrop open={open} onClick={onToggle} />
      <div
        className='service__header-toggler'
        onClick={() => {
          setIsFirst(false);
          onToggle();
        }}
      >
        <h3>
          horimz
          <MdArrowDropDown />
        </h3>
      </div>
      <ServiceHeaderDropdownBlock open={open} isFirst={isFirst}>
        <ServiceHeaderDropdown>
          <div className='service__header'>
            <div className='service__header-username' onClick={onToggle}>
              horimz<span>dp.horimz@gmail.com</span>
            </div>
            <Serperator />
            <Link to='/settings'>
              <div className='service__header-link'>Settings</div>
            </Link>
            <div className='service__header-link'>Log out</div>
          </div>
        </ServiceHeaderDropdown>
      </ServiceHeaderDropdownBlock>
    </ServiceHeaderBlock>
  );
};

export { ServiceHeader };
