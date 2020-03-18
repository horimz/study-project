import React from "react";
import styled from "styled-components";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Spinner } from "../common/Spinner";
import { AiOutlineUserDelete } from "react-icons/ai";

const SettingsDeleteAccountModalHeader = styled.div`
  padding: 2rem 2.5rem;
  display: flex;
  align-items: center;
  svg {
    font-size: 4rem;
    margin-right: 2rem;
  }
`;
const SettingsDeleteAccountModalBody = styled.div`
  padding: 2rem 2.5rem;
`;
const SettingsDeleteAccountModalActions = styled.div`
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
`;

interface SettingsDeleteAccountModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

const SettingsDeleteAccountModal: React.FC<SettingsDeleteAccountModalProps> = ({
  open,
  email,
  onClose,
  onDelete,
  isLoading
}) => {
  const closeModal = () => {
    onClose();
  };
  const header = (
    <SettingsDeleteAccountModalHeader>
      <AiOutlineUserDelete />
      <h2>Are your sure you want to delete your account?</h2>
    </SettingsDeleteAccountModalHeader>
  );

  const body = (
    <SettingsDeleteAccountModalBody>
      You are about to delete your Markery account with email&nbsp;
      <b>"{email}"</b>
    </SettingsDeleteAccountModalBody>
  );

  const actions = (
    <SettingsDeleteAccountModalActions>
      <Button color='grey' onClick={closeModal}>
        CANCEL
      </Button>
      <Button color='red' onClick={() => onDelete()} isLoading={isLoading}>
        {isLoading ? (
          <>
            <Spinner size='small' />
            REMOVING ACCOUNT
          </>
        ) : (
          "REMOVE ACCOUNT"
        )}
      </Button>
    </SettingsDeleteAccountModalActions>
  );

  return (
    <Modal
      open={open}
      onClose={closeModal}
      header={header}
      body={body}
      actions={actions}
      size='large'
    />
  );
};

export { SettingsDeleteAccountModal };
