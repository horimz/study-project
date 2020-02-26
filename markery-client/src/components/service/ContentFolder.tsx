import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelectedContent, useFolder } from '../../modules/hooks';
import { IFolder } from '../../modules/redux';
import { Checkbox } from '../common/Checkbox';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';
import { Ellipsis } from '../common/Ellipsis';
import './ContentFolder.scss';

interface ContentFolderProps {
  folder: IFolder;
}

export const ContentFolder: React.FC<ContentFolderProps> = ({ folder }) => {
  const [rename, setRename] = useState<boolean>(false);
  const [updatedFolderName, setUpdatedFolderName] = useState<string>(
    folder.folderName
  );
  const [blueBackground, setBlueBackground] = useState<boolean>(false);
  const { addFolderToList, removeFolderFromList } = useSelectedContent();
  const { editCurrentFolder } = useFolder();

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addFolderToList(e.target.id);
      setBlueBackground(true);
    } else {
      removeFolderFromList(e.target.id);
      setBlueBackground(false);
    }
  };

  const onRename = () => {
    const updatedFolder = {
      ...folder,
      folderName: updatedFolderName
    };

    // Edit folder name on changes
    if (updatedFolderName !== folder.folderName)
      editCurrentFolder(updatedFolder);

    // Close input area
    setRename(false);
  };

  const contentAreaClasses = classNames('content-folder__content-area', {
    blueBackground
  });

  const ellipsisContent = (
    <div className='content-folder__ellipsis-content-box'>
      <div
        className='content-folder__ellipsis-content'
        onClick={() => setRename(true)}
      >
        Rename folder
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className='content-folder'>
        <div className='content-folder__checkbox-area'>
          <Checkbox id={folder._id} onChange={onChecked} />
        </div>

        <div className={contentAreaClasses}>
          {rename ? (
            <div className='content-folder__folder-name'>
              <input
                type='text'
                value={updatedFolderName}
                placeholder={folder.folderName}
                onChange={e => setUpdatedFolderName(e.target.value)}
                autoFocus
              />
              <Button size='tiny' color='grey' noFill onClick={onRename}>
                Rename
              </Button>
            </div>
          ) : (
            <Link
              to={`/service/show-${folder.folderName}-${folder._id}`}
              className='content-folder__folder-name'
            >
              <span className='icon folder small'></span>
              <p>{folder.folderName}</p>
            </Link>
          )}

          <div className='content-folder__actions'>
            <Button
              size='tiny'
              color='transparentBlue'
              onClick={() => console.log('Share content')}
            >
              Share
            </Button>
          </div>
        </div>
      </div>
      <div className='content-folder__ellipsis-area'>
        <Ellipsis content={ellipsisContent} color='grey' />
      </div>
    </React.Fragment>
  );
};
