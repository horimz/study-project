import React from 'react';
import { useCustomLocation } from '../../modules/hooks';
import { Link } from 'react-router-dom';
import './NoContents.scss';

interface NoContentsProps {}

export const NoContents: React.FC<NoContentsProps> = props => {
  const { isServiceHome, folderName } = useCustomLocation();

  const heading = <h3 className='heading-3'>Add contents to this folder.</h3>;

  const description = (
    <div>
      <p>
        {isServiceHome
          ? 'Categorize your bookmarks in folders. Create your first folder!'
          : 'This is an empty folder. You may add sub folders or urls into this folder.'}
      </p>
      <p>
        Try{' '}
        <Link to='/share' className='no-contents__share-link'>
          sharing
        </Link>{' '}
        contents in this folder with other people.
      </p>
    </div>
  );

  return (
    <div className='no-contents'>
      <div className='no-contents__container'>
        <div className='no-contents__image'>Image</div>
        <div className='no-contents__header'>{heading}</div>
        <div className='no-contents__description'>{description}</div>
      </div>
    </div>
  );
};
