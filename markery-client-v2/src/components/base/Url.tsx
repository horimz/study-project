import React, { useState } from "react";
import styled, { css } from "styled-components";
import { palette, boxShadow, TagColorMap, animation } from "../../lib/styles";
import { FiLink, FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useToggle } from "../../lib/hooks";
import { Button } from "../common/Button";

const UrlBlock = styled.div`
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: ${TagColorMap.lightBlue.backgroundColor};
  color: ${TagColorMap.lightBlue.color};
  border-radius: 8px;
  ${boxShadow.segmentBox}
  border: 1px solid ${palette.grey2};
  cursor: pointer;
  transition: all 0.2s;
  &:not(:last-child) {
    margin-bottom: 2.4rem;
  }
  &:hover {
    /* background-color: ${TagColorMap.lightBlue.backgroundColor};
    color: ${TagColorMap.lightBlue.color}; */
  }
`;

const UrlTopBlock = styled.div`
  display: flex;
  a {
    width: 100%;
    display: flex;
    align-items: center;
  }
  &:hover .url__trash-icon {
    color: ${TagColorMap.lightBlue.color};
  }
  &:hover .url__edit-icon {
    color: ${TagColorMap.lightBlue.color};
  }
`;

const UrlNameBlock = styled.div`
  flex: 1 0;
  display: flex;
  align-items: center;
  .url__url-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
`;

const UrlRightBlock = styled.div`
  justify-self: flex-end;
  .url__action {
    padding: 0.75rem;
    border-radius: 8px;
    transition: all 0.2s;
    position: relative;
    &:hover {
      background-color: ${palette.grey0};
    }
  }
  .url__trash-icon {
    color: transparent;
    display: flex;
    align-items: center;
  }
  .url__edit-icon {
    color: transparent;
    display: flex;
    align-items: center;
  }
`;

const UrlActionsBlock = styled.div`
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const UrlActionBlock = styled.div<{ open?: boolean; close?: boolean }>`
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.2s;
  position: relative;
  &:hover {
    background-color: ${palette.grey0};
  }
  ${props =>
    props.open &&
    css`
      background-color: ${palette.grey0};
    `}
  .url__trash-icon {
    ${props =>
      props.open &&
      css`
        color: ${TagColorMap.lightBlue.color};
      `}
  }

  ${props =>
    props.close &&
    css`
      display: none;
    `}
`;

const UrlDeleteBlock = styled.div<{ open: boolean; isFirst: boolean }>`
  position: absolute;
  cursor: default;
  top: 0;
  right: 0;
  ${boxShadow.serviceRightSideMenu}
  background-color: white;
  border-radius: 8px;
  transform-origin: top right;
  ${props =>
    props.isFirst
      ? css`
          display: none;
        `
      : props.open
      ? css`
          display: flex;
          animation: ${animation.scaleUpFromTopLeft} 0.3s
            cubic-bezier(0.4, 0, 0, 1.5);
          animation-fill-mode: both;
        `
      : css`
          animation: ${animation.scaleDownToTopLeft} 0.4s ease;
          animation-fill-mode: both;
        `}
  div {
    padding: 1rem;
    display: flex;
    align-items: center;
  }
  .url-action__cancle {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.5rem;
    background-color: white;
    ${boxShadow.segmentBox}
    color: ${palette.grey5};
    width: 25px;
    height: 25px;
    border-radius: 50%;
    transform: translate(-12px, -12px);
    display: flex;
    align-items: center;
    transition: all 0.1s linear;
    &:hover {
      background-color: ${palette.background};
    }
  }
`;

interface UrlProps {}

const Url: React.FC<UrlProps> = props => {
  const [openDelete, onDeleteToggle] = useToggle(false);
  const [isFirstDelete, setIsFirstDelete] = useState<boolean>(true);
  const [openEdit] = useToggle(false);

  return (
    <UrlBlock>
      <UrlTopBlock>
        <Link to='/'>
          <UrlNameBlock>
            <FiLink className='url__url-icon' />
            <b>Url alias</b>
          </UrlNameBlock>
        </Link>
        <UrlRightBlock>
          <UrlActionsBlock>
            <UrlActionBlock close={openDelete}>
              <FiEdit className='url__edit-icon' />
            </UrlActionBlock>
            <UrlActionBlock
              open={openDelete}
              close={openEdit}
              onClick={() => {
                setIsFirstDelete(false);
                onDeleteToggle();
              }}
            >
              <FaRegTrashAlt className='url__trash-icon' />
            </UrlActionBlock>
            <UrlDeleteBlock open={openDelete} isFirst={isFirstDelete}>
              <div>
                <MdClose
                  className='url-action__cancle'
                  onClick={() => onDeleteToggle()}
                />
                <Button
                  color='red'
                  size='small'
                  onClick={() => console.log("remove url")}
                >
                  Remove
                </Button>
              </div>
            </UrlDeleteBlock>
          </UrlActionsBlock>
        </UrlRightBlock>
      </UrlTopBlock>
    </UrlBlock>
  );
};

export { Url };
