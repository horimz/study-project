import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useContent, useLoading, useModal } from '../../lib/hooks';
import { palette, boxShadow, animation, zIndex } from '../../lib/styles';
import { FiLink, FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useToggle } from '../../lib/hooks';
import { Button } from '../common/Button';
import { Backdrop } from '../common/Backdrop';
import { Spinner } from '../common/Spinner';
import { Url as UrlType } from '../../lib/api/urls/types';

const UrlBlock = styled.div`
  width: 100%;
  padding: 1rem 1.5rem;
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

`;

const UrlTopBlock = styled.div`
  display: flex;
  a {
    width: 100%;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &:hover .url__trash-icon {
    color: ${palette.text};
  }
  &:hover .url__edit-icon {
    color: ${palette.text};
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
  span {
    color: ${palette.grey6};
    font-size: 12px;
  }
`;

const UrlRightBlock = styled.div`
  justify-self: flex-end;
  .url__action {
    padding: 0.75rem;
    border-radius: 8px;
    transition: all 0.2s;
    position: relative;
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
    background-color: ${palette.grey1};
  }
  ${props =>
    props.open &&
    css`
      background-color: ${palette.grey1};
    `}
  .url__trash-icon {
    ${props =>
      props.open &&
      css`
        color: ${palette.grey6};
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
  ${boxShadow.serviceLeftSideMenu}
  background-color: white;
  border-radius: 8px;
  transform-origin: top right;
  z-index: ${zIndex.deleteUrlBlock};
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
  .url__delete-box {
    padding: 1rem;
    display: flex;
    align-items: center;
    ${boxShadow.serviceLeftSideMenu}
    button .spinner {
      margin-right: 0.5rem;
    }
  }
`;

interface UrlProps {
  url: UrlType;
}

const Url: React.FC<UrlProps> = ({ url }) => {
  const { deleteUrlRequest } = useContent();
  const { loading, LoadingType } = useLoading();
  const { setModalContent, updateUrlModalToggle } = useModal();
  const [openDelete, onDeleteToggle] = useToggle(false);
  const [isFirstDelete, setIsFirstDelete] = useState<boolean>(true);
  const [openEdit] = useToggle(false);
  const isLoading = loading.isLoading && loading.type === LoadingType.deleteUrl;

  const closeBackdrop = () => {
    if (!isLoading) {
      onDeleteToggle();
    }
  };

  return (
    <UrlBlock>
      <UrlTopBlock>
        <a href={url.url} rel='noopener noreferrer' target='_blank'>
          <UrlNameBlock>
            <FiLink className='url__url-icon' />
            {url.alias ? (
              <>
                <b>{url.alias}</b>&nbsp;
                <span>({url.url})</span>
              </>
            ) : (
              <b>{url.url}</b>
            )}
          </UrlNameBlock>
        </a>
        <UrlRightBlock>
          <UrlActionsBlock>
            <UrlActionBlock
              close={openDelete}
              onClick={() => {
                setModalContent(url);
                updateUrlModalToggle();
              }}
            >
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
              <Backdrop open={openDelete} onClick={closeBackdrop} />
              <div className='url__delete-box'>
                <Button
                  color='red'
                  size='small'
                  onClick={() => {
                    if (url._id) {
                      deleteUrlRequest(url._id);
                    }
                  }}
                  isLoading={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner size='tiny' />
                      Removing
                    </>
                  ) : (
                    'Remove'
                  )}
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
