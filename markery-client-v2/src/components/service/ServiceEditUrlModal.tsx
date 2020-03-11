import React from "react";
import styled from "styled-components";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useInputs } from "../../lib/hooks";

const ServiceEditUrlModalHeader = styled.div`
  padding: 2rem 2.5rem;
`;
const ServiceEditUrlModalBody = styled.div`
  padding: 2rem 2.5rem;
`;
const ServiceEditUrlModalActions = styled.div`
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
`;

interface ServiceEditUrlModalProps {
  open: boolean;
  onClose: () => void;
}

const ServiceEditUrlModal: React.FC<ServiceEditUrlModalProps> = ({
  open,
  onClose
}) => {
  const [inputs, onChange] = useInputs({
    url: "url",
    alias: "alias",
    description: ""
  });
  const closeModal = () => {
    onClose();
  };

  const header = (
    <ServiceEditUrlModalHeader>
      <h2>Edit url</h2>
    </ServiceEditUrlModalHeader>
  );

  const body = (
    <ServiceEditUrlModalBody>
      <form>
        <Input
          label='Url'
          id='service-edit__url'
          name='url'
          value={inputs.url}
          onChange={onChange}
          clearBackground
        />
        <Input
          label='Alias'
          id='service-edit__alias'
          name='alias'
          value={inputs.alias}
          onChange={onChange}
          clearBackground
        />
        <Input
          label='Description'
          id='service-edit__description'
          name='description'
          value={inputs.description}
          onChange={onChange}
          clearBackground
        />
      </form>
    </ServiceEditUrlModalBody>
  );

  const actions = (
    <ServiceEditUrlModalActions>
      <Button color='grey' onClick={closeModal}>
        Cancel
      </Button>
      <Button color='green' onClick={() => console.log("Edit url")}>
        Apply changes
      </Button>
    </ServiceEditUrlModalActions>
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

export { ServiceEditUrlModal };
