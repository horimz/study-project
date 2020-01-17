import React, { useState } from 'react';
// import { HashLink } from 'react-router-hash-link';s

const _Main: React.FC = () => {
  return (
    <main className='landing-main'>
      <div className='landing-main__left'>
        <div className='landing-main__left__content'>
          <div className='landing-content-table'>Left (sticky)</div>
        </div>
      </div>
      <div className='landing-main__right'>Right</div>
      <div className='landing-main__bottom'>Bottom</div>
    </main>
  );
};

export const Main = _Main;
