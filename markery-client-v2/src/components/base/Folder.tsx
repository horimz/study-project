import React, { useState } from "react";
import styled, { css } from "styled-components";
import { palette, boxShadow, TagColorMap } from "../../lib/styles";
import { TiFolderDelete } from "react-icons/ti";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Button } from "../common/Button";
import { Link } from "react-router-dom";

const FolderBlock = styled.div`
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: ${TagColorMap.blue.backgroundColor};
  color: ${TagColorMap.blue.color};
  border-radius: 8px;
  ${boxShadow.segmentBox}
  border: 1px solid ${palette.grey2};
  cursor: pointer;
  transition: all 0.2s;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  &:hover {
    transform: scale(1.02);
  }
`;

const FolderTopBlock = styled.div`
  display: flex;
  a {
    width: 100%;
    display: flex;
    align-items: center;
  }
  &:hover .folder__arrow-down-icon {
    color: ${TagColorMap.blue.color};
  }
`;

const FolderNameBlock = styled.div`
  flex: 1 0;
  display: flex;
  align-items: center;
  .folder__folder-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
`;

const FolderRightBlock = styled.div`
  justify-self: flex-end;
  .folder__open {
    font-size: 2.25rem;
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 8px;
    transition: all 0.2s;
    &:hover {
      background-color: ${palette.grey0};
    }
  }
  .folder__arrow-down-icon {
    color: transparent;
    display: flex;
    align-items: center;
  }
`;

const FolderHiddenBlock = styled.div<{ open: boolean }>`
  height: 0;
  display: none;
  /* height: 130px; */
  transition: all 0.1s;
  cursor: default;
  ${props =>
    props.open &&
    css`
      height: auto;
      display: block;
      /* height: 0;
      visibility: hidden; */
    `}
  .folder__meta-data {
    padding: 2rem 1rem 1rem 1rem;
  }
  .folder__actions {
    padding: 0.5rem 1rem;
  }
  .folder__close {
    display: flex;
    justify-content: flex-end;
  }
  .folder__arrow-up-icon {
    font-size: 2.25rem;
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 8px;
    transition: all 0.2s;
    &:hover {
      background-color: ${palette.grey0};
    }
  }
`;

interface FolderProps {}

const Folder: React.FC<FolderProps> = props => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <FolderBlock>
      <FolderTopBlock>
        <Link to='/'>
          <FolderNameBlock>
            <TiFolderDelete className='folder__folder-icon' />
            <b>Folder name</b>
          </FolderNameBlock>
        </Link>
        <FolderRightBlock>
          {!open && (
            <div className='folder__open' onClick={() => setOpen(true)}>
              <MdKeyboardArrowDown className='folder__arrow-down-icon' />
            </div>
          )}
        </FolderRightBlock>
      </FolderTopBlock>
      <FolderHiddenBlock open={open}>
        <div className='folder__meta-data'>어떤 것을 넣을까..?</div>
        <div className='folder__actions'>
          <Button color='greyToRed'>Delete</Button>
        </div>
        <div className='folder__close'>
          <div className='folder__arrow-up-icon' onClick={() => setOpen(false)}>
            <MdKeyboardArrowUp />
          </div>
        </div>
      </FolderHiddenBlock>
    </FolderBlock>
  );
};

export { Folder };
