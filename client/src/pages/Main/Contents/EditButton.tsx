import React, { useState, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { StoreState } from '../../../common/reducers';
import {
  editSubFolder,
  IFolderContents,
  updateContent,
  editUrl
} from '../../../common/actions';
import { Modal } from '../../../components/Modal';
import { AppContext } from '../../../context';

const types = {
  folder: 'folder',
  url: 'url'
};

interface EditButtonProps {
  _id: string;
  name: string;
  content: any;
  type: string;
  editSubFolder: Function;
  updateContent: Function;
  editUrl: Function;
  contents: IFolderContents;
}

const _EditButton: React.FC<EditButtonProps> = props => {
  const {
    _id,
    name: contentName,
    content,
    type: contentType,
    editSubFolder,
    updateContent,
    editUrl,
    contents
  } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const openModal = useCallback(() => setOpen(true), []);
  const { selectedFolderId } = useContext(AppContext);

  const closeModal = useCallback(() => {
    setInputValue('');
    setName('');
    setDescription('');
    setOpen(false);
  }, []);

  const onEdit = () => {
    switch (contentType) {
      case types.folder:
        const updatedFolder = {
          folderName: inputValue,
          folderId: _id
        };
        editSubFolder(updatedFolder, selectedFolderId);

        const updatedFolders = {
          folders: contents.folders.map(folder => {
            if (folder.folderName === contentName)
              return {
                folderName: inputValue,
                _id: folder._id
              };
            return folder;
          }),
          urls: [...contents.urls]
        };
        updateContent(updatedFolders);
        break;
      case types.url:
        const updatedUrl = {
          _id,
          url: content.url,
          name: name ? name : content.name,
          description: description ? description : content.description
        };
        editUrl(updatedUrl, selectedFolderId);

        const updatedUrls = {
          folders: [...contents.folders],
          urls: contents.urls.map(content => {
            if (content._id === _id) return updatedUrl;
            return content;
          })
        };
        updateContent(updatedUrls);

        break;
      default:
        throw new Error('Invalid content type.');
    }
    closeModal();
  };

  const modalBody =
    contentType === types.folder ? (
      <div>
        <input
          type='text'
          placeholder={contentName}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className='modal__input'
        />
      </div>
    ) : (
      <React.Fragment>
        <input
          type='text'
          placeholder={
            content.name ? `${content.name} (name)` : 'Edit URL name'
          }
          value={name}
          onChange={e => setName(e.target.value)}
          className='modal__input u-mt-sm'
        />
        <input
          type='text'
          placeholder={
            content.description
              ? `${content.description} (description)`
              : 'Edit URL description'
          }
          value={description}
          onChange={e => setDescription(e.target.value)}
          className='modal__input u-mt-sm'
        />
      </React.Fragment>
    );

  const modalActions = (
    <div>
      <button onClick={closeModal} className='btn btn--cancel small u-mr-tiny'>
        Cancel
      </button>
      {contentType === types.folder ? (
        <button
          onClick={onEdit}
          className={classNames('btn btn--positive small', {
            disabled: !inputValue || inputValue === contentName
          })}
        >
          Edit
        </button>
      ) : (
        <button
          onClick={onEdit}
          className={classNames('btn btn--positive small', {
            disabled:
              (!name && !description) ||
              (name === content.name && description === content.description)
          })}
        >
          Edit
        </button>
      )}
    </div>
  );

  const toggleContent = () => {
    const content = document.getElementById(`${_id}${contentName}`);

    const className = content?.classList.value;

    switch (className) {
      case 'more__content-hidden':
        content?.classList.remove('more__content-hidden');
        content?.classList.add('more__content-show');
        break;
      case 'more__content-show':
        content?.classList.remove('more__content-show');
        content?.classList.add('more__content-hidden');
        break;
      default:
        throw new Error('Invalid classname.');
    }
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        title={contentType === types.folder ? 'Edit folder name' : content.url}
        body={modalBody}
        actions={modalActions}
        onClose={closeModal}
      />

      <div onClick={toggleContent} className='more'>
        <div className='more__icon'>
          <div
            onClick={openModal}
            className='more__content-hidden'
            id={`${_id}${contentName}`}
          >
            <div>Edit {contentType}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ contents }: StoreState): { contents: any } => {
  return { contents };
};

export const EditButton = connect(mapStateToProps, {
  editSubFolder,
  updateContent,
  editUrl
})(_EditButton);
