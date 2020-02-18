import React, { useState, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { addSubFolder, addUrl } from '../../../common/actions';
import { Modal } from '../../../components/Modal';
import { AppContext } from '../../../context';

const types = {
  url: 'url',
  folder: 'folder'
};

interface RightBarProps {
  addSubFolder: Function;
  addUrl: Function;
}

const _RightBar: React.FC<RightBarProps> = props => {
  const { addSubFolder, addUrl } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [action, setAction] = useState<string | null>(null);
  const { selectedFolderId, selectedFolderName } = useContext(AppContext);

  const openModal = useCallback(() => setOpen(true), []);

  const closeModal = useCallback(() => {
    setModalTitle('');
    setPlaceholder('');
    setInputValue('');
    setName('');
    setDescription('');
    setOpen(false);
  }, []);

  const onCreate = () => {
    switch (action) {
      case types.url:
        addUrl(
          {
            url: inputValue,
            name,
            description
          },
          selectedFolderId
        );
        break;
      case types.folder:
        addSubFolder(inputValue, selectedFolderId);
        break;
      default:
        throw new Error('Invalid action type.');
    }

    closeModal();
  };

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    []
  );

  const onDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
    []
  );

  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  );

  const modalBody = (
    <div>
      <input
        type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        className='modal__input'
      />
      {action === types.url ? (
        <React.Fragment>
          <input
            type='text'
            placeholder='Enter a name (optional)'
            value={name}
            onChange={onNameChange}
            className='modal__input u-mt-sm'
          />
          <input
            type='text'
            placeholder='Enter a description (optional)'
            value={description}
            onChange={onDescriptionChange}
            className='modal__input u-mt-sm'
          />
        </React.Fragment>
      ) : null}
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

  if (selectedFolderName === null) return null;

  return (
    <div>
      <Modal
        open={open}
        title={modalTitle}
        body={modalBody}
        actions={modalActions}
        onClose={closeModal}
      />

      <div className='main-content__content-bottom__right'>
        <div className='main-content__content-bottom__create-link u-mb-sm'>
          <button
            onClick={() => {
              setModalTitle('Add new URL');
              setPlaceholder('https://');
              setAction(types.url);
              openModal();
            }}
            className='btn btn--blue stretch'
          >
            Add URL
          </button>
        </div>
        <div
          onClick={() => {
            setModalTitle(`Create folder in "${selectedFolderName}"`);
            setPlaceholder('Enter a folder name');
            setAction(types.folder);
            openModal();
          }}
          className='main-content__content-bottom__create-folder'
        >
          <span className='icon folder u-mr-sm'>&nbsp;</span>
          Create folder
        </div>
      </div>
    </div>
  );
};

export const RightBar = connect(null, { addSubFolder, addUrl })(_RightBar);
