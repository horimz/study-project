import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../common/reducers';
import { logout } from '../../common/actions';
import { Redirect } from 'react-router-dom';
import { Dropdown } from '../../components/Dropdown';
import { Modal, openModal, closeModal } from '../../components/Modal';

interface MainProps {
  auth: any;
  logout: Function;
}

const _Main: React.FC<MainProps> = props => {
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

  const body = (
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

  const toggler = (
    <div className='main-content__content-top__right-image'></div>
  );

  const profileContent = (
    <div>
      <div className='dropdown__item'>{props.auth.username}</div>
      <div className='dropdown__item'>Settings</div>
      <div className='dropdown__item'>Share</div>
      <div className='dropdown__item' onClick={() => props.logout()}>
        Log out
      </div>
    </div>
  );

  if (props.auth === false) return <Redirect to='/' />;

  return (
    <div className='main-content'>
      <Modal
        title={modalTitle}
        body={body}
        actions={actions}
        onClose={onModalClose}
      />

      <div className='main-content__left-bar'>
        <div className='main-content__left-bar__top'>
          <div className='main-content__left-bar__logo'>logo</div>
          <div className='main-content__left-bar__content'>content</div>
        </div>
        <div className='main-content__left-bar__bottom'>bottom content</div>
      </div>

      <div className='main-content__content'>
        <div className='main-content__content-top'>
          <div className='main-content__content-top__left'>current folder</div>
          <div className='main-content__content-top__right'>
            <div>
              <input
                type='text'
                placeholder='search'
                className='main-content__content-top__right-search'
              />
            </div>
            <div className='main-content__content-top__right-profile'>
              <Dropdown toggler={toggler} content={profileContent} />
            </div>
          </div>
        </div>

        <div className='main-content__content-bottom'>
          <div className='main-content__content-bottom__left'>
            folder content (urls, sub dir), scrollable
          </div>

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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }: StoreState): { auth: any } => {
  return { auth };
};

export const Main = connect(mapStateToProps, { logout })(_Main);
