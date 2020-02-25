import React from 'react';
import { useAuth } from '../../modules/hooks';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import './AccountDeleteModal.scss';

interface AccountDeleteModalProps {
  visible: boolean;
  onClose(): void;
}

export const AccountDeleteModal: React.FC<AccountDeleteModalProps> = ({
  visible,
  onClose
}) => {
  const { deleteCurrentUser } = useAuth();

  const closeModal = () => onClose();

  const onAccountDelete = () => {
    deleteCurrentUser();
    closeModal();
  };

  const content = (
    <div className='account-delete-modal'>
      <div className='account-delete-modal__title'>Delete account</div>
      <div className='account-delete-modal__body'>
        Are you sure you want to delete your account?
      </div>
      <div className='account-delete-modal__actions'>
        <div className='account-delete-modal__cancel-button'>
          <Button size='small' color='lightGrey' onClick={closeModal}>
            Cancle
          </Button>
        </div>
        <div className='account-delete-modal__delete-button'>
          <Button size='small' color='green' onClick={onAccountDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      content={content}
      size='small'
      onClose={closeModal}
      backdropColor='black'
      backdropBlur='little'
    />
  );
};
