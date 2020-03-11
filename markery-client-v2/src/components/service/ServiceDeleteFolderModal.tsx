import React from "react";
import styled from "styled-components";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";

const ServiceDeleteFolderModalHeader = styled.div`
  padding: 2rem 2.5rem;
`;
const ServiceDeleteFolderModalBody = styled.div`
  padding: 2rem 2.5rem;
`;
const ServiceDeleteFolderModalActions = styled.div`
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
`;

interface ServiceDeleteFolderModalProps {
  open: boolean;
  onClose: () => void;
}

const ServiceDeleteFolderModal: React.FC<ServiceDeleteFolderModalProps> = ({
  open,
  onClose
}) => {
  const closeModal = () => {
    onClose();
  };

  const header = (
    <ServiceDeleteFolderModalHeader>
      <h2>Confirm deletion</h2>
    </ServiceDeleteFolderModalHeader>
  );

  const body = (
    <ServiceDeleteFolderModalBody>
      You are about to delete your folder&nbsp;<b>"React"</b>
    </ServiceDeleteFolderModalBody>
  );

  const actions = (
    <ServiceDeleteFolderModalActions>
      <Button color='grey' onClick={closeModal}>
        Cancel
      </Button>
      <Button color='red' onClick={() => console.log("Remove folder")}>
        Remove folder
      </Button>
    </ServiceDeleteFolderModalActions>
  );

  return (
    <Modal
      open={open}
      onClose={closeModal}
      header={header}
      body={body}
      actions={actions}
    />
  );
};

export { ServiceDeleteFolderModal };
