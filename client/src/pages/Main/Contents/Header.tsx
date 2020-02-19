import React, { useState, useContext, useCallback } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
  editFolder,
  deleteFolder,
  updateFolders
} from '../../../common/actions';
import { AppContext } from '../../../context';
import { Modal } from '../../../components/Modal';
import { Profile } from './Profile';

const types = {
  edit: 'Edit',
  delete: 'Delete'
};

interface HeaderProps {
  editFolder: Function;
  deleteFolder: Function;
  updateFolders: Function;
}

const _Header: React.FC<HeaderProps> = props => {
  const { editFolder, deleteFolder, updateFolders } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string | null | undefined>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [type, setType] = useState<string>('');
  const {
    selectedFolderName,
    selectedFolderId,
    setSelectedFolder,
    deleteSelectedFolder,
    editSelectedFolder
  } = useContext(AppContext);

  const openModal = useCallback(() => setOpen(true), []);

  const closeModal = useCallback(() => {
    setModalTitle('');
    setPlaceholder('');
    setInputValue('');
    setOpen(false);
  }, []);

  const onEdit = () => {
    const data = {
      folderName: inputValue,
      folderId: selectedFolderId
    };

    editFolder(data);
    editSelectedFolder(inputValue);
    closeModal();
  };

  const onDelete = () => {
    deleteFolder(selectedFolderId);
    deleteSelectedFolder();
    closeModal();
  };

  const modalBody =
    type === types.edit ? (
      <div>
        <input
          type='text'
          placeholder={placeholder === null ? '' : placeholder}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className='modal__input'
        />
      </div>
    ) : (
      <div className='modal__text'>
        All folders and links in this folder will be deleted.
      </div>
    );

  const modalActions = (
    <div>
      <button onClick={closeModal} className='btn btn--cancel small u-mr-tiny'>
        Cancel
      </button>
      {type === types.edit ? (
        <button
          onClick={onEdit}
          className={classNames('btn btn--positive small', {
            disabled: !inputValue || inputValue === placeholder
          })}
        >
          Edit
        </button>
      ) : (
        <button
          onClick={onDelete}
          className='btn btn--negative--inverted small'
        >
          Delete
        </button>
      )}
    </div>
  );

  return (
    <div className='main-content__content-top'>
      <Modal
        open={open}
        title={modalTitle}
        body={modalBody}
        actions={modalActions}
        onClose={closeModal}
      />

      <div className='main-content__content-top__left'>
        <div>{selectedFolderName ? selectedFolderName : ''}</div>
        {selectedFolderName === null ? null : (
          <React.Fragment>
            <div
              onClick={() => {
                setModalTitle('Rename folder');
                setPlaceholder(selectedFolderName);
                setType(types.edit);
                openModal();
              }}
              className='u-ml-sm'
            >
              Edit
            </div>
            <div
              onClick={() => {
                setModalTitle(`Delete folder "${selectedFolderName}"`);
                setPlaceholder('');
                setType(types.delete);
                openModal();
              }}
            >
              Delete
            </div>
          </React.Fragment>
        )}
      </div>
      <div className='main-content__content-top__right'>
        {selectedFolderName === null ? null : (
          <React.Fragment>
            <div>
              <input
                type='text'
                placeholder='search'
                className='main-content__content-top__right-search'
              />
            </div>
            <div className='main-content__content-top__right-profile'>
              <Profile />
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export const Header = connect(null, {
  editFolder,
  deleteFolder,
  updateFolders
})(_Header);
