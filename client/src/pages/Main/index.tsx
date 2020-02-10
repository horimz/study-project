import React from 'react';

const _Main: React.FC = () => {
  return (
    <div className='main-content'>
      <div className='main-content__left-bar'>
        <div className='main-content__left-bar__top'>
          <div className='main-content__left-bar__logo'>logo</div>
          <div className='main-content__left-bar__content'>content</div>
        </div>
        <div className='main-content__left-bar__bottom'>bottom content</div>
      </div>

      <div className='main-content__content'>
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
              <div className='main-content__content-top__right-image'></div>
            </div>
          </div>
        </div>
        <div className='main-content__content-bottom'>
          <div className='main-content__content-bottom__left'>
            folder content (urls, sub dir) scrollable
          </div>
          <div className='main-content__content-bottom__right'>right</div>
        </div>
      </div>
    </div>
  );
};

export const Main = _Main;
