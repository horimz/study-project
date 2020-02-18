import React, { useState, useCallback, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { StoreState } from '../../../common/reducers';
import { addFolder } from '../../../common/actions';
import { AppContext } from '../../../context';
import { Modal } from '../../../components/Modal';
import { BottomModifier } from './BottomModifier';
import { Spinner } from '../../../components/Spinner';

interface MainContentProps {
  contents: any;
  addFolder: Function;
}

type folder = {
  _id: string;
};

type url = {
  _id: string;
};

const _MainContent: React.FC<MainContentProps> = props => {
  const { contents, addFolder } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedFolders, setSelectedFolders] = useState<folder[]>([]);
  const [selectedUrls, setSelectedUrls] = useState<url[]>([]);
  const { selectedFolderName, setToMostCurrentFolder } = useContext(AppContext);

  // emtpy selected contents when use changes folders
  useEffect(() => {
    setSelectedFolders(prev => []);
    setSelectedUrls(prev => []);
  }, [contents]);

  const closeModal = useCallback(() => setOpen(false), []);

  const openModal = useCallback(() => setOpen(true), []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    []
  );

  const onFolderChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, name: _id } = e.target;

      if (_id === undefined) return;

      if (checked) {
        const folder = { _id };
        setSelectedFolders(prev => [...prev, folder]);
      } else {
        setSelectedFolders(prev => prev.filter(el => el._id !== _id));
      }
    },
    []
  );

  const onUrlChecked = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name: _id } = e.target;

    if (_id === undefined) return;

    if (checked) {
      const url = { _id };
      setSelectedUrls(prev => [...prev, url]);
    } else {
      setSelectedUrls(prev => prev.filter(el => el._id !== _id));
    }
  }, []);

  const onCreate = async () => {
    closeModal();
    await addFolder(inputValue);
    setToMostCurrentFolder();
  };

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

  const renderFolders = () => {
    return contents.folders.map((folder: any) => (
      <div
        key={folder._id ? folder._id : folder.folderName}
        className='main-content__content-bottom__content-box'
      >
        <input
          type='checkbox'
          id={folder._id}
          name={folder._id}
          onChange={onFolderChecked}
          className='checkbox-hidden'
        />
        <label
          htmlFor={folder._id}
          className={classNames('checkbox-label', {
            'show-checkbox-border':
              selectedFolders.length !== 0 || selectedUrls.length !== 0
          })}
        >
          <span className='icon checked tiny checkbox-icon'></span>
        </label>

        <div className='main-content__content-bottom__content'>
          <span className='icon folder tiny'></span> {folder.folderName}
        </div>
      </div>
    ));
  };

  const renderUrls = () => {
    return contents.urls.map((url: any) => (
      <div
        key={url._id ? url._id : url.url}
        className='main-content__content-bottom__content-box'
      >
        <input
          type='checkbox'
          id={url._id}
          name={url._id}
          onChange={onUrlChecked}
          className='checkbox-hidden'
        />
        <label
          htmlFor={url._id}
          className={classNames('checkbox-label', {
            'show-checkbox-border':
              selectedFolders.length !== 0 || selectedUrls.length !== 0
          })}
        >
          <span className='icon checked tiny checkbox-icon'></span>
        </label>

        <div className='main-content__content-bottom__content'>
          <a
            href={url.url}
            rel='noopener noreferrer'
            target='_blank'
            className='link'
          >
            <span className='icon none tiny'></span>
            {url.name ? url.name : url.url}
          </a>
        </div>
      </div>
    ));
  };

  // zero folders created
  if (selectedFolderName === null)
    return (
      <div className='no-content'>
        <Modal
          open={open}
          title='Create a Folder'
          body={modalBody}
          actions={modalActions}
          onClose={closeModal}
        />
        <div>Image</div>
        <div>Welcome to Markery</div>
        <div>Share contents with people.</div>
        <button onClick={openModal} className='btn btn--blue--inverted small'>
          Create your first folder
        </button>
      </div>
    );

  // fetching content
  if (contents === null)
    return (
      <div
        className='main-content__content-bottom__left flex-center'
        style={{ paddingBottom: 0, minHeight: '65vh' }}
      >
        <Spinner />
      </div>
    );

  // zero content in folder
  if (contents.folders.length === 0 && contents.urls.length === 0)
    return (
      <div className='no-content'>
        <div>Image</div>
        <div>
          Welcome to <span>{selectedFolderName}</span>
        </div>
        <div>Contents in this folder can be shared with people.</div>
      </div>
    );

  return (
    <div className='main-content__content-bottom__left'>
      {renderFolders()}
      {renderUrls()}
      <BottomModifier
        selectedFolders={selectedFolders}
        selectedUrls={selectedUrls}
      />
    </div>
  );
};

const mapStateToProps = ({ contents }: StoreState): { contents: any } => {
  return { contents };
};

export const MainContent = connect(mapStateToProps, { addFolder })(
  _MainContent
);
