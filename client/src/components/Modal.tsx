import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  title: string;
  body: any;
  actions: any;
  onClose: any;
}

const _openModal = () => {
  const backdrop = document.querySelector('.backdrop-modal');
  const modal = document.querySelector('.modal');
  const body = document.body;

  backdrop?.classList.add('open');
  modal?.classList.add('open');
  body.style.overflow = 'hidden'; // hide scroll bar
};

const _closeModal = () => {
  const backdrop = document.querySelector('.backdrop-modal');
  const modal = document.querySelector('.modal');
  const body = document.body;

  backdrop?.classList.remove('open');
  modal?.classList.remove('open');
  body.style.overflow = 'visible';
};

const _Modal: React.FC<ModalProps> = props => {
  const { title, body, actions, onClose } = props;

  const modalContent = (
    <div>
      <div onClick={onClose} className='backdrop-modal'></div>

      <div className='modal'>
        <div className='modal__title'>{title}</div>
        <div className='modal__body'>{body}</div>
        <div className='modal__actions'>{actions}</div>
      </div>
    </div>
  );

  const portal = document.querySelector('.portal');
  if (portal) return ReactDOM.createPortal(modalContent, portal);
  else throw new Error('Create a modal element under root.');
};

export const Modal = _Modal;
export const openModal = _openModal;
export const closeModal = _closeModal;
