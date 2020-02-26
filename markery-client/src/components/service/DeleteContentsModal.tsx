import React from 'react';
import { useFolder, useUrl, useSelectedContent } from '../../modules/hooks';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import './DeleteContentsModal.scss';

interface DeleteContentsModal {
  visible: boolean;
  onClose(): void;
}

export const DeleteContentsModal: React.FC<DeleteContentsModal> = ({
  visible,
  onClose
}) => {
  const { selectedFolders, selectedUrls, resetContents } = useSelectedContent();
  const { deleteCurrentFolder } = useFolder();
  const { deleteCurrentUrl } = useUrl();
  const itemNum = selectedFolders.length + selectedUrls.length;

  const closeModal = () => onClose();

  const onContentDelete = () => {
    // Delete selected contents
    selectedFolders.forEach((folderId: any) => deleteCurrentFolder(folderId));
    selectedUrls.forEach((urlId: any) => deleteCurrentUrl(urlId));

    // Set selected contents to empty array
    resetContents();

    // Close modal
    closeModal();
  };

  const content = (
    <div className='delete-contents-modal'>
      <div className='delete-contents-modal__title'>Confirm deletion</div>
      <div className='delete-contents-modal__body'>
        Delete {itemNum} {itemNum === 1 ? 'item' : 'items'}?
      </div>
      <div className='delete-contents-modal__actions'>
        <div className='delete-contents-modal__cancel-button'>
          <Button size='small' color='lightGrey' onClick={closeModal}>
            Cancel
          </Button>
        </div>
        <div>
          <Button
            size='small'
            color='red'
            transparent
            onClick={onContentDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      onClose={closeModal}
      content={content}
      size='small'
      modalPosition='top'
      backdropColor='black'
    />
  );
};
