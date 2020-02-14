import React from 'react';

const _LeftBar: React.FC = () => {
  return (
    <div className='main-content__left-bar'>
      <div className='main-content__left-bar__top'>
        <div className='main-content__left-bar__logo'>logo</div>
        <div className='main-content__left-bar__content'>content</div>
      </div>
      <div className='main-content__left-bar__bottom'>bottom content</div>
    </div>
  );
};

export const LeftBar = _LeftBar;
