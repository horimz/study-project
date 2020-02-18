import React, { useState, useCallback, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { StoreState } from '../../../common/reducers';
import { addFolder } from '../../../common/actions';
import { AppContext } from '../../../context';
import { Modal } from '../../../components/Modal';
import { BottomModifier } from './BottomModifier';

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
    if (checked) {
      const url = { _id };
      setSelectedUrls(prev => [...prev, url]);
    } else {
      setSelectedUrls(prev => prev.filter(el => el._id !== _id));
    }
  }, []);

  const onCreate = async () => {
    await addFolder(inputValue);
    setToMostCurrentFolder();
    closeModal();
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
        key={folder._id}
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
          <span className='icon checked'>&nbsp;</span>
        </label>
        <div className='main-content__content-bottom__content'>
          (Folder) {folder.folderName}
        </div>
      </div>
    ));
  };

  const renderUrls = () => {
    return contents.urls.map((url: any) => (
      <div key={url._id} className='main-content__content-bottom__content-box'>
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
        ></label>

        <div className='main-content__content-bottom__content'>
          <a
            href={url.url}
            rel='noopener noreferrer'
            target='_blank'
            className='link'
          >
            (URL) {url.name ? url.name : url.url}
          </a>
        </div>
      </div>
    ));
  };

  // zero folders created
  if (selectedFolderName === null)
    return (
      <div className='main-content__content-bottom__left flex-center'>
        <Modal
          open={open}
          title='Create a Folder'
          body={modalBody}
          actions={modalActions}
          onClose={closeModal}
        />

        <button onClick={openModal} className='btn btn--blue'>
          Create a Folder
        </button>
      </div>
    );

  // fetching content
  if (contents === null)
    return (
      <div className='main-content__content-bottom__left flex-center'>
        Fetching contents
      </div>
    );

  // zero content in folder
  if (contents.folders.length === 0 && contents.urls.length === 0)
    return (
      <div className='main-content__content-bottom__left flex-center'>
        Add new contents to this folder
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
