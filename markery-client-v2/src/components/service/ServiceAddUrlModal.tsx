import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Spinner } from '../common/Spinner';
import { useInputs, useContent, useLoading } from '../../lib/hooks';
import { palette } from '../../lib/styles';
import { Folder, FolderType } from '../../lib/api/folders/types';

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
  width: 100%;
`;
const ErrorBlock = styled.div`
  display: flex;
  justify-content: center;
  transform: translateY(16px);
  color: ${palette.error};
`;

interface ServiceAddUrlModalProps {
  open: boolean;
  onClose: () => void;
  folder: Folder;
}

const ServiceAddUrlModal: React.FC<ServiceAddUrlModalProps> = ({
  open,
  onClose,
  folder
}) => {
  const [error, setError] = useState<string | null>(null);
  const { createUrlRequest } = useContent();
  const { loading, LoadingType } = useLoading();
  const [inputs, onChange, onReset] = useInputs({
    url: '',
    alias: '',
    description: ''
  });
  const isLoading = loading.isLoading && loading.type === LoadingType.createUrl;

  useEffect(() => {
    if (!open) {
      onReset();
      setError(null);
    }
  }, [open, onReset]);

  const closeModal = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const onCreate = () => {
    if (!inputs.url) {
      setError('Please enter a url');
      return;
    }

    createUrlRequest({
      url: inputs.url,
      alias: inputs.alias,
      description: inputs.description,
      parentFolderId: folder._id
    });
  };

  const header = (
    <ServiceAddUrlModalHeader>
      <h2>
        {folder.type === FolderType.root
          ? 'Add url'
          : `Add url in "${folder.folderName}"`}
      </h2>
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
          disabled={isLoading}
        />
        <Input
          label='Alias'
          id='service-alias'
          placeholder='Enter an alias'
          name='alias'
          value={inputs.alias}
          onChange={onChange}
          clearBackground
          disabled={isLoading}
        />
        <Input
          label='Description'
          id='service-description'
          placeholder='Enter a short description'
          name='description'
          value={inputs.description}
          onChange={onChange}
          clearBackground
          disabled={isLoading}
        />
      </form>
    </ServiceAddUrlModalBody>
  );

  const actions = (
    <>
      <ErrorBlock>{error}</ErrorBlock>
      <ServiceAddUrlModalActions>
        <Button color='grey' onClick={closeModal}>
          Cancel
        </Button>
        <Button color='green' onClick={onCreate} isLoading={isLoading}>
          {isLoading ? (
            <>
              <Spinner size='small' />
              Adding url
            </>
          ) : (
            'Add url'
          )}
        </Button>
      </ServiceAddUrlModalActions>
    </>
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

export { ServiceAddUrlModal };
