import React, { useState } from 'react';
import { useSelectedContent } from '../../modules/hooks';
import { DeleteContentsModal } from './DeleteContentsModal';
import { Button } from '../common/Button';
import './ServiceModifier.scss';

interface ServiceModifierProps {}

export const ServiceModifier: React.FC<ServiceModifierProps> = props => {
  const { selectedFolders, selectedUrls } = useSelectedContent();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const itemNum = selectedFolders.length + selectedUrls.length;

  // Only display modifier when there are selected contents
  if (itemNum === 0) return null;

  return (
    <div className='service-modifier'>
      <div className='service-modifier__container'>
        <div className='service-modifier__move'>
          <Button color='blue' size='small'>
            Move
          </Button>
        </div>
        <div className='service-modifier__delete'>
          <Button
            color='blue'
            size='small'
            transparent
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete
          </Button>
          <DeleteContentsModal
            visible={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
          />
        </div>
      </div>
    </div>
  );
};
