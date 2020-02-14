import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../../common/reducers';
import { IUser, logout } from '../../../common/actions';
import { Modal, openModal, closeModal } from '../../../components/Modal';

import { Header } from './Header';

interface MainContentProps {
  auth: IUser;
}

const _Contents: React.FC<MainContentProps> = props => {
  const [modalTitle, setModalTitle] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [type, setType] = useState('');

  const onModalClose = () => {
    setModalTitle('');
    setPlaceholder('');
    setInputValue('');
    closeModal();
  };

  const onCreate = () => {
    const data = {
      type,
      value: inputValue
    };

    console.log(data);

    // TODO: add actions and re-render content
    onModalClose();
  };

  const modalBody = (
    <div>
      <input
        type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className='modal__input'
      />
    </div>
  );

  const actions = (
    <div>
      <button
        onClick={onModalClose}
        className='btn btn--cancel small u-mr-tiny'
      >
        Cancel
      </button>
      <button
        onClick={onCreate}
        className={
          inputValue
            ? 'btn btn--positive small'
            : 'btn btn--positive small disabled'
        }
      >
        Create
      </button>
    </div>
  );

  const RightBar = () => (
    <div>
      <div className='main-content__content-bottom__right'>
        <div className='main-content__content-bottom__create-link u-mb-sm'>
          <button
            onClick={() => {
              setModalTitle('Add new Url');
              setPlaceholder('https://');
              setType('url');
              openModal();
            }}
            className='btn btn--blue stretch'
          >
            Add Url
          </button>
        </div>
        <div
          onClick={() => {
            setModalTitle('Add new Folder');
            setPlaceholder('Enter a folder name');
            setType('folder');
            openModal();
          }}
          className='main-content__content-bottom__create-folder'
        >
          <span className='u-mr-sm' style={{ border: '1px solid black' }}>
            icon
          </span>
          Create Folder
        </div>
      </div>
    </div>
  );

  return (
    <div className='main-content__content'>
      <Modal
        title={modalTitle}
        body={modalBody}
        actions={actions}
        onClose={onModalClose}
      />

      <Header />

      <div className='main-content__content-bottom'>
        <div className='main-content__content-bottom__left'>folder content</div>

        {RightBar()}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }: StoreState): { auth: any } => {
  return { auth };
};

export const Contents = connect(mapStateToProps, { logout })(_Contents);
