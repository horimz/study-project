import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './Modal.scss';

type ModalPosition = 'top' | 'center' | 'bottom' | 'topCenter' | 'centerBottom';

type ModalSize = 'small' | 'medium' | 'large';

type BackDropColor = 'white' | 'black' | 'blue';

type BackDropBlur = 'none' | 'little' | 'medium' | 'many';

type BackDropTransparency = 'little' | 'medium' | 'many';

interface ModalProps {
  visible: boolean;
  onClose: Function;
  content: ReactNode;
  size?: ModalSize;
  modalPosition?: ModalPosition;
  backdropColor?: BackDropColor;
  backdropBlur?: BackDropBlur;
  hideCancle?: boolean;
  backdropTransparency?: BackDropTransparency;
  removeBox?: boolean;
}

const modalRoot = document.getElementById('modal-root');

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  content,
  size = 'medium',
  modalPosition = 'center',
  backdropColor = 'white',
  backdropBlur = 'none',
  backdropTransparency = 'medium',
  hideCancle = false,
  removeBox = false
}) => {
  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  const backdropClasses = classNames(
    `backdrop-modal ${backdropColor} ${backdropTransparency}`,
    `blur-${backdropBlur}`,
    { visible }
  );
  const modalBoxClasses = classNames(
    `modal ${modalPosition} ${size}`,
    {
      visible
    },
    { removeBox }
  );
  const modalCancelButtonClasses = classNames(`modal__cancel`, {
    visible: visible && !hideCancle
  });
  const modalContentsAreaClasses = classNames(`modal__contents-area ${size}`);

  const modal = (
    <div>
      <div className={backdropClasses} onClick={closeModal}></div>
      <div className={modalBoxClasses}>
        <div className={modalCancelButtonClasses} onClick={closeModal}>
          <span className='cancel'></span>
        </div>
        <div className={modalContentsAreaClasses}>{content}</div>
      </div>
    </div>
  );

  if (!modalRoot) throw new Error('Add element with id "modal-root"');

  return ReactDOM.createPortal(modal, modalRoot);
};
