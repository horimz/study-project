import React from 'react';

import { Profile } from './Profile';

const _Header: React.FC = () => {
  return (
    <div className='main-content__content-top'>
      <div className='main-content__content-top__left'>current folder</div>
      <div className='main-content__content-top__right'>
        <div>
          <input
            type='text'
            placeholder='search'
            className='main-content__content-top__right-search'
          />
        </div>
        <div className='main-content__content-top__right-profile'>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export const Header = _Header;
