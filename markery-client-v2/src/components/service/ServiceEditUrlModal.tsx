import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Spinner } from '../common/Spinner';
import { Url, UpdateUrlInput } from '../../lib/api/urls/types';

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
  content: Url;
  onEdit: (data: UpdateUrlInput) => void;
  isLoading: boolean;
}

const ServiceEditUrlModal: React.FC<ServiceEditUrlModalProps> = ({
  open,
  onClose,
  content,
  onEdit,
  isLoading
}) => {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (content) {
      setUrl(content.url);
      setAlias(content.alias);
      setDescription(content.description);
    }
  }, [content]);

  const closeModal = () => {
    if (!isLoading) {
      onClose();
    }
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
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
          clearBackground
          disabled={isLoading}
        />
        <Input
          label='Alias'
          id='service-edit__alias'
          name='alias'
          value={alias}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAlias(e.target.value)
          }
          clearBackground
          disabled={isLoading}
        />
        <Input
          label='Description'
          id='service-edit__description'
          name='description'
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          clearBackground
          disabled={isLoading}
        />
      </form>
    </ServiceEditUrlModalBody>
  );

  const actions = (
    <ServiceEditUrlModalActions>
      <Button color='grey' onClick={closeModal}>
        Cancel
      </Button>
      <Button
        color='green'
        onClick={() => {
          if (content._id) {
            onEdit({ _id: content._id, url, alias, description });
          }
        }}
        isLoading={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner size='small' />
            Applying changes
          </>
        ) : (
          'Apply changes'
        )}
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
