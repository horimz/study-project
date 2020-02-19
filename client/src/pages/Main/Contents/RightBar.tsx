import React, { useState, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { StoreState } from '../../../common/reducers';
import { addSubFolder, addUrl, updateContent } from '../../../common/actions';
import { Modal } from '../../../components/Modal';
import { AppContext } from '../../../context';

const types = {
  url: 'url',
  folder: 'folder'
};

interface RightBarProps {
  contents: any;
  addSubFolder: Function;
  addUrl: Function;
  updateContent: Function;
}

const _RightBar: React.FC<RightBarProps> = props => {
  const { contents, addSubFolder, addUrl, updateContent } = props;
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
        const newUrl = {
          url: inputValue,
          name,
          description
        };

        addUrl(newUrl, selectedFolderId);
        updateContent({
          folders: [...contents.folders],
          urls: [...contents.urls, newUrl]
        });
        break;
      case types.folder:
        addSubFolder(inputValue, selectedFolderId);
        updateContent({
          folders: [...contents.folders, { folderName: inputValue }],
          urls: [...contents.urls]
        });
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
    <React.Fragment>
      <div>
        <Modal
          open={open}
          title={modalTitle}
          body={modalBody}
          actions={modalActions}
          onClose={closeModal}
        />
        {/* portal to disable actions when checkbox is checked */}
        <div id='rightbar-portal'></div>
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
    </React.Fragment>
  );
};

const mapStateToProps = ({ contents }: StoreState): { contents: any } => {
  return { contents };
};

export const RightBar = connect(mapStateToProps, {
  addSubFolder,
  addUrl,
  updateContent
})(_RightBar);
