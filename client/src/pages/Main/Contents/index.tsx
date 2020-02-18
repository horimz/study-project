import React from 'react';

import { Header } from './Header';
import { RightBar } from './RightBar';
import { MainContent } from './MainContent';

const _Contents: React.FC = props => {
  return (
    <div className='main-content__content'>
      <Header />
      <div className='main-content__content-bottom'>
        <MainContent />
        <RightBar />
      </div>
      {/* portal for bottom modifier */}
      <div id='modifier'></div>
    </div>
  );
};

export const Contents = _Contents;
