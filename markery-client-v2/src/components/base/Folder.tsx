import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  palette,
  boxShadow,
  TagColorMap,
  zIndex,
  animation,
  media
} from '../../lib/styles';
import { TiFolderDelete } from 'react-icons/ti';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';
import { Backdrop } from '../common/Backdrop';
import { Spinner } from '../common/Spinner';
import { Folder as FolderType } from '../../lib/api/folders/types';
import { useContent, useLoading } from '../../lib/hooks';
import { AiOutlineEllipsis } from 'react-icons/ai';

const FolderBlock = styled.div<{ edit: boolean }>`
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
    ${props =>
      !props.edit &&
      css`
        ${boxShadow.inputFocus}
      `}
    
  }
`;

const FolderTopBlock = styled.div`
  display: flex;
  .folder__link {
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
  input {
    border: none;
    border: 1px solid ${palette.border};
    outline: none;
    display: block;
    border-radius: 6px;
    padding: 1rem;
    color: ${palette.grey7};
    transition: all 0.1s linear 0s;
    &:focus {
      ${boxShadow.inputFocus}
      border-color: transparent;
    }
    margin-right: 1rem;
  }
`;

const FolderNameBlock = styled.div<{ edit: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  .folder__folder-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
  ${media.custom(450)} {
    ${props =>
      props.edit &&
      css`
        input {
          width: 100%;
        }
      `}
  }
`;

const FolderRightBlock = styled.div<{ open: boolean }>`
  flex: 1 0;
  justify-self: flex-end;
  position: relative;
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
    ${props =>
      props.open &&
      css`
        background-color: ${TagColorMap.blue.backgroundColor};
      `}
  }
  .folder__arrow-down-icon {
    color: transparent;
    display: flex;
    align-items: center;
    ${props =>
      props.open &&
      css`
        color: ${palette.text};
      `}
  }
`;

const FolderHiddenBlock = styled.div<{ open: boolean; isFirst: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  ${boxShadow.serviceLeftSideMenu}
  background-color: white;
  border-radius: 8px;
  transform-origin: top right;
  z-index: ${zIndex.deleteUrlBlock};
  display: flex;
  flex-direction: column;
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
  .folder__action {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .folder__action-edit {
    border-radius: 8px 8px 0 0;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    color: ${palette.text};
    transition: all 0.25s ease;
    &:hover {
      background-color: ${palette.grey2};
    }
  }
`;

interface FolderProps {
  folder: FolderType;
}

const Folder: React.FC<FolderProps> = ({ folder }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(folder.folderName);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const { loading, LoadingType } = useLoading();
  const { deleteFolderRequest, updateFolderRequest } = useContent();
  const isDeleting =
    loading.isLoading && loading.type === LoadingType.deleteFolder;
  const isUpdating =
    loading.isLoading && loading.type === LoadingType.updateFolder;

  const closeBackdrop = () => {
    if (!isDeleting) {
      setOpen(false);
    }
  };

  const onUpdate = () => {
    if (folder.folderName === folderName) {
      setEdit(false);
      return;
    }
    updateFolderRequest({ _id: folder._id, folderName });
  };

  const onDelete = () => deleteFolderRequest(folder._id);

  useEffect(() => {
    if (isUpdating) {
      setClose(true);
    }

    if (close && !isUpdating) {
      setEdit(false);
    }
  }, [close, isUpdating]);

  const renderBlockContent = () => {
    if (edit) {
      return (
        <FolderNameBlock edit={edit}>
          <TiFolderDelete className='folder__folder-icon' />
          <input
            type='text'
            value={folderName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFolderName(e.target.value)
            }
            className='folder__edit-input'
            autoFocus
          />
          <Button
            size='small'
            color='green'
            isLoading={isUpdating}
            onClick={onUpdate}
          >
            {isUpdating ? (
              <>
                <Spinner size='tiny' />
                Renaming
              </>
            ) : (
              'Rename'
            )}
          </Button>
        </FolderNameBlock>
      );
    }

    return (
      <Link
        to={`/service/${folder.folderName}-${folder._id}`}
        className='folder__link'
      >
        <FolderNameBlock edit={edit}>
          <TiFolderDelete className='folder__folder-icon' />
          <b>{folder.folderName}</b>
        </FolderNameBlock>
      </Link>
    );
  };

  return (
    <FolderBlock edit={edit}>
      <FolderTopBlock>
        {renderBlockContent()}
        <FolderRightBlock open={open}>
          <div
            className='folder__open'
            onClick={() => {
              setIsFirst(false);
              setOpen(true);
            }}
          >
            <AiOutlineEllipsis className='folder__arrow-down-icon' />
          </div>
          <FolderHiddenBlock open={open} isFirst={isFirst}>
            <Backdrop open={open} onClick={closeBackdrop} />
            <div
              className='folder__action-edit'
              onClick={() => {
                setEdit(true);
                setOpen(false);
              }}
            >
              Rename
            </div>
            <div className='folder__action'>
              <Button
                color='red'
                size='small'
                onClick={onDelete}
                isLoading={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Spinner size='tiny' />
                    Removing
                  </>
                ) : (
                  'Remove'
                )}
              </Button>
            </div>
          </FolderHiddenBlock>
        </FolderRightBlock>
      </FolderTopBlock>
    </FolderBlock>
  );
};

export { Folder };
