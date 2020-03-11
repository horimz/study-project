import React from "react";
import styled from "styled-components";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
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
  onClose: () => void;
}

const SettingsDeleteAccountModal: React.FC<SettingsDeleteAccountModalProps> = ({
  open,
  onClose
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
      <b>"dp.horimz@gmail.com"</b>
    </SettingsDeleteAccountModalBody>
  );

  const actions = (
    <SettingsDeleteAccountModalActions>
      <Button color='grey' onClick={closeModal}>
        Cancel
      </Button>
      <Button color='red' onClick={() => console.log("Remove account")}>
        Remove account
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
