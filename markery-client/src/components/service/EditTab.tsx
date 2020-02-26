import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { useUrl } from '../../modules/hooks';
import { Button } from '../common/Button';
import './EditTab.scss';

interface EditTabProps {
  visible: boolean;
  onClose(): void;
  url: any;
}

const editTabRoot = document.getElementById('edit-tab-root');

export const EditTab: React.FC<EditTabProps> = ({ visible, onClose, url }) => {
  if (!url.alias) throw new Error('Missing properties alias');
  const urlInput = useRef<HTMLInputElement>(null);
  const [updatedUrl, setUpdatedUrl] = useState<string>(url.url);
  const [updatedAlias, setUpdatedAlias] = useState<string>(url.alias);
  const [updatedDescription, setUpdatedDescription] = useState<string>(
    url.description
  );
  const { editCurrentUrl } = useUrl();
  const backdropClasses = classNames('backdrop-edit-tab', { visible });
  const editTabClasses = classNames('edit-tab', { visible });

  useEffect(() => {
    if (urlInput.current) urlInput.current.focus();
  }, [visible]);

  const closeTab = () => {
    setUpdatedUrl(url.url);
    setUpdatedAlias(url.alias);
    setUpdatedDescription(url.description);
    onClose();
  };

  const onEdit = () => {
    // Only apply changes on changes
    if (
      url.url !== updatedUrl ||
      url.alias !== updatedAlias ||
      url.description !== updatedDescription
    ) {
      // Create updated url object
      const updatedUrlObject = {
        ...url,
        url: updatedUrl,
        alias: updatedAlias,
        description: updatedDescription
      };

      // Update current url
      editCurrentUrl(updatedUrlObject);

      // Close tab
      onClose();
    } else {
      // Close tab
      closeTab();
    }
  };

  const tab = (
    <div>
      <div className={backdropClasses} onClick={closeTab}></div>
      <div className={editTabClasses}>
        <div className='edit-tab__container'>
          <div className='edit-tab__header-area'>
            <div className='edit-tab__header-area__header'>Edit url</div>
            <div className='edit-tab__header-area__cancel' onClick={closeTab}>
              <span className='edit-tab__header-area__cancel-icon'></span>
            </div>
          </div>
          <div className='edit-tab__form-area'>
            <div className='edit-tab__form-group'>
              <label htmlFor={url._id}>Url</label>
              <input
                type='text'
                id={url._id}
                ref={urlInput}
                value={updatedUrl}
                onChange={e => setUpdatedUrl(e.target.value)}
                autoFocus
              />
            </div>

            <div className='edit-tab__form-group'>
              <label htmlFor={`${url._id}${url._id}`}>Alias</label>
              <input
                type='text'
                id={`${url._id}${url._id}`}
                value={updatedAlias}
                onChange={e => setUpdatedAlias(e.target.value)}
              />
            </div>

            <div className='edit-tab__form-group'>
              <label htmlFor={`${url._id}${url._id}${url._id}`}>
                Description
              </label>
              <input
                id={`${url._id}${url._id}${url._id}`}
                type='text'
                value={updatedDescription}
                onChange={e => setUpdatedDescription(e.target.value)}
              />
            </div>
          </div>
          <div className='edit-tab__action-area'>
            <Button size='small' onClick={onEdit}>
              Apply changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!editTabRoot) throw new Error('Add element with id "edit-tab-root"');

  return ReactDOM.createPortal(tab, editTabRoot);
};
