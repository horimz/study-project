import React from "react";
import styled from "styled-components";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useInputs } from "../../lib/hooks";

const ServiceAddUrlModalHeader = styled.div`
  padding: 2rem 2.5rem;
`;
const ServiceAddUrlModalBody = styled.div`
  padding: 2rem 2.5rem;
`;
const ServiceAddUrlModalActions = styled.div`
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
`;

interface ServiceAddUrlModalProps {
  open: boolean;
  onClose: () => void;
}

const ServiceAddUrlModal: React.FC<ServiceAddUrlModalProps> = ({
  open,
  onClose
}) => {
  const [inputs, onChange] = useInputs({ url: "", alias: "", description: "" });

  const closeModal = () => {
    onClose();
  };

  const header = (
    <ServiceAddUrlModalHeader>
      <h2>Add Url</h2>
    </ServiceAddUrlModalHeader>
  );

  const body = (
    <ServiceAddUrlModalBody>
      <form>
        <Input
          label='Url name'
          id='service-url'
          placeholder='Enter a url'
          name='url'
          value={inputs.url}
          onChange={onChange}
          clearBackground
        />
        <Input
          label='Alias'
          id='service-alias'
          placeholder='Enter an alias'
          name='alias'
          value={inputs.alias}
          onChange={onChange}
          clearBackground
        />
        <Input
          label='Description'
          id='service-description'
          placeholder='Enter a short description'
          name='description'
          value={inputs.description}
          onChange={onChange}
          clearBackground
        />
      </form>
    </ServiceAddUrlModalBody>
  );

  const actions = (
    <ServiceAddUrlModalActions>
      <Button color='grey' onClick={closeModal}>
        Cancel
      </Button>
      <Button
        color='blue'
        onClick={() =>
          console.log(
            `Add Url, ${inputs.url} ${inputs.alias} ${inputs.description}`
          )
        }
      >
        Add url
      </Button>
    </ServiceAddUrlModalActions>
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

export { ServiceAddUrlModal };
