import React from 'react';
import { Link } from 'react-router-dom';

const _Hero: React.FC = () => {
  return (
    <React.Fragment>
      <header className='hero'>Hero</header>
      <div
        style={{
          display: 'grid',
          alignContent: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ margin: '0 1rem' }}>
          <Link to='/login'>Login</Link>
        </div>
        <div style={{ margin: '0 1rem' }}>
          <Link to='/main'>Main</Link>
        </div>
        <div style={{ margin: '0 1rem' }}>
          <Link to='/share'>Share</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export const Hero = _Hero;
