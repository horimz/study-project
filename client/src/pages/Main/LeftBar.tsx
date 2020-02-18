import React, { useState, useContext, useCallback } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { StoreState } from '../../common/reducers';
import { IFolder, addFolder } from '../../common/actions';
import { Modal } from '../../components/Modal';
import { AppContext } from '../../context';

interface LeftBarProps {
  folders: IFolder[];
  addFolder: Function;
}

const _LeftBar: React.FC<LeftBarProps> = props => {
  const { folders, addFolder } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const {
    selectedFolderId,
    setSelectedFolder,
    setToMostCurrentFolder
  } = useContext(AppContext);

  const openModal = useCallback(() => setOpen(true), []);

  const closeModal = useCallback(() => {
    setInputValue('');
    setOpen(false);
  }, []);

  const onCreate = async () => {
    await addFolder(inputValue);
    setToMostCurrentFolder();
    closeModal();
  };

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    []
  );

  const modalBody = (
    <div>
      <input
        type='text'
        placeholder='Enter a folder name'
        value={inputValue}
        onChange={onChange}
        className='modal__input'
      />
    </div>
  );

  const modalActions = (
    <div>
      <button onClick={closeModal} className='btn btn--cancel small u-mr-tiny'>
        Cancel
      </button>
      <button
        onClick={onCreate}
        className={classNames('btn btn--positive small', {
          disabled: !inputValue
        })}
      >
        Create
      </button>
    </div>
  );

  const renderFolders = () =>
    folders.map((folder: IFolder) => (
      <div
        key={folder._id}
        className={classNames('main-content__left-bar__content', {
          active: selectedFolderId === folder._id
        })}
        onClick={() => {
          setSelectedFolder(folder.folderName, folder._id);
        }}
      >
        {folder.folderName}
      </div>
    ));

  return (
    <div className='main-content__left-bar'>
      <Modal
        open={open}
        title='Add new folder'
        body={modalBody}
        actions={modalActions}
        onClose={closeModal}
      />

      <div className='main-content__left-bar__top'>
        <div className='main-content__left-bar__logo'>logo</div>
        <div className='main-content__left-bar__contents'>
          {renderFolders()}
        </div>
      </div>
      <div className='main-content__left-bar__bottom'>
        <button onClick={openModal} className='btn btn--blue'>
          Add new folder
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ folders }: StoreState): { folders: any } => {
  return { folders };
};

export const LeftBar = connect(mapStateToProps, { addFolder })(_LeftBar);
