import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules/redux';
import { useUrl } from '../../modules/hooks';
import { useCustomLocation } from '../../modules/hooks';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import './CreateUrlModal.scss';

interface CreateUrlModalProps {
  visible: boolean;
  onClose(): void;
}

export const CreateUrlModal: React.FC<CreateUrlModalProps> = ({
  visible,
  onClose
}) => {
  const rootFolderId: any = useSelector(
    (state: RootState) => state.rootFolderId
  );
  const { folderId, isServiceHome } = useCustomLocation();
  const { addNewUrl } = useUrl();
  const urlInput = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>('');
  const [alias, setAlias] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (urlInput.current) urlInput.current.focus();
  }, [visible]);

  const closeModal = () => {
    setUrl('');
    setAlias('');
    setDescription('');
    onClose();
  };

  const onCreate = () => {
    const newUrl = {
      url,
      alias,
      description
    };

    if (isServiceHome) {
      addNewUrl(newUrl, rootFolderId);
    } else {
      addNewUrl(newUrl, folderId);
    }

    closeModal();
  };

  const content = (
    <div className='create-url-modal'>
      <div className='create-url-modal__heading'>
        <h3 className='heading-3'>Create new url</h3>
      </div>
      <div className='create-url-modal__form'>
        <div className='create-url-modal__form__group'>
          <input
            type='text'
            ref={urlInput}
            placeholder='Enter a url'
            id='url-input'
            value={url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
          />
          <label htmlFor='url-input'>Url</label>
        </div>

        <div className='create-url-modal__form__group'>
          <input
            type='text'
            id='alias-input'
            placeholder='Enter an alias'
            value={alias}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAlias(e.target.value)
            }
          />
          <label htmlFor='alias-input'>Alias</label>
        </div>

        <div className='create-url-modal__form__group'>
          <input
            type='text'
            id='description-input'
            placeholder='Enter a short description'
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
          <label htmlFor='description-input'>
            Description <span>(optional)</span>
          </label>
        </div>

        <div className='create-url-modal__form__actions'>
          <Button color='lightGrey' transparent onClick={closeModal}>
            Cancle
          </Button>
          <Button
            color='blue'
            transparent
            onClick={onCreate}
            disabled={!url || !alias}
          >
            Create
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
      modalPosition='topCenter'
      onClose={closeModal}
      backdropBlur='little'
      removeBox
      hideCancle
    />
  );
};
