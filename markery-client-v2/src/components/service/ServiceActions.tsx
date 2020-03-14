import React from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { ServiceAddFolderModal } from './ServiceAddFolderModal';
import { ServiceAddUrlModal } from './ServiceAddUrlModal';
import { useModal } from '../../lib/hooks';
import { media } from '../../lib/styles';

const ServiceActionsBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
  ${media.custom(500)} {
    flex-direction: column;
    justify-content: stretch;
  }
  .service__action {
    &:not(:last-child) {
      margin-right: 1rem;
      ${media.custom(500)} {
        margin-right: 0;
      }
    }
  }
  button {
    transition: transform 100ms ease 0s, color 0.2s linear,
      background-color 0.2s linear;
    &:active {
      transform: translate3d(0px, 1px, 0px);
    }
    ${media.custom(500)} {
      width: 100%;
      &:first-child {
        margin-bottom: 2rem;
      }
    }
  }
`;

interface ServiceActionsProps {
  folderId: string;
}

const ServiceActions: React.FC<ServiceActionsProps> = ({ folderId }) => {
  const { modal, createFolderModalToggle, createUrlModalToggle } = useModal();

  return (
    <ServiceActionsBlock>
      <div className='service__action'>
        <Button color='grey' onClick={createFolderModalToggle}>
          Add folder
        </Button>
      </div>
      <div className='service__action'>
        <Button color='grey' onClick={createUrlModalToggle}>
          Add url
        </Button>
      </div>
      <ServiceAddFolderModal
        open={modal.createFolderModal}
        onClose={createFolderModalToggle}
        folderId={folderId}
      />
      <ServiceAddUrlModal
        open={modal.createUrlModal}
        onClose={createUrlModalToggle}
        folderId={folderId}
      />
    </ServiceActionsBlock>
  );
};

export { ServiceActions };
