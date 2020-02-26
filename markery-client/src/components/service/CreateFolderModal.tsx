import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules/redux';
import { useCustomLocation } from '../../modules/hooks';
import { useFolder } from '../../modules/hooks';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import './CreateFolderModal.scss';

interface CreateFolderModalProps {
  visible: boolean;
  onClose(): void;
}

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  visible,
  onClose
}) => {
  const rootFolderId: any = useSelector(
    (state: RootState) => state.rootFolderId
  );
  const { folderName, folderId, isServiceHome } = useCustomLocation();
  const folderNameInput = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const { addNewFolder } = useFolder();

  useEffect(() => {
    if (folderNameInput.current) folderNameInput.current.focus();
  }, [visible]);

  const closeModal = () => {
    setInputValue('');
    onClose();
  };

  const onCreate = () => {
    if (isServiceHome) {
      addNewFolder(inputValue, rootFolderId);
    } else {
      addNewFolder(inputValue, folderId);
    }
    closeModal();
  };

  const content = (
    <div className='create-folder-modal'>
      <label htmlFor='folder-name-input'>
        Create new folder {isServiceHome ? '' : `in "${folderName}"`}
      </label>
      <input
        type='text'
        ref={folderNameInput}
        id='folder-name-input'
        placeholder='Enter a folder name'
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
      />
      <div className='create-folder-modal__button-area'>
        <Button color='lightGrey' transparent onClick={closeModal}>
          Cancle
        </Button>
        <Button
          color='blue'
          transparent
          onClick={onCreate}
          disabled={!inputValue}
        >
          Create
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      content={content}
      onClose={closeModal}
      modalPosition='top'
      backdropBlur='medium'
      removeBox
      hideCancle
    />
  );
};
