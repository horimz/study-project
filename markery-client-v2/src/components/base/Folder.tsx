import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { palette, boxShadow, TagColorMap } from '../../lib/styles';
import { TiFolderDelete } from 'react-icons/ti';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';
import { Folder as FolderType } from '../../lib/api/folders/types';
import { useContent } from '../../lib/hooks';

const FolderBlock = styled.div<{ open: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: white;
  color: ${TagColorMap.blue.color};
  border-radius: 8px;
  ${boxShadow.segmentBox}
  border: 1px solid ${palette.border};
  cursor: pointer;
  transition: all 0.2s;
  &:not(:last-child) {
    margin-bottom: 2.4rem;
  }
  &:hover {
    ${boxShadow.inputFocus}
  }
  ${props =>
    props.open &&
    css`
      ${boxShadow.inputFocus}
    `}
`;

const FolderTopBlock = styled.div`
  display: flex;
  a {
    width: 100%;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &:hover .folder__arrow-down-icon {
    color: ${TagColorMap.blue.color};
  }
`;

const FolderNameBlock = styled.div`
  display: flex;
  align-items: center;
  .folder__folder-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
`;

const FolderRightBlock = styled.div`
  flex: 1 0;
  justify-self: flex-end;
  .folder__open {
    font-size: 2.25rem;
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 50%;
    transition: all 0.2s;
    &:hover {
      background-color: ${TagColorMap.blue.backgroundColor};
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
    border-radius: 50%;
    transition: all 0.2s;
    &:hover {
      background-color: ${TagColorMap.blue.backgroundColor};
    }
  }
`;

interface FolderProps {
  folder: FolderType;
}

const Folder: React.FC<FolderProps> = ({ folder }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { deleteFolderRequest } = useContent();

  return (
    <FolderBlock open={open}>
      <FolderTopBlock>
        <Link to={`/service/${folder._id}`}>
          <FolderNameBlock>
            <TiFolderDelete className='folder__folder-icon' />
            <b>{folder.folderName}</b>
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
          <Button
            color='greyToRed'
            onClick={() => {
              if (folder._id) {
                deleteFolderRequest(folder._id);
              }
            }}
          >
            Delete
          </Button>
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
