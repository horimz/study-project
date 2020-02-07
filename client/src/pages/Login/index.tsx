import React from 'react';

import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

const _Login: React.FC = () => {
  return (
    <div>
      <Nav offsetLimit={80} />
      <div className='login'>
        <div className='login__content'>Login Content</div>
      </div>
      <Footer />
    </div>
  );
};

export const Login = _Login;
