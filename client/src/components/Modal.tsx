import React from 'react';

interface ModalProps {
  title: string;
  body: any;
  actions: any;
  onClose: React.MouseEventHandler;
}

const _handleModal = (action: string) => {
  const backdrop = document.querySelector('.backdrop');
  const modal = document.querySelector('.modal');
  const body = document.body;

  if (action === 'open' && backdrop && modal) {
    backdrop.classList.add('open');
    modal.classList.add('open');
    body.style.overflow = 'hidden'; // hide scroll bar
  }

  if (action === 'close' && backdrop && modal) {
    backdrop.classList.remove('open');
    modal.classList.remove('open');
    body.style.overflow = 'visible';
  }
};

const _openModal = () => {
  const backdrop = document.querySelector('.backdrop');
  const modal = document.querySelector('.modal');
  const body = document.body;

  if (backdrop && modal) {
    backdrop.classList.add('open');
    modal.classList.add('open');
    body.style.overflow = 'hidden'; // hide scroll bar
  }
};

const _closeModal = () => {
  const backdrop = document.querySelector('.backdrop');
  const modal = document.querySelector('.modal');
  const body = document.body;

  if (backdrop && modal) {
    backdrop.classList.remove('open');
    modal.classList.remove('open');
    body.style.overflow = 'visible';
  }
};

const _Modal: React.FC<ModalProps> = props => {
  return (
    <div>
      <div onClick={props.onClose} className='backdrop'></div>

      <div className='modal'>
        <div className='modal__title'>{props.title}</div>
        <div className='modal__body'>{props.body}</div>
        <div className='modal__actions'>{props.actions}</div>
      </div>
    </div>
  );
};

export const Modal = _Modal;
export const handleModal = _handleModal;
export const openModal = _openModal;
export const closeModal = _closeModal;
