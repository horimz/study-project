import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { StoreState } from '../../../common/reducers';
import { updateContent } from '../../../common/actions';
import { Modal } from '../../../components/Modal';

type folder = {
  _id: string;
};

type url = {
  _id: string;
};

interface BottomModifierProps {
  selectedFolders: folder[];
  selectedUrls: url[];
  contents: any;
  updateContent: Function;
}

const _BottomModifier: React.FC<BottomModifierProps> = props => {
  const modifier = document.getElementById('modifier');
  const { selectedFolders, selectedUrls, contents, updateContent } = props;
  const [open, setOpen] = useState<boolean>(false);
  const selected = selectedFolders.length !== 0 || selectedUrls.length !== 0;
  const selectedNum = selectedFolders.length + selectedUrls.length;

  const openModal = useCallback(() => setOpen(true), []);

  const closeModal = useCallback(() => setOpen(false), []);

  const onDelete = () => {
    axios.post(`/api/contents`, {
      folders: selectedFolders,
      urls: selectedUrls
    });

    let updatedFolderContents = contents.folders;
    let updatedUrlContents = contents.urls;

    selectedFolders.forEach(selectedFolder => {
      updatedFolderContents = updatedFolderContents.filter(
        (folder: { _id: string }) => folder._id !== selectedFolder._id
      );
    });

    selectedUrls.forEach(selectedUrl => {
      updatedUrlContents = updatedUrlContents.filter(
        (url: { _id: string }) => url._id !== selectedUrl._id
      );
    });

    const updatedContents = {
      folders: updatedFolderContents || [],
      urls: updatedUrlContents || []
    };

    updateContent(updatedContents);
    closeModal();
  };

  const modalActions = (
    <div>
      <button onClick={closeModal} className='btn btn--cancel small u-mr-tiny'>
        Cancel
      </button>
      <button onClick={onDelete} className={'btn btn--positive small'}>
        Delete
      </button>
    </div>
  );

  const content = (
    <div className={classNames('bottom-modifier', { hide: !selected || open })}>
      <div
        className={classNames('bottom-modifier__content', {
          hide: !selected || open
        })}
      >
        <button className='btn btn--blue'>Move</button>
      </div>
      <div
        className={classNames('bottom-modifier__content', { hide: !selected })}
      >
        <Modal
          open={open}
          title='Confirm deletion'
          body={
            <div className='modal__text'>
              Delete {selectedNum} {selectedNum === 1 ? 'item' : 'items'}?
            </div>
          }
          actions={modalActions}
          onClose={closeModal}
          centerTitle={true}
          size='medium'
        />
        <button onClick={openModal} className='btn btn--negative--inverted'>
          Delete
        </button>
      </div>
    </div>
  );

  if (!modifier)
    throw new Error('Create an element with id "modifier" to use this portal.');
  return ReactDOM.createPortal(content, modifier);
};

const mapStateToProps = ({ contents }: StoreState): { contents: any } => {
  return { contents };
};

export const BottomModifier = connect(mapStateToProps, { updateContent })(
  _BottomModifier
);
