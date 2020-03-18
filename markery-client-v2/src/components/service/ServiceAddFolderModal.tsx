import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Spinner } from '../common/Spinner';
import { useInputs, useContent, useLoading } from '../../lib/hooks';
import { palette } from '../../lib/styles';
import { Folder, FolderType } from '../../lib/api/folders/types';

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
const ErrorBlock = styled.div`
  display: flex;
  justify-content: center;
  transform: translateY(16px);
  color: ${palette.error};
`;

interface ServiceAddFolderModalProps {
  open: boolean;
  onClose: () => void;
  folder: Folder;
}

const ServiceAddFolderModal: React.FC<ServiceAddFolderModalProps> = ({
  open,
  onClose,
  folder
}) => {
  const [error, setError] = useState<string | null>(null);
  const { createFolderRequest } = useContent();
  const { loading, LoadingType } = useLoading();
  const [inputs, onChange, onReset] = useInputs({ folderName: '' });
  const isLoading =
    loading.isLoading && loading.type === LoadingType.createFolder;

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
    if (!inputs.folderName) {
      setError('Please enter a folder name');
      return;
    }

    createFolderRequest({
      folderName: inputs.folderName,
      parentFolderId: folder._id
    });
  };

  const header = (
    <ServiceAddFolderModalHeader>
      <h2>
        {folder.type === FolderType.root
          ? 'Add folder'
          : `Add folder in "${folder.folderName}"`}
      </h2>
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
          disabled={isLoading}
        />
      </form>
    </ServiceAddFolderModalBody>
  );

  const actions = (
    <>
      <ErrorBlock>{error}</ErrorBlock>
      <ServiceAddFolderModalActions>
        <Button color='grey' onClick={closeModal}>
          Cancel
        </Button>
        <Button color='green' onClick={onCreate} isLoading={isLoading}>
          {isLoading ? (
            <>
              <Spinner size='small' />
              Adding folder
            </>
          ) : (
            'Add folder'
          )}
        </Button>
      </ServiceAddFolderModalActions>
    </>
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
