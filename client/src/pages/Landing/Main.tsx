import React from 'react';
// import { HashLink } from 'react-router-hash-link';s

const _Main: React.FC = () => {
  return (
    <main className='main'>
      <div className='main__left'>
        <div className='main__left__content'>Left (sticky)</div>
      </div>
      <div className='main__right'>Right</div>
      <div className='main__bottom'>Bottom</div>
    </main>
  );
};

export const Main = _Main;
