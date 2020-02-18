import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './Modal.scss';

type ModalProps = {
  open: boolean;
  title: any;
  body: any;
  actions: any;
  onClose: Function;
  centerTitle?: boolean;
  size?: string; // tiny small medium large huge
};

const setModalWidth = (size: string | undefined) => {
  if (size === undefined) return '500px'; // default modal width
  switch (size) {
    case 'tiny':
      return '200px';
    case 'small':
      return '300px';
    case 'medium':
      return '400px';
    case 'large':
      return '700px';
    case 'huge':
      return '800px';
    default:
      throw new Error('Invalid size value.');
  }
};

const modalRoot = document.getElementById('modal-root');

const _Modal: React.FC<ModalProps> = props => {
  const { open, title, body, actions, onClose, centerTitle, size } = props;

  const close = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  const backdropClasses = classNames('backdrop-modal', { open: open });
  const modalBoxClasses = classNames('modal__box', { open: open });
  const modalTitleClasses = classNames('modal__title', {
    'flex-center': centerTitle
  });

  const modal = (
    <React.Fragment>
      <div className={backdropClasses} onClick={close}></div>

      <div
        className={modalBoxClasses}
        style={{ minWidth: setModalWidth(size) }}
      >
        <div className={modalTitleClasses}>{title}</div>
        <div className='modal__body'>{body}</div>
        <div className='modal__actions'>{actions}</div>
      </div>
    </React.Fragment>
  );

  if (!modalRoot) throw new Error();

  return ReactDOM.createPortal(modal, modalRoot);
};

export const Modal = _Modal;
