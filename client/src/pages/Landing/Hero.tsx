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
        <Link to='/login'>Login</Link>
        <Link to='/main'>Main</Link>
        <Link to='/share'>Share</Link>
      </div>
    </React.Fragment>
  );
};

export const Hero = _Hero;
