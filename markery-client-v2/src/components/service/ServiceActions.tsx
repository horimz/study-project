import React from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { ServiceAddFolderModal } from './ServiceAddFolderModal';
import { ServiceAddUrlModal } from './ServiceAddUrlModal';
import { useModal } from '../../lib/hooks';
import { media } from '../../lib/styles';
// import { TiFolderAdd } from 'react-icons/ti';
// import { FiLink } from 'react-icons/fi';
import { Folder } from '../../lib/api/folders/types';

const ServiceActionsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  ${media.xsmall} {
    flex-direction: column;
    justify-content: stretch;
  }
  .service__action {
    &:not(:last-child) {
      margin-right: 1rem;
      ${media.xsmall} {
        margin: 0;
      }
    }
  }
  button {
    transition: color 150ms ease 0s, border 150ms ease 0s,
      transform 100ms ease 0s;
    background-color: transparent;
    color: #0c344b;
    font-size: 16px;
    font-weight: 700;
    word-break: keep-all;
    border: 2px solid #8fa6b2;
    &:active {
      transform: translate3d(0px, 1px, 0px);
      background-color: transparent;
    }
    &:hover {
      border: 2px solid #ccd9df;
      background-color: transparent;
    }
    svg {
      font-size: 1.6rem;
      margin-right: 0.5rem;
    }
    ${media.xsmall} {
      width: 160px;
      &:first-child {
        margin-bottom: 1.4rem;
      }
    }
  }
`;

interface ServiceActionsProps {
  folder: Folder;
}

const ServiceActions: React.FC<ServiceActionsProps> = ({ folder }) => {
  const { modal, createFolderModalToggle, createUrlModalToggle } = useModal();

  return (
    <ServiceActionsBlock>
      <div className='service__action'>
        <Button color='grey' onClick={createFolderModalToggle}>
          {/* <TiFolderAdd /> */}
          Add folder
        </Button>
      </div>
      <div className='service__action'>
        <Button color='grey' onClick={createUrlModalToggle}>
          {/* <FiLink /> */}
          Add url
        </Button>
      </div>
      <ServiceAddFolderModal
        open={modal.createFolderModal}
        onClose={createFolderModalToggle}
        folder={folder}
      />
      <ServiceAddUrlModal
        open={modal.createUrlModal}
        onClose={createUrlModalToggle}
        folder={folder}
      />
    </ServiceActionsBlock>
  );
};

export { ServiceActions };
