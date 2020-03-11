import React from "react";
import styled from "styled-components";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useInputs } from "../../lib/hooks";

const ServiceAddFolderModalHeader = styled.div`
  padding: 2rem 2.5rem;
`;
const ServiceAddFolderModalBody = styled.div`
  padding: 2rem 2.5rem;
`;
const ServiceAddFolderModalActions = styled.div`
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
`;

interface ServiceAddFolderModalProps {
  open: boolean;
  onClose: () => void;
}

const ServiceAddFolderModal: React.FC<ServiceAddFolderModalProps> = ({
  open,
  onClose
}) => {
  const [inputs, onChange] = useInputs({ folderName: "" });

  const closeModal = () => {
    onClose();
  };

  const header = (
    <ServiceAddFolderModalHeader>
      <h2>Add folder</h2>
    </ServiceAddFolderModalHeader>
  );

  const body = (
    <ServiceAddFolderModalBody>
      <form>
        <Input
          label='Folder name'
          id='service-folder'
          placeholder='Enter a folder name'
          name='folderName'
          value={inputs.folderName}
          onChange={onChange}
          clearBackground
          autoFocus
        />
      </form>
    </ServiceAddFolderModalBody>
  );

  const actions = (
    <ServiceAddFolderModalActions>
      <Button color='grey' onClick={closeModal}>
        Cancel
      </Button>
      <Button
        color='green'
        onClick={() => console.log(`Add folder ${inputs.folderName}`)}
      >
        Add folder
      </Button>
    </ServiceAddFolderModalActions>
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

export { ServiceAddFolderModal };
